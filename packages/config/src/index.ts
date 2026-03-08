export const siteConfig = {
  name: "Bright Sprout",
  description:
    "An AI-native learning website for playful, guided, and personalized education at home.",
  hero: {
    headline: "A learning home base your kids will want to open every day.",
    copy:
      "Start with a fast Next.js website, connect it to a local PostgreSQL database, and keep the AI layer replaceable while you discover the first learning workflow that sticks."
  },
  learningTracks: [
    {
      title: "Reading Adventures",
      description:
        "Interactive stories, vocabulary prompts, and progress notes designed for short daily sessions."
    },
    {
      title: "Math Missions",
      description:
        "Lightweight drills, challenge quests, and hints that can adapt to each child's pace."
    },
    {
      title: "Creative Projects",
      description:
        "Maker-style prompts that blend writing, drawing, and problem solving into one activity."
    },
    {
      title: "Parent Insights",
      description:
        "Simple summaries so caregivers can spot wins, friction points, and next steps quickly."
    }
  ],
  promises: [
    {
      kicker: "Focus",
      title: "One clear first product",
      description:
        "This scaffold keeps the initial repo narrow so you can validate the first education loop before adding more services."
    },
    {
      kicker: "Safety",
      title: "Database and AI boundaries",
      description:
        "Prisma client creation stays inside the database package, and AI provider logic stays inside the AI package."
    },
    {
      kicker: "Speed",
      title: "Ready for local iteration",
      description:
        "The marketing shell renders without the database, while Docker and Prisma stay available for the first stateful feature."
    }
  ]
} as const;

