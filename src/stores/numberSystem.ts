// numberSystem.ts
import type { Base } from "../types/typings";
import { defineStore } from "pinia";
import { ref, computed, watch } from "vue";
import { generateCzechName, generateEnglishName } from "../prefixes";

export const useNumberSystem = defineStore("numberSystem", () => {
  const chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const MAX_BASE = chars.length;

  const base = ref<Base>(2);
  const digits = ref<string[]>(["0", "0", "0", "0"]);
  const showDigitValue = ref(true);

  const czech = computed(() => generateCzechName(base.value));
  const english = computed(() => generateEnglishName(base.value));
  const czech_10 = computed(() => generateCzechName(10));

  const availableCharsForBase = computed(() => {
    return chars.substring(0, base.value);
  });

  watch(
    () => base.value,
    () => {
      digits.value = digits.value.map((d) =>
        base.value > Number(d)
          ? d
          : availableCharsForBase.value[availableCharsForBase.value.length - 1]
      );
    }
  );

  const setDigitsToZero = () => {
    digits.value = digits.value.map(() => "0");
  };

  const setDigitsToMax = () => {
    const max =
      availableCharsForBase.value[availableCharsForBase.value.length - 1];
    digits.value = digits.value.map(() => max);
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
    setDigitsToMax,
    czech,
    english,
    czech_10,
  };
});
