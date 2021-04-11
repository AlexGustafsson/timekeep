import { Component } from "vue";

import IonAdd from "../components/ion-icons/add.vue";
import IonFavorite from "../components/ion-icons/favorite.vue";
import IonMore from "../components/ion-icons/more.vue";
import IonStopwatch from "../components/ion-icons/stopwatch.vue";
import IonMenu from "../components/ion-icons/menu.vue";
import IonClose from "../components/ion-icons/close.vue";

export default {
  title: "Icons",
};

const Template = (component: Component, name: string) => {
  return () => ({
    components: { [name]: component },
    template: `<${name} />`,
    setup() {
      return {};
    },
  });
};

export const Add = Template(IonAdd, "ion-add");
export const Favorite = Template(IonFavorite, "ion-favorite");
export const More = Template(IonMore, "ion-more");
export const Stopwatch = Template(IonStopwatch, "ion-stopwatch");
export const Menu = Template(IonMenu, "ion-menu");
export const Close = Template(IonClose, "ion-close");
