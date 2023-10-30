// numberSystem.ts
import type { Base } from "../types/typings";
import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { generateCzechName, generateEnglishName } from "../prefixes";

export const useNumberSystem = defineStore("numberSystem", () => {
  const chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const MIN_BASE = 2;
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

  const setBase = (val: Base) => {
    digits.value = digits.value.map((d) => {
      // console.log(val);
      // console.log(chars[val - 1]);
      return val > parseInt(d, base.value) ? d : chars[val - 1];
    });

    base.value = val;
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

  const numberToBaseDecimal = computed(() => {
    const str_num = stringToBigInt(digits.value.join(""), base.value)
      .toString(10)
      .toUpperCase();
    return str_num ? str_num : "0";
  });

  const numberToBase = computed(() => {
    const str_num = stringToBigInt(digits.value.join(""), base.value)
      .toString(base.value)
      .toUpperCase();
    return str_num ? str_num : "0";
  });

  return {
    base,
    setBase,
    chars,
    MIN_BASE,
    MAX_BASE,
    digits,
    setDigit,
    addDigit,
    removeDigit,
    availableCharsForBase,
    numberToBase,
    numberToBaseDecimal,
    showDigitValue,
    setDigitsToZero,
    setDigitsToMax,
    czech,
    english,
    czech_10,
  };
});
