"use client";

import Image from "next/image";
import Footer from "../components/Footer";
import { useState } from "react";
import { dictionary } from "../lib/dictionary";

const plans = [
  {
    name: "Free Beta",
    price: "$0",
    noteKey: "planFreeNote",
    featuresKeys: [
      "planFreeFeature1",
      "planFreeFeature2",
      "planFreeFeature3",
      "planFreeFeature4",
      "planFreeFeature5",
      "planFreeFeature6",
    ],
    ctaKey: "startBeta",
    href: "/register",
    highlighted: false,
  },
  {
    name: "ShumAI VPN Plus",
    price: "$5.99",
    noteKey: "perMonth",
    featuresKeys: [
      "planPlusFeature1",
      "planPlusFeature2",
      "planPlusFeature3",
      "planPlusFeature4",
      "planPlusFeature5",
      "planPlusFeature6",
    ],
    ctaKey: "comingSoon",
    href: "/register",
    highlighted: true,
  },
  {
    name: "ShumAI VPN Pro",
    price: "$12.99",
    noteKey: "perMonth",
    featuresKeys: [
      "planProFeature1",
      "planProFeature2",
      "planProFeature3",
      "planProFeature4",
      "planProFeature5",
      "planProFeature6",
    ],
    ctaKey: "comingSoon",
    href: "/register",
    highlighted: false,
  },
];

export default function HomePage() {
  const [locale, setLocale] = useState<"en" | "zh">("en");
  const t = dictionary[locale];
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <main className="min-h-screen overflow-hidden bg-[#0e0100] text-[#fffbff]">
      <nav className="relative mx-auto flex max-w-7xl items-center justify-between px-6 py-6">
  <a href="/" className="flex items-center gap-3">
    <Image
      src="/ShumaiLogo.png"
      alt="ShumAI Logo"
      width={44}
      height={44}
      className="rounded-xl object-contain"
    />

    <div className="text-xl font-bold tracking-tight sm:text-2xl">
      ShumAI<span className="text-[#ff4002]">VPN</span>
    </div>
  </a>

  <div className="hidden items-center gap-5 text-sm md:flex">
    <button
      onClick={() => setLocale("en")}
      className={locale === "en" ? "text-white" : "text-[#cfa49a]"}
    >
      EN
    </button>

    <span className="text-[#5c2a16]">/</span>

    <button
      onClick={() => setLocale("zh")}
      className={locale === "zh" ? "text-white" : "text-[#cfa49a]"}
    >
      中文
    </button>

    <a href="/login" className="text-[#ffd7cd] hover:text-white">
      {t.login}
    </a>

    <a
      href="/register"
      className="rounded-full bg-[#ff4002] px-5 py-2 font-semibold text-white shadow-lg shadow-orange-900/40 hover:bg-[#ff562a]"
    >
      {t.getStarted}
    </a>
  </div>

  <button
    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
    className="rounded-full border border-[#ff7a1b]/30 px-4 py-2 text-sm text-[#ffd7cd] md:hidden"
  >
    Menu
  </button>

  {mobileMenuOpen && (
    <div className="absolute right-6 top-20 z-50 w-52 rounded-2xl border border-[#ff7a1b]/30 bg-[#1e0800] p-4 shadow-2xl shadow-orange-950/40 md:hidden">
      <div className="flex flex-col gap-4 text-sm">
        <button
          onClick={() => {
            setLocale("en");
            setMobileMenuOpen(false);
          }}
          className={locale === "en" ? "text-left text-white" : "text-left text-[#ffd7cd]"}
        >
          English
        </button>

        <button
          onClick={() => {
            setLocale("zh");
            setMobileMenuOpen(false);
          }}
          className={locale === "zh" ? "text-left text-white" : "text-left text-[#ffd7cd]"}
        >
          简体中文
        </button>

        <div className="h-px bg-[#ff7a1b]/20" />

        <a
          href="/login"
          className="text-[#ffd7cd] hover:text-white"
        >
          {t.login}
        </a>

        <a
          href="/register"
          className="rounded-xl bg-[#ff4002] px-4 py-3 text-center font-semibold text-white hover:bg-[#ff562a]"
        >
          {t.getStarted}
        </a>

        <a
          href="#pricing"
          onClick={() => setMobileMenuOpen(false)}
          className="text-[#ffd7cd] hover:text-white"
        >
          {t.pricing}
        </a>
      </div>
    </div>
  )}
</nav>

      <section className="relative mx-auto flex min-h-[85vh] max-w-7xl items-center px-6">
        <div className="absolute inset-0 -z-10">
          <div className="absolute left-1/2 top-20 h-96 w-96 -translate-x-1/2 rounded-full bg-[#ff4002]/30 blur-3xl" />
          <div className="absolute right-20 bottom-20 h-72 w-72 rounded-full bg-[#ff9815]/20 blur-3xl" />
        </div>

        <div className="max-w-3xl">
          <div className="mb-6 inline-flex rounded-full border border-[#ff7a1b]/40 bg-[#1e0800]/80 px-4 py-2 text-sm text-[#ffd7cd]">
            {t.heroBadge}
          </div>

          <h1 className="text-6xl font-bold leading-tight tracking-tight md:text-8xl">
            ShumAI VPN
            <span className="block bg-gradient-to-r from-[#ff4002] via-[#ff7a1b] to-[#ff9815] bg-clip-text text-transparent">
              {t.heroTitle}
            </span>
          </h1>

          <div className="mt-8 max-w-2xl">
            <p className="text-xl leading-8 text-[#ffd7cd]">{t.heroDesc}</p>

            <div className="mt-5 inline-flex items-center rounded-full border border-[#ff4002]/30 bg-[#ff4002]/10 px-4 py-2 text-sm font-medium text-[#ffb08f]">
              {t.beta}
            </div>
          </div>

          <div className="mt-10 flex flex-wrap gap-4">
            <a
              href="/register"
              className="rounded-2xl bg-[#ff4002] px-7 py-4 font-semibold text-white shadow-xl shadow-orange-950/50 hover:bg-[#ff562a]"
            >
              {t.createAccount}
            </a>

            <a
              href="/login"
              className="rounded-2xl border border-[#ff7a1b]/40 bg-[#1e0800] px-7 py-4 font-semibold text-[#ffede9] hover:border-[#ff4002]"
            >
              {t.loginDashboard}
            </a>
          </div>

          <div className="mt-14 grid max-w-3xl gap-4 md:grid-cols-3">
            {[
              [t.feature1Title, t.feature1Desc],
              [t.feature2Title, t.feature2Desc],
              [t.feature3Title, t.feature3Desc],
            ].map(([title, desc]) => (
              <div
                key={title}
                className="rounded-2xl border border-[#ff7a1b]/20 bg-[#1e0800]/80 p-5"
              >
                <h3 className="font-semibold text-[#fffbff]">{title}</h3>
                <p className="mt-2 text-sm text-[#ffd7cd]">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative mx-auto max-w-7xl px-6 pb-28">
        <div className="mb-6 inline-flex rounded-full border border-[#ff7a1b]/40 bg-[#1e0800]/80 px-4 py-2 text-sm text-[#ffd7cd]">
          {t.whyBadge}
        </div>

        <h2 className="text-5xl font-bold tracking-tight">{t.whyTitle}</h2>

        <p className="mt-6 max-w-3xl text-lg leading-8 text-[#ffd7cd]">
          {t.whyDesc}
        </p>

        <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {[
            [t.why1Title, t.why1Desc],
            [t.why2Title, t.why2Desc],
            [t.why3Title, t.why3Desc],
            [t.why4Title, t.why4Desc],
          ].map(([title, desc]) => (
            <div
              key={title}
              className="rounded-3xl border border-[#ff7a1b]/20 bg-[#1e0800]/90 p-6 shadow-2xl shadow-orange-950/20"
            >
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[#ff4002]/10 text-xl text-[#ff9815]">
                ✦
              </div>

              <h3 className="text-xl font-semibold text-[#fffbff]">{title}</h3>
              <p className="mt-3 text-sm leading-7 text-[#ffd7cd]">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="pricing" className="relative mx-auto max-w-7xl px-6 pb-24">
        <div className="mb-6 inline-flex rounded-full border border-[#ff7a1b]/40 bg-[#1e0800]/80 px-4 py-2 text-sm text-[#ffd7cd]">
          {t.pricing}
        </div>

        <h2 className="text-5xl font-bold tracking-tight">
          {t.pricingTitle}
        </h2>

        <p className="mt-6 max-w-3xl text-lg leading-8 text-[#ffd7cd]">
          {t.pricingDesc}
        </p>

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
                  {t.futurePopular}
                </div>
              )}

              <h3 className="text-2xl font-bold">{plan.name}</h3>

              <div className="mt-6 flex items-end gap-2">
                <span className="text-5xl font-bold">{plan.price}</span>
                <span className="pb-2 text-sm text-[#ffd7cd]">
                  {t[plan.noteKey as keyof typeof t]}
                </span>
              </div>

              <a
                href={plan.href}
                className={`mt-8 block rounded-2xl px-5 py-3 text-center font-semibold ${
                  plan.highlighted
                    ? "bg-[#ff4002] text-white hover:bg-[#ff562a]"
                    : "border border-[#ff7a1b]/30 text-[#ffede9] hover:border-[#ff4002]"
                }`}
              >
                {t[plan.ctaKey as keyof typeof t]}
              </a>

              <ul className="mt-8 space-y-4 text-sm text-[#ffd7cd]">
                {plan.featuresKeys.map((featureKey) => (
                  <li key={featureKey} className="flex gap-3">
                    <span className="text-[#ff9815]">✓</span>
                    <span>{t[featureKey as keyof typeof t]}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}