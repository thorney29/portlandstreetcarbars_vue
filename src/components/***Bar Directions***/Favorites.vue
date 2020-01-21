<template>
	<div class="flex-grid" v-if="asyncDataStatus_ready" >
		<div v-if="user" style="border:2px red solid"><!-- if this is a user -->
			<h3>if {{user.name}} is logged in >>></h3>
		<div v-if="user.favorites[this.bar['.key']]" style="border:1px orange solid;padding: 2px; margin:8px"><!-- if this is a user and is in bar favorites -->
				    <div v-if='user.favorites'><!-- if this user has favorites -->
					   if {{user.name}} favorited<br>
					   <div style="border:1px yellow solid;padding: 2px; margin:8px">
					   User Id: {{user['.key']}}  <br>
					   User Favorite Id: {{user.favorites[this.bar['.key']]}}
						{{user.favorite}}
						<button
						@click.prevent="save(fave)"
						type="submit"
						v-model="fave"
						v-bind:class="[fave ? 'is-favorited' : 'not-favorited']"
						>
							<span class="fas fa-heart"></span>
						</button> 
					    </div>
					    from console
					    <div style="border:1px green solid;padding: 2px; margin:8px">
					    Fave: {{fave}} -- should be true<br>
					    UserId as Me: {{me}}  <br>
					    User favoriteId as User Fave: {{userFave}}  <br>
						</div>
					</div>
				</div>
				<div v-else>
					<button
					@click.prevent="save(fave)"
					type="submit"
					v-model="fave"
					class="not-favorited" 

					>
					this is not favorited
					<span class="fas fa-heart"></span>
					</button> 
				</div>
			</div>
			<div v-else>
				<div class="login-text"><a href="/login?redirectTo=%2Fthread%2F-KsjpzIeFTdcsBIPvUfP" class="">Login</a> or <a href="/register?redirectTo=%2Fthread%2F-KsjpzIeFTdcsBIPvUfP" class="">register</a> to save favorites.
				</div>
			</div>
			{{barsFavoritesCount}} {{barsFavoritesCount === 1 ? 'favorite': 'favorites' }}
	</div>
</template>

<script>
	import {mapActions, mapGetters} from 'vuex'
	export default {
		data: {
		},
		props: {
			favorite: {
				required: true,
				type: Object
			},
			favorites: {
				required: true,
				type: Array
			}
		},
		methods: {
		...mapActions('bars', ['fetchFavorite', 'fetchFavorites', 'fetchAllBars'])
		},
		computed: {
			...mapGetters({
				user: 'auth/authUser'
			}),
			favorites () {
				return this.$store.state.favorites.items
			},
			favorite () {
				return this.$store.state.favorites.items[this.id]
			}
		},
		created () {
			this.fetchFavorite({id: this.id})
			// .then(forum => this.fetchThreads({ids: forum.threads}))
			// .then(bars => Promise.all(bars.map(thread => this.fetchUser({id: userId}))))
			.then(() => { this.asyncDataStatus_fetched() })
		// this.$emit('ready')
		}
	}
</script>