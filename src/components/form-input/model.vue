<template>
  <div class="form-input" :class="{button: type === 'button', checkbox: type === 'checkbox', disabled}" v-on:click="clicked">
    <input ref="input" :type="type" :disabled="disabled" :value="value" :checked="value" v-on:input="updateValue" v-on:focus="focused" v-on:blur="blurred" />
    <label :to="name" :class="{elevated: type !== 'checkbox' && (value.length > 0 || isFocused)}">{{label}}</label>
  </div>
</template>

<script src="./script.js"></script>
<style src="./style.css"></script>
