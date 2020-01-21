<template>
	<div class="favorite-list">
		<FavoriteListItem
		v-for="favorite in favorites"
		:favorite="favorite"
		:key="favorite['.key']"
		/>
	</div>
</template>

<script>
 	import FavoriteListItem from './FavoriteListItem'
	// import UserFavoriteListItem from './UserFavoriteListItem'
	export default {
		components: {
			FavoriteListItem
		},
		props: {
			favorites: {
				required: true,
				type: Array
			}
		}
	}
</script>

<style scoped>

</style>