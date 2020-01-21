import Vue from 'vue'
import firebase from 'firebase'

export default {
  namespaced: true,

  state: {
    items: {}
  },

  actions: {
    createFavorite ({commit, state, rootState}, favorite) {
      const favoriteId = firebase.database().ref('favorites').push().key
      favorite.userId = rootState.auth.authId
      favorite.publishedAt = Math.floor(Date.now() / 1000)

      const updates = {}
      updates[`favorites/${favoriteId}`] = favorite
      updates[`bars/${favorite.barId}/favorites/${favoriteId}`] = favoriteId
      updates[`bars/${favorite.barId}/contributors/${favorite.userId}`] = favorite.userId
      // updates[`bars/${favorite.barId}/contributors/label`] = favorite.userId
      // updates[`bars/${favorite.barId}/contributors/`] = favorite.userId
      updates[`users/${favorite.userId}/favorites/${favoriteId}`] = favoriteId
      firebase.database().ref().update(updates)
        .then(() => {
          commit('setItem', {resource: 'favorites', item: favorite, id: favoriteId}, {root: true})
          commit('bars/appendFavoriteToBar', {parentId: favorite.barId, childId: favoriteId}, {root: true})
          commit('bars/appendContributorToBar', {parentId: favorite.barId, childId: favorite.userId}, {root: true})
          commit('users/appendFavoriteToUser', {parentId: favorite.userId, childId: favoriteId}, {root: true})
          return Promise.resolve(state.items[favoriteId])
        })
    },

    updateFavorite ({state, commit, rootState}, {id, barId, text, favoriteValue, toGoValue}) {
      return new Promise((resolve, reject) => {
        const favorite = state.items[id]
        const edited = {
          at: Math.floor(Date.now() / 1000),
          by: rootState.auth.authId
        }
        favorite.userId = rootState.auth.authId
        const barUpdate = {}
        if (favoriteValue === false && toGoValue === false) {
          console.log('these are false')
          barUpdate[`bars/${favorite.barId}/contributors/${favorite.userId}`] = null

          // firebase.database().ref(`bars/${favorite.barId}/contributors/${favorite.userId}`).remove()
          firebase.database().ref(`users/${favorite.userId}/favorites/${id}`).remove()
          firebase.database().ref(`bars/${favorite.barId}/favorites/${id}`).remove()
          firebase.database().ref(`favorites/${id}`).remove()
          .then(function () {
            commit('bars/appendContributorToBar', {parentId: favorite.barId, childId: favorite.userId}, {root: true})
            console.log('Remove succeeded.' + favorite.barId)
          })
        } else {
          barUpdate[`users/${favorite.userId}/favorites/${id}`] = id
          barUpdate[`bars/${favorite.barId}/contributors/${favorite.userId}`] = favorite.userId
          const updates = {favoriteValue, toGoValue, text, edited}
          firebase.database().ref('favorites').child(id).update(updates)
        }
        firebase.database().ref().update(barUpdate)
          .then(() => {
            commit('setFavorite', {favoriteId: id, favorite: {...favorite, favoriteValue, toGoValue, text, edited}})
            resolve(favorite)
          })
      })
    },
    fetchAllFavorites ({state, commit}) {
        console.log('⭐️⭐️', '🗂', 'all')
        return new Promise((resolve, reject) => {
          firebase.database().ref('favorites').once('value', snapshot => {
            const favoritesObject = snapshot.val()
            Object.keys(favoritesObject).forEach(favoriteId => {
              const favorite = favoritesObject[favoriteId]
              commit('setItem', {resource: 'favorites', id: favoriteId, item: favorite}, {root: true})
            })
            resolve(Object.values(state.items))
          })
        })
      },
    fetchFavorite: ({dispatch}, {id}) => dispatch('fetchItem', {resource: 'favorites', id, emoji: '💬'}, {root: true}),
    fetchFavorites: ({dispatch}, {ids}) => dispatch('fetchItems', {resource: 'favorites', ids, emoji: '💬'}, {root: true})
  },

  mutations: {
    setFavorite (state, {favorite, favoriteId}) {
      Vue.set(state.items, favoriteId, favorite)
    }
  }
}

// >>>>>>>>>>>>>>>
// import Vue from 'vue'
// import firebase from 'firebase'
// import {countObjectProperties} from '@/utils'

// export default {
//   namespaced: true,

//   state: {
//     items: {}
//   },
//   getters: {
//     barsFavoritesCount: state => id => countObjectProperties(state.items[id].favorites)
//   },
//   actions: {
//       createBarFavorite ({state, commit, rootState}, {barId, userId, isFavorited}) {
//       return new Promise((resolve, reject) => {
//         const favoriteId = firebase.database().ref('favorites').push().key
//         const userId = rootState.auth.authId
//         const favorite = {barId, userId, isFavorited}
//         const updates = {}
//         updates[`favorites/${favoriteId}`] = favorite
//         updates[`users/${userId}/favorites/${favoriteId}`] = favorite
//         updates[`bars/${barId}/favorites/${favoriteId}`] = favorite
//         firebase.database().ref().update(updates)
//         .then(() => {
//           // Update favorite
//           commit('setItem', {resource: 'favorites', item: favorite, id: favoriteId}, {root: true})
//           commit('bars/appendFavoriteToBar', {parentId: favorite.barId, childId: favoriteId}, {root: true})
//           commit('users/appendFavoriteToUser', {parentId: favorite.userId, childId: favoriteId}, {root: true})
//           return Promise.resolve(state.items[favoriteId])
//         })
//       })
//     },

//     updateBarFavorites ({state, commit, dispatch, rootState}, {id, barId, userId, isFavorited}) {
//         return new Promise((resolve, reject) => {
//           const bars = rootState.bars.items
//           const bar = state.items[id]

//           firebase.database().ref(`users/${userId}/favorites`).remove()
//           firebase.database().ref(`favorites/`).remove()
//           firebase.database().ref(`bars/${barId}/favorites`).remove()
//         .then(() => {
//           commit('', {resource: 'bars', item: bar, id: barId})
//           return Promise.resolve(bars)
//         })
//       })
//     },
//     fetchFavorite: ({dispatch}, {id}) => dispatch('fetchItem', {resource: 'favorites', id, emoji: '⭐️'}, {root: true}),
//     fetchFavorites: ({dispatch}, {ids}) => dispatch('fetchItems', {resource: 'favorites', ids, emoji: '⭐️⭐️'}, {root: true})
//   },

//   mutations: {
//     setFavorite (state, {favorite, favoriteId}) {
//       Vue.set(state.items, favoriteId, favorite)
//     }
//   }
// }
