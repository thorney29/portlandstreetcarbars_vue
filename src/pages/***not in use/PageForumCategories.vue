<template>
    <div v-if="asyncDataStatus_ready" class="col-full push-top">
		<h1>Bar Talk</h1>
		<p>What's your favorite bar? Who has the best cocktails? Covered bike parking? Patios? Etc.</p>
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
			...mapActions('forums', ['fetchForums'])
		},

		created () {
			this.fetchAllCategories()
			.then(categories => Promise.all(categories.map(category => this.fetchForums({ids: Object.keys(category.forums)})))).then(() => {
					this.asyncDataStatus_fetched()
			})
		}
	}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	p {text-align: center;}
</style>

