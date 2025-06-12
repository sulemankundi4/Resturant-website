module.exports = {
 content: ["*", "./*html","./assets/css/*.css","./assets/js/*.js", './assets/**/*.{ts,js}',],
  theme: {
    backgroundSize: {
      customBgSize: "90% 110%",
      customBgSize2: "97% 109%",
      customBgSize3: "100% 100%",
    },
    fontFamily: {
      jost: ["Jost", "sans-serif"],
      "plus-jakarta-sans": ["Plus Jakarta Sans", "sans-serif"],
      satisfy: ["Satisfy", "cursive"],
      manrope: ["Manrope", "sans-serif"],
      inter: ["Inter", "sans-serif"],
      "Work-Sans": ["Work Sans", "sans-serif"],
      Roboto: ["Roboto", "sans-serif"],
      "Playfair-Display": ["Playfair Display", "sans-serif"],
      Yantramanav: ["Yantramanav", "sans-serif"],
      josefinsans: ["Josefin Sans", "sans-serif"],
      nunito: ["Nunito", "sans-serif"],
      Poppins: ["Poppins", "sans-serif"],
      CormorantInfant: ["Cormorant Infant", "sans-serif"],
    },
    screens: {
      xs: "320px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1272px",
    },
    colors: {
      "Cyan": "#1B3030",
      "Dark-Cyan-Green": "#0F2727",
      "Deep-Teal": "#102B2A",
      "International-Orange": "#DF3F01",
      "Eerie-Black": "#171717",
      "Amber": "#FFC107",
      "Bright-Orange": "#FB9015",
      "light-coral": "#FD8F77",
      "Gray": "#888888",
      "Beer": "#DD5903",
      "Burnt-Orange": "#EB662B",
      "Light-Gray": "#D9D9D9",
      "Lime-Green": "#CCFF00",
      "Charcoal": "#141414",
      "Dark-Cyan": "#0D2221",
    },
    container: {
      center: true,
      padding: "12px",
    },
    extend: {
      backgroundImage: {
        shape: "url('/assets/images/shape.png')",
        "home-1": "url('/assets/images/home-1/hero-slider.png')",
        "home-1-play-bg": "url('/assets/images/home-1/play-video.png')",
        texture: "url('/assets/images/home-1/texture.png')",
        texture2: "url('/assets/images/home-3/texture.png')",
        "contact-form": "url('/assets/images/home-1/contact-form-bg.png')",
        "contact-form2": "url('/assets/images/home-3/contact-form-bg.png')",
        "hero-2": "url('/assets/images/home-2/hero_area.png')",
        "best-burger-place":
          "url('/assets/images/home-3/best-burger-place.png')",
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities(
        {
          ".text-stroke-1": {
            "-webkit-text-stroke": "1px #DF3F01",
          },
          ".text-stroke-2": {
            "-webkit-text-stroke": "1px #fff",
          },
          ".dashed-border": {
            content: '""',
            position: "absolute",
            top: "50%",
            left: "0",
            border: "1px dashed #DF3F01",
            width: "100%",
          },
          ".dashed-border2": {
            content: '""',
            position: "absolute",
            top: "50%",
            left: "0",
            border: "1px dashed #FB9015",
            width: "100%",
          },
          ".dashed-border3": {
            content: '""',
            position: "absolute",
            top: "50%",
            left: "0",
            border: "1px dashed #DD5903",
            width: "100%",
          },
        },
        ["before"]
      );
    },
    require("flowbite/plugin-windicss"),
  ],
};
