import { Directive, DirectiveBinding } from "vue";
import type { Placement } from "@floating-ui/dom";
import {
  computePosition,
  autoUpdate,
  flip,
  shift,
  offset,
} from "@floating-ui/dom";

// Rozšíření interface pro HTMLElement
interface PopoverHTMLElement extends HTMLElement {
  _popover?: HTMLElement;
  _autoUpdateCleanup?: () => void;
  _removeEventListeners?: () => void;
}

export const pop: Directive = {
  mounted(el: PopoverHTMLElement, binding: DirectiveBinding) {
    // Funkce pro vytvoření tooltipu
    const createPopover = () => {
      const popover = document.createElement("div");
      popover.textContent = binding.value as string;
      // Styly a přechody...
      popover.style.cssText = `
        background-color: rgba(0, 0, 0, 0.7);
        color: white;
        border-radius: 4px;
        padding: 3px 8px;
        white-space: nowrap; /* Zajistíme, aby se text nezalamoval */
        transition: opacity 0.25s, transform 0.25s;
        opacity: 0;
        transform: scale(0.9);
        transform-origin: center; /* Nastavíme původ transformace */
        will-change: transform; /* Optimalizace pro transformaci */
        pointer-events: none;
        position: absolute;
		font-size: 15px;
        z-index: 999;
      `;
      popover.classList.add("hidden");
      document.body.appendChild(popover);
      el._popover = popover;
    };

    // Funkce pro aktualizaci pozice
    const updatePopoverPosition = async () => {
      const placement = (binding.arg || "bottom") as Placement;

      if (el._popover) {
        await computePosition(el, el._popover, {
          // Přidáme middleware
          placement,

          // fallbackPlacements: ['bottom', 'top', 'left'],
          middleware: [offset(5), flip(), shift({ padding: 8 })],
        }).then(({ x, y }) => {
          Object.assign(el._popover!.style, {
            top: `${y}px`,
            left: `${x}px`,
          });
        });
      }
    };
    createPopover();

    // Zobrazení tooltipu
    const showPopover = () => {
      updatePopoverPosition();
      const popover = el._popover!;
      if (binding.value !== "") {
        el._popover!.classList.remove("hidden");
      }
      // Zařídíte, že prohlížeč "vidí" změnu a začne animaci
      void el._popover!.offsetWidth;
      el._popover!.style.opacity = "1";
      el._popover!.style.transform = "scale(1)";
      el._autoUpdateCleanup = autoUpdate(
        el,
        popover as HTMLElement,
        updatePopoverPosition
      );
    };

    // Skrytí tooltipu
    const hidePopover = () => {
      if (el._popover) {
        el._popover.style.opacity = "0";
        el._popover.style.transform = "scale(0.9)";
        if (el._autoUpdateCleanup) {
          el._autoUpdateCleanup();
          el._autoUpdateCleanup = undefined;
        }
      }
    };

    // Přidání posluchačů událostí
    el.addEventListener("mouseenter", showPopover);
    el.addEventListener("mouseleave", hidePopover);

    // Uložení funkce pro odstranění posluchačů událostí
    el._removeEventListeners = () => {
      el.removeEventListener("mouseenter", showPopover);
      el.removeEventListener("mouseleave", hidePopover);
    };
  },
  updated(el: PopoverHTMLElement, binding: DirectiveBinding) {
    if (el._popover) {
      el._popover.textContent = binding.value as string;
    }

    const el_class = el._popover?.classList;
    binding.value === "" ? el_class?.add("hidden") : el_class?.remove("hidden");
  },
  beforeUnmount(
    el: HTMLElement & {
      _popover?: HTMLElement;
      _removeEventListeners?: () => void;
    }
  ) {
    el._removeEventListeners?.();
    el._popover?.remove();
  },
};
