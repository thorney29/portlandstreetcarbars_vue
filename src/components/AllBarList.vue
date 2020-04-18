<template>
	<div class="flex-grid">
		<ul class="cards">
<!-- v-for="bar in bars" -->
			<AllBarListItem
			v-for="bar in bars"
			:bar="bar"
			:user="user"
			:types="types"
			:key="bar['.key']"
			/>
		</ul>
		</router-link>
	</div>
</template>

<script>
	// import infiniteScroll from 'vue-infinite-scroll'
	import AllBarListItem from './AllBarListItem'
	export default {
		components: {
			AllBarListItem
		},
		props: {
			bars: {
				required: true,
				type: Array
			},
			user: {
				required: false,
				type: Object
			},
			types: {
				required: false,
				type: Array
			}
		},
		methods: {},
		computed: {}
	}
</script>
<style scoped>
	ul.cards {
	  display: flex;
	  flex-wrap: wrap;
	  list-style: none;
	  margin: 0;
	  padding: 0;
	  justify-content: center;
	}
</style>
