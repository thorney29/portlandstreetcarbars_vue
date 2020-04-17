<template>
	<div class="col-3 push-top">
		<div class="profile-card">
			<p class="text-center">
				<img :src="user.avatar" alt="" class="avatar-xlarge">
			</p>
			<h1 class="title">{{user.username}}</h1>
			<p class="text-lead">{{user.name}}</p>
			<p class="text-justify">
				<span v-if="user.bio">{{user.bio}}</span>
				<span v-else>No bio specified.</span>
			</p>
			<span class="online">{{user.username}} is online</span>
			<div class="stats">
				<span>{{userFavoritesCount}} {{userFavoritesCount === 1 ? 'favorite' : 'favorites'}} </span>
				<span>{{userToGoCount}} {{userToGoCount === 1 ? 'bar' : 'bars'}} to visit</span>
			</div>
			<hr>
			<p v-if="user.website" class="text-large text-center"><i class="fa fa-globe"></i> <a href="user.website">{{user.website}}</a></p>
		</div>
		<p class="text-xsmall text-faded text-center">Member since {{accountCreatedMonthYear | moment("dddd, MMMM Do YYYY")}}.
		<!-- , last visited {{lastLoggedIn}} ago</p> -->
		<div class="text-center">
			<hr>
			<router-link
			class="btn-green btn-small"
			:to="{name: 'UserProfileCardEditor'}"
			>
				Edit Profile
			</router-link>
		</div>
	</div>
</template>

<script>

import VueMoment from 'vue-moment'
	export default {
		components: {
			VueMoment
		},
		props: {
			user: {
				required: true,
				type: Object
			}
		},
		data () {
			return {
				accountCreatedMonthYear: this.user ? this.user['registeredAt'] : ''
				// lastLoggedIn: lastLoggedIn
			}
		},
		computed: {
			userThreadsCount () {
				return this.$store.getters['users/userThreadsCount'](this.user['.key'])
			},
			userToGoCount () {
				return this.$store.getters['users/userToGoCount'](this.user['.key'])
			},
			userFavoritesCount () {
				return this.$store.getters['users/userFavoritesCount'](this.user['.key'])
			}
		}
	}
</script>

<style scoped>

</style>