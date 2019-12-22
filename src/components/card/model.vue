<template>
  <div class="card" :class="{focused}">
    <header>
      <div class="inset">
        <b :class="classes">{{timekeep.name[0]}}</b>
      </div>
      <h1>
        {{timekeep.name}}
        <i v-if="focused" class="material-icons">access_time</i>
      </h1>
    </header>
    <h2>{{prettyTime}}</h2>
    <footer>
      <p>{{prettyPrevious}}</p>
    </footer>
  </div>
</template>

<script src="./script.js"></script>
<style src="./style.css"></style>
