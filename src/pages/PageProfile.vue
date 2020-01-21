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
		methods: {
			...mapActions('bars', ['fetchAllBars']),
			...mapActions('favorites', ['fetchAllFavorites', 'fetchFavorites'])
		},
		computed: {
			...mapGetters({
				user: 'auth/authUser'
			}),
			bars () {
				return Object.values(this.$store.state.bars.items)
			},
			favorites () {
				return Object.values(this.$store.state.favorites.items)
			}
		},
		created () {
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
</script>
<style scoped>
	.flex-grid {
		background: transparent;
	}
</style>