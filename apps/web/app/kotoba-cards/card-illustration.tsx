import type { ReactNode } from "react";

import type { KotobaIllustrationId } from "./kotoba-cards-data";

interface CardIllustrationProps {
  id: KotobaIllustrationId;
  title: string;
}

function sharedSvg(children: ReactNode) {
  return (
    <svg
      aria-hidden="true"
      className="h-full w-full"
      viewBox="0 0 240 240"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {children}
    </svg>
  );
}

export function CardIllustration({ id, title }: CardIllustrationProps) {
  return (
    <div aria-label={title} className="h-full w-full" role="img">
      {renderIllustration(id)}
    </div>
  );
}

function renderIllustration(id: KotobaIllustrationId) {
  switch (id) {
    case "apple":
      return sharedSvg(
        <>
          <circle cx="120" cy="132" r="64" fill="#ef4444" />
          <circle cx="95" cy="118" r="18" fill="#fca5a5" opacity="0.55" />
          <path
            d="M119 42C119 36.4772 123.477 32 129 32H132C137.523 32 142 36.4772 142 42V72H119V42Z"
            fill="#7c2d12"
          />
          <path
            d="M130 52C150 43 168 48 176 65C157 73 141 70 130 52Z"
            fill="#22c55e"
          />
          <path
            d="M73 109C79.5 82.5 96 69 120 69C144 69 160.5 82.5 167 109"
            stroke="#991b1b"
            strokeLinecap="round"
            strokeWidth="8"
          />
        </>
      );
    case "banana":
      return sharedSvg(
        <>
          <path
            d="M59 121C86 70 134 46 180 55C184 93 160 156 109 182C84 194 63 191 50 174C40 160 42 144 59 121Z"
            fill="#fde047"
          />
          <path
            d="M66 130C89 89 130 65 170 68"
            stroke="#ca8a04"
            strokeLinecap="round"
            strokeWidth="10"
          />
          <path
            d="M171 54C175 47 181 44 188 46C191 54 189 61 183 67"
            fill="#854d0e"
          />
          <path
            d="M53 177C58 187 67 192 81 194"
            stroke="#a16207"
            strokeLinecap="round"
            strokeWidth="8"
          />
        </>
      );
    case "strawberry":
      return sharedSvg(
        <>
          <path
            d="M121 76C164 76 185 103 178 146C170 191 139 208 121 208C103 208 72 191 64 146C57 103 78 76 121 76Z"
            fill="#f43f5e"
          />
          <path
            d="M82 74C93 63 107 58 121 58C135 58 149 63 160 74L142 96H100L82 74Z"
            fill="#22c55e"
          />
          <circle cx="96" cy="118" r="4" fill="#fef3c7" />
          <circle cx="120" cy="108" r="4" fill="#fef3c7" />
          <circle cx="145" cy="120" r="4" fill="#fef3c7" />
          <circle cx="87" cy="146" r="4" fill="#fef3c7" />
          <circle cx="118" cy="144" r="4" fill="#fef3c7" />
          <circle cx="149" cy="146" r="4" fill="#fef3c7" />
          <circle cx="103" cy="171" r="4" fill="#fef3c7" />
          <circle cx="135" cy="171" r="4" fill="#fef3c7" />
        </>
      );
    case "cat":
      return sharedSvg(
        <>
          <path d="M71 92L96 54L111 98L71 92Z" fill="#f59e0b" />
          <path d="M169 92L144 54L129 98L169 92Z" fill="#f59e0b" />
          <circle cx="120" cy="128" r="62" fill="#fbbf24" />
          <circle cx="96" cy="120" r="9" fill="#1f2937" />
          <circle cx="144" cy="120" r="9" fill="#1f2937" />
          <path
            d="M120 132L111 148H129L120 132Z"
            fill="#fb7185"
          />
          <path
            d="M102 160C108 168 114 172 120 172C126 172 132 168 138 160"
            stroke="#7c2d12"
            strokeLinecap="round"
            strokeWidth="8"
          />
          <path
            d="M76 140H47M76 152H43M164 140H193M164 152H197"
            stroke="#7c2d12"
            strokeLinecap="round"
            strokeWidth="6"
          />
        </>
      );
    case "rabbit":
      return sharedSvg(
        <>
          <rect x="72" y="32" width="28" height="80" rx="14" fill="#fbcfe8" />
          <rect x="140" y="32" width="28" height="80" rx="14" fill="#fbcfe8" />
          <rect x="80" y="42" width="12" height="58" rx="6" fill="#fff" />
          <rect x="148" y="42" width="12" height="58" rx="6" fill="#fff" />
          <circle cx="120" cy="138" r="64" fill="#fff" />
          <circle cx="96" cy="130" r="8" fill="#1f2937" />
          <circle cx="144" cy="130" r="8" fill="#1f2937" />
          <circle cx="120" cy="152" r="10" fill="#fb7185" />
          <path
            d="M108 172C113 179 117 182 120 182C123 182 127 179 132 172"
            stroke="#7c2d12"
            strokeLinecap="round"
            strokeWidth="8"
          />
        </>
      );
    case "elephant":
      return sharedSvg(
        <>
          <circle cx="76" cy="128" r="36" fill="#cbd5f5" />
          <circle cx="164" cy="128" r="36" fill="#cbd5f5" />
          <circle cx="120" cy="128" r="58" fill="#a5b4fc" />
          <path
            d="M108 148C108 135 118 124 131 124C144 124 154 135 154 148V173C154 192 139 207 120 207C101 207 86 192 86 173V163H108V173C108 180 113 185 120 185C127 185 132 180 132 173V148H108Z"
            fill="#818cf8"
          />
          <circle cx="101" cy="124" r="8" fill="#1f2937" />
          <circle cx="141" cy="124" r="8" fill="#1f2937" />
          <circle cx="117" cy="164" r="4" fill="#3730a3" />
          <circle cx="130" cy="164" r="4" fill="#3730a3" />
        </>
      );
    case "car":
      return sharedSvg(
        <>
          <rect x="52" y="114" width="136" height="46" rx="18" fill="#60a5fa" />
          <path
            d="M77 112L101 82H149L171 112H77Z"
            fill="#2563eb"
          />
          <rect x="105" y="90" width="38" height="22" rx="8" fill="#dbeafe" />
          <circle cx="88" cy="164" r="18" fill="#1f2937" />
          <circle cx="152" cy="164" r="18" fill="#1f2937" />
          <circle cx="88" cy="164" r="8" fill="#e5e7eb" />
          <circle cx="152" cy="164" r="8" fill="#e5e7eb" />
        </>
      );
    case "bus":
      return sharedSvg(
        <>
          <rect x="48" y="84" width="144" height="84" rx="20" fill="#facc15" />
          <rect x="64" y="100" width="112" height="34" rx="10" fill="#eff6ff" />
          <rect x="144" y="138" width="28" height="20" rx="6" fill="#fef3c7" />
          <rect x="72" y="138" width="56" height="20" rx="6" fill="#fde68a" />
          <circle cx="88" cy="170" r="16" fill="#1f2937" />
          <circle cx="152" cy="170" r="16" fill="#1f2937" />
          <circle cx="88" cy="170" r="7" fill="#f8fafc" />
          <circle cx="152" cy="170" r="7" fill="#f8fafc" />
        </>
      );
    case "train":
      return sharedSvg(
        <>
          <path
            d="M70 60C70 49 79 40 90 40H150C161 40 170 49 170 60V154C170 172 156 186 138 186H102C84 186 70 172 70 154V60Z"
            fill="#38bdf8"
          />
          <rect x="88" y="64" width="64" height="42" rx="14" fill="#e0f2fe" />
          <rect x="94" y="118" width="52" height="20" rx="10" fill="#7dd3fc" />
          <circle cx="101" cy="153" r="8" fill="#1f2937" />
          <circle cx="139" cy="153" r="8" fill="#1f2937" />
          <path d="M92 186L78 206" stroke="#475569" strokeLinecap="round" strokeWidth="8" />
          <path d="M148 186L162 206" stroke="#475569" strokeLinecap="round" strokeWidth="8" />
          <path d="M88 205H152" stroke="#94a3b8" strokeLinecap="round" strokeWidth="10" />
        </>
      );
  }
}
