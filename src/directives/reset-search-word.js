export default {
	bind (el, binding) {
		el.__ClickOutsideHandler__ = event => {
			if ((el === event.target || el.contains(event.target))) {
				binding.value(event)
			}
		}
		el.body.addEventListener('click', el.__ClickOutsideHandler__)
	},
	unbind (el) {
		el.body.removeEventListener('click', el.__ClickOutsideHandler__)
	}
}