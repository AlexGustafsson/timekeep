<template>
  <div class="home-page">
    <main>
      <card v-for="timekeep in timekeepings" :key="timekeep.id" :name="timekeep.name" :time="timekeep.time" :previous="timekeep.previous" @click.native="cardClicked(timekeep.id)"></card>
    </main>
  </div>
</template>

<script src="./script.js"></script>
<style src="./style.css"></style>
