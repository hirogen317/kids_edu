export type KotobaIllustrationId =
  | "apple"
  | "banana"
  | "strawberry"
  | "cat"
  | "rabbit"
  | "elephant"
  | "car"
  | "bus"
  | "train";

export interface KotobaCard {
  id: string;
  word: string;
  spokenText: string;
  phrase?: string;
  prompt?: string;
  imageAlt: string;
  illustration: KotobaIllustrationId;
  audioSrc?: string;
}

export interface KotobaDeckPalette {
  accent: string;
  accentSoft: string;
  highlight: string;
  ink: string;
  shadow: string;
}

export interface KotobaDeck {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  helperLabel: string;
  palette: KotobaDeckPalette;
  cards: readonly KotobaCard[];
}

export const kotobaDecks: readonly KotobaDeck[] = [
  {
    id: "tabemono",
    title: "たべもの",
    subtitle: "みて たべものを あてよう",
    description: "おやつみたいに かるく たのしめる 3まいの デッキです。",
    helperLabel: "あかるい いろと くだものの ことば",
    palette: {
      accent: "#f97316",
      accentSoft: "#ffedd5",
      highlight: "#fb923c",
      ink: "#7c2d12",
      shadow: "rgba(249, 115, 22, 0.28)"
    },
    cards: [
      {
        id: "apple",
        word: "りんご",
        spokenText: "りんご",
        phrase: "あかい りんご",
        prompt: "これは なに？",
        imageAlt: "あかい りんごの イラスト",
        illustration: "apple"
      },
      {
        id: "banana",
        word: "ばなな",
        spokenText: "ばなな",
        phrase: "ながい ばなな",
        prompt: "きいろいね。",
        imageAlt: "きいろい ばななの イラスト",
        illustration: "banana"
      },
      {
        id: "strawberry",
        word: "いちご",
        spokenText: "いちご",
        phrase: "あまい いちご",
        prompt: "どんな あじ？",
        imageAlt: "いちごの イラスト",
        illustration: "strawberry"
      }
    ]
  },
  {
    id: "dobutsu",
    title: "どうぶつ",
    subtitle: "かわいい どうぶつに あえるよ",
    description: "みみや おはなを みて、ことばを つくる れんしゅうです。",
    helperLabel: "せいかつの なかで みつけやすい どうぶつ",
    palette: {
      accent: "#10b981",
      accentSoft: "#d1fae5",
      highlight: "#34d399",
      ink: "#065f46",
      shadow: "rgba(16, 185, 129, 0.25)"
    },
    cards: [
      {
        id: "cat",
        word: "ねこ",
        spokenText: "ねこ",
        phrase: "しろい ねこ",
        prompt: "にゃーって いうかな？",
        imageAlt: "ねこの かおの イラスト",
        illustration: "cat"
      },
      {
        id: "rabbit",
        word: "うさぎ",
        spokenText: "うさぎ",
        phrase: "ぴょんぴょん うさぎ",
        prompt: "みみは ながいかな？",
        imageAlt: "うさぎの イラスト",
        illustration: "rabbit"
      },
      {
        id: "elephant",
        word: "ぞう",
        spokenText: "ぞう",
        phrase: "おおきい ぞう",
        prompt: "はなは どこ？",
        imageAlt: "ぞうの イラスト",
        illustration: "elephant"
      }
    ]
  },
  {
    id: "norimono",
    title: "のりもの",
    subtitle: "うごく ものの なまえを おぼえよう",
    description: "おでかけを おもいだしながら たのしめる 3まいの デッキです。",
    helperLabel: "まちで みかける のりもの",
    palette: {
      accent: "#4f46e5",
      accentSoft: "#e0e7ff",
      highlight: "#818cf8",
      ink: "#312e81",
      shadow: "rgba(79, 70, 229, 0.26)"
    },
    cards: [
      {
        id: "car",
        word: "くるま",
        spokenText: "くるま",
        phrase: "あおい くるま",
        prompt: "どこへ いく？",
        imageAlt: "くるまの イラスト",
        illustration: "car"
      },
      {
        id: "bus",
        word: "ばす",
        spokenText: "ばす",
        phrase: "おおきな ばす",
        prompt: "のったこと ある？",
        imageAlt: "ばすの イラスト",
        illustration: "bus"
      },
      {
        id: "train",
        word: "でんしゃ",
        spokenText: "でんしゃ",
        phrase: "はやい でんしゃ",
        prompt: "ガタン ゴトン。",
        imageAlt: "でんしゃの イラスト",
        illustration: "train"
      }
    ]
  }
] as const;
