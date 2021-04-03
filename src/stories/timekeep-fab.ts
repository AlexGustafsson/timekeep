import { Story } from "@storybook/vue3/types-6-0";

import TimekeepFab from "../components/timekeep-fab.vue";

export default {
  title: "Components/Timekeep Fab",
  component: TimekeepFab,
};

type TemplateArguments = {
  active: boolean;
};

const Template: Story<TemplateArguments> = (args) => ({
  components: { TimekeepFab },
  template: "<timekeep-fab />",
  setup() {
    return { args };
  },
});

export const FAB = Template.bind({});
