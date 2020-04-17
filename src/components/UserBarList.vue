<template>
	<div>
		<div v-if="!user.favorites" class="flex-grid">
			You have no saved favorites yet. Get busy! 
		</div>
		<div v-else class="flex-grid">
			<UserBarListItem
			v-for="bar in bars"
			:bar="bar"
			:user="user"
			:key="bar['.key']"
			/>
		</div>

	</div>
</template>

<script>
	
	import UserBarListItem from './UserBarListItem'
	export default {
		components: {
			UserBarListItem
		},
		props: {
			bars: {
				required: true,
				type: Array
			},
			user: {
				required: true,
				type: Object
			}
		}
	}
</script>
<style scoped>
	/*.flex-grid {color: white;}*/
</style>