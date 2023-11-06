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

const baseTitle = computed(() =>
  ns.t(
    `[ ${ns.base_purple} ]  je základ v této soustavy.
Je to tedy ${ns.name_purple.toLowerCase()}.`,
    `[ ${ns.base_purple} ]  is the base in this number system.
So it's called ${ns.name_purple.toLowerCase()}.`
  )
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
    <div class="digits-wrap">
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
              ? ns.t(
                  'Ale, no tak, nech si tu alespoň jednu číslici 😉',
                  'Oh, come on, keep at least one digit here 😉'
                )
              : ns.t('odebrat číslici', 'remove digit')
          "
          @click="ns.removeDigit"
          :disabled="digitMinusDisabled"
        >
          <Minus />
        </button>
        <button
          :title="ns.t('přidat číslici', 'add digit')"
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
      <label :title="baseTitle" for="base" class="text-base cursor-help">{{
        ns.t("Základ", "Base")
      }}</label>
      <input
        :title="ns.t(`Zde můžete změnit základ soustavy.\nmin:   ${ns.MIN_BASE}\nmax:   ${ns.MAX_BASE}}`, `Here you can change the base of the number system.\nmin:   ${ns.MIN_BASE}\nmax:   ${ns.MAX_BASE}`)"
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
              ? ns.t(
                  `[ ${ns.MAX_BASE} ]  je nejvyšší povolený základ`,
                  `[ ${ns.MAX_BASE} ]  is the highest allowed base`
                )
              : ns.t('Základ + 1', 'Base + 1')
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
              ? ns.t(
                  `[ ${ns.MIN_BASE} ]  je nejmenší povolený základ`,
                  `[ ${ns.MIN_BASE} ]  is the lowest allowed base`
                )
              : ns.t('Základ - 1', 'Base - 1')
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
        :title="
          ns.t('Nastaví všechny číslice na nulu.', 'Set all digits to zero.')
        "
        @click="ns.setDigitsToZero"
        class="control-button"
      >
        Min
      </button>
      <button
        :title="
          ns.t(
            'Přepíná mezi zobrazením hodnot řádů a indexů řádů.',
            'Toggle between displaying positional values and place indices.'
          )
        "
        @click="ns.showDigitValue = !ns.showDigitValue"
        class="control-button"
      >
        <Eye />
        {{
          ns.showDigitValue
            ? ns.t("Hodnoty řádů", "Positional values")
            : ns.t("Indexy řádů", "Place indices")
        }}
      </button>
      <button
        :title="
          ns.t(
            'Nastaví všechny číslice na maximální hodnotu.',
            'Set all digits to their maximum value.'
          )
        "
        @click="ns.setDigitsToMax"
        class="control-button"
      >
        Max
      </button>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
