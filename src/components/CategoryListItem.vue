<template>
	<div class="category">
<!-- 		<h2 class="list-title">
		<router-link 
		:to="{name: 'PageCategory', params: {id: category['.key'], slug: category.slug}}" 
		class="category-name">
		 {{ category.name }}
		</router-link>
		</h2> -->
		<!-- this shows the 3 main category types on the site: Beer, Cocktails, Wine -->
		<TypeList :types="categoryTypes" v-bind:class="{ special: categoryTypes.length > 1 }"/></div>
</template>

<script>
	// import ForumList from './ForumList'
	import TypeList from './TypeList'
	export default {
		components: {
			TypeList
		},
		props: {
			category: {
				required: true,
				type: Object
			}
		},
		computed: {
			categoryTypes () {
				return Object.values(this.$store.state.types.items).filter(type => type.categoryId === this.category['.key'])
			}
		}
	}
</script>

<style scoped>
	h2.list-title a{
		text-align: center;
		font-size: 36px;
		margin:auto;
	}
	p {text-align: center;}
</style>