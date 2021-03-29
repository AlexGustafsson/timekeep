<template>
  <div class="app">
    <!--<modal ref="modal">
    </modal>
    <nav class="top">
      <i></i>
      <router-link to="/">Timekeep</router-link>
      <i class="material-icons" v-on:click="toggleMenu">menu</i>
    </nav>
    <nav class="side" ref="menu" v-bind:class="{open: menuIsOpen}">
      <ul>
        <li class="title"><p>Active group</p></li>
        <li class="full-width">
          <form-input name="group" label="Group" type="select" :options="groupOptions" v-model="groupForm.activeGroup" />
        </li>

        <li class="spacer"></li>
        <li class="title"><p>Timekeeps</p></li>
        <li class="form">
          <form-input name="name" type="text" label="Add a project" v-model="timekeepForm.name" @keyup.native.enter="addTimekeep"></form-input>
          <form-input :disabled="timekeepFormDisabled" name="submit" type="button" label="Add" @click="addTimekeep"></form-input>
        </li>
        <li v-for="timekeep in $store.timekeeps">
          <p>{{timekeep.name}}</p>
          <i class="material-icons" @click.stop="toggleFavorite(timekeep)">{{timekeep.favorite ? 'favorite' : 'favorite_border'}}</i>
          <i class="material-icons" @click.stop="editTimekeep(timekeep)">edit</i>
          <i class="material-icons" @click.stop="removeTimekeep(timekeep)">delete_forever</i>
        </li>

        <li class="spacer"></li>
        <li class="title"><p>Groups</p></li>
        <li class="form">
          <form-input name="name" type="text" label="Add a group" v-model="groupForm.name" @keyup.native.enter="addGroup"></form-input>
          <form-input :disabled="groupFormDisabled" name="submit" type="button" label="Add" @click="addGroup"></form-input>
        </li>
        <li v-for="group in $store.groups">
          <p>{{group.name}}</p>
          <i></i>
          <i class="material-icons" @click.stop="editGroup(group)">edit</i>
          <i class="material-icons" @click.stop="removeGroup(group)">delete_forever</i>
        </li>

        <li class="spacer"></li>
        <li class="title"><p>Options</p></li>
        <li class="options">
          <form-input name="resetFavoritesEachWeek" type="checkbox" label="Reset favorites each week" v-model="optionsForm.resetFavoritesEachWeek"></form-input>
        </li>

        <li class="spacer"></li>
        <li v-if="$store.timekeeps.length > 0" @click.stop="exportToExcel" class="menu-button">
          <p>Export to Excel</p>
        </li>
        <li v-if="$store.timekeeps.length > 0" @click.stop="backup" class="menu-button">
          <p>Backup</p>
        </li>
        <li @click.stop="importBackup" class="menu-button">
          <p>Import from backup</p>
        </li>
        <li @click.stop="reset" class="menu-button">
          <p>Reset</p>
        </li>
        <li @click.stop="about" class="menu-button">
          <p>About</p>
        </li>

        <li class="github">
          <a href="https://github.com/AlexGustafsson/timekeep">
            <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>GitHub icon</title><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
          </a>
        </li>
      </ul>
    </nav>-->
    <main>
      <router-view></router-view>
    </main>
  </div>
</template>

<script src="./script.ts"></script>
<style src="./style.css"></style>
