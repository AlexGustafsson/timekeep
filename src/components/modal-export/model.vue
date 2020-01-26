<template>
  <div class="modal-export">
    <h1>Export to Excel</h1>
    <form-input name="format" label="Format" type="select" :options="formatOptions" v-model="format" />
    <form-input type="button" name="export" label="Export" @click="exportToExcel" />
  </div>
</template>

<script src="./script.js"></script>
<style src="./style.css"></style>
