<template>
  <aside :class="{open}">
    <ul class="top">
      <li @click="open = !open">
        <ion-close v-if="open" />
        <ion-menu v-else />
        <p>Close</p>
      </li>
    </ul>
    <ul class="middle">
      <router-link tag="li" to="/">
        <ion-dashboard />
        <p>Dashboard</p>
      </router-link>

      <router-link tag="li" to="/favorites">
        <ion-favorite />
        <p>Favorites</p>
      </router-link>

      <router-link tag="li" to="/date">
        <ion-calendar />
        <p>Date</p>
      </router-link>

      <router-link tag="li" to="/insights">
        <ion-flask />
        <p>Insights</p>
      </router-link>

      <router-link tag="li" to="/tags">
        <ion-tag />
        <p>Tags</p>
      </router-link>
    </ul>
    <ul class="bottom">
      <router-link tag="li" to="/export">
        <ion-receipt />
        <p>Export</p>
      </router-link>

      <router-link tag="li" to="/settings">
        <ion-cog />
        <p>Settings</p>
      </router-link>
    </ul>
  </aside>
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

export default {
  data() {
    return {
      open: false
    };
  },
  components: {
    IonClose,
    IonMenu,
    IonDashboard,
    IonFavorite,
    IonCalendar,
    IonFlask,
    IonTag,
    IonReceipt,
    IonCog
  }
};
</script>

<style scoped>
  aside {
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
  }

  aside.open {
    width: 220px;
  }

  ul {
    display: flex;
    flex-direction: column;
    width: 100%;
  }

  ul p {
    display: none;
  }

  li {
    display: grid;
    grid-template-columns: 48px;
    align-items: center;
    user-select: none;
    cursor: pointer;
    padding: 5px 10px;
    margin: 5px 0;
  }

  li svg {
    transition: 0.1s transform;
    transform-origin: 50% 50%;
  }

  li:hover svg {
    transform: scale(1.1);
  }

  .open li:hover {
    transform: none;
  }

  .open li {
    grid-template-columns: 48px 1fr;
  }

  .open li p {
    display: inherit;
    animation: fly-into 0.2s ease-in forwards;
  }

  ul.middle {
    flex-grow: 1;
  }

  @keyframes fly-into {
    0% { transform: translate(-10px, 0); opacity: 0; }
    100% { transform: translate(0, 0); opacity: 1; }
  }
</style>
