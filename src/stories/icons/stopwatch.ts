import StopwatchIcon from '../../components/icons/stopwatch.vue';

export default {
  title: 'Icons/Stopwatch',
  component: StopwatchIcon
};

const Template = () => ({
  components: { StopwatchIcon },
  template: '<stopwatch-icon />',
  setup() {
    return { };
  }
});

export const Stopwatch = Template;
