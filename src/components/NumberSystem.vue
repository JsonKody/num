<script setup lang="ts">
import { use_number_system } from "../stores/numberSystem";
import { Base } from "../types/typings";
import Lock from "./icons/Lock.vue";
import LockOpen from "./icons/LockOpen.vue";
import Digit from "./Digit.vue";
import Plus from "./icons/Plus.vue";
import Minus from "./icons/Minus.vue";
import Eye from "./icons/Eye.vue";
import { computed } from "vue";

const numsys = use_number_system();

const set_base = (event: Event) => {
  const value = parseInt((event.target as HTMLInputElement).value);
  if (!value || value < 2 || value > numsys.MAX_BASE) {
    return;
  }
  numsys.set_base(value as Base);
};

const base_title = computed(() =>
  numsys.t_info(
    `[ ${numsys.base_purple} ]  je základ v této soustavy.
Je to tedy ${numsys.name_purple.toLowerCase()}.`,
    `[ ${numsys.base_purple} ]  is the base in this number system.
So it's called ${numsys.name_purple.toLowerCase()}.`
  )
);

const digit_minus_disabled = computed(() => numsys.digits.length < 2);
const base_minus_disabled = computed(
  () => numsys.base_purple <= numsys.MIN_BASE
);
const base_plus_disabled = computed(
  () => numsys.base_purple >= numsys.MAX_BASE
);
</script>

<template>
  <div>
    
    <!-- Digits -->
    <div class="digits-wrap"><div class="absolute right-0 flex flex-col gap-1">
          <button
            class="plus-button"
            aria-label="Remove digit"
            @click="numsys.increase_number"
          >
            <Plus />
          </button>
          <button
            class="minus-button"
            aria-label="Add digit"
            @click="numsys.decrease_number"
          >
            <Minus />
          </button>
        </div>
      <TransitionGroup
        tag="div"
        class="relative flex flex-row flex-wrap gap-1 grow center"
        name="list"
      >
        <div v-for="(_digit, i) in numsys.digits" :key="i">
          <Digit :index="i" />
        </div>
      </TransitionGroup>
      <div class="flex justify-between">
        <div class="center" @click="numsys.lock_digits = !numsys.lock_digits">
          <button
            v-pop:right="
              numsys.t_info(
                'Zamknuto - počet číslic se nebude automaticky snižovat.',
                'Locked - number of digits won\'t automatically decrease.',
                'Zamknuto',
                'Locked'
              )
            "
            class="digit-lock"
            v-if="numsys.lock_digits"
            aria-label="Digit lock"
          >
            <Lock />
          </button>
          <button
            v-pop:right="
              numsys.t_info(
                'Odemknuto - počet číslic bude vždy minimum nutné k vyjádření čísla.',
                'Unlocked - number of digits will always be the minimum necessary to represent the number.',
                'Odemknuto',
                'Unlocked'
              )
            "
            class="digit-lock"
            aria-label="Digit lock"
            v-else
          >
            <LockOpen />
          </button>
        </div>
        <div class="flex gap-1">
          <button
            class="digit-button"
            aria-label="Remove digit"
            v-pop="
              digit_minus_disabled
                ? numsys.t_info(
                    'Ale, no tak, nech si tu alespoň jednu číslici 😉',
                    'Oh, come on, keep at least one digit here 😉'
                  )
                : numsys.t_info('Odebrat číslici', 'Remove digit')
            "
            @click="numsys.remove_digit"
            :disabled="digit_minus_disabled"
          >
            <Minus />
          </button>
          <button
            v-pop="numsys.t_info('Přidat číslici', 'Add digit')"
            class="digit-button"
            aria-label="Add digit"
            @click="numsys.add_digit"
          >
            <Plus />
          </button>
        </div>
        
        <div>
          <Lock class="digit-button invisible" />
        </div>
      </div>
    </div>

    <!-- Base -->
    <div class="base-wrap">
      <!-- Save diod -->
      <div
        v-pop="
          numsys.t_info(
            'Toto je indikátor uložení.',
            'This is the save indicator.',
            'Uloženo',
            'Saved'
          )
        "
        class="m-2 trans absolute top-0 left-0 w-2 h-2 bg-purple-800 rounded-full"
        :class="{
          'opacity-40': numsys.saved,
          'opacity-20': !numsys.saved,
          'cursor-help': numsys.info,
          'cursor-default': !numsys.info,
        }"
      ></div>
      <div class="center">
        <!-- Base number -->
        <Transition name="switch-h" mode="out-in">
          <div
            v-pop="base_title"
            :key="numsys.base_purple"
            class="trans number-base pink-grad"
            :class="{ 'cursor-help': numsys.info }"
          >
            {{ numsys.base_purple }}
          </div>
        </Transition>
      </div>
      <label
        v-pop="base_title"
        for="base"
        :class="{ 'cursor-help': numsys.info }"
        class="text-base"
        >{{ numsys.t("Základ", "Base") }}</label
      >
      <input
        v-pop="
          numsys.t_info(
            `Zde můžete změnit základ soustavy - min:   ${numsys.MIN_BASE}\nmax:   ${numsys.MAX_BASE}`,
            `Here you can change the base of the number system - min:   ${numsys.MIN_BASE}\nmax:   ${numsys.MAX_BASE}`
          )
        "
        class="opacity-10 hover:opacity-80 focus:opacity-80"
        :value="numsys.base_purple"
        :min="numsys.MIN_BASE"
        :max="numsys.MAX_BASE"
        type="number"
        name="base"
        id="base"
        @change="set_base"
      />

      <div class="base-buttons">
        <button
          v-pop:left="
            base_plus_disabled
              ? numsys.t_info(
                  `[ ${numsys.MAX_BASE} ]  je nejvyšší povolený základ.`,
                  `[ ${numsys.MAX_BASE} ]  is the highest allowed base.`
                )
              : numsys.t_info('Základ + 1', 'Base + 1')
          "
          :disabled="numsys.base_purple >= numsys.MAX_BASE"
          @click="numsys.increase_base"
          class="base-button"
          aria-label="Increase base"
        >
          <Plus />
        </button>
        <button
          v-pop:left="
            base_minus_disabled
              ? numsys.t_info(
                  `[ ${numsys.MIN_BASE} ]  je nejmenší povolený základ.`,
                  `[ ${numsys.MIN_BASE} ]  is the lowest allowed base.`
                )
              : numsys.t_info('Základ - 1', 'Base - 1')
          "
          :disabled="base_minus_disabled"
          @click="numsys.decrease_base"
          class="base-button"
          aria-label="Decrease base"
        >
          <Minus />
        </button>
      </div>
    </div>

    <!-- Controls -->
    <div class="gap-1 center">
      <button
        v-pop="
          numsys.t_info(
            'Nastaví všechny číslice na nulu.',
            'Set all digits to zero.'
          )
        "
        @click="numsys.set_digits_to_zero"
        class="control-button"
      >
        Min
      </button>
      <button
        v-pop="
          numsys.t_info(
            'Přepíná mezi zobrazením hodnot řádů a indexů řádů.',
            'Toggle between displaying positional values and place indices.'
          )
        "
        @click="numsys.toggle_digits_val"
        class="control-button"
      >
        <Eye />
        {{
          numsys.show_digits_val
            ? numsys.t("Hodnoty řádů", "Positional values")
            : numsys.t("Indexy řádů", "Place indices")
        }}
      </button>
      <button
        v-pop="
          numsys.t_info(
            'Nastaví všechny číslice na maximální hodnotu.',
            'Set all digits to their maximum value.'
          )
        "
        @click="numsys.set_digits_to_max"
        class="control-button"
      >
        Max
      </button>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
