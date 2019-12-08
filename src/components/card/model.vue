<template>
  <div class="card" :class="{focused}">
    <header>
      <div class="inset">
        <b :class="classes">{{name[0]}}</b>
      </div>
      <h1>
        {{name}}
        <i v-if="focused" class="material-icons">access_time</i>
        <i class="remove material-icons" @click.stop="remove">delete_forever</i>
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
