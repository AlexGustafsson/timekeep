<template>
  <div class="home-page">
    <week-scroller v-model="week" />
    <main>
      <ul :class="classes">
        <card v-for="timekeep in $store.state.timekeeps" :key="timekeep.id" :timekeep="timekeep" :focused="timekeep.id === $store.state.activeId" :week="week" @click.native="cardClicked(timekeep)" @remove="cardRemove(timekeep)"></card>
      </ul>
      <footer>
        <form v-on:submit="submit">
          <form-input :enabled="form.enabled" name="name" type="text" label="Name" v-model="form.name"></form-input>
          <form-input :enabled="form.enabled" name="submit" type="button" label="Add" v-on:click="submit"></form-input>
          <form-input name="export" type="button" label="Export" v-on:click="exportTimekeeps"></form-input>
        </form>
      </footer>
    </main>
  </div>
</template>

<script src="./script.js"></script>
<style src="./style.css"></style>
