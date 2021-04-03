import { Story } from "@storybook/vue3/types-6-0";

import TimekeepTimeCard from '../components/timekeep-time-card.vue';

export default {
  title: 'Components/Timekeep Time Card',
  component: TimekeepTimeCard
};

type TemplateArguments = {
  name: string,
  group: string,
  timeToday: number,
  timeThisWeek: number,
  active: boolean
}

const Template: Story<TemplateArguments> = args => ({
  components: { TimekeepTimeCard },
  template: '<timekeep-time-card v-bind="args" />',
  setup() {
    return { args };
  }
});

export const Inactive = Template.bind({});
Inactive.args = {
  name: "Frontend Development",
  group: "Timekeep",
  timeToday: 10 * 60 * 60 + 42 * 60 + 15,
  timeThisWeek: 25 * 60 * 60 + 12 * 60 + 12,
  active: false
};

export const Active = Template.bind({});
Active.args = {
  name: "Frontend Development",
  group: "Timekeep",
  timeToday: 10 * 60 * 60 + 42 * 60 + 15,
  timeThisWeek: 25 * 60 * 60 + 12 * 60 + 12,
  active: true
};
