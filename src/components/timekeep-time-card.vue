<template>
  <article class="timekeep-time-card">
    <more-icon class="top-right" />
    <header>
      <timekeep-icon class="icon"><stopwatch-icon /></timekeep-icon>
      <!--TODO: Don't have paragraphs in paragraphs-->
      <p>
        <p>{{group}}</p>
        <p>{{readableTimeToday}} today</p>
      </p>
    </header>
    <footer>
      <p>{{name}} </p>
      <p>{{readableTimeThisWeek}} this week</p>
    </footer>
  </article>
</template>

<script lang="ts">
import MoreIcon from './icons/more.vue';
import StopwatchIcon from './icons/stopwatch.vue';
import TimekeepIcon from './timekeep-icon/model.vue';
import {humanReadableTime} from '../utils/time';

export default {
  components: { MoreIcon, TimekeepIcon, StopwatchIcon },
  name: 'timekeep-time-card',
  computed: {
    readableTimeToday(): string {
      return humanReadableTime(this.$props.timeToday);
    },
    readableTimeThisWeek(): string {
      return humanReadableTime(this.$props.timeThisWeek);
    }
  },
  props: {
    group: {type: String, required: true},
    timeToday: {type: Number, required: true},
    name: {type: String, required: true},
    timeThisWeek: {type: Number, required: true}
  }
};
</script>

<style scoped>
  article {
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

  header {
    display: flex;
    height: 48px;
    flex-direction: row;
    margin-bottom: 25px;
  }

  header > .icon {
    color: #95B8C0;
  }

  header > p {
    display: flex;
    align-items: left;
    flex-direction: column;
    justify-content: center;
    margin-left: 10px;
  }

  header > p p {
    margin: 2px 0;
  }

  footer p {
    color: #808080;
    margin: 5px 0;
  }

  .top-right {
    position: absolute;
    top: 5px;
    right: 5px;
  }
</style>
