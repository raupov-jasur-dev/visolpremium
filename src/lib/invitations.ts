import { createServerFn } from "@tanstack/react-start";
import { authMiddleware } from "@/lib/auth/middleware";
import { getSql } from "@/lib/db";
import { getTemplate, invitationTitle } from "@/lib/templates";
import type { InvitationData, RsvpRow, SavedInvitation } from "@/lib/types";
import { newInvitationId, uniqueSlug } from "@/lib/slug";

type InvitationRow = {
  id: string;
  slug: string;
  user_id: string;
  template_id: string;
  title: string;
  data: InvitationData | string;
  published: boolean;
  created_at: string;
  updated_at: string;
};

function parseData(raw: InvitationData | string): InvitationData {
  if (raw && typeof raw === "object") return raw;
  if (typeof raw === "string") {
    try {
      return JSON.parse(raw) as InvitationData;
    } catch {
      return {};
    }
  }
  return {};
}

function mapInvitation(row: InvitationRow): SavedInvitation {
  return {
    id: row.id,
    slug: row.slug,
    userId: row.user_id,
    templateId: row.template_id,
    title: row.title,
    data: parseData(row.data),
    published: row.published,
    createdAt: typeof row.created_at === "string" ? row.created_at : new Date(row.created_at).toISOString(),
    updatedAt: typeof row.updated_at === "string" ? row.updated_at : new Date(row.updated_at).toISOString(),
  };
}

export type SaveInvitationInput = {
  id?: string;
  templateId: string;
  data: InvitationData;
};

export const saveInvitation = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((input: SaveInvitationInput) => input)
  .handler(async ({ context, data: input }) => {
    const template = getTemplate(input.templateId);
    if (!template) {
      throw new Error("Shablon topilmadi.");
    }
    const sql = await getSql();
    const title = invitationTitle(template, input.data);
    const payload = JSON.stringify(input.data);

    if (input.id) {
      const existing = await sql<InvitationRow>`
        select * from invitations where id = ${input.id} and user_id = ${context.userId}
      `;
      if (!existing[0]) throw new Error("Taklifnoma topilmadi yoki sizga tegishli emas.");
      const rows = await sql<InvitationRow>`
        update invitations
        set data = ${payload}::jsonb,
            title = ${title},
            template_id = ${input.templateId},
            updated_at = now()
        where id = ${input.id} and user_id = ${context.userId}
        returning *
      `;
      return mapInvitation(rows[0]);
    }

    const id = newInvitationId();
    const base =
      (typeof input.data.groom === "string" && typeof input.data.bride === "string"
        ? `${input.data.groom} ${input.data.bride}`
        : typeof input.data.honoree === "string"
          ? input.data.honoree
          : typeof input.data.title === "string"
            ? input.data.title
            : template.id);
    const slug = uniqueSlug(base);

    const rows = await sql<InvitationRow>`
      insert into invitations (id, slug, user_id, template_id, title, data, published)
      values (${id}, ${slug}, ${context.userId}, ${input.templateId}, ${title}, ${payload}::jsonb, true)
      returning *
    `;
    return mapInvitation(rows[0]);
  });

export const listMyInvitations = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    const sql = await getSql();
    const rows = await sql<InvitationRow>`
      select * from invitations where user_id = ${context.userId} order by updated_at desc
    `;
    return rows.map(mapInvitation);
  });

export const getInvitationPublic = createServerFn({ method: "GET" })
  .validator((idOrSlug: string) => idOrSlug)
  .handler(async ({ data: idOrSlug }) => {
    const sql = await getSql();
    const rows = await sql<InvitationRow>`
      select * from invitations
      where (id = ${idOrSlug} or slug = ${idOrSlug}) and published = true
      limit 1
    `;
    if (!rows[0]) return null;
    return mapInvitation(rows[0]);
  });

export const getMyInvitation = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .validator((id: string) => id)
  .handler(async ({ context, data: id }) => {
    const sql = await getSql();
    const rows = await sql<InvitationRow>`
      select * from invitations where id = ${id} and user_id = ${context.userId} limit 1
    `;
    if (!rows[0]) return null;
    return mapInvitation(rows[0]);
  });

export type RsvpInput = {
  invitationId: string;
  guestName: string;
  attending: boolean;
  guestsCount: number;
  message?: string;
};

export const submitRsvp = createServerFn({ method: "POST" })
  .validator((input: RsvpInput) => input)
  .handler(async ({ data: input }) => {
    const name = input.guestName.trim();
    if (name.length < 2) throw new Error("Ismingizni kiriting.");
    const sql = await getSql();
    const found = await sql<{ id: string }>`
      select id from invitations where id = ${input.invitationId} and published = true
    `;
    if (!found[0]) throw new Error("Taklifnoma topilmadi.");
    const id = newInvitationId();
    const count = Math.min(20, Math.max(1, Math.round(input.guestsCount || 1)));
    await sql`
      insert into rsvps (id, invitation_id, guest_name, attending, guests_count, message)
      values (${id}, ${input.invitationId}, ${name}, ${input.attending}, ${count}, ${input.message ?? null})
    `;
    return { ok: true as const };
  });

export const listRsvps = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .validator((invitationId: string) => invitationId)
  .handler(async ({ context, data: invitationId }) => {
    const sql = await getSql();
    const owned = await sql<{ id: string }>`
      select id from invitations where id = ${invitationId} and user_id = ${context.userId}
    `;
    if (!owned[0]) throw new Error("Ruxsat yo'q.");
    const rows = await sql<{
      id: string;
      invitation_id: string;
      guest_name: string;
      attending: boolean;
      guests_count: number;
      message: string | null;
      created_at: string;
    }>`
      select * from rsvps where invitation_id = ${invitationId} order by created_at desc
    `;
    return rows.map(
      (r): RsvpRow => ({
        id: r.id,
        invitationId: r.invitation_id,
        guestName: r.guest_name,
        attending: r.attending,
        guestsCount: r.guests_count,
        message: r.message,
        createdAt: typeof r.created_at === "string" ? r.created_at : new Date(r.created_at).toISOString(),
      }),
    );
  });
