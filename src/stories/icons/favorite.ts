import FavoriteIcon from '../../components/icons/favorite.vue';

export default {
  title: 'Icons/Favorite',
  component: FavoriteIcon
};

const Template = () => ({
  components: { FavoriteIcon },
  template: '<favorite-icon />',
  setup() {
    return {};
  }
});

export const Favorite = Template;
