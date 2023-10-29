<script setup lang="ts">
import { useNumberSystem } from "../stores/numberSystem";
import { Base } from "../types/typings";
import Digit from "./Digit.vue";
import Plus from "./icons/Plus.vue";
import Minus from "./icons/Minus.vue";
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
    `Základ v této soustavy je:
                            ${ns.base}
Je to tedy ${ns.czech.toLowerCase()}.`
);
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
          title="odebrat číslici"
          @click="ns.removeDigit"
          class="w-6 h-6 text-xl center button"
        >
          <Minus />
        </button>
        <button
          title="přidat číslici"
          @click="ns.addDigit"
          class="w-6 h-6 text-xl center button"
        >
          <Plus />
        </button>
      </div>
    </div>

    <!-- Base -->
    <div class="base-wrap">
      <div class="center">
        <Transition name="fade" mode="out-in">
          <div :title="baseTitle" :key="ns.base" class="number-base red-grad">
            {{ ns.base }}
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
        :value="ns.base"
        :min="ns.MIN_BASE"
        :max="ns.MAX_BASE"
        type="number"
        name="base"
        id="base"
        @change="setBase"
      />
    </div>

    <!-- Controls -->
    <div class="gap-1 center">
      <button
        title="nastaví všechny číslice na nulu"
        @click="ns.setDigitsToZero"
        class="button control-button"
      >
        Min
      </button>
      <button
        title="přepíná zobrazení -> indexy řádů / hodnoty řádů"
        @click="ns.showDigitValue = !ns.showDigitValue"
        class="button control-button"
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
        {{ ns.showDigitValue ? "hodnoty řádů" : "indexy řádů" }}
      </button>
      <button
        title="nastaví všechny číslice na maximum"
        @click="ns.setDigitsToMax"
        class="button control-button"
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
