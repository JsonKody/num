<script setup lang="ts">
import NumberSystem from "./components/NumberSystem.vue";
import Info from "./components/icons/Info.vue";
import InfoOff from "./components/icons/InfoOff.vue";
import { use_number_system } from "./stores/numberSystem";

const ns = use_number_system();

const digits_keys: Record<string, number> = {
  Digit0: 0,
  Digit9: 1,
  Digit8: 2,
  Digit7: 3,
  Digit6: 4,
  Digit5: 5,
  Digit4: 6,
  Digit3: 7,
  Digit2: 8,
  Digit1: 9,
};

document.addEventListener("keypress", (e) => {
  if (
    [
      "KeyI",
      "KeyJ",
      "KeyK",
      "KeyL",
      "KeyD",
      "KeyN",
      "KeyM",
      "Space",
      "Comma",
      "Period",
      "Minus",
      "Equal",
      "Backspace",
    ].includes(e.code)
  ) {
    e.preventDefault();
  }

  if (e.code === "KeyI") {
    ns.info = !ns.info;
  }

  if (e.code === "KeyL" || e.code === "KeyJ") {
    ns.toggle_lang();
  }

  if (e.code === "Space") {
    ns.switch_green_purple();
  }

  if (e.code === "Comma") {
    ns.decrease_base();
  }

  if (e.code === "Period") {
    ns.increase_base();
  }

  if (e.code === "Minus") {
    ns.remove_digit();
  }

  if (e.code === "Equal") {
    ns.add_digit();
  }

  if (e.code === "KeyD") {
    ns.toggle_digits_val();
  }

  if (e.code === "KeyK") {
    ns.lock_digits = !ns.lock_digits;
  }

  if (e.code === "KeyN") {
    ns.set_digits_to_zero();
  }

  if (e.code === "KeyM") {
    ns.set_digits_to_max();
  }

  if (e.code === "Escape") {
    e.preventDefault();
    alert("Reset");
    ns.reset();
  }

  // Zkontrolujte, zda fokus není na vstupním poli
  const activeElement = document.activeElement;
  if (activeElement && activeElement.tagName === "INPUT") {
    // Pokud je fokus na inputu, ignorujte klávesové zkratky
    return;
  }

  if (digits_keys.hasOwnProperty(e.code)) {
    const digit_index = digits_keys[e.code];
    ns.toggle_digit_min_max(digit_index);
  }
});

// testing TOOLPOP
// import { ref } from "vue";

// const count = ref(0);
// const img_1 = `<img src="https://bekinka.cz/images/logo_smile.webp">`;
// const img_2 = `<img src="https://bekinka.cz/images/art/thumb/32_boo.avif" style="border-radius: 99999px; border: 4px solid PaleGreen;">`;

// // lightweight i18n - in real project you should use Pinia store
// const lang = ref<"en" | "cs">("en");

// const $t = (en: string, cs: string) => {
//   return lang.value === "en" ? en : cs;
// };

// const toggleLang = () => {
//   lang.value = lang.value === "cs" ? "en" : "cs";
// };
</script>

<template>
  <a
    target="_blank"
    v-pop="'Github'"
    href="https://github.com/JsonKody/ciselne_pozicni_soustavy"
    class="github-icon"
    aria-label="link to this project on Github"
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
    <!-- testing TOOLPOP -->
    <!--
    <button v-pop="`count is ${count}`" @click="count += 1">
      counter ({{ count }})
    </button>

   
    <p v-pop="'Simple tooltip'">Hover me</p>

    <p v-pop.html="img_1">html -> bekinka</p>

    <p v-pop:bottom.html="img_2">html -> boo</p>

    {{ $t("ahoj", "hello") }}

    <p v-pop:right="`lang: ${lang}`">lang: {{ lang }}</p>

    <h2
      v-pop="
        $t('Does it update on language change?', 'Mění se to při změně jazyka?')
      "
    >
      {{ $t("Testing languages", "Testuji jazyky") }}
    </h2>

    <button
      @click="toggleLang"
      v-pop:bottom="$t('Click to toggle language', 'Kliknutím změň jazyk')"
    >
      {{ $t("Toggle lang", "Změň jazyk") }}: {{ lang }} -&gt;
      {{ lang === "cs" ? "en" : "cs" }}
    </button>-->
    <!-- testing TOOLPOP -->

    <!-- Display block / Switch -->
    <div
      @click="ns.switch_green_purple"
      class="header-block"
      v-pop:top="
        ns.t_info('Kliknutím prohodíš hodnoty.', 'Click to switch values.')
      "
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
        <div
          :key="ns.digits_to_green_str_num + '_g'"
          class="number emerald-grad"
        >
          <span
            :class="ns.info ? 'cursor-help' : ''"
            v-pop:bottom="
              ns.t_info(
                `Číslo v - ${ns.name_green.toLocaleLowerCase()}`,
                `Number in - ${ns.name_green.toLocaleLowerCase()}`
              )
            "
            >{{ ns.digits_to_green_str_num }}</span
          >
        </div>
      </Transition>

      <!-- title -->
      <Transition name="switch-v" mode="out-in">
        <div :key="ns.name_purple">
          <h1 class="header relative purple-grad">
            {{ ns.name_purple }}
          </h1>
        </div>
      </Transition>
      <!-- number -->
      <Transition name="push" mode="out-in">
        <div
          :key="ns.digits_to_purple_str_num + '_p'"
          class="number purple-grad"
        >
          <span
            :class="ns.info ? 'cursor-help' : ''"
            v-pop:bottom="
              ns.t_info(
                `Číslo v - ${ns.name_purple.toLocaleLowerCase()}`,
                `Number in - ${ns.name_purple.toLocaleLowerCase()}`
              )
            "
            >{{ ns.digits_to_purple_str_num }}</span
          >
        </div>
      </Transition>
    </div>

    <NumberSystem />

    <div class="flex justify-center items-center">
      <a
        class="footer-link cursor-pointer"
        target="_blank"
        href="https://jsonkody.cz"
        v-pop="'JsonKody 🤌🧐🍷'"
      >
        JsonKody
      </a>
    </div>
  </div>

  <!-- Info switch -->
  <div class="m-3 sm:m-2 absolute bottom-0 left-0">
    <div
      v-pop:top="ns.t_info('Vypnout popisky', 'Hide info labels')"
      @click="ns.info = false"
      v-if="ns.info"
      class="app-info"
    >
      <Info />
    </div>
    <div
      v-pop:top="ns.t('Zapnout popisky', 'Show info labels')"
      @click="ns.info = true"
      v-else
      class="app-info"
    >
      <InfoOff />
    </div>
  </div>
  <div
    class="trans m-3.5 center gap-2 absolute bottom-0 right-0 sm:opacity-40 sm:hover:opacity-80"
  >
    <!-- sm:opacity-50 sm:hover:opacity-100 -->
    <div
      @click="ns.toggle_lang"
      class="flag-button cs"
      v-pop:top="'Čeština'"
      :class="{
        'fb-active': ns.lang === 'cs',
        'fb-off': ns.lang === 'en',
      }"
    ></div>
    <div
      @click="ns.toggle_lang"
      class="flag-button en"
      v-pop:top="'English'"
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
