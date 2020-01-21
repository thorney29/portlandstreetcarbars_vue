<template>
	<form @submit.prevent="save">
<!-- 		<div class="form-group">
			<input
			name=""
			id=""
			class="form-input"
			v-model="text">
			</input>
		</div>
		<div class="form-actions">
				<button 
				v-if="isUpdate"
				@click.prevent="cancel"
				class="btn btn-ghost"
				>
					Cancel
				</button>
			<button class="btn-blue">{{isUpdate ? 'Update' : 'Submit Fave'}}</button>
		</div> -->
	</form>
</template>

<script>
	import {mapActions} from 'vuex'
	export default {
		props: {
			// barId: {
			// 	required: true
			// },
			favorite: {
				type: Object,
				validator: obj => {
					const keyIsValid = typeof obj['.key'] === 'string' // valid
					const textIsValid = typeof obj.text === 'string' // valid
					const valid = keyIsValid && textIsValid
					if (!textIsValid) {
						console.error('This favorite property object must include a \'text\' attribute.')
					}
					if (!keyIsValid) {
						console.error('This favorite property object must include a \'key\' attribute.')
					}
					return valid
				}
			}
		},

		data () {
			return {
				text: this.favorite ? this.favorite.text : ''
			}
		},

		computed: {
			isUpdate () {
				return !!this.favorite
			},
			hasUnsavedChanges () {
				return this.favorite !== this.text
			}
		},

		methods: {
			...mapActions('favorites', ['createFavorite', 'updateFavorite']),

			save () {
				this.persist()
				.then(favorite => {
					this.$emit('save', {favorite})
				})
			},

			cancel () {
				if (this.hasUnsavedChanges) {
				const confirmed = window.confirm('Are you sure you want to leave? Unsaved changes will be lost.')
				if (confirmed) {
						this.$emit('cancel')
					} else {
						// next(false)
					}
				} else {
					this.$emit('cancel')
				}
			},

			create () {
				const favorite = {
					text: this.text,
					barId: this.barId
				}
				this.text = ''

				return this.createFavorite(favorite)
			},

			update () {
				const payload = {
					id: this.favorite['.key'],
					text: this.text
				}
				return this.updateFavorite(payload)
			},
			persist () {
				return this.isUpdate ? this.update() : this.create()
			}
		}
	}
</script>

<style scoped>

</style>