import firebase from 'firebase'
import Vue from 'vue'
import {countObjectProperties} from '@/utils'
// import {makeAppendChildToParentMutation} from '@/store/assetHelpers'
export default {
	namespaced: true,

	state: {
		items: {} // state.threads.items[id]
	},

	getters: {
		barsFavoritesCount: state => id => countObjectProperties(state.items[id].favorites)
		// barsFavoritesCountMinusOne: state => id => countObjectProperties(state.items[id].favorites) - 1,
		// barFavorites: (state, getters, rootState) => id => {
		// 	const user = state.items[id]
		// 	if (user.favorites) {
		// 		return Object.values(rootState.users.items)
		// 		.filter(favorite => user.barId === id)
		// 	}
		// 	return []
		// }
	},

	actions: {
		fetchAllBars ({state, commit}) {
			// console.log('🍸', 'fetched all bars')
			return new Promise((resolve, reject) => {
				firebase.database().ref('bars').once('value', snapshot => {
					const barsObject = snapshot.val()
					Object.keys(barsObject).forEach(barId => {
						const bar = barsObject[barId]
						commit('setItem', {resource: 'bars', id: barId, item: bar}, {root: true})
					})
					resolve(Object.values(state.items))
				})
			})
		},
		createFavorite (context, favorite) {
		const favoriteId = favorite['.key']
		context.commit('setFavorite', {favorite, favoriteId})
		},
		// fetchAllBarFavorites ({state, commit}) {
		// 	console.log('🍸🏆', 'fetched all FAVORITES')
		// 	return new Promise((resolve, reject) => {
		// 		firebase.database().ref('favorites').once('value', snapshot => {
		// 			const favoritesArray = firebase.database().ref('favorites')
		// 			console.log(favoritesArray)
		// 			const favoriteObject = snapshot.val()
		// 			console.log(favoriteObject)
		// 			Object.keys(favoriteObject).forEach(id => {
		// 				const favorite = favoriteObject[id]
		// 				console.log(favorite)
		// 				commit('setItem', {resource: 'favorites', id: id, item: favorite}, {root: true})
		// 			})
		// 			resolve(Object.values(state.items))
		// 		})
		// 	})
		// },
		fetchBar: ({dispatch}, {id}) => dispatch('fetchItem', {resource: 'bars', id, emoji: '🔥 📄'}, {root: true}),
		fetchBars: ({dispatch}, {ids}) => dispatch('fetchItems', {resource: 'bars', emoji: '🌧', ids}, {root: true})
		// fetchFavorite: ({dispatch}, {id}) => dispatch('fetchItem', {resource: 'favorites', id, emoji: '🐶⭐️'}, {root: true}),
		// fetchFavorites: ({dispatch}, {ids}) => dispatch('fetchItems', {resource: 'favorites', emoji: '🐶⭐️⭐️⭐️', ids}, {root: true})

// 	// 	createBarFavorite ({state, commit, dispatch, rootState}, {bar, barId, favorite, fave}) {
// 	// 		return new Promise((resolve, reject) => {
// 	// 			const favoriteId = firebase.database().ref('favorites').push().key
// 	// 			const userId = rootState.auth.authId

// 	// 			const favorite = {fave, barId, userId}
// 	// 			const updates = {}
// 	// 			updates[`favorites/${favoriteId}`] = favorite
// 	// 			updates[`bars/${barId}/favorites/${userId}`] = favoriteId
// 	// 			updates[`users/${userId}/favorites/${barId}`] = favoriteId
// 	// 			firebase.database().ref().update(updates)
// 	// 			.then(() => {
// 	// 				// Update bar
// 	// 				commit('setItem', {resource: 'favorites', id: favoriteId, item: favorite}, {root: true})
// 	// 				console.log('this is after created and set item')
// 	// 				console.log(favoriteId)
// 	// 				resolve(state.items[favoriteId])
// 	// 			})
// 	// 		})
// 	// 	},
// 	// 	deleteBarFavorites ({state, commit, rootState}, {id, userId, barId, favoriteId, fave, favorite}) {
// 	// 		return new Promise((resolve, reject) => {
// 	// 			console.log('favoriteId')
// 	// 			console.log(favoriteId)
// 	// 			console.log('favorite')
// 	// 			console.log(favorite)
// 	// 			console.log('bars: ' + barId + ', ' + 'fave: ' + fave + ',' + 'userId: ' + userId)
// 	// 			firebase.database().ref(`bars/${barId}/favorites/${userId}`).remove()
// 	// 			firebase.database().ref(`users/${userId}/favorites/${barId}`).remove()
// 	// 			firebase.database().ref(`favorites/${favoriteId}`).remove()

// 	// 			.then(() => {
// 	// 			commit('setItem', {resource: 'favorites', item: favorite, id: favoriteId}, {root: true})
// 	// 				// resolve(barId)
// 	// 				resolve(state.items[favoriteId])
// 	// 			})
// 	// 		})
// 		// }
	},
	mutations: {
		setBar (state, {bar, barId}) {
			Vue.set(state.items, barId, bar)
		},
		setFavorite (state, {favorite, favoriteId}) {
			Vue.set(state.favorites, favoriteId, favorite)
		}
	}
}
