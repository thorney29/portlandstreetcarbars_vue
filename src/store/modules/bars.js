// import {countObjectProperties} from '@/utils'
import firebase from 'firebase'
import Vue from 'vue'
import {makeAppendChildToParentMutation} from '@/store/assetHelpers'
export default {
	namespaced: true,

	state: {
		items: {}
	},
	getters: {
		barFavoritesCount: (state, getters, rootState) => id => {
			const bar = state.items[id]
			if (bar.favorites) {
				const barFavoritesKeys = Object.values(bar.favorites)
				const favorites = Object.values(rootState.favorites.items)
				.filter(favorite => barFavoritesKeys.includes(favorite['.key']))
				var favoritesTrue = []
				favorites.forEach(function (favorite) {
					if (favorite.favoriteValue === true) {
						favoritesTrue.push(favorite.favoriteValue)
					}
				})
				// console.log(favorites)
				return favoritesTrue.length
			} else {
				return 'No'
			}
		},
		// BarsCount: (state, getters, rootState) => id => {
		// 	const bar = state.items[id]
		// 	if (bar.favorites) {
		// 		const barFavoritesKeys = Object.values(bar.favorites)
		// 		const favorites = Object.values(rootState.favorites.items)
		// 		.filter(favorite => barFavoritesKeys.includes(favorite['.key']))
		// 		var favoritesTrue = []
		// 		favorites.forEach(function (favorite) {
		// 			if (favorite.favoriteValue === true) {
		// 				favoritesTrue.push(favorite.favoriteValue)
		// 			}
		// 		})
		// 		// console.log(favorites)
		// 		return favoritesTrue.length
		// 	} else {
		// 		return 'No'
		// 	}
		// },
		userIsContributor: (state, getters, rootState) => id => {
			const bar = state.items[id]
			if (bar.contributors) {
				const contributorIds = Object.values(bar.contributors)
				// console.log('contributorIds')
				// console.log(contributorIds)
				const user = rootState.auth.authId
				// console.log(user)
				const userIsContributor = contributorIds.filter(function (contributor) {
					return contributor === user
				})
				for (var key in userIsContributor) {
					var value = userIsContributor[key]
					console.log(value)
				}
				// console.log(value)
				// console.log(value)
				// console.log('userIsContributor')
				// console.log(userIsContributor)
				return value
			}
		}
		// barFavoritesCount: state => id => countObjectProperties(state.items[id].favorites)
	},
	actions: {
		createBar ({state, commit, dispatch, getters, rootState}, {typeId, title, image, address, directionsUrl, typeIds, notes, text, toGoValue,
					favoriteValue}) {
			return new Promise((resolve, reject) => {
				const barId = firebase.database().ref('bars').push().key
				const favoriteId = firebase.database().ref('favorites').push().key
				const userId = rootState.auth.authId
				const publishedAt = Math.floor(Date.now() / 1000)
				// const favoriteValue = false
				// const toGoValue = false
				const favorites = {}
				const bar = {
					typeId,
					title,
					image,
					address,
					directionsUrl,
					typeIds,
					notes,
					text,
					publishedAt,
					userId,
					favoriteId,
					favorites
				}
				// console.log('bar')
				// console.log(bar)
				// console.log(typeIds)

				bar.favorites[favoriteId] = favoriteId
				const favorite = {text, publishedAt, barId, userId, favoriteValue, toGoValue}
				// console.log(favorite)
				const updates = {}
				updates[`bars/${barId}`] = bar

				// updates[`types/${typeId}/bars/${barId}`] = barId
				updates[`users/${userId}/barsCreated/${barId}`] = barId

				updates[`favorites/${favoriteId}`] = favorite
				// updates[`users/${userId}/favorites/${favoriteId}`] = favoriteId
				let nullArray = []
				let typesArray = []
				let typeIdValues = Object.values(typeIds)
				let typesName = ''
				console.log('typeIdValues from object values typeIds')
				console.log(typeIdValues)
				for (let i = 0; i < typeIdValues.length; i++) {
					if (typeIdValues[i] === 'null') {
						nullArray.push(typeIdValues[i])
					} else {
					typesArray.push(typeIdValues[i])
					}
				}
				// if (typeIdValues[i] !== 'null' || typeIdValues[i] !== null || typeIdValues[i] !== '"null"') {
					for (let j = 0; j < typesArray.length; j++) {
						// console.log('typesArray[i] if null should not be added')
						// console.log(typesArray[i])
						// if (typesArray[i] === '"null"' || typesArray[i] === null || typesArray[i] === 'undefined' || typesArray[i] === undefined) {
						// 	console.log('this is null')
						// 	// do nothing
						// } else {
							// if (typesArray[i] !== '"null"' || typesArray[i] !== null || typesArray[i] !== 'undefined' || typesArray[i] !== undefined) {
							// console.log('this type should not be null')
							// console.log(typesArray)
							typesName = typesArray[j]
							updates[`types/${typesName}/bars/${barId}`] = barId
						// }
					}
				// }
				firebase.database().ref().update(updates)
				.then(() => {
					// Update bar
					commit('setItem', {resource: 'bars', id: barId, item: bar}, {root: true})
					commit('types/appendBarToType', {parentId: typeId, childId: barId}, {root: true})
					commit('users/appendBarToUser', {parentId: userId, childId: barId}, {root: true})

					// Update favorite
					commit('setItem', {resource: 'favorites', item: favorite, id: favoriteId}, {root: true})
					commit('appendFavoriteToBar', {parentId: favorite.barId, childId: favoriteId})
					commit('users/appendFavoriteToUser', {parentId: favorite.userId, childId: favoriteId}, {root: true})

					resolve(state.items[barId])
				})
			})
		},

		updateBar ({state, commit, dispatch, rootState}, {typeId, title, image, address, directionsUrl, typeIds, notes, text, id, favoriteValue, toGoValue}) {
			return new Promise((resolve, reject) => {
				const bar = state.items[id]
				const favorite = rootState.favorites.items[bar.favoriteId]

				const edited = {
					at: Math.floor(Date.now() / 1000),
					by: rootState.auth.authId
				}

				const updates = {}
				// updates[`favorites/${bar.favoriteId}/text`] = text
				// updates[`favorites/${bar.firstFavoriteId}/edited`] = edited
				// updates[`favorites/${bar.favoriteId}/edited`] = edited
				// updates[`favorites/${bar.favoriteId}/favoriteValue`] = favoriteValue
				// updates[`favorites/${bar.favoriteId}/toGoValue`] = toGoValue
				updates[`bars/${id}/title`] = title
				updates[`bars/${id}/image`] = image
				updates[`bars/${id}/typeIds`] = typeIds
				updates[`bars/${id}/address`] = address
				updates[`bars/${id}/directionsUrl`] = directionsUrl
				updates[`bars/${id}/notes`] = notes
				updates[`bars/${id}/text`] = text

				// remove the typeIds that are unchecked and add those that are checked
				const typeObj = Object.values(typeIds)
				Object.keys(typeObj).forEach(function (key) {
					for (var name in typeIds) {
						var value = typeIds[name]
						if (value === 'null') {
							updates[`types/${name}/bars/${id}`] = null
						} else {
							updates[`types/${name}/bars/${id}`] = id
						}
					}
				})
				firebase.database().ref().update(updates)
				.then(() => {
					commit('setBar', {bar: {...bar, title}, barId: id})
					// commit('types/setType', {parentId: typeId, childId: id})
					commit('favorites/setFavorite', {favoriteId: bar.favoriteId, favorite: {...favorite, text, edited, favoriteValue, toGoValue}}, {root: true})
					// commit('types/appendBarToType', {parentId: typeId, childId: id}, {root: true})
					resolve(favorite)
				})
			})
		},
		fetchAllBars ({state, commit}) {
			console.log('🔥', '🗂', 'all')
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
		fetchBar: ({dispatch}, {id}) => dispatch('fetchItem', {resource: 'bars', id, emoji: '🔥 📄'}, {root: true}),
		fetchBars: ({dispatch}, {ids}) => dispatch('fetchItems', {resource: 'bars', emoji: '🌧', ids}, {root: true})
	},
	mutations: {
		setBar (state, {bar, barId}) {
			Vue.set(state.items, barId, bar)
		},

		appendFavoriteToBar: makeAppendChildToParentMutation({parent: 'bars', child: 'favorites'}),
		appendContributorToBar: makeAppendChildToParentMutation({parent: 'bars', child: 'contributors'})
	}
}
