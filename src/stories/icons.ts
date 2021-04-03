import IonAdd from '../components/ion-icons/add.vue';
import IonFavorite from '../components/ion-icons/favorite.vue';
import IonMore from '../components/ion-icons/more.vue';
import IonStopwatch from '../components/ion-icons/stopwatch.vue';

export default {
  title: 'Icons'
};

const Template = (component: any, name: string) => {
  return () => ({
    components: { [name]: component },
    template: `<${name} />`,
    setup() {
      return {};
    }
  });
}

export const Add = Template(IonAdd, 'ion-add');
export const Favorite = Template(IonFavorite, 'ion-favorite');
export const More = Template(IonMore, 'ion-more');
export const Stopwatch = Template(IonStopwatch, 'ion-stopwatch');
