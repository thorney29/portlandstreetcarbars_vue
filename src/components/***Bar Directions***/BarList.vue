<template>
	<div class="flex-grid">
		<section class="searchBar">
		    <h3> Search Bars </h3>
		    <input class="search-bar-input" type="text" v-model="searchBar" placeholder="Search by name or address">
		    <p v-if="searchBar">Looking for: {{ searchBar }}</p>
		</section>

	    <NewBarListItem
	    v-for="bar in filterSearch"
	    :bar="bar"
	    :key="bar['.key']" />
	</div>
</template>

<script>
	import NewBarListItem from '@/components/NewBarListItem'
	export default {
		components: {
			NewBarListItem
		},
		props: {
		},
		data () {
			return {
				searchBar: '',
				selectedBar: 'Select a bar'
			}
		},
		computed: {
			bars () {
				return Object.values(this.$store.state.bars.items)
			},
			favorites () {
				return Object.values(this.$store.state.favorites.items)
			},
			filterSearch () {
				return this.bars.filter(bar => {
					return !this.searchBar || bar.name.toLowerCase().indexOf(this.searchBar.toLowerCase()) > -1 || bar.address.toLowerCase().indexOf(this.searchBar.toLowerCase()) > -1
				})
			},
			filterSelect () {
				var option = this
				var bar = option.selectedBar

				if (bar === 'Select a bar') {
					return option.bars
				} else {
					return !this.bar || bar.name.toLowerCase().indexOf(this.searchBar.toLowerCase()) > -1
				}
			}
		}
	}
</script>

<style scoped>
	.searchBar {
		flex: 1 100%;
		width: 80%;
		margin: 4% auto 2%;
		text-align: center;
		display: block;
	}
	.searchBar h3 {
		width: 100%;
		text-align: center;
		margin:auto;
	}
	.search-bar-input {
		margin:auto;
		text-align:center;
		padding: 2px 9px;
		border-bottom: 1px solid green;
		outline: green;
	}
</style>