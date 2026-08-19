/**
 * To'lov qatlami — hozircha gateway ulanmagan.
 * Kelajakda Stripe / Payme / Click shu interfeys orqali qo'shiladi.
 */

export type CheckoutRequest = {
  invitationId: string;
  amount: number;
  templateId: string;
};

export type CheckoutResult =
  | { status: "not_configured"; message: string }
  | { status: "ok"; redirectUrl: string };

export function createCheckoutIntent(_req: CheckoutRequest): CheckoutResult {
  return {
    status: "not_configured",
    message:
      "To'lov tizimi tez orada ulanadi. Hozircha taklifnomani to'liq yaratib, havola orqali ulashishingiz mumkin.",
  };
}
