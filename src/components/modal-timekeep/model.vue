<template>
  <div class="modal-timekeep">
    <form-input name="name" type="text" label="Name" v-model="timekeep.name"></form-input>
    <form-input name="submit" type="button" label="Close" @click="close()"></form-input>
  </div>
</template>

<script src="./script.js"></script>
<style src="./style.css"></style>
