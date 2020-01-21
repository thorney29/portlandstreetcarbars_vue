<template>
	<div class="flex-grid">
		<BarListItem
		v-for="bar in bars"
		:bar="bar"
		:key="bar['.key']"
		/>
	</div>
</template>

<script>
	import BarListItem from './BarListItem'
	export default {
		components: {
			BarListItem
		},
		props: {
			bars: {
				required: true,
				type: Array
			}
		}
	}
</script>