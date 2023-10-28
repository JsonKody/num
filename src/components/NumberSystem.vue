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
      <div class="center flex-col gap-1">
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
        class="relative grow center flex flex-row gap-1"
        name="list"
      >
        <div v-for="(_digit, i) in ns.digits" :key="i">
          <Digit :index="i" />
        </div>
      </TransitionGroup>
    </div>

    <!-- Base -->
    <div class="m-8 center">
      <label for="base">Base</label>
      <input
        min="2"
        :max="ns.MAX_BASE"
        type="number"
        name="base"
        id="base"
        @change="setBase"
      />
    </div>

    <!-- Controls -->
    <div class="center gap-1 mt-10">
      <button
        title="nastaví všechny číslice na nulu"
        @click="ns.setDigitsToZero"
        class="px-3 text-lg button"
      >
        Vynulovat čísla
      </button>
      <button
        title="přepíná mezi zobrazením indexů číslic a hodnotami řádů"
        @click="ns.showDigitValue = !ns.showDigitValue"
        class="px-3 text-lg button"
      >
        {{
          ns.showDigitValue
            ? "Zobrazit indexy číslic"
            : "Zobrazit hodnoty číslic"
        }}
      </button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
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
