export default {
	bind (el, binding) {
		el.__FavoriteStatus__ = event => {
			if (el === event.target) {
				binding.value(event)
			}
		}
		document.body.addEventListener('click', el.FavoriteStatus)
		document.body.addEventListener('touch', el.FavoriteStatus)

	},
	unbind (el) {
		document.body.removeEventListener('click', el.FavoriteStatus)
		document.body.removeEventListener('touch', el.FavoriteStatus)
	}
}
