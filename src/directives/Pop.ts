import { Directive, DirectiveBinding } from 'vue'
import type { Placement, Side } from '@floating-ui/dom'
import { computePosition, autoUpdate, flip, shift, offset } from '@floating-ui/dom'

// Rozšíření interface pro HTMLElement
interface PopoverHTMLElement extends HTMLElement {
	_popover?: HTMLElement
	_autoUpdateCleanup?: () => void
	_removeEventListeners?: () => void
}

const scale = 0.7
const time = 0.2
const origins: Record<string, Side> = {
	top: 'bottom',
	right: 'left',
	bottom: 'top',
	left: 'right',
}

/**
 * args: top, right, bottom, left - sets position
 * modifiers: keep - prevents closing on click
 *
 */
export const pop: Directive = {
	mounted(el: PopoverHTMLElement, binding: DirectiveBinding) {
		const new_origin = origins[binding.arg as Side]
		const { keep } = binding.modifiers

		// Funkce pro vytvoření tooltipu
		const createPopover = () => {
			const popover = document.createElement('div')
			popover.textContent = binding.value as string

			// Styly a přechody...
			popover.style.cssText = `
        background-color: rgba(0, 0, 0, 0.7);
        color: white;
        border-radius: 5px;
        padding: 2px 8px;
        white-space: nowrap; /* Zajistíme, aby se text nezalamoval */
        transition: opacity ${time}s, transform ${time}s;
        opacity: 0;
        transform: scale(${scale});
        transform-origin: ${new_origin}; /* Nastavíme původ transformace */
        will-change: transform; /* Optimalizace pro transformaci */
        pointer-events: none;
        position: absolute;
		  font-size: 16px;
        z-index: 999;
      `
			popover.style.display = 'none'
			document.body.prepend(popover)
			el._popover = popover
		}

		// Funkce pro aktualizaci pozice
		const updatePopoverPosition = async () => {
			const placement = (binding.arg || 'bottom') as Placement

			if (el._popover) {
				await computePosition(el, el._popover, {
					// Přidáme middleware
					placement,
					middleware: [offset(8), flip(), shift({ padding: 8 })],
				}).then(({ x, y, placement }) => {
					if (el._popover) {
						const new_placement = origins[placement]
						el._popover.style.transformOrigin = new_placement
					}

					Object.assign(el._popover!.style, {
						top: `${y}px`,
						left: `${x}px`,
					})
				})
			}
		}
		createPopover()

		// Zobrazení tooltipu
		const showPopover = () => {
			updatePopoverPosition()
			const popover = el._popover!
			if (popover.textContent !== '') {
				el._popover!.style.display = 'inline-block'
			}
			// Zařídíte, že prohlížeč "vidí" změnu a začne animaci
			void el._popover!.offsetWidth
			el._popover!.style.opacity = '1'
			el._popover!.style.transform = 'scale(1)'
			el._autoUpdateCleanup = autoUpdate(el, popover as HTMLElement, updatePopoverPosition)
		}

		// Skrytí tooltipu
		const hidePopover = () => {
			if (el._popover) {
				el._popover.style.opacity = '0'
				el._popover.style.transform = `scale(${scale})`
				if (el._autoUpdateCleanup) {
					el._autoUpdateCleanup()
					el._autoUpdateCleanup = undefined
				}
			}
		}

		// Zavření tooltipu při kliknutí
		const clickHandler = () => {
			if (!keep) {
				hidePopover()
			}
		}

		// Přidání posluchačů událostí
		el.addEventListener('click', clickHandler)
		el.addEventListener('mouseenter', showPopover)
		el.addEventListener('mouseleave', hidePopover)

		// Uložení funkce pro odstranění posluchačů událostí
		el._removeEventListeners = () => {
			el.removeEventListener('mouseenter', showPopover)
			el.removeEventListener('mouseleave', hidePopover)
			el.removeEventListener('click', clickHandler)
		}
	},
	updated(el: PopoverHTMLElement, binding: DirectiveBinding) {
		if (el._popover) {
			el._popover.textContent = binding.value as string
		}

		if (binding.value === '') {
			el._popover!.style.display = 'none'
		} else {
			el._popover!.style.display = 'inline-block'
		}
	},
	beforeUnmount(el: PopoverHTMLElement) {
		el._removeEventListeners?.()
		el._popover?.remove()
	},
}
