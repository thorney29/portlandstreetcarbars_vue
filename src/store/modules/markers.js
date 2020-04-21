import firebase from 'firebase'

export default {
	namespaced: true,

	state: {
		items: {} // state.threads.items[id]
	},

	actions: {
		fetchAllMarkers ({state, commit}) {
			console.log('🔥', '🗂', 'all')
			return new Promise((resolve, reject) => {
				firebase.database().ref('markers').once('value', snapshot => {
					const markersObject = snapshot.val()
					Object.keys(markersObject).forEach(markerId => {
						const marker = markersObject[markerId]
						commit('setItem', {resource: 'markers', id: markerId, item: marker}, {root: true})
					})
					resolve(Object.values(state.items))
				})
			})
		},
		fetchMarker: ({dispatch}, {id}) => dispatch('fetchItem', {resource: 'markers', id, emoji: '🔥 👮🏽‍♂️'}, {root: true}),
		fetchMarkers: ({dispatch}, {ids}) => dispatch('fetchItems', {resource: 'markers', emoji: '🔥🗂', ids}, {root: true})
	}
}
