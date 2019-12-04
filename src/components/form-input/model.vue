<template>
  <div class="form-input" :class="{button: type === 'button', disabled}" v-on:click="clicked">
    <input ref="input" :type="type" :disabled="disabled" :value="value" v-on:input="updateValue" v-on:focus="focused" v-on:blur="blurred" />
    <label :to="name" :class="{elevated: value.length > 0 || isFocused}">{{label}}</label>
  </div>
</template>

<script src="./script.js"></script>
<style src="./style.css"></script>
