import AddIcon from '../../components/icons/add.vue';

export default {
  title: 'Icons/Add',
  component: AddIcon
};

const Template = () => ({
  components: { AddIcon },
  template: '<add-icon />',
  setup() {
    return {};
  }
});

export const Add = Template;
