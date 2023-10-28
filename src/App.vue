<script setup lang="ts">
import NumberSystem from "./components/NumberSystem.vue";
import { useNumberSystem } from "./stores/numberSystem";
import { generateCzechName, generateEnglishName } from "./prefixes";
const ns = useNumberSystem();
</script>

<template>
  <div class="wrapper">
    <h1 class="text-3xl green-grad">
      {{ generateCzechName(10) }}
    </h1>
    <!-- Number -->
    <div
      :title="`Číslo v ... ${generateCzechName(10)}`"
      class="cursor-help my-3 text-5xl green-grad"
    >
      {{ ns.computedNumberDecimal }}
    </div>

    <h1 class="text-3xl purple-grad">
      {{ generateCzechName(ns.base) }}
    </h1>
    <span class="text-xs text-purple-400 opacity-70"
      >( {{ generateEnglishName(ns.base) }} )</span
    >

    <!-- Number -->
    <div
      :title="`Číslo v ... ${generateCzechName(ns.base)}`"
      class="cursor-help my-3 text-5xl animate-pulse purple-grad"
    >
      {{ ns.computedNumber }}
    </div>
    <div class="mt-5">
      <NumberSystem />
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
