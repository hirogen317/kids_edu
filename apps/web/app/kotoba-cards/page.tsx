import type { Metadata } from "next";
import Link from "next/link";

import { KotobaCardsExperience } from "./kotoba-cards-experience";
import { kotobaDecks } from "./kotoba-cards-data";
import styles from "./kotoba-cards.module.css";

export const metadata: Metadata = {
  title: "ことばカード | Bright Sprout",
  description:
    "Picture-first Japanese vocabulary cards with mock decks, audio replay, and parent-child study flow."
};

export default function KotobaCardsPage() {
  return (
    <main
      className={`${styles.pageShell} min-h-screen`}
      id="main-content"
    >
      <a className={styles.skipLink} href="#deck-experience">
        メインコンテンツへ
      </a>

      <section className="mx-auto flex min-h-screen w-full max-w-7xl flex-col gap-10 px-4 py-6 sm:px-8 sm:py-10 lg:px-12">
        <header className={`${styles.panelCard} px-6 py-6 sm:px-8`}>
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <Link
                className="inline-flex items-center gap-2 rounded-full bg-white/80 px-4 py-2 text-sm font-semibold text-slate-700 transition-colors duration-200 hover:bg-white focus-visible:outline-none"
                href="/"
              >
                ホームへ もどる
              </Link>
              <p className="mt-6 inline-flex rounded-full bg-[#1e1b4b] px-4 py-2 text-xs font-bold uppercase tracking-[0.24em] text-white">
                Mock data MVP
              </p>
              <h1 className={`${styles.displayText} mt-5 text-5xl leading-tight text-[#1e1b4b] sm:text-6xl`}>
                ことばカード
              </h1>
              <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-700">
                えを みて、こえを きいて、カードを めくる。
                まずは フロントエンドだけで ためせる ことばカードの
                サンプルを つくりました。
              </p>
            </div>

            <div className="grid gap-3 rounded-[1.9rem] border-2 border-white/90 bg-white/80 p-5 text-sm leading-7 text-slate-700 shadow-[0_12px_30px_rgba(15,23,42,0.08)]">
              <p className="font-bold uppercase tracking-[0.18em] text-slate-500">
                MVP rules
              </p>
              <p>DB や AI が なくても うごく</p>
              <p>タップが しゅやく、Space / Enter も OK</p>
              <p>あとから 管理画面に つなげやすい データの かたち</p>
            </div>
          </div>
        </header>

        <div id="deck-experience">
          <KotobaCardsExperience decks={kotobaDecks} />
        </div>
      </section>
    </main>
  );
}
