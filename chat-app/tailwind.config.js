import flowbite from "flowbite-react/tailwind";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}", flowbite.content()],
  theme: {
    screens: {
      // 'sm': '640px',
      // 'md': '768px',
      // 'lg': '1024px',
      // 'xl': '1280px',
      // '2xl': '1536px',
      sm: "480px",
      md: "768px",
      lg: "976px",
      xl: "1440px",
    },
    colors: {
      inputBG : '#D9D9D9',
      angularGradient : '#3C406F',
      lightAngularGradient : '#737BD4',
      mainGradientColor : "bg-[linear-gradient(180deg,#373B65_21%,#4E5172_44%,#777A9A_74%)]",
      
    },
    backgroundImage : {
      mainGradientColor : "bg-[linear-gradient(180deg,#373B65_21%,#4E5172_44%,#777A9A_74%)]",
    },
    fontFamily: {
      inter: ["Inter", "sans-serif"],
    },
    textColor:{
      inputcolor : '#373B65',
      inputBG : '#D9D9D9',
      white : "#fff",
      green : "#00ff00",
    }
    // extend: {},
  },
  plugins: [flowbite.plugin()],
};
