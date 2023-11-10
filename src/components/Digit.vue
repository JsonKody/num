<script setup lang="ts">
import { useNumberSystem } from "../stores/numberSystem";
import { computed } from "vue";

const { index } = defineProps<{
  index: number;
}>();

const ns = useNumberSystem();
const selectedNumber = computed(() => ns.digits[index]);
const availableChars = computed(() => ns.available_chars_for_base);
const digitIndex = computed(() => ns.digits.length - index - 1);
const positionValue = computed(() =>
  Math.pow(ns.base_purple, digitIndex.value)
);

const digitValue = computed(
  () => parseInt(selectedNumber.value, ns.base_purple) * positionValue.value
);

const updateDigit = (event: Event) => {
  const value = (event.target as HTMLSelectElement).value;
  ns.set_digit(index, value);
};

const toggleMinMax = () => {
  if (selectedNumber.value === ns.zero) {
    ns.set_digit(index, ns.mas_available_str_digit);
  } else {
    ns.set_digit(index, ns.zero);
  }
};
</script>

<template>
  <div class="relative def-mouse">
    <!-- Digit value/index -->
    <div
      :class="ns.info ? 'cursor-help' : 'cursor-pointer'"
      @click="ns.show_digits_val = !ns.show_digits_val"
    >
      <div
        v-if="ns.show_digits_val"
        v-pop:top="
          ns.t_info(
            'Hodnota řádu - kliknutím přepneš na index řádu.',
            'Digit value - click to switch to the place index.'
          )
        "
        class="digit-value"
        :class="ns.info ? 'cursor-help' : 'cursor-switch'"
      >
        {{ positionValue }}
      </div>
      <div
        v-else
        v-pop:top="
          ns.t_info(
            'Index řádu - kliknutím přepneš na hodnotu řádu.',
            'Place index - click to switch to the digit value.'
          )
        "
        class="digit-index"
        :class="ns.info ? 'cursor-help' : 'cursor-switch'"
      >
        {{ digitIndex }}
      </div>
    </div>

    <!-- Digit -->
    <label
      v-pop.keep="
        ns.t_info(
          `( ${
            parseInt(selectedNumber, ns.base_purple) * positionValue
          } )  Kliknutím přepneš mezi Min - Max.`,
          `( ${
            parseInt(selectedNumber, ns.base_purple) * positionValue
          } )  Click to toggle Min - Max.`,
          digitValue.toString(),
          digitValue.toString()
        )
      "
      :for="digitIndex + '-digit'"
      class="digit"
      @click="toggleMinMax"
      :class="{
        'opacity-50': selectedNumber == '0',
        'text-purple-400': selectedNumber != '0',
        'cursor-help': ns.info,
        'cursor-switch': !ns.info,
      }"
    >
      {{ selectedNumber }}
    </label>

    <!-- Digit selector -->
    <div class="digit-select">
      <select
        v-pop="
          ns.t_info(
            `Vyber číslici na pozici - ${digitIndex}`,
            `Select digit on position - ${digitIndex}`
          )
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
