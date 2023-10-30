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
    `[ ${ns.base} ]  je základ v této soustavy.
Je to tedy ${ns.czech.toLowerCase()}.`
);

const increaseBase = () => {
  if (ns.base < ns.MAX_BASE) {
    ns.setBase((ns.base + 1) as Base);
  }
};

const decreaseBase = () => {
  if (ns.base > ns.MIN_BASE) {
    ns.setBase((ns.base - 1) as Base);
  }
};
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
          class="digit-button"
        >
          <Minus />
        </button>
        <button
          title="přidat číslici"
          @click="ns.addDigit"
          class="digit-button"
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

      <div class="base-buttons">
        <button
          title="Základ + 1"
          :disabled="ns.base >= ns.MAX_BASE"
          @click="increaseBase"
          class="base-button"
        >
          <Plus />
        </button>
        <button
          title="Základ - 1"
          :disabled="ns.base <= ns.MIN_BASE"
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
