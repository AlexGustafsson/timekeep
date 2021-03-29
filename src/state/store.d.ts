import type Vue from "vue"

declare module "vue/types/vue" {
  interface VueConstructor {
    $store: "Store"
  }
}
