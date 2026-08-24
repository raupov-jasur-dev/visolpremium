import { Link } from "@tanstack/react-router";

const COLS = [
  {
    title: "Studio",
    links: [
      { to: "/", label: "Bosh sahifa" },
      { to: "/templates", label: "Dizaynlar" },
      { to: "/qanday-ishlaydi", label: "Qanday ishlaydi?" },
      { to: "/narxlar", label: "Narxlar" },
    ],
  },
  {
    title: "Taklifnomalar",
    links: [
      { to: "/templates/$category", params: { category: "toy" }, label: "To'y taklifnomasi" },
      { to: "/templates/$category", params: { category: "tabriknoma" }, label: "Tabriknomalar" },
      { to: "/templates/$category", params: { category: "video-taklif" }, label: "Videolik taklifnomalar" },
      { to: "/templates/$category", params: { category: "tugilgan-kun" }, label: "Tug'ilgan kun" },
    ],
  },
  {
    title: "Ma'lumot",
    links: [
      { to: "/faq", label: "FAQ" },
      { to: "/boglanish", label: "Bog'lanish" },
      { to: "/maxfiylik", label: "Maxfiylik" },
      { to: "/shartlar", label: "Shartlar" },
    ],
  },
] as const;

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-burgundy-deep text-ivory">
      <div
        className="pointer-events-none absolute inset-0 opacity-30"
        style={{
          backgroundImage: "url(/images/textures/ornament.jpg)",
          backgroundSize: "cover",
        }}
      />
      <div className="relative mx-auto grid max-w-6xl gap-10 px-6 py-16 md:grid-cols-4">
        <div>
          <p className="font-display text-2xl">VisolPremium</p>
          <p className="mt-3 max-w-xs text-sm text-champagne/85">
            Luxury digital invitation studio. Har bir lahza — o'z hikoyasiga loyiq.
          </p>
        </div>
        {COLS.map((col) => (
          <div key={col.title}>
            <p className="text-xs tracking-[0.22em] text-gold uppercase">{col.title}</p>
            <ul className="mt-4 space-y-2 text-sm">
              {col.links.map((l) => (
                <li key={l.label}>
                  {"params" in l ? (
                    <Link
                      to={l.to}
                      params={l.params}
                      className="text-ivory/80 underline-offset-4 hover:text-ivory hover:underline"
                    >
                      {l.label}
                    </Link>
                  ) : (
                    <Link
                      to={l.to}
                      className="text-ivory/80 underline-offset-4 hover:text-ivory hover:underline"
                    >
                      {l.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <p className="relative border-t border-ivory/10 px-6 py-6 text-center text-xs text-champagne/70">
        VisolPremium · Premium taklifnomalar
      </p>
    </footer>
  );
}
