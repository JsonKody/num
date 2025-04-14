import type { Directive, DirectiveBinding } from "vue";
import type { Placement, Side } from "@floating-ui/dom";
import {
  computePosition,
  autoUpdate,
  flip,
  shift,
  offset,
} from "@floating-ui/dom";

interface PopoverHTMLElement extends HTMLElement {
  _popover?: HTMLElement;
  _autoUpdateCleanup?: () => void;
  _removeEventListeners?: () => void;
  _hideTimeout?: number;
  _binding?: DirectiveBinding;
}

const scale_from = 0.75;
const time = 0.2;
const origins: Record<string, Side> = {
  top: "bottom",
  right: "left",
  bottom: "top",
  left: "right",
};

function unwrap(val: unknown): string {
  if (typeof val === "function") {
    return unwrap((val as Function)());
  }
  if (typeof val === "object" && val !== null && "value" in val) {
    return unwrap((val as { value: unknown }).value);
  }
  return String(val ?? "");
}

export const pop: Directive = {
  mounted(el: PopoverHTMLElement, binding: DirectiveBinding) {
    const placement = (binding.arg || "top") as Placement;
    const origin = origins[placement] || "top";
    const { click } = binding.modifiers;
    el._binding = binding;

    const createPopover = () => {
      const popover = document.createElement("div");

      const content = unwrap(el._binding?.value);
      if (el._binding?.modifiers.html) {
        popover.innerHTML = content;
      } else {
        popover.textContent = content;
        popover.style.cssText += `
          background-color: rgba(0, 0, 0, 0.7);
          backdrop-filter: blur(14px);
          color: white;
          border-radius: 5px;
          border: 1px solid rgba(255, 255, 255, 0.6);
          padding: 1px 9px 0 9px;
        `;
      }

      popover.style.cssText += `
        transition: opacity ${time}s, transform ${time}s;
        opacity: 0;
        transform: scale(${scale_from});
        transform-origin: ${origin};
        pointer-events: none;
        position: absolute;
        font-size: 16px;
        z-index: 999;
        max-width: 42rem;
        display: inline-block;
      `;

      document.body.appendChild(popover);
      el._popover = popover;
    };

    const showPopover = () => {
      if (el._hideTimeout) clearTimeout(el._hideTimeout);
      if (!el._popover) createPopover();

      const popover = el._popover!;
      const content = unwrap(el._binding?.value);
      if (el._binding?.modifiers.html) {
        popover.innerHTML = content;
      } else {
        popover.textContent = content;
      }

      // const popover = el._popover!;
      // // popover.textContent = unwrap(binding.value);

      computePosition(el, popover, {
        placement,
        middleware: [offset(8), flip(), shift({ padding: 8 })],
      }).then(({ x, y, placement }) => {
        popover.style.top = `${y}px`;
        popover.style.left = `${x}px`;
        popover.style.transformOrigin = origins[placement] || "top";
      });

      // Animate in
      requestAnimationFrame(() => {
        popover.style.opacity = "1";
        popover.style.transform = "scale(1)";
      });

      el._autoUpdateCleanup = autoUpdate(el, popover, () => {
        computePosition(el, popover, {
          placement,
          middleware: [offset(8), flip(), shift({ padding: 8 })],
        }).then(({ x, y, placement }) => {
          popover.style.top = `${y}px`;
          popover.style.left = `${x}px`;
          popover.style.transformOrigin = origins[placement] || "top";
        });
      });
    };

    const hidePopover = () => {
      if (!el._popover) return;
      const popover = el._popover;

      popover.style.opacity = "0";
      popover.style.transform = `scale(${scale_from})`;

      if (el._autoUpdateCleanup) {
        el._autoUpdateCleanup();
        el._autoUpdateCleanup = undefined;
      }

      el._hideTimeout = window.setTimeout(() => {
        popover.remove();
        el._popover = undefined;
      }, time * 1000);
    };

    const clickHandler = () => {
      showPopover();
    };

    if (!click) {
      el.addEventListener("mouseenter", showPopover);
      el.addEventListener("mouseleave", hidePopover);
    } else {
      el.addEventListener("click", clickHandler);
    }

    el._removeEventListeners = () => {
      el.removeEventListener("mouseenter", showPopover);
      el.removeEventListener("mouseleave", hidePopover);
      el.removeEventListener("click", clickHandler);
    };
  },

  updated(el: PopoverHTMLElement, binding: DirectiveBinding) {
    // if (el._popover && binding.value) {
    //   el._popover.textContent = unwrap(binding.value);
    // }
    el._binding = binding;
    if (el._popover) {
      const content = unwrap(binding.value);
      if (binding.modifiers.html) {
        el._popover.innerHTML = content;
      } else {
        el._popover.textContent = content;
      }
    }
  },

  beforeUnmount(el: PopoverHTMLElement) {
    el._removeEventListeners?.();
    if (el._popover) {
      el._popover.remove();
      el._popover = undefined;
    }
  },
};
