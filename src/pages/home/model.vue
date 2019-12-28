<template>
  <div class="home-page">
    <div class="wrapper">
      <week-scroller v-model="week" />
    </div>
    <main>
      <ul>
        <card v-for="timekeep in $store.state.timekeeps.filter(x => x.favorite)" :key="timekeep.id" :timekeep="timekeep" :focused="timekeep.id === $store.state.activeId" :week="week" @click.native="cardClicked(timekeep)"></card>
      </ul>
      <footer>
        <form v-on:submit="submit">
          <form-input :enabled="form.enabled" name="name" type="text" label="Name" v-model="form.name"></form-input>
          <form-input :enabled="form.enabled" name="submit" type="button" label="Add" v-on:click="submit"></form-input>
        </form>
      </footer>
    </main>
  </div>
</template>

<script src="./script.js"></script>
<style src="./style.css"></style>
