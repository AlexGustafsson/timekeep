/* eslint-disable */
import Store from "./state/store"

declare module '@vue/runtime-core' {
  // Provide typings for `this.$store`
  interface ComponentCustomProperties {
    $store: Store
  }
}
