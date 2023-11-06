<script setup lang="ts">
import { useNumberSystem } from "../stores/numberSystem";
import { computed } from "vue";

const { index } = defineProps<{
  index: number;
}>();

const ns = useNumberSystem();
const selectedNumber = computed(() => ns.digits[index]);
const availableChars = computed(() => ns.availableCharsForBase);
const digitIndex = computed(() => ns.digits.length - index - 1);
const digitValue = computed(() => Math.pow(ns.base_purple, digitIndex.value));

const updateDigit = (event: Event) => {
  const value = (event.target as HTMLSelectElement).value;
  ns.setDigit(index, value);
};

const toggleMinMax = () => {
  if (selectedNumber.value === ns.zero) {
    ns.setDigit(index, ns.mas_available_str_digit);
  } else {
    ns.setDigit(index, ns.zero);
  }
};
</script>

<template>
  <div class="relative def-mouse">
    <!-- Digit value/index -->
    <div
      class="cursor-help"
      @click="ns.show_digits_value = !ns.show_digits_value"
    >
      <div
        :title="
          ns.t(
            'Hodnota řádu. Kliknutím přepnete na index řádu.',
            'Digit value. Click to switch to the place index.'
          )
        "
        v-if="ns.show_digits_value"
        class="digit-value"
      >
        {{ digitValue }}
      </div>
      <div
        :title="
          ns.t(
            'Index řádu. Kliknutím přepnete na hodnotu řádu.',
            'Place index. Click to switch to the digit value.'
          )
        "
        v-else
        class="digit-index"
      >
        {{ digitIndex }}
      </div>
    </div>

    <!-- Digit -->
    <label
      :title="`( ${
        parseInt(selectedNumber, ns.base_purple) * digitValue
      } )  ${ns.t(
        'Kliknutím přepínej Min - Max',
        'Click to toggle Min - Max'
      )}`"
      :for="digitIndex + '-digit'"
      class="digit"
      @click="toggleMinMax"
      :class="{
        'opacity-50': selectedNumber == '0',
        'text-purple-400': selectedNumber != '0',
      }"
    >
      {{ selectedNumber }}
    </label>

    <!-- Digit selector -->
    <div class="digit-select">
      <select
        :title="
          ns.t('Vyber číslici na pozici', 'Select digit on position') +
          ' - ' +
          digitIndex
        "
        :id="digitIndex + '-digit'"
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
