import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input, Label, Textarea } from "@/components/ui/input";
import { submitRsvp } from "@/lib/invitations";

export function RsvpForm({ invitationId }: { invitationId: string }) {
  const [name, setName] = useState("");
  const [attending, setAttending] = useState(true);
  const [count, setCount] = useState(1);
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);

  if (done) {
    return (
      <p className="rounded-2xl bg-ivory/80 px-5 py-6 text-center font-display text-xl text-ink">
        Rahmat, javobingiz qabul qilindi.
      </p>
    );
  }

  return (
    <form
      className="space-y-4 rounded-[24px] bg-ivory/90 p-6 text-ink"
      onSubmit={async (e) => {
        e.preventDefault();
        setBusy(true);
        try {
          await submitRsvp({
            data: {
              invitationId,
              guestName: name,
              attending,
              guestsCount: count,
              message,
            },
          });
          setDone(true);
        } catch (err) {
          toast.error(err instanceof Error ? err.message : "Yuborib bo'lmadi");
        } finally {
          setBusy(false);
        }
      }}
    >
      <h3 className="font-display text-2xl">Ishtirok</h3>
      <div>
        <Label htmlFor="guest">Ismingiz</Label>
        <Input id="guest" value={name} onChange={(e) => setName(e.target.value)} required className="mt-1" />
      </div>
      <div className="flex gap-2">
        <Button type="button" variant={attending ? "gold" : "line"} className="flex-1" onClick={() => setAttending(true)}>
          Boraman
        </Button>
        <Button type="button" variant={!attending ? "gold" : "line"} className="flex-1" onClick={() => setAttending(false)}>
          Bora olmayman
        </Button>
      </div>
      <div>
        <Label htmlFor="count">Mehmonlar soni</Label>
        <Input
          id="count"
          type="number"
          min={1}
          max={20}
          value={count}
          onChange={(e) => setCount(Number(e.target.value))}
          className="mt-1"
        />
      </div>
      <div>
        <Label htmlFor="note">Izoh</Label>
        <Textarea id="note" value={message} onChange={(e) => setMessage(e.target.value)} className="mt-1" />
      </div>
      <Button type="submit" className="w-full" disabled={busy}>
        {busy ? "Yuborilmoqda…" : "Yuborish"}
      </Button>
    </form>
  );
}
