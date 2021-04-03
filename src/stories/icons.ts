import {DefineComponent} from "vue";
import IonAdd from '../components/ion-icons/add.vue';
import IonFavorite from '../components/ion-icons/favorite.vue';
import IonMore from '../components/ion-icons/more.vue';
import IonStopwatch from '../components/ion-icons/stopwatch.vue';

export default {
  title: 'Icons',
  component: IonAdd
};

const Template = (component: DefineComponent, name: string) => ({
  components: { IonAdd },
  template: `<${name} />`,
  setup() {
    return {};
  }
});

export const Add = Template(IonAdd, 'ion-add');
