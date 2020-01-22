<template>
  <div class="modal-group">
    <form-input name="name" type="text" label="Name" v-model="group.name"></form-input>
    <ul>
      <li v-for="timekeep in $store.timekeeps">
        <form-input name="activate" type="checkbox" :label="timekeep.name" :value="timekeeps[timekeep.id]" @input="toggleTimekeep($event, timekeep)"></form-input>
      </li>
    </ul>
    <form-input name="submit" type="button" label="Close" @click="close()"></form-input>
  </div>
</template>

<script src="./script.js"></script>
<style src="./style.css"></style>
