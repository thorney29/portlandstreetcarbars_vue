<template>
	<div class="category-list">
        <TypeListItem
        v-for="type in types"
        :type="type"
        :key="type.name" />    
    </div>
</template>

<script>
	import TypeListItem from './TypeListItem'
	export default {
		components: {
			TypeListItem
		},
		props: {
			// id: {
			// 	required: false,
			// 	type: String
			// },
			types: {
				required: true,
				type: Array
			}
		}
	}
</script>

<style scoped>
</style>