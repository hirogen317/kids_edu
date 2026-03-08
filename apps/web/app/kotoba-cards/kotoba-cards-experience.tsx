"use client";

import type { CSSProperties } from "react";
import {
  useEffect,
  useEffectEvent,
  useRef,
  useState
} from "react";
import Link from "next/link";

import { CardIllustration } from "./card-illustration";
import type { KotobaCard, KotobaDeck } from "./kotoba-cards-data";
import styles from "./kotoba-cards.module.css";

interface KotobaCardsExperienceProps {
  decks: readonly KotobaDeck[];
}

type AudioMode = "idle" | "speaking" | "unsupported";

export function KotobaCardsExperience({
  decks
}: KotobaCardsExperienceProps) {
  const [activeDeckId, setActiveDeckId] = useState<string | null>(null);
  const [cardIndex, setCardIndex] = useState(0);
  const [isBackVisible, setIsBackVisible] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [audioMode, setAudioMode] = useState<AudioMode>("idle");
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const shortcutScopeRef = useRef<HTMLElement | null>(null);
  const completionButtonRef = useRef<HTMLButtonElement | null>(null);

  const activeDeck = decks.find((deck) => deck.id === activeDeckId) ?? null;
  const currentCard = activeDeck ? activeDeck.cards[cardIndex] ?? null : null;
  const deckStyle = activeDeck ? toDeckStyle(activeDeck) : undefined;
  const progressWidth = activeDeck
    ? `${Math.max(
        ((isComplete ? activeDeck.cards.length : cardIndex + 1) / activeDeck.cards.length) * 100,
        12
      )}%`
    : "0%";

  function stopAudio() {
    audioRef.current?.pause();
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
    }

    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }

    setAudioMode("idle");
  }

  function replayAudio() {
    if (!currentCard) {
      return;
    }

    stopAudio();
    shortcutScopeRef.current?.focus();

    if (currentCard.audioSrc) {
      const audio = new Audio(currentCard.audioSrc);
      audio.currentTime = 0;
      audio.onplay = () => setAudioMode("speaking");
      audio.onended = () => setAudioMode("idle");
      audio.onerror = () => speakFallback(currentCard, setAudioMode);
      audioRef.current = audio;
      void audio.play().catch(() => speakFallback(currentCard, setAudioMode));
      return;
    }

    speakFallback(currentCard, setAudioMode);
  }

  function advanceStudyLoop() {
    if (!activeDeck || !currentCard) {
      return;
    }

    stopAudio();

    if (!isBackVisible) {
      setIsBackVisible(true);
      return;
    }

    const isLastCard = cardIndex === activeDeck.cards.length - 1;
    if (isLastCard) {
      setIsComplete(true);
      return;
    }

    setCardIndex((currentIndex) => currentIndex + 1);
    setIsBackVisible(false);
  }

  function resetSession() {
    stopAudio();
    setActiveDeckId(null);
    setCardIndex(0);
    setIsBackVisible(false);
    setIsComplete(false);
  }

  function restartDeck() {
    stopAudio();
    setCardIndex(0);
    setIsBackVisible(false);
    setIsComplete(false);
  }

  const handleKeyboardShortcut = useEffectEvent((event: KeyboardEvent) => {
    if (event.altKey || event.ctrlKey || event.metaKey) {
      return;
    }

    const target = event.target as HTMLElement | null;
    if (
      target &&
      ["BUTTON", "A", "INPUT", "TEXTAREA", "SELECT"].includes(target.tagName)
    ) {
      return;
    }

    if (event.code === "Space") {
      event.preventDefault();
      replayAudio();
    }

    if (event.code === "Enter") {
      event.preventDefault();
      if (isComplete) {
        restartDeck();
        return;
      }

      advanceStudyLoop();
    }
  });

  useEffect(() => {
    if (!activeDeck) {
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => handleKeyboardShortcut(event);

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [activeDeck]);

  useEffect(() => {
    if (!activeDeck) {
      return;
    }

    if (isComplete) {
      completionButtonRef.current?.focus();
      return;
    }

    shortcutScopeRef.current?.focus();
  }, [activeDeck, cardIndex, isBackVisible, isComplete]);

  useEffect(() => {
    return () => {
      audioRef.current?.pause();
      if (audioRef.current) {
        audioRef.current.currentTime = 0;
      }

      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  if (!activeDeck) {
    return (
      <section aria-labelledby="deck-selection-heading" className="space-y-8">
        <div className={`${styles.panelCard} px-6 py-6 sm:px-8`}>
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <p className="mb-3 inline-flex rounded-full bg-[#1e1b4b] px-4 py-2 text-xs font-bold uppercase tracking-[0.24em] text-white">
                First product loop
              </p>
              <h2
                className={`${styles.displayText} text-4xl leading-tight text-[#1e1b4b] sm:text-5xl`}
                id="deck-selection-heading"
              >
                えを みて、こえを きいて、
                <br />
                ことばを めくる。
              </h2>
              <p className="mt-4 max-w-xl text-base leading-8 text-slate-700 sm:text-lg">
                ことばカードは、3さいくらいの こどもと おやが いっしょに
                たのしめる モックデータの れんしゅうページです。
                おおきなカードを タップして、ことばを みつけてください。
              </p>
            </div>

            <div className="grid gap-3 rounded-[1.75rem] border-2 border-[#c7d2fe] bg-white/80 p-5 text-sm text-slate-700 shadow-[0_12px_30px_rgba(79,70,229,0.12)]">
              <div className="flex items-center gap-3">
                <span className="h-3 w-3 rounded-full bg-[#4f46e5]" />
                <span>タップ: カードを めくる</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="h-3 w-3 rounded-full bg-[#f97316]" />
                <span>Space: おとを もういちど</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="h-3 w-3 rounded-full bg-[#10b981]" />
                <span>Enter: めくる / つぎへ</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {decks.map((deck) => {
            const previewCard = deck.cards[0];
            if (!previewCard) {
              return null;
            }

            return (
              <button
                key={deck.id}
                className={`${styles.deckCard} ${styles.floaty} cursor-pointer p-6 text-left focus-visible:outline-none`}
                onClick={() => {
                  setActiveDeckId(deck.id);
                  setCardIndex(0);
                  setIsBackVisible(false);
                  setIsComplete(false);
                  setAudioMode("idle");
                }}
                style={toDeckStyle(deck)}
                type="button"
              >
                <div className="relative z-10 flex h-full flex-col gap-6">
                  <div className={`${styles.previewPlate} h-48 p-4`}>
                    <CardIllustration
                      id={previewCard.illustration}
                      title={previewCard.imageAlt}
                    />
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between gap-4">
                      <p className="rounded-full bg-white/70 px-4 py-2 text-xs font-bold uppercase tracking-[0.22em] text-slate-700">
                        {deck.cards.length} cards
                      </p>
                      <p className="text-sm font-semibold text-slate-700">
                        {deck.helperLabel}
                      </p>
                    </div>

                    <h3 className={`${styles.displayText} text-3xl text-[color:var(--deck-ink)]`}>
                      {deck.title}
                    </h3>
                    <p className="text-base font-semibold text-slate-800">
                      {deck.subtitle}
                    </p>
                    <p className="text-sm leading-7 text-slate-700">
                      {deck.description}
                    </p>
                  </div>

                  <span className="mt-auto inline-flex items-center gap-3 text-sm font-bold text-[color:var(--deck-ink)]">
                    <PlayIcon />
                    このデッキで はじめる
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </section>
    );
  }

  return (
    <section
      aria-labelledby="study-session-heading"
      className="space-y-6"
      ref={shortcutScopeRef}
      style={deckStyle}
      tabIndex={-1}
    >
      <header className={`${styles.panelCard} px-6 py-6 sm:px-8`}>
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div className="space-y-4">
            <Link
              className="inline-flex items-center gap-2 rounded-full border-2 border-white/80 bg-white/70 px-4 py-2 text-sm font-semibold text-slate-700 transition-colors duration-200 hover:bg-white focus-visible:outline-none"
              href="/"
            >
              <ArrowLeftIcon />
              ホームへ
            </Link>
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.24em] text-[color:var(--deck-ink)]">
                Active deck
              </p>
              <h2
                className={`${styles.displayText} text-4xl text-[color:var(--deck-ink)] sm:text-5xl`}
                id="study-session-heading"
              >
                {activeDeck.title}
              </h2>
              <p className="mt-2 max-w-2xl text-base leading-7 text-slate-700">
                {activeDeck.subtitle}。こどもは タップ、
                おやは キーボードでも すすべます。
              </p>
            </div>
          </div>

          <div className="grid gap-4 rounded-[1.75rem] border-2 border-white/85 bg-white/72 p-5 text-sm text-slate-700 shadow-[0_10px_28px_rgba(15,23,42,0.08)]">
            <div className="flex items-center gap-3">
              <span
                className={`${styles.statusDot} ${audioMode === "speaking" ? styles.statusDotActive : ""}`}
              />
              <span>
                {audioMode === "unsupported"
                  ? "このブラウザでは よみあげを つかえません"
                  : "モックでは ブラウザの よみあげを つかいます"}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <VolumeIcon />
              <span>Space で おとを もういちど</span>
            </div>
            <div className="flex items-center gap-3">
              <FlipIcon />
              <span>Enter で めくる / つぎへ</span>
            </div>
          </div>
        </div>

        <div className="mt-6 space-y-3">
          <div className="flex items-center justify-between gap-4 text-sm font-semibold text-slate-700">
            <span>
              {isComplete
                ? "ぜんぶ おわったよ"
                : `${cardIndex + 1} / ${activeDeck.cards.length}`}
            </span>
            <span>{activeDeck.helperLabel}</span>
          </div>
          <div className={styles.progressRail}>
            <div
              className={styles.progressFill}
              style={{ width: progressWidth }}
            />
          </div>
        </div>
      </header>

      {isComplete ? (
        <article className={`${styles.cardShell} relative px-6 py-10 sm:px-10 sm:py-12`}>
          <div className={styles.completionBurst} />
          <div className="relative z-10 grid gap-8 lg:grid-cols-[1fr_0.85fr] lg:items-center">
            <div>
              <p className="inline-flex rounded-full bg-white/80 px-4 py-2 text-xs font-bold uppercase tracking-[0.24em] text-[color:var(--deck-ink)]">
                Session complete
              </p>
              <h3 className={`${styles.displayText} mt-4 text-4xl text-[color:var(--deck-ink)] sm:text-5xl`}>
                よく できました。
              </h3>
              <p className="mt-4 max-w-xl text-lg leading-8 text-slate-700">
                {activeDeck.cards.length}まい ぜんぶ めくれました。つぎは
                もういちど あそぶか、ほかの デッキを えらべます。
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                {activeDeck.cards.map((card) => (
                  <span
                    key={card.id}
                    className="rounded-full bg-white/80 px-4 py-2 text-sm font-semibold text-slate-700 shadow-[0_8px_18px_rgba(15,23,42,0.08)]"
                  >
                    {card.word}
                  </span>
                ))}
              </div>
            </div>

            <div className="grid gap-4 rounded-[2rem] border-2 border-white/85 bg-white/78 p-6 shadow-[0_16px_34px_rgba(15,23,42,0.08)]">
              <button
                className="inline-flex cursor-pointer items-center justify-center gap-3 rounded-[1.4rem] bg-[color:var(--deck-accent)] px-6 py-4 text-lg font-bold text-white shadow-[0_12px_0_var(--deck-shadow)] transition-transform duration-200 hover:-translate-y-0.5 focus-visible:outline-none"
                onClick={restartDeck}
                ref={completionButtonRef}
                type="button"
              >
                <RefreshIcon />
                もういちど あそぶ
              </button>
              <button
                className="inline-flex cursor-pointer items-center justify-center gap-3 rounded-[1.4rem] border-2 border-[color:var(--deck-ink)] bg-white px-6 py-4 text-lg font-bold text-[color:var(--deck-ink)] transition-colors duration-200 hover:bg-[color:var(--deck-soft)] focus-visible:outline-none"
                onClick={resetSession}
                type="button"
              >
                <ArrowLeftIcon />
                ほかの デッキへ
              </button>
              <p className="text-sm leading-7 text-slate-600">
                Enter を おすと、このデッキの さいしょから もういちど
                はじめます。
              </p>
            </div>
          </div>
        </article>
      ) : currentCard ? (
        <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_22rem]">
          <article className={`${styles.cardShell} px-4 py-4 sm:px-6 sm:py-6`}>
            <button
              aria-label={isBackVisible ? "つぎのカードへ" : "カードをめくる"}
              className="block w-full cursor-pointer rounded-[2rem] bg-transparent text-left focus-visible:outline-none"
              onClick={advanceStudyLoop}
              type="button"
            >
              <div className={styles.scene}>
                <div className={`${styles.flipper} ${isBackVisible ? styles.flipped : ""}`}>
                  <section className={`${styles.face} ${styles.front}`}>
                    <div className={`${styles.cardIllustration} h-full min-h-[24rem] p-6 sm:p-8`}>
                      <div className="grid h-full grid-rows-[auto_1fr_auto] gap-5">
                        <div className="flex items-center justify-between gap-4">
                          <p className="rounded-full bg-white/75 px-4 py-2 text-xs font-bold uppercase tracking-[0.24em] text-slate-700">
                            front
                          </p>
                          <span className="rounded-full bg-white/80 px-4 py-2 text-sm font-semibold text-slate-700">
                            なにかな？
                          </span>
                        </div>

                        <div className="mx-auto flex w-full max-w-[22rem] items-center justify-center">
                          <CardIllustration
                            id={currentCard.illustration}
                            title={currentCard.imageAlt}
                          />
                        </div>

                        <div className="grid gap-3 text-center">
                          <p className={`${styles.displayText} text-2xl text-[color:var(--deck-ink)] sm:text-3xl`}>
                            えを みて、こえを きいてみよう
                          </p>
                          <p className="mx-auto max-w-lg text-sm leading-7 text-slate-600 sm:text-base">
                            ことばは まだ かくれています。タップか Enter で
                            うらがえして、こたえを みよう。
                          </p>
                        </div>
                      </div>
                    </div>
                  </section>

                  <section className={`${styles.face} ${styles.back}`}>
                    <div className="grid h-full min-h-[24rem] gap-6 rounded-[2rem] bg-white/65 p-6 sm:p-8">
                      <div className="flex items-center justify-between gap-4">
                        <p className="rounded-full bg-white/85 px-4 py-2 text-xs font-bold uppercase tracking-[0.24em] text-[color:var(--deck-ink)]">
                          answer
                        </p>
                        <span className="rounded-full bg-[color:var(--deck-soft)] px-4 py-2 text-sm font-semibold text-[color:var(--deck-ink)]">
                          こたえ
                        </span>
                      </div>

                      <div className="flex items-center justify-center">
                        <div className="rounded-[2rem] border-2 border-white/90 bg-white/88 px-8 py-10 text-center shadow-[0_18px_42px_rgba(15,23,42,0.08)]">
                          <p className={`${styles.displayText} text-5xl text-[color:var(--deck-ink)] sm:text-7xl`}>
                            {currentCard.word}
                          </p>
                          {currentCard.phrase ? (
                            <p className="mt-4 text-2xl font-bold text-slate-700">
                              {currentCard.phrase}
                            </p>
                          ) : null}
                        </div>
                      </div>

                      <div className="grid gap-3 rounded-[1.75rem] border-2 border-white/90 bg-white/80 p-5 shadow-[0_12px_26px_rgba(15,23,42,0.06)]">
                        {currentCard.prompt ? (
                          <p className="text-lg font-semibold text-slate-700">
                            おやの ひとこと: {currentCard.prompt}
                          </p>
                        ) : null}
                        <p className="text-sm leading-7 text-slate-600">
                          Enter または カードの タップで
                          つぎへ すすみます。
                        </p>
                      </div>
                    </div>
                  </section>
                </div>
              </div>
            </button>
          </article>

          <aside className={`${styles.panelCard} px-5 py-5 sm:px-6`}>
            <div className="grid gap-4">
              <button
                className="inline-flex cursor-pointer items-center justify-center gap-3 rounded-[1.35rem] bg-[color:var(--deck-accent)] px-5 py-4 text-lg font-bold text-white shadow-[0_12px_0_var(--deck-shadow)] transition-transform duration-200 hover:-translate-y-0.5 focus-visible:outline-none"
                onClick={replayAudio}
                type="button"
              >
                <VolumeIcon />
                おとを きく
              </button>

              <button
                className="inline-flex cursor-pointer items-center justify-center gap-3 rounded-[1.35rem] border-2 border-[color:var(--deck-ink)] bg-white px-5 py-4 text-lg font-bold text-[color:var(--deck-ink)] transition-colors duration-200 hover:bg-[color:var(--deck-soft)] focus-visible:outline-none"
                onClick={advanceStudyLoop}
                type="button"
              >
                {isBackVisible ? <ArrowRightIcon /> : <FlipIcon />}
                {isBackVisible ? "つぎのカードへ" : "カードを めくる"}
              </button>

              <button
                className="inline-flex cursor-pointer items-center justify-center gap-3 rounded-[1.35rem] border-2 border-slate-200 bg-white/84 px-5 py-4 text-base font-bold text-slate-700 transition-colors duration-200 hover:bg-white focus-visible:outline-none"
                onClick={resetSession}
                type="button"
              >
                <ArrowLeftIcon />
                デッキえらびへ
              </button>
            </div>

            <div className="mt-6 grid gap-4 rounded-[1.75rem] border-2 border-white/90 bg-white/80 p-5">
              <h3 className={`${styles.displayText} text-2xl text-[color:var(--deck-ink)]`}>
                いまの カード
              </h3>
              <dl className="grid gap-3 text-sm text-slate-700">
                <div className="grid gap-1">
                  <dt className="font-bold uppercase tracking-[0.16em] text-slate-500">
                    きくことば
                  </dt>
                  <dd className="text-lg font-semibold text-slate-800">
                    {currentCard.spokenText}
                  </dd>
                </div>
                <div className="grid gap-1">
                  <dt className="font-bold uppercase tracking-[0.16em] text-slate-500">
                    カードの じょうたい
                  </dt>
                  <dd className="text-lg font-semibold text-slate-800">
                    {isBackVisible ? "うらがえし ちゅう" : "まえむき"}
                  </dd>
                </div>
              </dl>
            </div>
          </aside>
        </div>
      ) : null}
    </section>
  );
}

function toDeckStyle(deck: KotobaDeck): CSSProperties {
  return {
    ["--deck-accent" as string]: deck.palette.accent,
    ["--deck-soft" as string]: deck.palette.accentSoft,
    ["--deck-highlight" as string]: deck.palette.highlight,
    ["--deck-ink" as string]: deck.palette.ink,
    ["--deck-shadow" as string]: deck.palette.shadow
  };
}

function speakFallback(
  card: KotobaCard,
  setAudioMode: (value: AudioMode) => void
) {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) {
    setAudioMode("unsupported");
    return;
  }

  const utterance = new SpeechSynthesisUtterance(card.spokenText);
  utterance.lang = "ja-JP";
  utterance.rate = 0.85;
  utterance.pitch = 1.05;
  utterance.onstart = () => setAudioMode("speaking");
  utterance.onend = () => setAudioMode("idle");
  utterance.onerror = () => setAudioMode("unsupported");
  window.speechSynthesis.speak(utterance);
}

function ArrowLeftIcon() {
  return (
    <svg
      aria-hidden="true"
      className="h-5 w-5"
      fill="none"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M15 5L8 12L15 19"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2.5"
      />
    </svg>
  );
}

function ArrowRightIcon() {
  return (
    <svg
      aria-hidden="true"
      className="h-5 w-5"
      fill="none"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M9 5L16 12L9 19"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2.5"
      />
    </svg>
  );
}

function FlipIcon() {
  return (
    <svg
      aria-hidden="true"
      className="h-5 w-5"
      fill="none"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M8 7H6C4.89543 7 4 7.89543 4 9V17C4 18.1046 4.89543 19 6 19H14C15.1046 19 16 18.1046 16 17V15"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2.2"
      />
      <path
        d="M10 5H18C19.1046 5 20 5.89543 20 7V15C20 16.1046 19.1046 17 18 17H10C8.89543 17 8 16.1046 8 15V7C8 5.89543 8.89543 5 10 5Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2.2"
      />
    </svg>
  );
}

function PlayIcon() {
  return (
    <svg
      aria-hidden="true"
      className="h-5 w-5"
      fill="none"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M8 6.5C8 5.55914 9.07638 5.01878 9.83395 5.57474L17.3339 11.0747C17.9531 11.529 17.9531 12.471 17.3339 12.9253L9.83395 18.4253C9.07638 18.9812 8 18.4409 8 17.5V6.5Z"
        fill="currentColor"
      />
    </svg>
  );
}

function RefreshIcon() {
  return (
    <svg
      aria-hidden="true"
      className="h-5 w-5"
      fill="none"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M19 8V4M19 4H15M19 4L14 9"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2.2"
      />
      <path
        d="M20 12C20 16.4183 16.4183 20 12 20C7.58172 20 4 16.4183 4 12C4 7.58172 7.58172 4 12 4C13.84 4 15.5349 4.62177 16.8856 5.66667"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2.2"
      />
    </svg>
  );
}

function VolumeIcon() {
  return (
    <svg
      aria-hidden="true"
      className="h-5 w-5"
      fill="none"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M5 14H8L13 19V5L8 10H5V14Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2.2"
      />
      <path
        d="M16.5 9C17.8807 10.0153 18.75 11.6421 18.75 13.5C18.75 15.3579 17.8807 16.9847 16.5 18"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2.2"
      />
    </svg>
  );
}
