import { defaultAiFoundation } from "@kids-edu/ai";
import { siteConfig } from "@kids-edu/config";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(255,255,255,0.3),_transparent_35%),linear-gradient(160deg,_#081c15,_#1b4332_48%,_#f4f1de_48%,_#fffdf7_100%)] text-slate-950">
      <section className="mx-auto flex min-h-screen max-w-6xl flex-col justify-between gap-16 px-6 py-10 sm:px-10 lg:px-12">
        <header className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-2xl space-y-6">
            <p className="inline-flex w-fit items-center rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-white/80 backdrop-blur">
              AI-native learning studio
            </p>
            <div className="space-y-4">
              <h1 className="max-w-3xl font-display text-5xl leading-tight text-white sm:text-6xl">
                {siteConfig.hero.headline}
              </h1>
              <p className="max-w-2xl text-lg leading-8 text-white/80">
                {siteConfig.hero.copy}
              </p>
            </div>
          </div>

          <aside className="w-full max-w-sm rounded-[2rem] border border-emerald-950/10 bg-white/80 p-6 shadow-[0_30px_90px_rgba(8,28,21,0.16)] backdrop-blur">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-700">
              v1 scaffold
            </p>
            <ul className="mt-4 space-y-3 text-sm text-slate-700">
              <li>Next.js 16 App Router</li>
              <li>Prisma 7 + PostgreSQL 17</li>
              <li>pnpm workspaces</li>
              <li>Provider-agnostic AI contract</li>
            </ul>
          </aside>
        </header>

        <section className="grid gap-6 lg:grid-cols-[1.25fr_0.75fr]">
          <div className="rounded-[2rem] border border-white/10 bg-white/12 p-8 text-white shadow-[0_25px_70px_rgba(0,0,0,0.18)] backdrop-blur">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-100/90">
              Designed for families
            </p>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {siteConfig.learningTracks.map((track) => (
                <article
                  key={track.title}
                  className="rounded-[1.5rem] border border-white/10 bg-black/10 p-5"
                >
                  <h2 className="text-xl font-semibold">{track.title}</h2>
                  <p className="mt-2 text-sm leading-7 text-white/75">
                    {track.description}
                  </p>
                </article>
              ))}
            </div>
          </div>

          <div className="rounded-[2rem] border border-emerald-950/10 bg-[#fff8e8] p-8 shadow-[0_25px_80px_rgba(8,28,21,0.12)]">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-700">
              AI contract
            </p>
            <h2 className="mt-4 font-display text-3xl text-slate-950">
              Replace the provider, not the app.
            </h2>
            <ul className="mt-6 space-y-3 text-sm leading-7 text-slate-700">
              <li>Name: {defaultAiFoundation.name}</li>
              <li>Text generation: {defaultAiFoundation.capabilities.text ? "ready" : "off"}</li>
              <li>Chat orchestration: {defaultAiFoundation.capabilities.chat ? "ready" : "off"}</li>
              <li>Streaming: {defaultAiFoundation.capabilities.streaming ? "ready" : "off"}</li>
            </ul>
          </div>
        </section>

        <section className="grid gap-6 pb-8 md:grid-cols-3">
          {siteConfig.promises.map((promise) => (
            <article
              key={promise.title}
              className="rounded-[1.75rem] border border-emerald-950/10 bg-white p-6 shadow-[0_16px_55px_rgba(8,28,21,0.08)]"
            >
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-700">
                {promise.kicker}
              </p>
              <h2 className="mt-3 text-2xl font-semibold text-slate-950">
                {promise.title}
              </h2>
              <p className="mt-3 text-sm leading-7 text-slate-700">
                {promise.description}
              </p>
            </article>
          ))}
        </section>
      </section>
    </main>
  );
}

