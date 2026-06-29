module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: "#0e5487",
        "brand-hover": "#0a4163",
        "brand-light": "#227dbf",
        "brand-pale": "#e7f2f9",
        "bg-page": "#F8FAFF",
        "bg-blue-tint": "#f3f8fd",
        "text-heading": "#0F172A",
        "text-body": "#334155",
        "text-muted": "#64748B",
        "border-default": "#E2E8F0",
        "border-blue": "#cfe2f3",
      },
      fontFamily: {
        heading: ["var(--font-heading)"],
        body: ["var(--font-body)"],
        mono: ["var(--font-mono)"],
      },
    },
  },
  plugins: [],
};
