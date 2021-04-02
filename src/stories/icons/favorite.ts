import FavoriteIcon from '../../components/icons/favorite.vue';

export default {
  title: 'Icons/Favorite',
  component: FavoriteIcon
};

type IconArguments = {
  color: string
};

const FavoriteTemplate = (args: IconArguments) => ({
  components: { FavoriteIcon },
  template: '<favorite-icon v-bind="args" />',
  setup() {
    return { args };
  }
});

export const Favorite = FavoriteTemplate.bind({ color: "blue" });
