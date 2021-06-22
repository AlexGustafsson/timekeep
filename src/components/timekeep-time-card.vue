<template>
  <div class="box-border p-6 bg-white relative rounded-2xl flex flex-col justify-items-between">
    <ion-more class="absolute top-1 right-1 text-gray-500 cursor-pointer" />
    <header class="flex flex-row h-12 my-1 mb-6">
      <timekeep-icon class="icon" :style="{ color }" :active="active" tooltip="Toggle" @click="$emit('toggled')"><ion-stopwatch /></timekeep-icon>
      <div class="flex items-left flex-col justify-content-ceter ml-2">
        <p class="my-1">{{ group }}</p>
        <p class="my-1">{{ readableTimeToday }} today</p>
      </div>
    </header>
    <footer>
      <p class="my-1 text-gray-500">{{ name }}</p>
      <p class="my-1 text-gray-500">{{ readableTimeThisWeek }} this week</p>
    </footer>
  </div>
</template>

<script lang="ts">
import { Vue, Options, prop } from "vue-class-component";
import IonMore from "./ion-icons/more.vue";
import IonStopwatch from "./ion-icons/stopwatch.vue";
import TimekeepIcon from "./timekeep-icon/model.vue";
import { humanReadableTime } from "../utils/time";

const components = {
  IonMore,
  TimekeepIcon,
  IonStopwatch,
};

class Props {
  group!: string;
  timeToday!: number;
  name!: string;
  timeThisWeek!: number;
  active = prop<boolean>({ default: false });
  color!: string;
}

@Options({ components })
class TimekeepTimeCard extends Vue.with(Props) {
  get readableTimeToday(): string {
    return humanReadableTime(this.timeToday);
  }

  get readableTimeThisWeek(): string {
    return humanReadableTime(this.timeThisWeek);
  }
}
export {TimekeepTimeCard as default};
</script>
