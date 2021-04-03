import TimekeepInsights from "../components/timekeep-insights.vue";

export default {
  title: "Components/Timekeep Insights",
  component: TimekeepInsights,
};

const Template = () => ({
  components: { TimekeepInsights },
  template: "<timekeep-insights />",
  setup() {
    return {};
  },
});

export const Primary = Template.bind({});
