<template>
    <div v-if="asyncDataStatus_ready" class="col-full push-top">
		<h1>All Bars</h1>
		<p>What's your favorite bar? Who has the best cocktails? Covered bike parking? Patios? Etc.</p>
		<AllBarList :bars="bars"/>
	</div>
</template>

<script>
	import {mapActions} from 'vuex'
	import AllBarList from '@/components/AllBarList'
	import asyncDataStatus from '@/mixins/asyncDataStatus'

	export default {
		components: {
			AllBarList
		},

		mixins: [asyncDataStatus],

		computed: {
			bars () {
				return Object.values(this.$store.state.bars.items)
			}
		},

		methods: {
			...mapActions('bars', ['fetchAllBars'])
		},

		created () {
			this.fetchAllBars()
			.then(bars => Promise.all(bars.map(bar => this.fetchFavorites({ids: Object.keys(bar.favorites)})))).then(() => {
					this.asyncDataStatus_fetched()
			})
		}
	}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	p {text-align: center;}
</style>

