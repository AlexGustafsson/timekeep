const { app } = require("@storybook/vue3");

// Import global style (contains reset-css which needs to be loaded first)
import "../src/style/main.css";

// Add mockup for the Vue router link element
app.component("router-link", {template: '<a><slot /></a>'});

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}
