<script setup lang="ts">
import { useNumberSystem } from "../stores/numberSystem";
import { ref, watch, computed } from "vue";

const ns = useNumberSystem();
const digitIndex = ref(0); // Měl bys to nastavit podle pozice digitu
const digitValue = ref(ns.digits[digitIndex.value] || "0");

watch(
  () => ns.digits[digitIndex.value],
  (newVal) => {
    digitValue.value = newVal || "0";
  }
);

const availableChars = computed(() => ns.availableCharsForBase);

const updateDigit = (event: Event) => {
  const value = (event.target as HTMLSelectElement).value;
  ns.setDigit(digitIndex.value, value);
};
</script>

<template>
  <div>
    <span>{{ digitValue }}</span>
    <select @change="updateDigit" :value="digitValue">
      <option v-for="char in availableChars" :key="char" :value="char">
        {{ char }}
      </option>
    </select>
  </div>
</template>
