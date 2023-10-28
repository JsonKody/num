<script setup lang="ts">
import NumberSystem from "./components/NumberSystem.vue";
import { useNumberSystem } from "./stores/numberSystem";
import { generateCzechName, generateEnglishName } from "./prefixes";
const ns = useNumberSystem();
</script>

<template>
  <div class="wrapper">
    <h1 class="text-3xl text-green-400">{{ generateCzechName(ns.base) }}</h1>
    <h1 class="text-xl text-sky-500">{{ generateEnglishName(ns.base) }}</h1>
    <div
      class="my-3 text-purple-300 text-shadow-lg text-5xl bg-gradient-to-r from-emerald-400 via-emerald-600 to-emerald-800 text-transparent bg-clip-text"
    >
      {{ ns.computedNumberDecimal }}
    </div>
    <div
      class="my-3 animate-pulse text-purple-300 text-shadow-lg text-5xl bg-gradient-to-r from-purple-400 via-purple-600 to-purple-800 text-transparent bg-clip-text"
    >
      {{ ns.computedNumber }}
    </div>
    <div class="mt-5">
      <NumberSystem />
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
