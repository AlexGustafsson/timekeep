import TimekeepIcon from '../components/timekeep-icon/model.vue';

export default {
  title: 'Components/Timekeep Icon',
  component: TimekeepIcon
};

const Template = () => ({
  components: { TimekeepIcon },
  template: '<timekeep-icon />',
});

export const Primary = Template;
