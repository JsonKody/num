// numberSystem.ts
import type { Base } from "../types/typings";
import { defineStore } from "pinia";
import { ref, computed, watch } from "vue";

export const useNumberSystem = defineStore("numberSystem", () => {
  const chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const MAX_BASE = chars.length;

  const base = ref<Base>(2);
  const digits = ref<string[]>(["0", "0", "0", "0"]);
  const showDigitValue = ref(true);

  watch(
    () => base.value,
    () => {
      digits.value = digits.value.map((d) =>
        base.value > Number(d) ? d : String(base.value - 1)
      );
    }
  );

  const setDigitsToZero = () => {
    digits.value = digits.value.map(() => "0");
  };

  const setDigit = (index: number, value: string) => {
    digits.value[index] = value;
  };

  const addDigit = () => {
    digits.value.unshift(chars[0]);
  };

  const removeDigit = () => {
    digits.value.shift();
  };

  const computedNumberDecimal = computed(() => {
    const number = parseInt(digits.value.join(""), base.value);
    return isNaN(number) ? 0 : number;
  });

  const computedNumber = computed(() => {
    return base.value > 1
      ? computedNumberDecimal.value.toString(base.value).toUpperCase()
      : "0";
  });

  const availableCharsForBase = computed(() => {
    return chars.substring(0, base.value);
  });

  return {
    base,
    chars,
    MAX_BASE,
    digits,
    setDigit,
    addDigit,
    removeDigit,
    availableCharsForBase,
    computedNumber,
    computedNumberDecimal,
    showDigitValue,
    setDigitsToZero,
  };
});
