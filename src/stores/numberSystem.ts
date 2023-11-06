// numberSystem.ts
import type { Base, Lang, Name } from "../types/typings";
import { defineStore } from "pinia";
import { ref, computed, watch } from "vue";
import { generateCzechName, generateEnglishName } from "../prefixes";
import { debounce } from "lodash-es";

const delimiter = ",";

const ls_get = (
  key: string,
  type: "boolean" | "number" | "string" | "digits" = "string"
) => {
  if (type === "string") {
    return localStorage.getItem(key);
  }

  if (type === "boolean") {
    return localStorage.getItem(key) === "true";
  }

  if (type === "number") {
    return Number(localStorage.getItem(key));
  }

  if (type === "digits") {
    const digits = localStorage.getItem(key);
    return digits ? digits.split(delimiter) : ["0"];
  }
};

const saved = ref(false);
const ls_set = debounce((key: string, val: string) => {
  localStorage.setItem(key, val);
  saved.value = true;
  setTimeout(() => (saved.value = false), 200);
}, 1000);

export const useNumberSystem = defineStore("numberSystem", () => {
  const chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const zero = chars[0];
  const MIN_BASE = 2;
  const MAX_BASE = chars.length;

  const lang = ref<Lang>((ls_get("lang") as Lang) || "cs");

  const base_green = ref<Base>((ls_get("base_green", "number") as Base) || 10);
  const base_purple = ref<Base>(
    (ls_get("base_purple", "number") as Base) || 16
  );

  const digits = ref<string[]>(
    (ls_get("digits", "digits") as string[]) || [zero]
  );
  const showDigitValue = ref(true);
  // zamkne pocet ciselnych mist - mohou rust dle potreby ale nebudou se samy snizovat
  const lock_digits = ref(ls_get("lock_digits", "boolean") || false);

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
    const digits_length = digits.value.length;

    const new_digits_array = digits_converter(
      digits.value,
      base_purple.value,
      val
    );
    digits.value = [];
    base_purple.value = val;
    digits.value = new_digits_array;

    if (lock_digits.value && digits.value.length < digits_length) {
      const zeros = new Array(digits_length - digits.value.length).fill(zero);
      digits.value = [...zeros, ...digits.value];
    }
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
    ls_set("digits", digits.value.join(delimiter));
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
    ls_set("lang", lang.value);
  };

  watch(
    () => digits.value,
    () => {
      ls_set("digits", digits.value.join(delimiter));
    }
  );
  watch(
    () => digits.value.length,
    () => {
      ls_set("digits", digits.value.join(delimiter));
    }
  );
  watch(
    () => lock_digits.value,
    () => ls_set("lock_digits", lock_digits.value.toString())
  );
  watch(
    () => base_green.value,
    () => ls_set("base_green", base_green.value.toString())
  );
  watch(
    () => base_purple.value,
    () => ls_set("base_purple", base_purple.value.toString())
  );
  return {
    saved,
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
    lock_digits,
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
