import type { Metadata } from "next";
import Link from "next/link";

import { NakamawakeGameExperience } from "./nakamawake-game-experience";
import { nakamawakeQuestions } from "./nakamawake-game-data";
import styles from "./nakamawake-game.module.css";

export const metadata: Metadata = {
  title: "なかまわけゲーム | Bright Sprout",
  description:
    "A mock-data preschool classification game with one prompt per screen, three large choices, and gentle immediate feedback."
};

export default function NakamawakeGamePage() {
  return (
    <main className={`${styles.pageShell} min-h-screen`} id="main-content">
      <a className={styles.skipLink} href="#game-experience">
        メインコンテンツへ
      </a>

      <section className="mx-auto flex min-h-screen w-full max-w-7xl flex-col gap-10 px-4 py-6 sm:px-8 sm:py-10 lg:px-12">
        <header className={`${styles.surfaceCard} px-6 py-6 sm:px-8`}>
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <Link
                className="inline-flex items-center gap-2 rounded-full bg-white/84 px-4 py-2 text-sm font-semibold text-slate-700 transition-colors duration-200 hover:bg-white focus-visible:outline-none"
                href="/"
              >
                ホームへ もどる
              </Link>
              <p className="mt-6 inline-flex rounded-full bg-[#111827] px-4 py-2 text-xs font-bold uppercase tracking-[0.22em] text-white">
                Frontend planning MVP
              </p>
              <h1 className={`${styles.displayText} mt-5 text-5xl leading-tight text-[#111827] sm:text-6xl`}>
                なかまわけゲーム
              </h1>
              <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-700">
                もんだいは 1つずつ。おおきな えを 3つみて、
                ぴったりの なかまを えらぶ さいしょの にんちゲームです。
              </p>
            </div>

            <div className="grid gap-3 rounded-[1.9rem] border-2 border-white/90 bg-white/82 p-5 text-sm leading-7 text-slate-700 shadow-[0_12px_30px_rgba(15,23,42,0.08)]">
              <p className="font-bold uppercase tracking-[0.18em] text-slate-500">
                Game rules
              </p>
              <p>1もん 1がめん</p>
              <p>したに 3つの おおきな え</p>
              <p>タップしたら すぐ フィードバック</p>
            </div>
          </div>
        </header>

        <div id="game-experience">
          <NakamawakeGameExperience questions={nakamawakeQuestions} />
        </div>
      </section>
    </main>
  );
}
