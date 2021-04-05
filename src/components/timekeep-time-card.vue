<template>
  <div class="timekeep-time-card">
    <ion-more class="top-right" />
    <header>
      <timekeep-icon class="icon" :active="active" ><ion-stopwatch /></timekeep-icon>
      <div>
        <p>{{group}}</p>
        <p>{{readableTimeToday}} today</p>
      </div>
    </header>
    <footer>
      <p>{{name}} </p>
      <p>{{readableTimeThisWeek}} this week</p>
    </footer>
  </div>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import IonMore from './ion-icons/more.vue';
import IonStopwatch from './ion-icons/stopwatch.vue';
import TimekeepIcon from './timekeep-icon/model.vue';
import {humanReadableTime} from '../utils/time';

export default defineComponent({
  components: { IonMore, TimekeepIcon, IonStopwatch },
  name: 'timekeep-time-card',
  computed: {
    readableTimeToday(): string {
      return humanReadableTime(this.timeToday);
    },
    readableTimeThisWeek(): string {
      return humanReadableTime(this.timeThisWeek);
    }
  },
  props: {
    group: {type: String, required: true},
    timeToday: {type: Number, required: true},
    name: {type: String, required: true},
    timeThisWeek: {type: Number, required: true},
    active: {type: Boolean, default: false}
  }
});
</script>

<style scoped>
  .timekeep-time-card {
    box-sizing: border-box;
    padding: 15px;
    background-color: white;
    position: relative;
    width: 250px;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    justify-items: space-between;
    justify-content: space-between;
  }

  .timekeep-time-card header {
    display: flex;
    height: 48px;
    flex-direction: row;
    margin-bottom: 25px;
  }

  .timekeep-time-card header > .icon {
    color: #95B8C0;
  }

  .timekeep-time-card header > div {
    display: flex;
    align-items: left;
    flex-direction: column;
    justify-content: center;
    margin-left: 10px;
  }

  .timekeep-time-card header > div p {
    margin: 2px 0;
  }

  .timekeep-time-card footer p {
    color: #808080;
    margin: 5px 0;
  }

  .timekeep-time-card .top-right {
    position: absolute;
    top: 5px;
    right: 5px;
    color: #B7B7B7;
  }
</style>
