<template>
	<div class="container">
		<h4>Search By Keyword:</h4>  
		<input v-model="searchText">
	</div>  
</template>

<script>
	export default {
		props: {
			bar: {
				required: true,
				type: Array
			}
		},
		data () {
			return {
				searchText: ''
			}
		},
		computed: {
			bars: function () {
				var self = this
				if (this.searchText === '') {
					return this.bars
				}
				return this.bars.filter(function (bar) {
					return bar.indexOf(self.searchText) >= 0
				})
			}
		}
	}
</script>
<style scoped>
</style>