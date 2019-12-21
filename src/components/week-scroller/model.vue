<template>
  <div class="week-scroller">
    <ul>
      <li @click="previousWeek()"><i class="material-icons up">chevron_right</i></li>
      <li v-for="week in weeks" :key="week.year.toString() + week.week.toString()" :class="{selected: value.week === week.week}" @click="weekChanged(week)">{{week.week}}</li>
      <li @click="nextWeek()"><i class="material-icons down">chevron_right</i></li>
    </ul>
  </div>
</template>

<script src="./script.js"></script>
<style src="./style.css"></script>
