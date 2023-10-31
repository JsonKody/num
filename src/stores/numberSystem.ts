// numberSystem.ts
import type { Base } from "../types/typings";
import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { generateCzechName, generateEnglishName } from "../prefixes";

export const useNumberSystem = defineStore("numberSystem", () => {
  const chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const MIN_BASE = 2;
  const MAX_BASE = chars.length;

  const base_green = ref<Base>(10);
  const is_setting_base_green = ref(false);

  const base_purple = ref<Base>(2);
  const digits = ref<string[]>(["0", "0", "0", "0"]);
  const showDigitValue = ref(true);

  const change_green_title = computed(
    () =>
      `Kliknutím přepneš ovládání základu  [${base_green.value}]  pro zelené číslo.`
  );
  const change_purple_title = computed(
    () =>
      `Kliknutím přepneš ovládání základu  [${base_purple.value}]  pro fialové číslo.`
  );

  const cs_name_green = computed(() => generateCzechName(base_green.value));
  const cs_name_purple = computed(() => generateCzechName(base_purple.value));
  const en_name = computed(() => generateEnglishName(base_purple.value));

  const availableCharsForBase = computed(() => {
    return chars.substring(0, base_purple.value);
  });

  const setBase = (val: Base) => {
    if (is_setting_base_green.value) {
      base_green.value = val;
      return;
    }

    digits.value = digits.value.map((d) => {
      // console.log(val);
      // console.log(chars[val - 1]);
      return val > parseInt(d, base_purple.value) ? d : chars[val - 1];
    });

    base_purple.value = val;
  };

  const setDigitsToZero = () => {
    const zero = availableCharsForBase.value[0];
    digits.value = digits.value.map(() => zero);
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

  function stringToBigInt(str: string, base: Base): BigInt {
    let result = BigInt(0);
    const bigBase = BigInt(base);
    let multiplier = BigInt(1);

    for (let i = str.length - 1; i >= 0; i--) {
      const digit = str[i];
      const value = BigInt(parseInt(digit, base));
      result += value * multiplier;
      multiplier *= bigBase;
    }

    return result;
  }

  const numberToTopBase = computed(() => {
    const str_num = stringToBigInt(digits.value.join(""), base_purple.value)
      .toString(base_green.value)
      .toUpperCase();
    return str_num ? str_num : "0";
  });

  const numberToBase = computed(() => {
    const str_num = stringToBigInt(digits.value.join(""), base_purple.value)
      .toString(base_purple.value)
      .toUpperCase();
    return str_num ? str_num : "0";
  });

  return {
    base_green,
    base_purple,
    setBase,
    is_setting_base_green,
    change_green_title,
    change_purple_title,
    chars,
    MIN_BASE,
    MAX_BASE,
    digits,
    setDigit,
    addDigit,
    removeDigit,
    availableCharsForBase,
    numberToBase,
    numberToTopBase,
    showDigitValue,
    setDigitsToZero,
    setDigitsToMax,
    cs_name_green,
    cs_name_purple,
    en_name,
  };
});
