<script setup lang="ts">
import { useNumberSystem } from "../stores/numberSystem";
import Digit from "./Digit.vue";

const ns = useNumberSystem();
</script>

<template>
  <div>
    <!-- Digits -->
    <div class="flex flex-row gap-2">
      <div class="center flex-col gap-1">
        <button
          @click="ns.addDigit"
          class="trans text-2xl w-8 h-8 rounded bg-purple-700 opacity-30 hover:opacity-80 text-white"
        >
          +
        </button>
        <button
          @click="ns.removeDigit"
          class="trans text-2xl w-8 h-8 rounded bg-purple-700 opacity-30 hover:opacity-80 text-white"
        >
          -
        </button>
      </div>
      <div class="flex flex-row gap-1">
        <div v-for="(_digit, i) in ns.digits" :key="i">
          <Digit :index="i" />
        </div>
      </div>
    </div>

    <!-- Base -->
    <div class="m-8 center">
      <label for="base">Base</label>
      <input
        min="2"
        :max="ns.MAX_BASE"
        type="number"
        name="base"
        id="base"
        v-model="ns.base"
      />
    </div>

    <!-- Delete -->
    <div class="center mt-10">
      <button @click="ns.setDigitsToZero" class="px-3 rounded bg-purple-700">
        Vynulovat čísla
      </button>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
