<template>
  <div class="app">
    <nav class="top">
      <router-link to="/">Timekeep</router-link>
      <i class="material-icons" v-on:click="toggleMenu">menu</i>
    </nav>
    <nav class="side" ref="menu" v-bind:class="{open: menuIsOpen}">
      <ul>
        <li v-for="timekeep in $store.state.timekeeps">
          <p>{{timekeep.name}}</p>
          <i class="material-icons" @click.stop="toggleFavorite(timekeep)">{{timekeep.favorite ? 'favorite' : 'favorite_border'}}</i>
          <i class="remove material-icons" @click.stop="remove(timekeep)">delete_forever</i>
        </li>
      </ul>
    </nav>
    <main>
      <router-view></router-view>
    </main>
  </div>
</template>

<script src="./script.js"></script>
<style src="./style.css"></style>
