import type { KotobaIllustrationId } from "../kotoba-cards/kotoba-cards-data";

export type NakamawakeIllustrationId =
  | KotobaIllustrationId
  | "dog"
  | "ball"
  | "block";

export interface NakamawakePalette {
  accent: string;
  soft: string;
  ink: string;
  glow: string;
}

export interface NakamawakeChoice {
  id: string;
  label: string;
  imageAlt: string;
  illustration: NakamawakeIllustrationId;
}

export interface NakamawakeQuestion {
  id: string;
  prompt: string;
  helperText: string;
  themeLabel: string;
  successMessage: string;
  successVoice: string;
  retryMessage: string;
  retryVoice: string;
  palette: NakamawakePalette;
  correctChoiceId: string;
  choices: readonly NakamawakeChoice[];
}

const categoryPalette: NakamawakePalette = {
  accent: "#f97316",
  soft: "#ffedd5",
  ink: "#9a3412",
  glow: "rgba(249, 115, 22, 0.28)"
};

const colorPalette: NakamawakePalette = {
  accent: "#ec4899",
  soft: "#fce7f3",
  ink: "#9d174d",
  glow: "rgba(236, 72, 153, 0.24)"
};

const sizePalette: NakamawakePalette = {
  accent: "#0ea5e9",
  soft: "#e0f2fe",
  ink: "#0c4a6e",
  glow: "rgba(14, 165, 233, 0.24)"
};

const shapePalette: NakamawakePalette = {
  accent: "#8b5cf6",
  soft: "#ede9fe",
  ink: "#5b21b6",
  glow: "rgba(139, 92, 246, 0.24)"
};

export const nakamawakeQuestions: readonly NakamawakeQuestion[] = [
  {
    id: "animal-dog",
    prompt: "どうぶつは どれ？",
    helperText: "なかまを よく みて えらぼう。",
    themeLabel: "どうぶつ",
    successMessage: "すごい。どうぶつ みつけたね。",
    successVoice: "すごい。どうぶつ みつけたね。",
    retryMessage: "こっちだよ。もういちど みてみよう。",
    retryVoice: "こっちだよ。もういちど みてみよう。",
    palette: categoryPalette,
    correctChoiceId: "dog",
    choices: [
      {
        id: "dog",
        label: "いぬ",
        imageAlt: "いぬの イラスト",
        illustration: "dog"
      },
      {
        id: "apple",
        label: "りんご",
        imageAlt: "りんごの イラスト",
        illustration: "apple"
      },
      {
        id: "bus",
        label: "ばす",
        imageAlt: "ばすの イラスト",
        illustration: "bus"
      }
    ]
  },
  {
    id: "food-banana",
    prompt: "たべものは どれ？",
    helperText: "おいしそうな ものを さがしてみよう。",
    themeLabel: "たべもの",
    successMessage: "せいかい。たべものを えらべたね。",
    successVoice: "せいかい。たべものを えらべたね。",
    retryMessage: "ちがうよ。たべられる ものは どれかな？",
    retryVoice: "ちがうよ。たべられる ものは どれかな？",
    palette: categoryPalette,
    correctChoiceId: "banana",
    choices: [
      {
        id: "banana",
        label: "ばなな",
        imageAlt: "ばななの イラスト",
        illustration: "banana"
      },
      {
        id: "elephant",
        label: "ぞう",
        imageAlt: "ぞうの イラスト",
        illustration: "elephant"
      },
      {
        id: "train",
        label: "でんしゃ",
        imageAlt: "でんしゃの イラスト",
        illustration: "train"
      }
    ]
  },
  {
    id: "vehicle-train",
    prompt: "のりものは どれ？",
    helperText: "うごく ものを みつけよう。",
    themeLabel: "のりもの",
    successMessage: "ぴったり。のりもの みつけたよ。",
    successVoice: "ぴったり。のりもの みつけたよ。",
    retryMessage: "こっちを みてみよう。のれる ものは どれ？",
    retryVoice: "こっちを みてみよう。のれる ものは どれ？",
    palette: categoryPalette,
    correctChoiceId: "train",
    choices: [
      {
        id: "train",
        label: "でんしゃ",
        imageAlt: "でんしゃの イラスト",
        illustration: "train"
      },
      {
        id: "rabbit",
        label: "うさぎ",
        imageAlt: "うさぎの イラスト",
        illustration: "rabbit"
      },
      {
        id: "strawberry",
        label: "いちご",
        imageAlt: "いちごの イラスト",
        illustration: "strawberry"
      }
    ]
  },
  {
    id: "color-red",
    prompt: "あかい ものは どれ？",
    helperText: "いろを よく みて えらぼう。",
    themeLabel: "いろ",
    successMessage: "すごい。あかい ものを みつけたね。",
    successVoice: "すごい。あかい ものを みつけたね。",
    retryMessage: "もういちど。あかい いろを さがしてみよう。",
    retryVoice: "もういちど。あかい いろを さがしてみよう。",
    palette: colorPalette,
    correctChoiceId: "apple",
    choices: [
      {
        id: "apple",
        label: "りんご",
        imageAlt: "りんごの イラスト",
        illustration: "apple"
      },
      {
        id: "bus",
        label: "ばす",
        imageAlt: "ばすの イラスト",
        illustration: "bus"
      },
      {
        id: "rabbit",
        label: "うさぎ",
        imageAlt: "うさぎの イラスト",
        illustration: "rabbit"
      }
    ]
  },
  {
    id: "color-blue",
    prompt: "あおい ものは どれ？",
    helperText: "おそらみたいな いろを みつけよう。",
    themeLabel: "いろ",
    successMessage: "せいかい。あおい ものだね。",
    successVoice: "せいかい。あおい ものだね。",
    retryMessage: "こっちかな。あおい いろを みてみよう。",
    retryVoice: "こっちかな。あおい いろを みてみよう。",
    palette: colorPalette,
    correctChoiceId: "car",
    choices: [
      {
        id: "car",
        label: "くるま",
        imageAlt: "くるまの イラスト",
        illustration: "car"
      },
      {
        id: "banana",
        label: "ばなな",
        imageAlt: "ばななの イラスト",
        illustration: "banana"
      },
      {
        id: "dog",
        label: "いぬ",
        imageAlt: "いぬの イラスト",
        illustration: "dog"
      }
    ]
  },
  {
    id: "size-big",
    prompt: "おおきい ものは どれ？",
    helperText: "おおきさを くらべてみよう。",
    themeLabel: "おおきさ",
    successMessage: "やったね。おおきい ものを みつけたよ。",
    successVoice: "やったね。おおきい ものを みつけたよ。",
    retryMessage: "もういちど。いちばん おおきい ものは どれ？",
    retryVoice: "もういちど。いちばん おおきい ものは どれ？",
    palette: sizePalette,
    correctChoiceId: "elephant",
    choices: [
      {
        id: "elephant",
        label: "ぞう",
        imageAlt: "ぞうの イラスト",
        illustration: "elephant"
      },
      {
        id: "strawberry",
        label: "いちご",
        imageAlt: "いちごの イラスト",
        illustration: "strawberry"
      },
      {
        id: "ball",
        label: "ぼーる",
        imageAlt: "ぼーるの イラスト",
        illustration: "ball"
      }
    ]
  },
  {
    id: "size-small",
    prompt: "ちいさい ものは どれ？",
    helperText: "ちいさな ものを えらんでみよう。",
    themeLabel: "おおきさ",
    successMessage: "ぴったり。ちいさい ものだね。",
    successVoice: "ぴったり。ちいさい ものだね。",
    retryMessage: "こっちだよ。もっと ちいさい ものを さがそう。",
    retryVoice: "こっちだよ。もっと ちいさい ものを さがそう。",
    palette: sizePalette,
    correctChoiceId: "strawberry",
    choices: [
      {
        id: "strawberry",
        label: "いちご",
        imageAlt: "いちごの イラスト",
        illustration: "strawberry"
      },
      {
        id: "bus",
        label: "ばす",
        imageAlt: "ばすの イラスト",
        illustration: "bus"
      },
      {
        id: "elephant",
        label: "ぞう",
        imageAlt: "ぞうの イラスト",
        illustration: "elephant"
      }
    ]
  },
  {
    id: "shape-round",
    prompt: "まるい ものは どれ？",
    helperText: "かたちを みて えらぼう。",
    themeLabel: "かたち",
    successMessage: "すごい。まるい もの みつけたね。",
    successVoice: "すごい。まるい もの みつけたね。",
    retryMessage: "もういちど。くるんと まるい ものは どれかな？",
    retryVoice: "もういちど。くるんと まるい ものは どれかな？",
    palette: shapePalette,
    correctChoiceId: "ball",
    choices: [
      {
        id: "ball",
        label: "ぼーる",
        imageAlt: "ぼーるの イラスト",
        illustration: "ball"
      },
      {
        id: "bus",
        label: "ばす",
        imageAlt: "ばすの イラスト",
        illustration: "bus"
      },
      {
        id: "block",
        label: "つみき",
        imageAlt: "つみきの イラスト",
        illustration: "block"
      }
    ]
  },
  {
    id: "shape-square",
    prompt: "しかくい ものは どれ？",
    helperText: "しかくい かたちを みつけよう。",
    themeLabel: "かたち",
    successMessage: "やった。しかくい もの せいかい。",
    successVoice: "やった。しかくい もの せいかい。",
    retryMessage: "こっちかな。しかくい かたちを みてみよう。",
    retryVoice: "こっちかな。しかくい かたちを みてみよう。",
    palette: shapePalette,
    correctChoiceId: "block",
    choices: [
      {
        id: "block",
        label: "つみき",
        imageAlt: "つみきの イラスト",
        illustration: "block"
      },
      {
        id: "banana",
        label: "ばなな",
        imageAlt: "ばななの イラスト",
        illustration: "banana"
      },
      {
        id: "dog",
        label: "いぬ",
        imageAlt: "いぬの イラスト",
        illustration: "dog"
      }
    ]
  }
] as const;
