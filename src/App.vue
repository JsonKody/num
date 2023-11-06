<script setup lang="ts">
import NumberSystem from "./components/NumberSystem.vue";
import { useNumberSystem } from "./stores/numberSystem";

const ns = useNumberSystem();
</script>

<template>
  <a
    target="_blank"
    title="Github"
    href="https://github.com/JsonKody/ciselne_pozicni_soustavy"
    class="github-icon"
  >
    <svg
      height="38"
      width="38"
      aria-hidden="true"
      viewBox="0 0 16 16"
      fill="currentColor"
      version="1.1"
      data-view-component="true"
    >
      <path
        d="M8 0c4.42 0 8 3.58 8 8a8.013 8.013 0 0 1-5.45 7.59c-.4.08-.55-.17-.55-.38 0-.27.01-1.13.01-2.2 0-.75-.25-1.23-.54-1.48 1.78-.2 3.65-.88 3.65-3.95 0-.88-.31-1.59-.82-2.15.08-.2.36-1.02-.08-2.12 0 0-.67-.22-2.2.82-.64-.18-1.32-.27-2-.27-.68 0-1.36.09-2 .27-1.53-1.03-2.2-.82-2.2-.82-.44 1.1-.16 1.92-.08 2.12-.51.56-.82 1.28-.82 2.15 0 3.06 1.86 3.75 3.64 3.95-.23.2-.44.55-.51 1.07-.46.21-1.61.55-2.33-.66-.15-.24-.6-.83-1.23-.82-.67.01-.27.38.01.53.34.19.73.9.82 1.13.16.45.68 1.31 2.69.94 0 .67.01 1.3.01 1.49 0 .21-.15.45-.55.38A7.995 7.995 0 0 1 0 8c0-4.42 3.58-8 8-8Z"
      ></path>
    </svg>
  </a>
  <div class="wrapper">
    <!-- Display block / Switch -->
    <div
      @click="ns.switchGreenPurple"
      class="header-block"
      :title="ns.t('Kliknutim prohodíš hodnoty', 'Click to switch values')"
    >
      <!-- title -->
      <Transition name="switch-v" mode="out-in">
        <div :key="ns.name_green">
          <h1 class="header emerald-grad">
            {{ ns.name_green }}
          </h1>
        </div>
      </Transition>
      <!-- number -->
      <Transition name="push" mode="out-in">
        <div :key="ns.digitsToGreenStrNumber" class="number emerald-grad">
          <span
            class="cursor-help"
            :title="
              ns.t('Číslo v ... ', 'Number in ... ') +
              ns.name_green.toLocaleLowerCase()
            "
            >{{ ns.digitsToGreenStrNumber }}</span
          >
        </div>
      </Transition>

      <!-- title -->
      <Transition name="switch-v" mode="out-in">
        <div :key="ns.name_purple">
          <h1 class="header relative purple-grad">
            {{ ns.name_purple }}
          </h1>
          <!-- <div
            v-if="ns.lang === 'cs'"
            class="text-xs center text-purple-400 opacity-70"
          >
            ( {{ ns.en_name }} )
          </div> -->
        </div>
      </Transition>
      <!-- number -->
      <Transition name="push" mode="out-in">
        <div :key="ns.digitsToPurpleStrNumber" class="number purple-grad">
          <span
            class="cursor-help"
            :title="
              ns.t('Číslo v ... ', 'Number in ... ') +
              ns.name_purple.toLocaleLowerCase()
            "
            >{{ ns.digitsToPurpleStrNumber }}</span
          >
        </div>
      </Transition>
    </div>

    <NumberSystem />

    <div class="footer-link cursor-pointer">
      <a
        target="_blank"
        href="https://www.youtube.com/jsonkody"
        title="Můj YouTube kanál - JsonKody 🤌🧐🍷"
      >
        JsonKody
      </a>
    </div>
  </div>
  <div
    class="trans m-3.5 flex items-center justify-center gap-2 absolute bottom-0 right-0 sm:opacity-40 sm:hover:opacity-80"
  >
    <!-- sm:opacity-50 sm:hover:opacity-100 -->
    <div
      @click="ns.toggleLang"
      class="flag-button cs"
      title="Čeština"
      :class="{
        'fb-active': ns.lang === 'cs',
        'fb-off': ns.lang === 'en',
      }"
    ></div>
    <div
      @click="ns.toggleLang"
      class="flag-button en"
      title="English"
      :class="{
        'fb-active': ns.lang === 'en',
        'fb-off': ns.lang === 'cs',
      }"
    ></div>
  </div>
</template>

<style lang="scss">
/**
  *  Switch vertical animation
  */
.switch-v-enter-active,
.switch-v-leave-active {
  transition: all 0.12s ease-in-out;
}

.switch-v-enter-from {
  opacity: 0;
  transform: translateY(-20px);
}
.switch-v-leave-to {
  opacity: 0;
  transform: translateY(20px);
}

/**
  *  Switch horizontal animation
  */
.switch-h-enter-active,
.switch-h-leave-active {
  transition: all 0.12s ease-in-out;
}

.switch-h-enter-from {
  opacity: 0;
  transform: translateX(-30px);
}
.switch-h-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

/**
  *  "Push" switching animation
  */
.push-enter-active,
.push-leave-active {
  transition: all 0.12s ease-in-out;
}

.push-enter-from {
  transform: scale(0.96);
}
.push-leave-to {
  transform: scale(0.96);
}

/**
  *  "Pop" switching animation
  */
// .pop-enter-active,
// .pop-leave-active {
//   transition: all 0.12s ease-in-out;
// }

// .pop-enter-from {
//   transform: scale(1.03);
// }
// .pop-leave-to {
//   transform: scale(1.03);
// }

/**
  *  List animation
  */
.list-move, /* apply transition to moving elements */
.list-enter-active,
.list-leave-active {
  transition: all 0.24s ease;
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
