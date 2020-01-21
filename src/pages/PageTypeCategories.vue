<template>
    <div v-if="asyncDataStatus_ready" class="col-full push-top">
    	<div class="header-content">
    		<h1>Find Bars</h1>
			<h2>What type of experience are you looking for?</h2>
			<p>Meeting a friend for a drink? Looking for a quick meal? Looking for a spot to watch the game? Or do you prefer a craft cocktail with a couple friends? We've collected the bars and restuarants within a 20 minute walk of the Eastside streetcar loop so you all you have to do is find your next destination and go.</p>
    	</div>
		<CategoryList :categories="categories"/>
	</div>
</template>

<script>
	import {mapActions} from 'vuex'
	import CategoryList from '@/components/CategoryList'
	import asyncDataStatus from '@/mixins/asyncDataStatus'

	export default {
		components: {
			CategoryList
		},

		mixins: [asyncDataStatus],

		computed: {
			categories () {
				return Object.values(this.$store.state.categories.items)
			}
		},

		methods: {
			...mapActions('categories', ['fetchAllCategories']),
			...mapActions('types', ['fetchTypes'])
		},

		created () {
			this.fetchAllCategories()
			.then(categories => Promise.all(categories.map(category => this.fetchTypes({ids: Object.keys(category.types)})))).then(() => {
					this.asyncDataStatus_fetched()
			})
		}
	}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	p {text-align: center;}
</style>

