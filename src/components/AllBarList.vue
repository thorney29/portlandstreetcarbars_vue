<template>
	<div class="flex-grid">
		<ul class="cards">
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
	
	import AllBarListItem from './AllBarListItem'
	export default {
		components: {
			AllBarListItem
		},
		props: {
			// bars: {
			// 	required: true,
			// 	type: Array
			// },
			user: {
				required: false,
				type: Object
			},
			types: {
				required: false,
				type: Array
			}
		},
		computed: {
			bars () {
				let bars = Object.values(this.$store.state.bars.items)
				let barArray = []
				bars.forEach(function (bar) {
					barArray.push(bar)
				})
				bars = barArray.sort((a, b) => (a.title > b.title) ? 1 : -1)
				return bars
			}
		}
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