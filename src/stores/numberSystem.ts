// numberSystem.ts
import type { Base } from "../types/typings";
import { defineStore } from "pinia";
import { ref, computed } from "vue";

export const useNumberSystem = defineStore("numberSystem", () => {
  const chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const MAX_BASE = chars.length;

  const base = ref<Base>(10);
  const digits = ref<{ [key: number]: string }>({});

  const setBase = (newBase: Base) => {
    base.value = newBase;
  };

  const setDigit = (index: number, value: string) => {
    digits.value = { ...digits.value, [index]: value };
  };

  const availableCharsForBase = computed(() => {
    return chars.substring(0, base.value);
  });

  return {
    base,
    setBase,
    chars,
    MAX_BASE,
    digits,
    setDigit,
    availableCharsForBase,
  };
});
