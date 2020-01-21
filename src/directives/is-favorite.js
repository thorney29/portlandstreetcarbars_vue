export default {
	bind (el, binding) {
		el.__FavoriteStatus__ = event => {
			if (el === event.target) {
				binding.value(event)
			}
		}
		document.body.addEventListener('click', el.FavoriteStatus)
	},
	unbind (el) {
		document.body.removeEventListener('click', el.FavoriteStatus)
	}
}
