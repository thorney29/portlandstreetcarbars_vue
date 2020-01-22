<template>
    <div v-if="asyncDataStatus_ready" class="col-full push-top">
		<h1>Editing <i>{{bar.title}}</i></h1>
		<BarEditor
		ref="editor"
		:title="bar.title"
		:image="bar.image"
		:address="bar.address"
		:directionsUrl="bar.directionsUrl"
		:typeIds="bar.typeIds" 
		:notes="bar.notes" 
		:text="bar.text"
		:favoriteValue="bar.favoriteValue"
		:toGoValue="bar.toGoValue"
		@save="save"
		@cancel="cancel"
		/>
	</div>
</template>

<script>
	import {mapActions} from 'vuex'
	import BarEditor from '@/components/BarEditor'
	import asyncDataStatus from '@/mixins/asyncDataStatus'

	export default {
		components: {
			BarEditor
		},

		props: {
			id: {
				type: String,
				required: true
			}
		},

		mixins: [asyncDataStatus],

		computed: {
			bar () {
				return this.$store.state.bars.items[this.id]
			},
			text () {
				const favorite = this.$store.state.favorites.items[this.bar.favoriteId]
				return favorite ? favorite.text : null
			},
			hasUnsavedChanges () {
			return (this.$refs.editor.form.title !== this.bar.title || this.$refs.editor.form.image !== this.bar.image || this.$refs.editor.form.address !== this.bar.address || this.$refs.editor.form.directionsUrl !== this.bar.directionsUrl || this.$refs.editor.form.typeIds !== this.bar.typeIds || this.$refs.editor.form.notes !== this.bar.notes || this.$refs.editor.form.text !== this.bar.text) && !this.saved
			}
		},
		methods: {
			...mapActions('bars', ['updateBar', 'fetchBar']),
			...mapActions('favorites', ['fetchFavorite']),

			save ({title, image, address, directionsUrl, notes, text, typeIds, favoriteValue, toGoValue}) {
				this.updateBar({
					id: this.id,
					title,
					image,
					address,
					directionsUrl,
					notes,
					text,
					typeIds,
					favoriteValue,
					toGoValue
				}).then(bar => {
					this.$router.push({
						name: 'PageBarShow',
						// params: { id: this.id, slug: this.slug }
						params: { id: this.id }
					})
				})
			},
			cancel () {
					this.$router.push({ name: 'PageBarShow',
						// params: { id: this.id, slug: this.slug }
						params: { id: this.id }
					})
			}
		},

		created () {
			this.fetchBar({id: this.id})
			.then(bar => { this.fetchFavorite({id: bar.favoriteId}) })
			// need to change the above from firstFavoriteId
			.then(() => { this.asyncDataStatus_fetched() })
		},

		beforeRouteLeave (to, from, next) {
			if (this.hasUnsavedChanges) {
				const confirmed = window.confirm('Are you suUUUre you want to leave? Unsaved changes will be lost.')
				if (confirmed) {
					next()
				} else {
					next(false)
				}
			} else {
				next()
			}
		}
	}
</script>

<style scoped>

</style>