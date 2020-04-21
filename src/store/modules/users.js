import {removeEmptyProperties} from '@/utils'
import firebase from 'firebase'
import Vue from 'vue'
import {makeAppendChildToParentMutation} from '@/store/assetHelpers'

export default {
	namespaced: true,

	state: {
		items: {}
	},
	getters: {
		userFavoritedBars: (state, getters, rootState) => id => {
			const user = state.items[id]
			console.log(user)
			const items = Object.keys(rootState.bars.items)
			var result = Object.keys(items)
			.map(key => items[key]) // turn an array of keys into array of items.
			.filter(item => item.contributors.any(bar => bar.contributor['.key'] === this.user['.key'])) // filter that array,
			console.log(result)
			// Object.entries(users).forEach(([key, value]) => console.log(`${key}: ${value}`)) // "foo: bar", "baz: 42"
			Object.entries(user).forEach(([key, value]) => console.log(`${key}: ${value}`)) // "foo: bar", "baz: 42"
			if (user.favorites) {
				return Object.values(rootState.favorites.items)
				.filter(favorite => favorite.userId === id)
			}
		},
		userFavoritesCount: (state, getters, rootState) => id => {
			const user = (state.items[id])
			if (user.favorites) {
				const userFavoritesKeys = Object.values(user.favorites)
				const favorites = Object.values(rootState.favorites.items)
				.filter(favorite => userFavoritesKeys.includes(favorite['.key']))
				var favoritesTrue = []
				favorites.forEach(function (favorite) {
					if (favorite.favoriteValue === true) {
						favoritesTrue.push(favorite.favoriteValue)
					}
				})
				return favoritesTrue.length
			}
		},
		userToGoCount: (state, getters, rootState) => id => {
			const user = (state.items[id])
			if (user.favorites) {
				const barFavoritesKeys = Object.values(user.favorites)
				const favorites = Object.values(rootState.favorites.items)
				.filter(favorite => barFavoritesKeys.includes(favorite['.key']))
				var toGoTrue = []
				favorites.forEach(function (favorite) {
					if (favorite.toGoValue === true) {
						toGoTrue.push(favorite.toGoValue)
					}
				})
				return toGoTrue.length
			}
		}
	},
	actions: {
		createUser ({state, commit}, {id, email, name, username, avatar = null}) {
			return new Promise((resolve, reject) => {
				const registeredAt = Math.floor(Date.now() / 1000)
				const usernameLower = username.toLowerCase()
				email = email.toLowerCase()
				const permissions = 'member'
				const user = {avatar, email, name, username, usernameLower, registeredAt, permissions}
				firebase.database().ref('users').child(id).set(user)
				.then(() => {
					commit('setItem', {resource: 'users', id: id, item: user}, {root: true})
					resolve(state.items[id])
				})
			})
		},

		updateUser ({commit}, user) {
			const updates = {
				avatar: user.avatar,
				username: user.username,
				name: user.name,
				bio: user.bio,
				website: user.website,
				email: user.email,
				location: user.location
			}
			return new Promise((resolve, reject) => {
				firebase.database().ref('users').child(user['.key']).update(removeEmptyProperties(updates))
				.then(() => {
					commit('setUser', {userId: user['.key'], user})
					resolve(user)
				})
			})
		},

		fetchUser: ({dispatch}, {id}) => dispatch('fetchItem', {resource: 'users', id, emoji: '👩🏼‍'}, {root: true}),
		fetchUsers: ({dispatch}, {ids}) => dispatch('fetchItems', {resource: 'users', emoji: '👩', ids}, {root: true})
	},
	mutations: {
		setUser (state, {user, userId}) {
			Vue.set(state.items, userId, user)
		},
		// appendPostToUser: makeAppendChildToParentMutation({parent: 'users', child: 'posts'}),
		appendBarToUser: makeAppendChildToParentMutation({parent: 'users', child: 'bars'}),
		appendFavoriteToUser: makeAppendChildToParentMutation({parent: 'users', child: 'favorites'})
	}
}
