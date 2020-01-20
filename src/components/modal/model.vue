<template>
  <div class="modal" :class="{hide}" @click.self="close()">
    <main ref="main">
      <component :is="component" v-bind="parameters"></component>
    </main>
  </div>
</template>

<script src="./script.js"></script>
<style src="./style.css"></style>
