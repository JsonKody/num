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
    <!-- Digit value/index -->
    <div class="cursor-help" @click="ns.showDigitValue = !ns.showDigitValue">
      <div
        title="hodnota řádu | Kliknutím přepneš na index řádu"
        v-if="ns.showDigitValue"
        class="digit-value"
      >
        {{ digitValue }}
      </div>
      <div
        title="index řádu | Kliknutím přepneš na hodnotu řádu"
        v-else
        class="digit-index"
      >
        {{ digitIndex }}
      </div>
    </div>

    <!-- Digit -->
    <div
      class="digit"
      :class="{
        'opacity-50': selectedNumber == '0',
        'text-purple-400': selectedNumber != '0',
      }"
    >
      {{ selectedNumber }}
    </div>

    <!-- Digit selector -->
    <div class="text-xs center">
      <select
        title="Vyber číslici"
        name="digit"
        class="cursor-pointer mono trans opacity-10 hover:opacity-80"
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
