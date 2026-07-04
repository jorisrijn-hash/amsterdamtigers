import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "var(--ink)",
        "ink-2": "var(--ink-2)",
        surface: "var(--surface)",
        line: "var(--line)",
        paper: "var(--paper)",
        muted: "var(--muted)",
        "muted-2": "var(--muted-2)",
        red: "var(--red)",
        "red-bright": "var(--red-bright)",
        "red-ink": "var(--red-ink)",
      },
      fontFamily: {
        display: ["var(--font-archivo)", "system-ui", "sans-serif"],
        body: ["var(--font-archivo)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      letterSpacing: {
        display: "-0.02em",
        wordmark: "0.02em",
        label: "0.22em",
      },
      transitionTimingFunction: {
        out: "cubic-bezier(0.23, 1, 0.32, 1)",
        "in-out": "cubic-bezier(0.77, 0, 0.175, 1)",
        drawer: "cubic-bezier(0.32, 0.72, 0, 1)",
      },
      zIndex: {
        base: "0",
        raised: "10",
        sticky: "30",
        nav: "40",
        overlay: "50",
        modal: "60",
        loader: "80",
      },
      maxWidth: {
        shell: "88rem",
      },
    },
  },
  plugins: [],
};

export default config;
