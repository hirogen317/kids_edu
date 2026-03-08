import type { KotobaIllustrationId } from "../kotoba-cards/kotoba-cards-data";
import { CardIllustration } from "../kotoba-cards/card-illustration";

import type { NakamawakeIllustrationId } from "./nakamawake-game-data";

interface NakamawakeIllustrationProps {
  id: NakamawakeIllustrationId;
  title: string;
}

export function NakamawakeIllustration({
  id,
  title
}: NakamawakeIllustrationProps) {
  if (id === "dog") {
    return (
      <div aria-label={title} className="h-full w-full" role="img">
        <svg
          aria-hidden="true"
          className="h-full w-full"
          fill="none"
          viewBox="0 0 240 240"
          xmlns="http://www.w3.org/2000/svg"
        >
          <ellipse cx="120" cy="145" fill="#facc15" rx="62" ry="56" />
          <path d="M72 105L52 66L92 88L72 105Z" fill="#92400e" />
          <path d="M168 105L188 66L148 88L168 105Z" fill="#92400e" />
          <ellipse cx="96" cy="134" fill="#1f2937" rx="8" ry="10" />
          <ellipse cx="145" cy="134" fill="#1f2937" rx="8" ry="10" />
          <ellipse cx="120" cy="155" fill="#7c2d12" rx="16" ry="12" />
          <path
            d="M102 176C108 184 114 188 120 188C126 188 132 184 138 176"
            stroke="#7c2d12"
            strokeLinecap="round"
            strokeWidth="8"
          />
          <ellipse cx="120" cy="161" fill="#fde68a" rx="8" ry="6" />
          <path
            d="M80 151H54M80 165H50M160 151H186M160 165H190"
            stroke="#7c2d12"
            strokeLinecap="round"
            strokeWidth="6"
          />
        </svg>
      </div>
    );
  }

  if (id === "ball") {
    return (
      <div aria-label={title} className="h-full w-full" role="img">
        <svg
          aria-hidden="true"
          className="h-full w-full"
          fill="none"
          viewBox="0 0 240 240"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="120" cy="120" fill="#38bdf8" r="76" />
          <path
            d="M67 67C101 54 139 55 173 69"
            stroke="#f8fafc"
            strokeLinecap="round"
            strokeWidth="10"
          />
          <path
            d="M55 124C79 140 106 148 120 148C144 148 171 137 186 121"
            stroke="#f8fafc"
            strokeLinecap="round"
            strokeWidth="10"
          />
          <path
            d="M120 44C140 76 144 113 138 195"
            stroke="#f8fafc"
            strokeLinecap="round"
            strokeWidth="10"
          />
          <circle cx="88" cy="92" fill="#e0f2fe" opacity="0.7" r="16" />
        </svg>
      </div>
    );
  }

  if (id === "block") {
    return (
      <div aria-label={title} className="h-full w-full" role="img">
        <svg
          aria-hidden="true"
          className="h-full w-full"
          fill="none"
          viewBox="0 0 240 240"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            fill="#f97316"
            height="112"
            rx="26"
            width="112"
            x="64"
            y="64"
          />
          <rect
            fill="#fdba74"
            height="112"
            opacity="0.45"
            rx="26"
            width="48"
            x="64"
            y="64"
          />
          <rect
            fill="#ffedd5"
            height="26"
            opacity="0.8"
            rx="13"
            width="72"
            x="84"
            y="86"
          />
          <path
            d="M64 118H176M120 64V176"
            stroke="#9a3412"
            strokeLinecap="round"
            strokeWidth="10"
          />
        </svg>
      </div>
    );
  }

  return <CardIllustration id={id as KotobaIllustrationId} title={title} />;
}
