import firebase from 'firebase'
import Vue from 'vue'
import {makeAppendChildToParentMutation} from '@/store/assetHelpers'

export default {
	namespaced: true,

	state: {
		items: {} // state.bars.items[id]
	},
	actions: {
		fetchAllTypes ({state, commit}) {
			// console.log('🔥', '🗂', 'all')
			return new Promise((resolve, reject) => {
				firebase.database().ref('types').once('value', snapshot => {
					const typesObject = snapshot.val()
					Object.keys(typesObject).forEach(typeId => {
						const type = typesObject[typeId]
						commit('setItem', {resource: 'types', id: typeId, item: type}, {root: true})
					})
					resolve(Object.values(state.items))
				})
			})
		},
		fetchType: ({dispatch}, {id}) => dispatch('fetchItem', {resource: 'types', id, emoji: '📝'}, {root: true}),
		fetchTypes: ({dispatch}, {ids}) => dispatch('fetchItems', {resource: 'types', emoji: '📝', ids}, {root: true})
	},
	mutations: {
		setType (state, {type, typeId}) {
			Vue.set(state.items, typeId, type)
		},
		appendBarToType: makeAppendChildToParentMutation({parent: 'types', child: 'bars'})
	}
}
