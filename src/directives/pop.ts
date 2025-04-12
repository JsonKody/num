/**
 * Usage:
 * v-pop:[top|right|bottom|left].[click|html|interactive]
 */

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
  _timeout?: ReturnType<typeof setTimeout>;
}

const scale = 0.7;
const time = 0.2;
const CLOSE_DELAY = 500;

const origins: Record<string, Side> = {
  top: "bottom",
  right: "left",
  bottom: "top",
  left: "right",
};

function setContent(binding: DirectiveBinding, popover: HTMLElement) {
  const val = typeof binding.value === "function" ? binding.value() : binding.value;
  if (binding.modifiers.html || typeof val === "function") {
    popover.innerHTML =
      typeof val === "function" ? val() : val?.toString().trim() || "";
  } else {
    popover.textContent = val?.toString().trim() || "";
  }
}

export const pop: Directive = {
  mounted(el: PopoverHTMLElement, binding: DirectiveBinding) {
    const placement = (binding.arg || "top") as Placement;
    const modifiers = binding.modifiers;
    const isClick = !!modifiers.click;
    const isHtml = !!modifiers.html;
    const isInteractive = !!modifiers.interactive;
    const origin = origins[placement.split("-")[0]] || "top";

    const createPopover = () => {
      const popover = document.createElement("div");
      setContent(binding, popover);

      // Base shared styles (animation, transform, positioning, etc.)
      popover.style.cssText = `
        transition: opacity ${time}s, transform ${time}s;
        opacity: 0;
        transform: scale(${scale});
        transform-origin: ${origin};
        will-change: transform, opacity;
        pointer-events: ${isInteractive ? "auto" : "none"};
        position: absolute;
        z-index: 999;
        display: none;
        overflow: hidden;
      `;

      // Additional visual styles for non-html (styled) tooltips
      if (!isHtml) {
        popover.style.cssText += `
          background: rgba(0,0,0,0.7);
          backdrop-filter: blur(14px);
          color: white;
          border-radius: 5px;
          border: 1px solid rgba(255,255,255,0.4);
          padding: 1px 9px 0 9px;
          font-size: 16px;
          max-width: 42rem;
        `;
      }

      document.body.appendChild(popover);
      el._popover = popover;

      if (isInteractive) {
        popover.addEventListener("mouseenter", clearTimeoutHandler);
        popover.addEventListener("mouseleave", delayedHide);
      }
    };

    const destroyPopover = () => {
      el._popover?.remove();
      el._popover = undefined;
    };

    const updatePosition = async () => {
      if (el._popover) {
        const {
          x,
          y,
          placement: finalPlacement,
        } = await computePosition(el, el._popover, {
          placement,
          middleware: [offset(8), flip(), shift({ padding: 8 })],
        });

        el._popover.style.transformOrigin =
          origins[finalPlacement.split("-")[0]];
        Object.assign(el._popover.style, { top: `${y}px`, left: `${x}px` });
      }
    };

    const showPopover = () => {
      clearTimeout(el._timeout);
      if (!el._popover) createPopover();
      setContent(binding, el._popover!);
      updatePosition();
      el._popover!.style.display = "inline-block";
      void el._popover!.offsetWidth;
      el._popover!.style.opacity = "1";
      el._popover!.style.transform = "scale(1)";
      el._autoUpdateCleanup = autoUpdate(el, el._popover!, updatePosition);
      document.addEventListener("click", clickOutsideHandler);
      document.addEventListener("close-popover", hidePopover, { once: true });
    };

    const hidePopover = () => {
      clearTimeout(el._timeout);
      if (el._popover) {
        el._popover.style.opacity = "0";
        el._popover.style.transform = `scale(${scale})`;
        setTimeout(() => destroyPopover(), time * 1000);
        if (el._autoUpdateCleanup) {
          el._autoUpdateCleanup();
          el._autoUpdateCleanup = undefined;
        }
        document.removeEventListener("click", clickOutsideHandler);
      }
    };

    const delayedHide = () => {
      clearTimeout(el._timeout);
      el._timeout = setTimeout(hidePopover, CLOSE_DELAY);
    };

    const clearTimeoutHandler = () => clearTimeout(el._timeout);

    const clickHandler = (e: MouseEvent) => {
      e.stopPropagation();
      if (el._popover?.style.opacity === "1") hidePopover();
      else showPopover();
    };

    const clickOutsideHandler = (e: MouseEvent) => {
      if (
        !el.contains(e.target as Node) &&
        !el._popover?.contains(e.target as Node)
      ) {
        hidePopover();
      }
    };

    if (isClick) {
      el.addEventListener("click", clickHandler);
      el.addEventListener(
        "mouseleave",
        isInteractive ? delayedHide : hidePopover
      );
      el.addEventListener("mouseenter", clearTimeoutHandler);
    } else {
      el.addEventListener("mouseenter", showPopover);
      el.addEventListener(
        "mouseleave",
        isInteractive ? delayedHide : hidePopover
      );
    }

    el._removeEventListeners = () => {
      el.removeEventListener("click", clickHandler);
      el.removeEventListener("mouseenter", showPopover);
      el.removeEventListener("mouseleave", hidePopover);
      el.removeEventListener("mouseleave", delayedHide);
      el.removeEventListener("mouseenter", clearTimeoutHandler);
      document.removeEventListener("click", clickOutsideHandler);
      destroyPopover();
    };
  },

  updated(el: PopoverHTMLElement, binding: DirectiveBinding) {
    if (el._popover) setContent(binding, el._popover);
  },

  beforeUnmount(el: PopoverHTMLElement) {
    el._removeEventListeners?.();
  },
};
