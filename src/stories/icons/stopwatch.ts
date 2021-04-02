import StopwatchIcon from '../../components/icons/stopwatch.vue';

export default {
  title: 'Icons/Stopwatch',
  component: StopwatchIcon
};

type IconArguments = {
  color: string
};

const StopwatchTemplate = (args: IconArguments) => ({
  components: { StopwatchIcon },
  template: '<stopwatch-icon v-bind="args" />',
  setup() {
    return { args };
  }
});

export const Stopwatch = StopwatchTemplate.bind({color: "blue"});
