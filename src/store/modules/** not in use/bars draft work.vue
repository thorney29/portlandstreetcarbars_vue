createBarFavorite ({state, commit, dispatch, rootState}, {barId, userId, isFavorited, id}) {
			return new Promise((resolve, reject) => {
				const favoriteId = firebase.database().ref('favorites').push().key
				const favorite = {barId, userId, isFavorited}

				const updates = {}
				updates[`favorites/${favoriteId}`] = favorite
				updates[`users/${userId}/favorites/${favoriteId}`] = favoriteId
				updates[`bars/${barId}/favorites/${userId}`] = favoriteId
				firebase.database().ref().update(updates)
				.then(() => {
					console.log('barId: ' + barId + ',' + 'userId: ' + userId + ',' + 'favoriteID: ' + favoriteId + ' isFavorited: ' + isFavorited)
					// commit('setItem', {resource: 'bars', id: favoriteId, item: favorite}, {root: true})

					commit('setItem', {resource: 'favorites', item: favorite, id: favoriteId}, {root: true})
					// commit('bars/appendFavoriteToBar', {parentId: barId, childId: favoriteId}, {root: true})
					// commit('users/appendFavoriteToUser', {parentId: userId, childId: favoriteId}, {root: true})

					resolve(state.items[favoriteId])
				})
			})
		},
		deleteBarFavorites ({state, commit, rootState}, {id, bar, barId, userId, favoriteId, isFavorited}) {
			return new Promise((resolve, reject) => {
				// const bars = rootState.bars
				// const barId = state.items[id]
				// const bar
				// const barId
				// const favoriteId
				// const userId
				const barId = firebase.database().ref('bars').key
				const favorite = favoriteId
				const fave = state.items[id]
				console.log(`users/${userId}/favorites/${favoriteId}`)
				console.log('bars: ' + barId + ', ' + 'favoriteID1: ' + favorite + ',' + ' barId: ' + barId + ',' + 'userId: ' + userId + ',' + 'favoriteID: ' + fave + ' isFavorited: ' + isFavorited)
				firebase.database().ref(`users/${userId}/favorites/${favoriteId}`).remove()
				firebase.database().ref(`bars/${barId}/favorites/${favoriteId}`).remove()
				firebase.database().ref(`favorites/${favoriteId}`).remove()
				.then(() => {
					// commit('setItem', {resource: 'bars', item: favorite, id: favoriteId}, {root: true})
					resolve(state.items[barId])
				})
			})
		},
		// updateBarFavorites ({state, commit, rootState}, {id, barId, userId, favoriteId, isFavorited}) {
		// 	return new Promise((resolve, reject) => {
		// 		// const bars = rootState.bars.items
		// 		// const barId = state.items[id]
		// 		const favorite = favoriteId
		// 		const fave = state.items[id]
		// 		console.log('favoriteID1: ' + favorite + ',' + 'barId: ' + barId + ',' + 'userId: ' + userId + ',' + 'favoriteID: ' + fave + ' isFavorited: ' + isFavorited)
		// 		firebase.database().ref(`users/${userId}/favorites/${favoriteId}`).remove()
		// 		firebase.database().ref(`bars/${barId}/favorites/${favoriteId}`).remove()
		// 		firebase.database().ref(`favorites/${favoriteId}`).remove()
		// 		.then(() => {
		// 			// commit('setItem', {resource: 'bars', item: favorite, id: favoriteId}, {root: true})
		// 			resolve(state.items[barId])
		// 		})
		// 	})
		// },