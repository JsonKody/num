// numberSystem.ts
import type { Base, Lang, Name } from "../types/typings";
import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { generateCzechName, generateEnglishName } from "../prefixes";

export const useNumberSystem = defineStore("numberSystem", () => {
  const chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const zero = chars[0];
  const MIN_BASE = 2;
  const MAX_BASE = chars.length;

  const lang = ref<Lang>("cs");

  const base_green = ref<Base>(10);
  const base_purple = ref<Base>(16);

  const digits = ref<string[]>([zero, zero, zero, zero]);
  const showDigitValue = ref(true);

  const name_green = computed(() =>
    lang.value === "cs"
      ? generateCzechName(base_green.value)
      : generateEnglishName(base_green.value)
  );
  const name_purple = computed(() =>
    lang.value === "cs"
      ? generateCzechName(base_purple.value)
      : generateEnglishName(base_purple.value)
  );
  const en_name = computed(() => generateEnglishName(base_purple.value));

  const availableCharsForBase = computed(() => {
    return chars.substring(0, base_purple.value);
  });

  const setBase = (val: Base) => {
    /**
     * If the base is 0, we set the base to 0 and return.
     */
    if (digitsToPurpleStrNumber.value === "0") {
      base_purple.value = val;
      return;
    }

    /**
     * .. else we convert the digits to the new base.
     */
    const new_digits_array = digits_converter(
      digits.value,
      base_purple.value,
      val
    );
    digits.value = [];
    base_purple.value = val;
    digits.value = new_digits_array;
  };

  const setDigitsToZero = () => {
    const zero = availableCharsForBase.value[0];
    digits.value = digits.value.map(() => zero);
  };

  const mas_available_str_digit = computed(() => {
    return availableCharsForBase.value[availableCharsForBase.value.length - 1];
  });

  const setDigitsToMax = () => {
    const max = mas_available_str_digit.value;
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

  function digits_converter(current: string[], base_from: Base, base_to: Base) {
    const str_num = current.join("");
    return str_number_converter(str_num, base_from, base_to).split("");
  }

  function str_number_converter(
    str_num: string,
    base_from: Base,
    base_to: Base
  ) {
    str_num = stringToBigInt(str_num, base_from)
      .toString(base_to)
      .toUpperCase();
    return str_num ? str_num : zero;
  }

  const digitsToGreenStrNumber = computed(() =>
    str_number_converter(
      digits.value.join(""),
      base_purple.value,
      base_green.value
    )
  );
  const digitsToPurpleStrNumber = computed(() =>
    str_number_converter(
      digits.value.join(""),
      base_purple.value,
      base_purple.value
    )
  );

  const switchGreenPurple = () => {
    const new_digits_array = digitsToGreenStrNumber.value.split("");
    digits.value = [];
    const temp = base_green.value;
    base_green.value = base_purple.value;
    base_purple.value = temp;
    digits.value = new_digits_array;
  };

  const t = (cs: string, en: string) => (lang.value === "cs" ? cs : en);
  const to = (lang_obj: Name) => lang_obj[lang.value];
  const toggleLang = () => {
    lang.value = lang.value === "cs" ? "en" : "cs";
  };

  return {
    t,
    to,
    lang,
    toggleLang,
    base_green,
    base_purple,
    setBase,
    chars,
    zero,
    MIN_BASE,
    MAX_BASE,
    digits,
    setDigit,
    addDigit,
    removeDigit,
    availableCharsForBase,
    digitsToPurpleStrNumber,
    digitsToGreenStrNumber,
    showDigitValue,
    setDigitsToZero,
    mas_available_str_digit,
    setDigitsToMax,
    name_green,
    name_purple,
    en_name,
    switchGreenPurple,
  };
});
