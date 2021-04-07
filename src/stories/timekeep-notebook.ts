import { Story } from "@storybook/vue3/types-6-0";
import { reactive } from "vue";

import TimekeepNotebook from "../components/timekeep-notebook.vue";
import UniversalDate from "../utils/universal-date";

export default {
  title: "Components/Timekeep Notebook",
  component: TimekeepNotebook,
};

type TemplateArguments = {};

const Template: Story<TemplateArguments> = (args) => ({
  components: { TimekeepNotebook },
  template: `<timekeep-notebook v-model:notes="notes" />`,
  setup() {
    const notes = reactive([
      {
        id: 0,
        text: "Today I worked about 30m on setting up the project. I took a break for 10m. Another 30m was spent on installing dependencies.",
        date: new UniversalDate(1617519120243),
      },
      {
        id: 1,
        text: "I took a break for 30m rest was spent researching the designs.",
        date: new UniversalDate(1616428180243),
      },
    ]);

    return { args, notes };
  },
});

export const Notebook = Template.bind({});
