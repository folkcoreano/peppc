import { defineConfig } from "windicss/helpers";

export default defineConfig({
  darkMode: "class",
  plugins: [
    require("windicss/plugin/typography"),
    require("@windicss/plugin-question-mark"),
  ],
});
