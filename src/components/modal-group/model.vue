<template>
  <div class="modal-group">
    <form-input name="name" type="text" label="Name" v-model="group.name"></form-input>
    <form-input name="submit" type="button" label="Close" @click="close()"></form-input>
  </div>
</template>

<script src="./script.js"></script>
<style src="./style.css"></style>
