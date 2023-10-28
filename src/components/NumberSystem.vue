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
        <button @click="ns.addDigit" class="w-8 h-8 text-2xl button">+</button>
        <button @click="ns.removeDigit" class="w-8 h-8 text-2xl button">
          -
        </button>
      </div>
      <div class="grow center flex flex-row gap-1">
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

    <!-- Controls -->
    <div class="center gap-1 mt-10">
      <button @click="ns.setDigitsToZero" class="px-3 text-lg button">
        Vynulovat čísla
      </button>
      <button
        @click="ns.showDigitValue = !ns.showDigitValue"
        class="px-3 text-lg button"
      >
        {{
          ns.showDigitValue
            ? "Zobrazit indexy číslic"
            : "Zobrazit hodnoty číslic"
        }}
      </button>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
