import { Story } from "@storybook/vue3/types-6-0";

import TimekeepShowcase from "../components/timekeep-showcase.vue";
import TimekeepShowcaseItem from "../components/timekeep-showcase-item.vue";
import IonStopwatch from "../components/ion-icons/stopwatch.vue";
import TimekeepIcon from "../components/timekeep-icon/model.vue";

export default {
  title: "Components/Timekeep Showcase",
  component: TimekeepShowcase,
};

type TemplateArguments = {
  items: { props: { primary: string; secondary: string }; slot: string }[];
};

const Template: Story<TemplateArguments> = (args) => ({
  components: { TimekeepShowcase, TimekeepShowcaseItem, IonStopwatch, TimekeepIcon },
  template: `<timekeep-showcase><timekeep-showcase-item v-for="item in args.items" v-bind="item.props"><timekeep-icon v-if="item.slot"><component :is="item.slot" /></timekeep-icon></timekeep-showcase-item></timekeep-showcase>`,
  setup() {
    return { args };
  },
});

export const WithIcon = Template.bind({});
WithIcon.args = {
  items: [
    {
      props: {
        primary: "Active",
        secondary: "1",
      },
      slot: "ion-stopwatch",
    },
    {
      props: {
        primary: "Favorites",
        secondary: "4",
      },
      slot: "ion-stopwatch",
    },
    {
      props: {
        primary: "Popular",
        secondary: "5",
      },
      slot: "ion-stopwatch",
    },
    {
      props: {
        primary: "Recent",
        secondary: "10",
      },
      slot: "ion-stopwatch",
    },
  ],
};

export const WithoutIcon = Template.bind({});
WithoutIcon.args = {
  items: [
    {
      props: {
        primary: "Active",
        secondary: "1",
      },
      slot: "",
    },
  ],
};
