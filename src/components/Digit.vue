<script setup lang="ts">
import { use_number_system } from "../stores/numberSystem";
import { computed } from "vue";

const { index } = defineProps<{
  index: number;
}>();

const ns = use_number_system();
const selected_number = computed(() => ns.digits[index]);
const available_chars = computed(() => ns.available_chars_for_base);
const digit_index = computed(() => ns.digits.length - index - 1);
const position_value = computed(() =>
  Math.pow(ns.base_purple, digit_index.value)
);

const digit_value = computed(
  () => parseInt(selected_number.value, ns.base_purple) * position_value.value
);

const update_digit = (event: Event) => {
  const value = (event.target as HTMLSelectElement).value;
  ns.set_digit(index, value);
};
</script>

<template>
  <div class="relative def-mouse">
    <!-- Digit value/index -->
    <div
      :class="ns.info ? 'cursor-help' : 'cursor-pointer'"
      @click="ns.toggle_digits_val"
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
        {{ position_value }}
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
        {{ digit_index }}
      </div>
    </div>

    <!-- Digit -->
    <label
      v-pop:bottom="
        ns.t_info(
          `( ${
            parseInt(selected_number, ns.base_purple) * position_value
          } )  Kliknutím přepneš mezi Min - Max.`,
          `( ${
            parseInt(selected_number, ns.base_purple) * position_value
          } )  Click to toggle Min - Max.`,
          digit_value.toString(),
          digit_value.toString()
        )
      "
      :for="digit_index + '-digit'"
      class="digit"
      @click="ns.toggle_digit_min_max(digit_index)"
      :class="{
        'opacity-50': selected_number == '0',
        'text-purple-400': selected_number != '0',
        'cursor-help': ns.info,
        'cursor-switch': !ns.info,
      }"
    >
      {{ selected_number }}
    </label>

    <!-- Digit selector -->
    <div class="digit-select">
      <select
        v-pop:bottom="
          ns.t_info(
            `Vyber číslici na pozici - ${digit_index}`,
            `Select digit on position - ${digit_index}`
          )
        "
        :id="digit_index + '-digit'"
        @change="update_digit"
        :value="selected_number"
      >
        <option v-for="char in available_chars" :key="char" :value="char">
          {{ char }}
        </option>
      </select>
    </div>
  </div>
</template>
