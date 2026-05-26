import antfu from "@antfu/eslint-config";

export default antfu(
  {},
  {
    files: ["scripts/**/*.js"],
    languageOptions: {
      globals: {
        GM_notification: "readonly",
      },
    },
  },
);
