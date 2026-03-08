"use client";

import type { CSSProperties } from "react";
import { startTransition, useEffect, useRef, useState } from "react";
import Link from "next/link";

import { NakamawakeIllustration } from "./nakamawake-illustration";
import type {
  NakamawakeChoice,
  NakamawakePalette,
  NakamawakeQuestion
} from "./nakamawake-game-data";
import styles from "./nakamawake-game.module.css";

interface NakamawakeGameExperienceProps {
  questions: readonly NakamawakeQuestion[];
}

type FeedbackState = "idle" | "correct" | "retry";

export function NakamawakeGameExperience({
  questions
}: NakamawakeGameExperienceProps) {
  const [questionIndex, setQuestionIndex] = useState(0);
  const [selectedChoiceId, setSelectedChoiceId] = useState<string | null>(null);
  const [feedbackState, setFeedbackState] = useState<FeedbackState>("idle");
  const [feedbackText, setFeedbackText] = useState("");
  const [isComplete, setIsComplete] = useState(false);
  const [audioStatus, setAudioStatus] = useState<"idle" | "speaking" | "silent">(
    "idle"
  );
  const audioContextRef = useRef<AudioContext | null>(null);

  const question = questions[questionIndex] ?? null;
  const progressWidth = question
    ? `${Math.max(
        ((isComplete ? questions.length : questionIndex + 1) / questions.length) * 100,
        10
      )}%`
    : "0%";

  useEffect(() => {
    if (feedbackState !== "correct") {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      startTransition(() => {
        if (questionIndex === questions.length - 1) {
          setIsComplete(true);
          return;
        }

        setQuestionIndex((currentIndex) => currentIndex + 1);
      });

      setSelectedChoiceId(null);
      setFeedbackState("idle");
      setFeedbackText("");
    }, 1150);

    return () => window.clearTimeout(timeoutId);
  }, [feedbackState, questionIndex, questions.length]);

  useEffect(() => {
    return () => {
      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }

      const currentContext = audioContextRef.current;
      if (currentContext && currentContext.state !== "closed") {
        void currentContext.close();
      }
    };
  }, []);

  if (!question) {
    return null;
  }

  const activeQuestion = question;
  const liveMessage = feedbackText || activeQuestion.helperText;
  const paletteStyle = toPaletteStyle(activeQuestion.palette);

  function restartGame() {
    setQuestionIndex(0);
    setSelectedChoiceId(null);
    setFeedbackState("idle");
    setFeedbackText("");
    setIsComplete(false);
    stopSpeech();
  }

  function handleChoiceSelect(choice: NakamawakeChoice) {
    if (feedbackState === "correct") {
      return;
    }

    const isCorrect = choice.id === activeQuestion.correctChoiceId;
    setSelectedChoiceId(choice.id);

    if (isCorrect) {
      setFeedbackState("correct");
      setFeedbackText(activeQuestion.successMessage);
      playCorrectFeedback(activeQuestion.successVoice);
      return;
    }

    setFeedbackState("retry");
    setFeedbackText(activeQuestion.retryMessage);
    playRetryFeedback(activeQuestion.retryVoice);
  }

  if (isComplete) {
    return (
      <section className="space-y-6" style={paletteStyle}>
        <article className={`${styles.questionBoard} relative px-6 py-10 sm:px-10 sm:py-12`}>
          <div className={styles.completionGlow} />
          <div className="relative z-10 grid gap-8 lg:grid-cols-[1fr_0.82fr] lg:items-center">
            <div>
              <p className="inline-flex rounded-full bg-white/88 px-4 py-2 text-xs font-bold uppercase tracking-[0.22em] text-[color:var(--game-ink)]">
                Session complete
              </p>
              <h2 className={`${styles.displayText} mt-4 text-4xl text-[color:var(--game-ink)] sm:text-5xl`}>
                なかまわけ できたね。
              </h2>
              <p className="mt-4 max-w-xl text-lg leading-8 text-slate-700">
                {questions.length}もん ぜんぶ おわりました。どうぶつ、いろ、
                おおきさ、かたちを えらぶ れんしゅうが できました。
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                {["どうぶつ", "たべもの", "のりもの", "いろ", "おおきさ", "かたち"].map(
                  (tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-white/84 px-4 py-2 text-sm font-semibold text-slate-700 shadow-[0_8px_18px_rgba(15,23,42,0.08)]"
                    >
                      {tag}
                    </span>
                  )
                )}
              </div>
            </div>

            <div className={`${styles.surfaceCard} px-6 py-6`}>
              <div className="grid gap-4">
                <button
                  className="inline-flex cursor-pointer items-center justify-center gap-3 rounded-[1.45rem] bg-[color:var(--game-accent)] px-6 py-4 text-lg font-bold text-white shadow-[0_12px_0_var(--game-glow)] transition-transform duration-200 hover:-translate-y-0.5 focus-visible:outline-none"
                  onClick={restartGame}
                  type="button"
                >
                  <ReplayIcon />
                  もういちど あそぶ
                </button>
                <Link
                  className="inline-flex cursor-pointer items-center justify-center gap-3 rounded-[1.45rem] border-2 border-[color:var(--game-ink)] bg-white px-6 py-4 text-lg font-bold text-[color:var(--game-ink)] transition-colors duration-200 hover:bg-[color:var(--game-soft)] focus-visible:outline-none"
                  href="/"
                >
                  <ArrowLeftIcon />
                  ホームへ
                </Link>
              </div>
            </div>
          </div>
        </article>
      </section>
    );
  }

  return (
    <section className="space-y-6" style={paletteStyle}>
      <header className={`${styles.surfaceCard} px-6 py-6 sm:px-8`}>
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="space-y-4">
            <Link
              className="inline-flex items-center gap-2 rounded-full bg-white/84 px-4 py-2 text-sm font-semibold text-slate-700 transition-colors duration-200 hover:bg-white focus-visible:outline-none"
              href="/"
            >
              <ArrowLeftIcon />
              ホームへ
            </Link>
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.22em] text-[color:var(--game-ink)]">
                One question game
              </p>
              <h2 className={`${styles.displayText} text-4xl text-[color:var(--game-ink)] sm:text-5xl`}>
                なかまわけゲーム
              </h2>
              <p className="mt-2 max-w-2xl text-base leading-7 text-slate-700">
                もんだいは 1つずつ。3つの えから ぴったりの こたえを
                えらぼう。
              </p>
            </div>
          </div>

          <div className="grid gap-3 rounded-[1.7rem] border-2 border-white/90 bg-white/80 p-5 text-sm text-slate-700 shadow-[0_12px_24px_rgba(15,23,42,0.08)]">
            <div className="flex items-center gap-3">
              <span
                className={`${styles.spark} ${audioStatus === "speaking" ? styles.sparkActive : ""}`}
              />
              <span>
                {audioStatus === "silent"
                  ? "おとは なくても あそべます"
                  : "こたえると こえと おとで フィードバック"}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <TapIcon />
              <span>タップで すぐに こたえよう</span>
            </div>
          </div>
        </div>
      </header>

      <article className={`${styles.questionBoard} relative px-4 py-5 sm:px-6 sm:py-6`}>
        <div className="relative z-10 space-y-6">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="space-y-3">
              <span className={styles.answerTag}>{activeQuestion.themeLabel}</span>
              <h3 className={`${styles.displayText} text-4xl leading-tight text-[color:var(--game-ink)] sm:text-5xl`}>
                {activeQuestion.prompt}
              </h3>
            </div>

            <div className="flex min-w-[10rem] items-center gap-3 rounded-full bg-white/82 px-4 py-3 text-sm font-semibold text-slate-700 shadow-[0_8px_20px_rgba(15,23,42,0.08)]">
              <SparkleIcon />
              <span>
                {questionIndex + 1} / {questions.length}
              </span>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between gap-4 text-sm font-semibold text-slate-700">
              <span>{activeQuestion.helperText}</span>
              <span>{activeQuestion.themeLabel}</span>
            </div>
            <div className={styles.progressTrack}>
              <div className={styles.progressFill} style={{ width: progressWidth }} />
            </div>
            <div className="flex flex-wrap gap-2">
              {questions.map((currentQuestion, index) => {
                const pipClassName = `${styles.progressPip} ${
                  index < questionIndex
                    ? styles.progressPipDone
                    : index === questionIndex
                      ? styles.progressPipCurrent
                      : ""
                }`;

                return (
                  <span
                    aria-hidden="true"
                    className={pipClassName}
                    key={currentQuestion.id}
                  />
                );
              })}
            </div>
          </div>

          <div
            aria-live="polite"
            className={`${styles.feedbackBubble} ${
              feedbackState === "correct"
                ? styles.feedbackGood
                : feedbackState === "retry"
                  ? styles.feedbackRetry
                  : ""
            }`}
          >
            {liveMessage}
          </div>

          <div className={`${styles.choiceGrid} pt-12`}>
            {activeQuestion.choices.map((choice) => {
              const visualState = getChoiceState({
                choiceId: choice.id,
                correctChoiceId: activeQuestion.correctChoiceId,
                feedbackState,
                selectedChoiceId
              });

              const className = `${styles.choiceCard} ${
                visualState === "correct"
                  ? styles.choiceCardCorrect
                  : visualState === "retry"
                    ? styles.choiceCardRetry
                    : visualState === "hint"
                      ? styles.choiceCardHint
                      : visualState === "muted"
                        ? styles.choiceCardMuted
                        : ""
              } cursor-pointer p-3 text-left focus-visible:outline-none sm:p-4`;

              return (
                <button
                  className={className}
                  disabled={feedbackState === "correct"}
                  key={choice.id}
                  onClick={() => handleChoiceSelect(choice)}
                  type="button"
                >
                  <div className={`${styles.choiceCanvas} rounded-[1.6rem] bg-white/78`}>
                    <NakamawakeIllustration id={choice.illustration} title={choice.imageAlt} />
                  </div>
                  <div className="space-y-2 px-1 pb-2 pt-4 text-center sm:px-2">
                    <p className={`${styles.displayText} text-2xl text-slate-900 sm:text-3xl`}>
                      {choice.label}
                    </p>
                    <p className="text-xs font-bold uppercase tracking-[0.16em] text-slate-500">
                      tap to choose
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </article>
    </section>
  );

  function playCorrectFeedback(voiceText: string) {
    playToneSequence([
      { frequency: 587, duration: 0.08 },
      { frequency: 784, duration: 0.12 }
    ]);
    speakText(voiceText);

    if ("vibrate" in navigator) {
      navigator.vibrate(16);
    }
  }

  function playRetryFeedback(voiceText: string) {
    playToneSequence([{ frequency: 392, duration: 0.08 }]);
    speakText(voiceText);
  }

  function playToneSequence(
    notes: readonly {
      frequency: number;
      duration: number;
    }[]
  ) {
    if (typeof window === "undefined" || typeof window.AudioContext === "undefined") {
      setAudioStatus("silent");
      return;
    }

    const context =
      audioContextRef.current ?? new window.AudioContext();
    audioContextRef.current = context;

    if (context.state === "suspended") {
      void context.resume();
    }

    const startTime = context.currentTime;
    notes.forEach((note, index) => {
      const oscillator = context.createOscillator();
      const gainNode = context.createGain();

      oscillator.type = "sine";
      oscillator.frequency.value = note.frequency;
      gainNode.gain.setValueAtTime(0.0001, startTime);
      gainNode.gain.linearRampToValueAtTime(0.12, startTime + index * 0.12 + 0.01);
      gainNode.gain.exponentialRampToValueAtTime(
        0.0001,
        startTime + index * 0.12 + note.duration
      );

      oscillator.connect(gainNode);
      gainNode.connect(context.destination);
      oscillator.start(startTime + index * 0.12);
      oscillator.stop(startTime + index * 0.12 + note.duration);
    });
  }

  function speakText(text: string) {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) {
      setAudioStatus("silent");
      return;
    }

    stopSpeech();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "ja-JP";
    utterance.rate = 0.95;
    utterance.pitch = 1.08;
    utterance.onstart = () => setAudioStatus("speaking");
    utterance.onend = () => setAudioStatus("idle");
    utterance.onerror = () => setAudioStatus("silent");
    window.speechSynthesis.speak(utterance);
  }

  function stopSpeech() {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }

    setAudioStatus("idle");
  }
}

function getChoiceState({
  choiceId,
  correctChoiceId,
  feedbackState,
  selectedChoiceId
}: {
  choiceId: string;
  correctChoiceId: string;
  feedbackState: FeedbackState;
  selectedChoiceId: string | null;
}) {
  if (feedbackState === "correct") {
    return choiceId === correctChoiceId ? "correct" : "muted";
  }

  if (feedbackState === "retry") {
    if (choiceId === selectedChoiceId) {
      return "retry";
    }

    if (choiceId === correctChoiceId) {
      return "hint";
    }
  }

  return "idle";
}

function toPaletteStyle(palette: NakamawakePalette): CSSProperties {
  return {
    ["--game-accent" as string]: palette.accent,
    ["--game-soft" as string]: palette.soft,
    ["--game-ink" as string]: palette.ink,
    ["--game-glow" as string]: palette.glow
  };
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
        strokeWidth="2.4"
      />
    </svg>
  );
}

function ReplayIcon() {
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

function SparkleIcon() {
  return (
    <svg
      aria-hidden="true"
      className="h-5 w-5"
      fill="none"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 3L13.7 8.3L19 10L13.7 11.7L12 17L10.3 11.7L5 10L10.3 8.3L12 3Z"
        fill="currentColor"
      />
    </svg>
  );
}

function TapIcon() {
  return (
    <svg
      aria-hidden="true"
      className="h-5 w-5"
      fill="none"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 11V6.5C12 5.67157 12.6716 5 13.5 5C14.3284 5 15 5.67157 15 6.5V13"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2.2"
      />
      <path
        d="M9 13V9.5C9 8.67157 9.67157 8 10.5 8C11.3284 8 12 8.67157 12 9.5V13"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2.2"
      />
      <path
        d="M15 13V10.5C15 9.67157 15.6716 9 16.5 9C17.3284 9 18 9.67157 18 10.5V14.5C18 18.0899 15.0899 21 11.5 21C8.46243 21 5.91089 18.9094 5.20873 16.0841L4 11.2222C3.77637 10.3224 4.32243 9.40978 5.22222 9.18614C6.12201 8.96251 7.03466 9.50857 7.2583 10.4084L8 13.3889"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2.2"
      />
    </svg>
  );
}
