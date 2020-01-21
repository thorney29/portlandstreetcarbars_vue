import {makeAppendChildToParentMutation} from '@/store/assetHelpers'

export default {
	namespaced: true,

	state: {
		items: {} // state.threads.items[id]
	},
	actions: {
		fetchForum: ({dispatch}, {id}) => dispatch('fetchItem', {resource: 'forums', id, emoji: '📝'}, {root: true}),
		fetchForums: ({dispatch}, {ids}) => dispatch('fetchItems', {resource: 'forums', emoji: '📝', ids}, {root: true})
	},
	mutations: {
		appendThreadToForum: makeAppendChildToParentMutation({parent: 'forums', child: 'threads'})
	}
}
