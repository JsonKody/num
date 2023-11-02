<script setup lang="ts">
import { useNumberSystem } from "../stores/numberSystem";
import { Base } from "../types/typings";
import Digit from "./Digit.vue";
import Plus from "./icons/Plus.vue";
import Minus from "./icons/Minus.vue";
import Eye from "./icons/Eye.vue";
import { computed } from "vue";
const ns = useNumberSystem();

const setBase = (event: Event) => {
  const value = parseInt((event.target as HTMLInputElement).value);
  if (!value || value < 2 || value > ns.MAX_BASE) {
    return;
  }
  ns.setBase(value as Base);
};

const baseTitle = computed(
  () =>
    `[ ${ns.base_purple} ]  je základ v této soustavy.
Je to tedy ${ns.cs_name_purple.toLowerCase()}.`
);

const increaseBase = () => {
  if (ns.base_purple < ns.MAX_BASE) {
    ns.setBase((ns.base_purple + 1) as Base);
  }
};

const decreaseBase = () => {
  if (ns.base_purple > ns.MIN_BASE) {
    ns.setBase((ns.base_purple - 1) as Base);
  }
};

const digitMinusDisabled = computed(() => ns.digits.length < 2);
const baseMinusDisabled = computed(() => ns.base_purple <= ns.MIN_BASE);
const basePlusDisabled = computed(() => ns.base_purple >= ns.MAX_BASE);
</script>

<template>
  <div>
    <!-- Digits -->
    <div class="flex flex-col gap-2">
      <TransitionGroup
        tag="div"
        class="relative flex flex-row flex-wrap gap-1 grow center"
        name="list"
      >
        <div v-for="(_digit, i) in ns.digits" :key="i">
          <Digit :index="i" />
        </div>
      </TransitionGroup>
      <div class="flex-row gap-1 center">
        <button
          class="digit-button"
          :title="
            digitMinusDisabled
              ? 'Ale, no tak .. nechte si tu alespoň jednu číslici ._.'
              : 'odebrat číslici'
          "
          @click="ns.removeDigit"
          :disabled="digitMinusDisabled"
        >
          <Minus />
        </button>
        <button
          title="přidat číslici"
          class="digit-button"
          @click="ns.addDigit"
        >
          <Plus />
        </button>
      </div>
    </div>

    <!-- Base -->
    <div class="base-wrap">
      <div class="center">
        <!-- Base number -->
        <Transition name="switch-h" mode="out-in">
          <div
            :title="baseTitle"
            :key="ns.base_purple"
            class="trans number-base pink-grad"
          >
            {{ ns.base_purple }}
          </div>
        </Transition>
      </div>
      <label :title="baseTitle" for="base" class="text-base cursor-help"
        ><span class="text-xs opacity-0">(Base)</span> Základ
        <span class="text-xs opacity-50">(Base)</span></label
      >
      <input
        :title="`Zde můžete změnit základ soustavy.\nmin:   2\nmax:   36`"
        class="opacity-10 hover:opacity-80 focus:opacity-80"
        :value="ns.base_purple"
        :min="ns.MIN_BASE"
        :max="ns.MAX_BASE"
        type="number"
        name="base"
        id="base"
        @change="setBase"
      />

      <div class="base-buttons">
        <button
          :title="
            basePlusDisabled
              ? `[ ${ns.MAX_BASE} ]  je nejvyšší povolený základ`
              : 'Základ + 1'
          "
          :disabled="ns.base_purple >= ns.MAX_BASE"
          @click="increaseBase"
          class="base-button"
        >
          <Plus />
        </button>
        <button
          :title="
            baseMinusDisabled
              ? `[ ${ns.MIN_BASE} ]  je nejmenší povolený základ`
              : 'Základ - 1'
          "
          :disabled="baseMinusDisabled"
          @click="decreaseBase"
          class="base-button"
        >
          <Minus />
        </button>
      </div>
    </div>

    <!-- Controls -->
    <div class="gap-1 center">
      <button
        title="nastaví všechny číslice na nulu"
        @click="ns.setDigitsToZero"
        class="control-button"
      >
        Min
      </button>
      <button
        title="přepíná zobrazení -> indexy řádů / hodnoty řádů"
        @click="ns.showDigitValue = !ns.showDigitValue"
        class="control-button"
      >
        <Eye />
        {{ ns.showDigitValue ? "hodnoty řádů" : "indexy řádů" }}
      </button>
      <button
        title="nastaví všechny číslice na maximum"
        @click="ns.setDigitsToMax"
        class="control-button"
      >
        Max
      </button>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
