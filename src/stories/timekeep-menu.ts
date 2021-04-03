import { Story } from "@storybook/vue3/types-6-0";

import TimekeepMenu from '../components/timekeep-menu.vue';

export default {
  title: 'Components/Timekeep Menu',
  component: TimekeepMenu
};

type TemplateArguments = {
  active: boolean
}

const Template: Story<TemplateArguments> = args => ({
  components: { TimekeepMenu },
  template: '<timekeep-menu />',
  setup() {
    return { args };
  }
});

export const Menu = Template.bind({});
