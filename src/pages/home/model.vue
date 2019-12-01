<template>
  <div class="home-page">
    <main>
      <div v-for="timekeep in timekeepings" class="card">
        <header>
          <div class="inset">
            <b>{{timekeep.name[0]}}</b>
          </div>
          <h1>{{timekeep.name}}</h1>
        </header>
        <h2>{{timekeep.time}}</h2>
        <footer>
          <p>{{timekeep.previous}}</p>
        </footer>
      </div>
    </main>
  </div>
</template>

<script src="./script.js"></script>
<style src="./style.css"></style>
