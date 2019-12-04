<template>
  <div class="home-page">
    <main :class="classes">
      <card v-for="timekeep in timekeepings" :key="timekeep.id" :name="timekeep.name" :time="timekeep.time" :previous="timekeep.previous" :focused="timekeep.id === activeID" @click.native="cardClicked(timekeep.id)"></card>
    </main>
    <footer>
      <form v-on:submit="submit">
        <form-input name="name" type="text" label="Name" v-model="form.name"></form-input>
        <form-input name="submit" type="button" label="Add" v-on:click="submit"></form-input>
      </form>
    </footer>
  </div>
</template>

<script src="./script.js"></script>
<style src="./style.css"></style>
