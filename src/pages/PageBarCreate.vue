<template>
	<div v-if="asyncDataStatus_ready" class="col-full push-top">
		<h1>Create new bar in <i>{{type.name}}</i></h1>
		<BarEditor 
		ref="editor"
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
			typeId: {
				type: String,
				required: true
			}
		},

		mixins: [asyncDataStatus],

		data () {
			return {
				saved: false
			}
		},

		computed: {
			type () {
				return this.$store.state.types.items[this.typeId]
			},
			hasUnsavedChanges () {
				return (this.$refs.editor.form.title || this.$refs.editor.form.image || this.$refs.editor.form.address || this.$refs.editor.form.directionsUrl || this.$refs.editor.form.notes || this.$refs.editor.form.typeIds || this.$refs.editor.form.slug) && !this.saved
			}
		},

		methods: {
			...mapActions('bars', ['createBar']),
			...mapActions('types', ['fetchType']),

			save ({typeId, title, image, address, directionsUrl, typeIds, notes, slug, toGoValue, favoriteValue}) {
				this.createBar({
					typeId: this.type['.key'],
					title,
					image,
					notes,
					typeIds,
					address,
					directionsUrl,
					slug,
					toGoValue,
					favoriteValue
				}).then(bar => {
					this.saved = true
					this.$router.push({
						name: 'PageBarShow',
						// params: { id: bar['.key'], slug: bar.slug }
						params: { id: bar['.key'] }

					})
				})
			},
			cancel () {
					this.$router.push({ name: 'PageType',
						// params: { id: this.type['.key'], slug: this.type.slug }
						params: { id: this.type['.key'] }

					})
			}
		},

		created () {
			this.fetchType({id: this.typeId})
			.then(() => { this.asyncDataStatus_fetched() })
		},

		beforeRouteLeave (to, from, next) {
			if (this.hasUnsavedChanges) {
				const confirmed = window.confirm('Are you sure you want to leave? Unsaved changes will be lost.')
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