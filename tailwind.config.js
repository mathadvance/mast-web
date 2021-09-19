module.exports = {
  mode: "jit",
  purge: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class", // or 'media' or 'class'
  theme: {
    screens: {
      // completely replace
      // extend doesn't work because otherwise, widephone is applied last
      // don't include lg xl or 2xl because they aren't used
      widephone: "480px",
      sm: "640px",
      md: "768px",
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
