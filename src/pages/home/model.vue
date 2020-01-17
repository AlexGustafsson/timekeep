<template>
  <div class="home-page">
    <div class="wrapper">
      <week-scroller v-model="week" />
    </div>
    <main>
      <ul>
        <card v-for="timekeep in $store.timekeeps.filter(x => x.favorite)" :key="timekeep.id" :timekeep="timekeep" :focused="timekeep.isCounting" :week="week" @click.native="cardClicked(timekeep)"></card>
      </ul>
    </main>
  </div>
</template>

<script src="./script.js"></script>
<style src="./style.css"></style>
