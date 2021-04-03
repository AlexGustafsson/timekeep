import { Story } from "@storybook/vue3/types-6-0";

import TimekeepIcon from '../components/timekeep-icon/model.vue';
import StopwatchIcon from '../components/ion-icons/stopwatch.vue';

export default {
  title: 'Components/Timekeep Icon',
  component: TimekeepIcon
};

type TemplateArguments = {
  active: boolean
}

const Template: Story<TemplateArguments> = args => ({
  components: { TimekeepIcon, StopwatchIcon },
  template: '<timekeep-icon v-bind="args"><stopwatch-icon /></timekeep-icon>',
  setup() {
    return { args };
  }
});

export const Active = Template.bind({});
export const Inactive = Template.bind({});

Active.args = {active: true};
Inactive.args = {active: false};
