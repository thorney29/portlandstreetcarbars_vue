import Vue from 'vue'

export default {
	setItem (state, {item, id, resource}) {
		item['.key'] = id
		// console.log('id: ' + item['.key'])
		// console.log(item)
		// console.log('resource: ' + resource)
		Vue.set(state[resource].items, id, item)
	}
}
