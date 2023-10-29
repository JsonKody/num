<script setup lang="ts">
import { useNumberSystem } from "../stores/numberSystem";
import { watch, computed } from "vue";

const { index } = defineProps<{
  index: number;
}>();

const ns = useNumberSystem();
const selectedNumber = computed(() => ns.digits[index]);
const availableChars = computed(() => ns.availableCharsForBase);
const digitIndex = computed(() => ns.digits.length - index - 1);
const digitValue = computed(() => Math.pow(ns.base, digitIndex.value));

watch(
  () => ns.base,
  (_newVal) => {
    // digitValue.value = newVal || "0";
  }
);

const updateDigit = (event: Event) => {
  const value = (event.target as HTMLSelectElement).value;
  ns.setDigit(index, value);
};
</script>

<template>
  <div class="relative">
    <div class="cursor-pointer" @click="ns.showDigitValue = !ns.showDigitValue">
      <div v-if="ns.showDigitValue" class="center text-xs text-purple-400">
        {{ digitValue }}
      </div>
      <div v-else class="center text-xs text-pink-400">
        {{ digitIndex }}
      </div>
    </div>
    <div
      class="text-2xl center"
      :class="{
        'opacity-50': selectedNumber == '0',
        'text-purple-300': selectedNumber != '0',
      }"
    >
      {{ selectedNumber }}
    </div>
    <div class="center text-xs">
      <select
        name="digit"
        class="trans opacity-10 hover:opacity-80 cursor-pointer"
        @change="updateDigit"
        :value="selectedNumber"
      >
        <option v-for="char in availableChars" :key="char" :value="char">
          {{ char }}
        </option>
      </select>
    </div>
  </div>
</template>
