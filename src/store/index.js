import Vue from 'vue'
import Vuex from 'vuex'
import VueMoment from 'vue-moment'
import actions from './actions'
import mutations from './mutations'
import getters from './getters'
import categories from './modules/categories'
import types from './modules/types'
import bars from './modules/bars'
import favorites from './modules/favorites'
import users from './modules/users'
import auth from './modules/auth'
import markers from './modules/markers'

Vue.use(Vuex)
Vue.use(VueMoment)

export default new Vuex.Store({
	state: {},
	getters,
	actions,
	mutations,
	modules: {
		categories,
		users,
		auth,
		types,
		bars,
		favorites,
		markers
	}
})
