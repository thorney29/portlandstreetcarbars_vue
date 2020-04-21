<template>
	<div class="flex-grid">
		<UserProfileCard
		v-if="!edit"
		:user="user"
		/>
		<UserProfileCardEditor
		v-else
		:user="user"
		/>
		<div class="col-7 push-top">
			<div class="profile-header">
				<span class="text-lead">
				  {{user.name}}'s recent activity 
				</span>
			</div>
			<hr>
			<UserBarList :user="user" :bars="bars" :favorites="favorites"/>
		</div>
	</div>
</template>
<script>
	import UserBarList from '@/components/UserBarList'
    import UserProfileCard from '@/components/UserProfileCard'
    import UserProfileCardEditor from '@/components/UserProfileCardEditor'
    import {mapActions, mapGetters} from 'vuex'
    import asyncDataStatus from '@/mixins/asyncDataStatus'

	export default {
		components: {
			UserBarList,
			UserProfileCard,
			UserProfileCardEditor
		},

		mixins: [asyncDataStatus],

		props: {
			edit: {
				type: Boolean,
				default: false
			}
		},
		data () {
			return {
				contributors: this.bars ? this.bars.contributors : []
			}
		},
		methods: {
			...mapActions('bars', ['fetchAllBars']),
			...mapActions('favorites', ['fetchAllFavorites', 'fetchFavorites']),
			...mapActions('users', ['fetchUser'])
		},
		computed: {
			...mapGetters({
				user: 'auth/authUser'
			}),
			bars () {
				let bars = Object.values(this.$store.state.bars.items).sort((a, b) => (a.title > b.title) ? 1 : -1)
				let user = Object.values(this.user)
				if (user.barFavorites !== undefined && user.barFavorites !== 'undefined' && user.barToGo !== undefined && user.barToGo !== 'undefined') {
				// }
					const barFavorites = Object.values(this.user.barFavorites)
					const barToGo = Object.values(this.user.barToGo)
					const annotatedBars = barFavorites.concat(barToGo)
					return bars.filter(function (bar) {
						return annotatedBars.indexOf(bar['.key']) >= 0
					})
				} else if (user.barFavorites !== undefined) {
					const barFavorites = Object.values(this.user.user.barFavorites)
					return bars.filter(function (bar) {
						return barFavorites.indexOf(bar['.key']) >= 0
					})
				} else if (user.barToGo !== undefined) {
					const barToGo = Object.values(this.user.barToGo)
					return bars.filter(function (bar) {
						return barToGo.indexOf(bar['.key']) >= 0
					})
				} else if (user.barToGo === undefined) {
					// do nothing
				} else {
					// do nothing
				}

				return Object.values(this.$store.state.bars.items).sort((a, b) => (a.title > b.title) ? 1 : -1)
			},
			favorites () {
				return Object.values(this.$store.state.favorites.items)
			}
		},
		created () {
			// this.$emit('ready')
			this.$emit('ready')
			this.fetchAllBars()
			this.fetchAllFavorites()
			if (this.user.favorites) {
				this.$store.dispatch('favorites/fetchFavorites', {ids: this.user.favorites})
				.then(() => this.asyncDataStatus_fetched())
			} else {
				this.asyncDataStatus_fetched()
			}
		}
	}
// const barObj = Object.values(this.$store.state.bars.items)
// const user = this.user['.key']
// console.log(user)
// console.log(barObj)
// if (barObj['.key'].contributors !== 'undefined' || barObj['.key'].contributors !== null || barObj['.key'].contributors !== undefined) {
// const barFavoritesKeys = Object.values(barObj[this.bar['.key']].contributors)
// console.log(barFavoritesKeys)
// 	Object.keys(barObj).forEach(function (user) {
// 		const bars = barObj.filter(bar =>
// 			bar['.key'].contributors === user)
// 		// const bars = barObj.filter(bar => barObj.includes(user))
// 		console.log(bars)
// 	})
// }

// Object.keys(barObj).forEach(function (key) {
// 	for (var name in contributors) {
// 		var value = contributors[name]
// 		if (value === 'null') {
// 			return
// 		} else {
// 		const bar = Object.values(this.$store.state.bars).filter(bar => bar.contributors === this.user['.key'])
// 		console.log(bar)
// 		}
// 	}
// })
</script>
<style scoped>
	.flex-grid {
		background: transparent;
	}
</style>

