<script setup lang="ts">
import { NameConfig } from "./types/typings";
import Digit from "./components/Digit.vue";
import { useNumberSystem } from "./stores/numberSystem";
import { czech, latin } from "./prefixes";
const ns = useNumberSystem();

// Funkce pro generování názvu
const generujNazevSoustavy = (base: number, config: NameConfig) => {
  if (base <= 16) {
    return `${config.prefixes[base - 1]}${config.suffix} ${config.term}`;
  } else {
    return `${base}-${config.suffix} ${config.term}`;
  }
};
</script>

<template>
  <div class="wrapper">
    <h1>{{ generujNazevSoustavy(ns.base, czech) }}</h1>
    <h1>{{ generujNazevSoustavy(ns.base, latin) }}</h1>
    <h1>base-{{ ns.base }}</h1>
    <div>
      <label for="base">Base</label>
      <input
        min="1"
        :max="ns.MAX_BASE"
        type="number"
        name="base"
        id="base"
        v-model="ns.base"
      />
    </div>
    <div v-for="(_d, i) in ns.digits">
      <Digit :digit="i" />
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
