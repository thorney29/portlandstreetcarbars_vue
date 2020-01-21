<template>
	<div class="icon-details">
		<span v-is-favorite="FavoriteStatus">
				<button 
			 	@click="isFavorited = !isFavorited"
			 	type="submit">
					<span class="fas fa-heart" :class="{'is-favorited': isFavorited}">   
					{{bar.favorite}}</span>
				</button>
			</span>
		<!-- <form @submit.prevent="saveFavorites">
			<input v-model="form.favorites" type="text" id="favorite" value="form.favorites">
			{{form.favorited}}
			<span v-is-favorite="FavoriteStatus">
				<button 
			 	@click="isFavorited = !isFavorited"
			 	type="submit">
					<span class="fas fa-heart" :class="{'is-favorited': isFavorited}">   
					</span>
				</button>
			</span>
		</form> -->
	</div>
	<!-- 	<div class="icon-details">
	<form @submit.prevent="saveStars">
		<input v-model="form.starred" type="text" id="favorite" value="starred">
		<span v-is-favorite="FavoriteStatus">
			<button 
		 	@click="isFavorited = !isFavorited"
		 	type="submit">
				<span class="fas fa-heart absolute-star" :class="{'is-favorited': isFavorited}">   
				</span>
			</button>
		</span>
	</form> 
	</div> -->
</template>

<script>
	// import firebase from 'firebase'
	import {mapActions, mapGetters} from 'vuex'
	import isFavorite from '@/directives/is-favorite'
	export default {
		directives: {
			isFavorite
		},
		props: {
			favorite: {
				required: true,
				type: Object
			}
		},
		data () {
			return {
				isFavorited: false,
				// isStarred: false, 
			}
		},
		computed: {
			...mapGetters({
				authUser: 'auth/authUser'
			})
		},
		methods: {
			...mapActions('users', ['fetchUser']),
			FavoriteStatus () {
				this.isFavorited = false
			},
			saveFavorites (form) {
			}

			// StarStatus () {
			// 	this.isStarred = false
			// },
			// saveStar ({state, commit, rootState}, {id}) {
			// 	return new Promise((resolve, reject) => {
			// 	const bar = firebase.database().ref('bars').push().key

			// 	const updates = {}
			// 	firebase.database().ref('bars').child(id).update(updates)
			// 		.then(() => {
			// 			commit('setBar', {barId: id, bar: {...bar}})
			// 			resolve(bar)
			// 		})
			// 	})
			// },
		}
	}
</script>

<style scoped>
	.icon-details {text-align: right;}
	.fa-heart.is-favorited  {color: red;}
	.fa-star.is-starred {color: #b79b07;}
</style>