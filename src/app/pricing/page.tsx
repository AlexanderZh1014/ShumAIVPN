const plans = [
  {
    name: "Free Beta",
    price: "$0",
    note: "Currently available during beta",
    features: [
      "1 device",
      "L2TP/IPsec access",
      "Shared VPN node",
      "Email verification",
      "Basic speed",
      "Community support",
    ],
    cta: "Start Beta Access",
    href: "/register",
    highlighted: false,
  },
  {
    name: "ShumAI VPN Plus",
    price: "$5.99",
    note: "per month",
    features: [
      "Multiple devices",
      "Faster routing",
      "Priority VPN access",
      "Higher stability",
      "Future global nodes",
      "Premium support",
    ],
    cta: "Coming Soon",
    href: "/register",
    highlighted: true,
  },
  {
    name: "ShumAI VPN Pro",
    price: "$12.99",
    note: "per month",
    features: [
      "Team access",
      "Dedicated VPN profiles",
      "Static IP option",
      "Admin dashboard",
      "Advanced controls",
      "Priority infrastructure",
    ],
    cta: "Coming Soon",
    href: "/register",
    highlighted: false,
  },
];

export default function PricingPage() {
  return (
    <main className="min-h-screen bg-[#0e0100] px-6 py-8 text-[#fffbff]">
      <nav className="mx-auto flex max-w-7xl items-center justify-between">
        <a href="/" className="text-2xl font-bold tracking-tight">
          ShumAI<span className="text-[#ff4002]">VPN</span>
        </a>

        <div className="flex items-center gap-4 text-sm">
          <a href="/login" className="text-[#ffd7cd] hover:text-white">
            Login
          </a>
          <a
            href="/register"
            className="rounded-full bg-[#ff4002] px-5 py-2 font-semibold text-white hover:bg-[#ff562a]"
          >
            Get Started
          </a>
        </div>
      </nav>

      <section className="relative mx-auto mt-20 max-w-7xl">
        <div className="absolute left-1/2 top-0 -z-10 h-96 w-96 -translate-x-1/2 rounded-full bg-[#ff4002]/25 blur-3xl" />

        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-6 inline-flex rounded-full border border-[#ff7a1b]/40 bg-[#1e0800]/80 px-4 py-2 text-sm text-[#ffd7cd]">
            ShumAI VPN Pricing
          </div>

          <h1 className="text-5xl font-bold tracking-tight md:text-7xl">
            Simple plans for secure access
          </h1>

          <p className="mt-6 text-lg leading-8 text-[#ffd7cd]">
            ShumAI VPN is currently in beta. Start free today and upgrade later
            as more nodes, routing options, and team features become available.
          </p>
        </div>

        <div className="mt-16 grid gap-6 lg:grid-cols-3">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`rounded-3xl border p-7 shadow-2xl shadow-orange-950/30 ${
                plan.highlighted
                  ? "border-[#ff4002] bg-[#2a0d00]"
                  : "border-[#ff7a1b]/20 bg-[#1e0800]/90"
              }`}
            >
              {plan.highlighted && (
                <div className="mb-5 inline-flex rounded-full bg-[#ff4002] px-3 py-1 text-xs font-semibold text-white">
                  Future Popular
                </div>
              )}

              <h2 className="text-2xl font-bold">{plan.name}</h2>

              <div className="mt-6 flex items-end gap-2">
                <span className="text-5xl font-bold">{plan.price}</span>
                <span className="pb-2 text-sm text-[#ffd7cd]">{plan.note}</span>
              </div>

              <a
                href={plan.href}
                className={`mt-8 block rounded-2xl px-5 py-3 text-center font-semibold ${
                  plan.highlighted
                    ? "bg-[#ff4002] text-white hover:bg-[#ff562a]"
                    : "border border-[#ff7a1b]/30 text-[#ffede9] hover:border-[#ff4002]"
                }`}
              >
                {plan.cta}
              </a>

              <ul className="mt-8 space-y-4 text-sm text-[#ffd7cd]">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex gap-3">
                    <span className="text-[#ff9815]">✓</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}