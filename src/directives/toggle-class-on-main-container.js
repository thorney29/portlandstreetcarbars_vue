export default {
	bind (el, binding) {
		el.__toggleClassOnMainContainer__ = event => {
			if ((el === event.target || el.contains(event.target))) {
				binding.value(event)
			}
		}
		el.addEventListener('click', el.__toggleClassOnMainContainer__)
	},
	unbind (el) {
		el.addEventListener('click', el.__toggleClassOnMainContainer__)
	}
}
