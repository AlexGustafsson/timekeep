/* eslint-disable */
import Store from "./plugins/store";

declare module '@vue/runtime-core' {
  // Provide typings for `this.$store`
  interface ComponentCustomProperties {
    $store: Store
  }
}
