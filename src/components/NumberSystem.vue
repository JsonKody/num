<script setup lang="ts">
import { useNumberSystem } from "../stores/numberSystem";
import { Base } from "../types/typings";
import Digit from "./Digit.vue";

const ns = useNumberSystem();

const setBase = (event: Event) => {
  const value = parseInt((event.target as HTMLInputElement).value);
  if (!value || value < 2 || value > ns.MAX_BASE) {
    return;
  }
  ns.base = value as Base;
};
</script>

<template>
  <div>
    <!-- Digits -->
    <div class="flex flex-row gap-2">
      <div class="flex-col gap-1 center">
        <button
          title="přidat číslici"
          @click="ns.addDigit"
          class="w-8 h-8 text-2xl button"
        >
          +
        </button>
        <button
          title="odebrat číslici"
          @click="ns.removeDigit"
          class="w-8 h-8 text-2xl button"
        >
          -
        </button>
      </div>
      <TransitionGroup
        tag="div"
        class="relative flex flex-row gap-1 grow center"
        name="list"
      >
        <div v-for="(_digit, i) in ns.digits" :key="i">
          <Digit :index="i" />
        </div>
      </TransitionGroup>
    </div>

    <!-- Base -->
    <div class="center flex flex-col">
      <div class="center">
        <Transition name="fade" mode="out-in">
          <div :key="ns.base" class="number-base red-grad">{{ ns.base }}</div>
        </Transition>
      </div>
      <label :title="`Základ (base) v této soustavě - ${ns.czech}`" for="base" class="text-base"><span class="text-xs opacity-0">(Base)</span> Základ <span class="text-xs opacity-50">(Base)</span></label>
      <input
        class="opacity-10 hover:opacity-80 focus:opacity-80"
        :value="ns.base"
        min="2"
        :max="ns.MAX_BASE"
        type="number"
        name="base"
        id="base"
        @change="setBase"
      />
    </div>

    <!-- Controls -->
    <div class="gap-1 mt-10 center">
      <button
        title="nastaví všechny číslice na nulu"
        @click="ns.setDigitsToZero"
        class="px-3 text-lg button"
      >
        Min
      </button>
      <button
        title="přepíná mezi zobrazením indexů řádů a hodnotami řádů"
        @click="ns.showDigitValue = !ns.showDigitValue"
        class="px-3 text-lg button"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="inline-block mr-1"
          width="38"
          height="38"
          viewBox="0 0 24 24"
          stroke-width="2"
          stroke="currentColor"
          fill="none"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
          <path d="M10 12a2 2 0 1 0 4 0a2 2 0 0 0 -4 0"></path>
          <path
            d="M21 12c-2.4 4 -5.4 6 -9 6c-3.6 0 -6.6 -2 -9 -6c2.4 -4 5.4 -6 9 -6c3.6 0 6.6 2 9 6"
          ></path>
        </svg>
        {{ ns.showDigitValue ? "indexy řádů" : "hodnoty řádů" }}
      </button>
      <button
        title="nastaví všechny číslice na maximum"
        @click="ns.setDigitsToMax"
        class="px-3 text-lg button"
      >
        Max
      </button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
/**
  *  Base number - Fade animation
  */
.fade-enter-active,
.fade-leave-active {
  transition: all 0.15s ease;
}

.fade-enter-from {
  opacity: 0;
  transform: translateX(-30px);
}
.fade-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

/**
  *  List animaniation
  */
.list-move, /* apply transition to moving elements */
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateY(20px);
}

/* ensure leaving items are taken out of layout flow so that moving
   animations can be calculated correctly. */
.list-leave-active {
  position: absolute;
  transform: translateX(80px);
}
</style>
