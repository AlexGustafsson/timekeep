<template>
  <div class="app">
    <nav class="top">
      <i></i>
      <router-link to="/">Timekeep</router-link>
      <i class="material-icons" v-on:click="toggleMenu">menu</i>
    </nav>
    <nav class="side" ref="menu" v-bind:class="{open: menuIsOpen}">
      <ul>
        <li class="form">
          <form-input name="name" type="text" label="Name" v-model="form.name" @keyup.native.enter="submit"></form-input>
          <form-input :disabled="formDisabled" name="submit" type="button" label="Add" @click="submit"></form-input>
        </li>
        <li v-for="timekeep in $store.state.timekeeps">
          <p>{{timekeep.name}}</p>
          <i class="material-icons" @click.stop="toggleFavorite(timekeep)">{{timekeep.favorite ? 'favorite' : 'favorite_border'}}</i>
          <i class="remove material-icons" @click.stop="remove(timekeep)">delete_forever</i>
        </li>
        <li v-if="$store.state.timekeeps.length > 0" class="spacer"></li>
        <li @click.stop="exportToExcel" class="menu-button">
          <p>Export to Excel</p>
        </li>
        <li @click.stop="reset" class="menu-button">
          <p>Reset</p>
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
