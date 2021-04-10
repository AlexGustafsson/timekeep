<template>
  <menu class="timekeep-menu" :class="{ open: isOpen }">
    <ul class="top">
      <li @click="isOpen = !isOpen">
        <ion-close v-if="isOpen" />
        <ion-menu v-else />
        <p>Close</p>
      </li>
    </ul>
    <ul class="middle">
      <router-link to="/">
        <li>
          <ion-dashboard />
          <p>Dashboard</p>
        </li>
      </router-link>

      <router-link to="/favorites">
        <li>
          <ion-favorite />
          <p>Favorites</p>
        </li>
      </router-link>

      <router-link to="/date">
        <li>
          <ion-calendar />
          <p>Date</p>
        </li>
      </router-link>

      <router-link to="/insights">
        <li>
          <ion-flask />
          <p>Insights</p>
        </li>
      </router-link>

      <router-link to="/tags">
        <li>
          <ion-tag />
          <p>Tags</p>
        </li>
      </router-link>
    </ul>
    <ul class="bottom">
      <router-link to="/export">
        <li>
          <ion-receipt />
          <p>Export</p>
        </li>
      </router-link>

      <router-link to="/settings">
        <li>
          <ion-cog />
          <p>Settings</p>
        </li>
      </router-link>
    </ul>
  </menu>
</template>

<script lang="ts">
import IonClose from "./ion-icons/close.vue";
import IonMenu from "./ion-icons/menu.vue";
import IonDashboard from "./ion-icons/dashboard.vue";
import IonFavorite from "./ion-icons/favorite.vue";
import IonCalendar from "./ion-icons/calendar.vue";
import IonFlask from "./ion-icons/flask.vue";
import IonTag from "./ion-icons/tag.vue";
import IonReceipt from "./ion-icons/receipt.vue";
import IonCog from "./ion-icons/cog.vue";

import { Vue, Options } from "vue-class-component";

const components = {
  IonClose,
  IonMenu,
  IonDashboard,
  IonFavorite,
  IonCalendar,
  IonFlask,
  IonTag,
  IonReceipt,
  IonCog,
};

@Options({ components })
export default class TimekeepMenu extends Vue {
  isOpen = false;

  open() {
    this.isOpen = true;
  }

  close() {
    this.isOpen = false;
  }
}
</script>

<style scoped>
.timekeep-menu {
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 48px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  background-color: white;
  transition: 0.1s ease-in-out width;
  padding: 15px 0;
  z-index: 1000;
}

.timekeep-menu.open {
  width: 220px;
}

.timekeep-menu ul {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.timekeep-menu ul p {
  display: none;
}

.timekeep-menu li {
  display: grid;
  grid-template-columns: 48px;
  align-items: center;
  user-select: none;
  cursor: pointer;
  padding: 5px 10px;
  margin: 5px 0;
}

.timekeep-menu li svg {
  transition: 0.1s transform;
  transform-origin: 50% 50%;
}

.timekeep-menu li:hover svg {
  transform: scale(1.1);
}

.timekeep-menu.open li:hover {
  transform: none;
}

.timekeep-menu.open li {
  grid-template-columns: 48px 1fr;
}

.timekeep-menu.open li p {
  display: inherit;
  animation: fly-into 0.2s ease-in forwards;
}

.timekeep-menu ul.middle {
  flex-grow: 1;
}

@keyframes fly-into {
  0% {
    transform: translate(-10px, 0);
    opacity: 0;
  }
  100% {
    transform: translate(0, 0);
    opacity: 1;
  }
}

@supports (backdrop-filter: blur(4px)) {
  .timekeep-menu menu {
    background-color: rgba(255, 255, 255, 0.8) !important;
    backdrop-filter: blur(4px);
  }
}
</style>
