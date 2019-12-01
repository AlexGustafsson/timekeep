<template>
  <div class="card">
    <header>
      <div class="inset">
        <b :class="classes">{{name[0]}}</b>
      </div>
      <h1>{{name}}</h1>
    </header>
    <h2>{{prettyTime}}</h2>
    <footer>
      <p>{{prettyPrevious}}</p>
    </footer>
  </div>
</template>

<script src="./script.js"></script>
<style src="./style.css"></style>
