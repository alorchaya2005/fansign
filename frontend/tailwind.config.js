import daisyui from "daisyui";
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        oddliniRegular: ["Oddlini-Regular", "sans-serif"],
        oddliniMedium: ["Oddlini-Medium", "sans-serif"],
        oddliniBold: ["Oddlini-Bold", "sans-serif"],
        phonk: ["Phonk", "sans-serif"],
      },
      animation: {
        scroll:
          "scroll var(--animation-duration, 40s) var(--animation-direction, forwards) linear infinite",
        "infinite-scroll": "infinite-scroll 20s linear infinite",
        "infinite-scroll-right": "infinite-scroll 30s linear infinite",
      },
      keyframes: {
        scroll: {
          to: {
            transform: "translate(calc(-50% - 0.5rem))",
          },
        },
        "infinite-scroll": {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(calc(-50% - 20px))" },
        },
        "infinite-scroll-right": {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(calc(-50% - 20px))" },
        },
      },
      colors: {
        main: "#0a0a0a",
        subMain: "#111111",
        gry: "#222",
        subGry: "#333",
        border: "#D3D3D330",
        coin: "#facc15",
        buttonColor: "#D130AF",
        hedingColor: "#D130AF",
        inputBg: "#181818",
      },
    },
  },
  plugins: [daisyui],
};
