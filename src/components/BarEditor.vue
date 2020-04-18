<template>
    <form @submit.prevent="save">
			<div class="form-group">
				<label for="bar_title">Title:</label>
				<input
				v-model="form.title"
				type="text"
				id="bar_title"
				class="form-input"
				name="title">
			</div>
			<div class="form-group">
				<label for="bar_image">Image:</label>
				<input
				v-model="form.image"
				type="text"
				id="bar_image"
				class="form-input"
				name="image">
			</div>
			<div class="form-group">
				<label for="bar_address">Address:</label>
				<input
				v-model="form.address"
				type="text"
				id="bar_address"
				class="form-input"
				name="address">
			</div>
			<div class="form-group">
				<label for="bar_directionsUrl">Directions URL:</label>
				<input
				v-model="form.directionsUrl"
				type="text"
				id="bar_directionsUrl"
				class="form-input"
				name="directionsUrl">
			</div>
			<div class="form-group">
				<label for="bar_notes">Notes:</label>
				<input
				v-model="form.notes"
				type="text"
				id="bar_notes"
				class="form-input"
				name="notes">
			</div>
			<div class="form-group">
				<label for="bar_slug">Slug:</label>
				<input
				v-model="form.slug"
				type="text"
				id="bar_slug"
				class="form-input"
				name="slug">
			</div>
			<hr>
			<div class='form-group'>
			  <label for="bar_typeIds">Add/Edit Types:</label>
			  <input type="checkbox" id="brewery" :value="brewery" v-model="form.typeIds.brewery"  true-value="brewery" false-value="null">
			  <label for="brewery">brewery</label>
			  <input type="checkbox" id="craftbeer" value="craftbeer" v-model="form.typeIds.craftbeer" true-value="craftbeer" false-value="null">
			  <label for="craftbeer">craft beer</label>
			  <input type="checkbox" id="bikeparking" value="bikeparking" v-model="form.typeIds.bikeparking" true-value="bikeparking" false-value="null">
			  <label for="bikeparking">bike parking</label>
			   <input type="checkbox" id="cocktails" value="cocktails" v-model="form.typeIds.cocktails" true-value="cocktails" false-value="null">
			  <label for="cocktails">cocktails</label>
			  <input type="checkbox" id="coffee" :value="coffee" v-model="form.typeIds.coffee"  true-value="coffee" false-value="null">
			  <label for="coffee">coffee</label>
			  <input type="checkbox" id="food" value="food" v-model="form.typeIds.food" true-value="food" false-value="null">
			  <label for="food">food</label>
			    <input type="checkbox" id="games" value="games" v-model="form.typeIds.games" true-value="games" false-value="null">
			  <label for="games">games</label>
			    <input type="checkbox" id="music" value="music" v-model="form.typeIds.music" true-value="music" false-value="null">
			  <label for="music">music</label>
			  <input type="checkbox" id="outdoorseating" value="outdoorseating" v-model="form.typeIds.outdoorseating" true-value="outdoorseating" false-value="null">
			  <label for="outdoorseating">outdoor seating</label>
			  <input type="checkbox" id="wine" value="wine" v-model="form.typeIds.wine"  true-value="wine" false-value="null">
			  <label for="wine">wine</label>
			  <input type="checkbox" id="sports" value="sports" v-model="form.typeIds.sports" true-value="sports" false-value="null">
			  <label for="sports">sports</label>
			  <br>
			  <span>Checked Types: {{ form.typeIds }}</span>
			</div>
			<div class="hidden">
				<div class="form-group">
					<label for="bar_favoriteValue">favoriteValue:</label>
					<input
					v-model="form.favoriteValue"
					value=""
					type="text"
					id="bar_favoriteValue"
					class="form-input"
					name="favoriteValue">
				</div>
				<div class="form-group">
					<label for="bar_toGoValue">toGoValue:</label>
					<input
					v-model="form.toGoValue"
					type="text"
					id="bar_toGoValue"
					class="form-input"
					name="toGoValue">
				</div>
			</div>
			<div class="btn-group">
				<button  v-if="isUpdate" @click.prevent="cancel" class="btn btn-ghost">Cancel</button>
				<button class="btn btn-blue" type="submit" name="Publish">{{isUpdate ? 'Update' : 'Publish'}}
				</button>
			</div>
		</form>
</template>
<script>
	export default {
		props: {
			title: {
				type: String,
				default: ''
			},
			image: {
				type: String,
				default: ''
			},
			address: {
				type: String,
				default: ''
			},
			directionsUrl: {
				type: String,
				default: ''
			},
			notes: {
				type: String,
				default: ''
			},
			favoriteValue: {
				type: Boolean,
				default: false
			},
			toGoValue: {
				type: Boolean,
				default: false
			},
			slug: {
				type: String,
				default: ''
			},
			beer: {
				type: Boolean,
				default: false
			},
			brewery: {
				type: Boolean,
				default: false
			},
			cheers: {
				type: Boolean,
				default: false
			},
			coffee: {
				type: Boolean,
				default: false
			},
			games: {
				type: Boolean,
				default: false
			},
			glass: {
				type: Boolean,
				default: false
			},
			craftbeer: {
				type: Boolean,
				default: false
			},
			music: {
				type: Boolean,
				default: false
			},
			outdoorseating: {
				type: Boolean,
				default: false
			},
			sports: {
				type: Boolean,
				default: false
			},
			typeIds: {
				type: Object,
				default: () => ({
					bikeparking: 'null',
					brewery: 'null',
					cocktails: 'null',
					craftbeer: 'null',
					coffee: 'null',
					games: 'null',
					food: 'null',
					music: 'null',
					outdoorseating: 'null',
					sports: 'null',
					wine: 'null'
				})
			}
		},
		data () {
			return {
				form: {
					title: this.title,
					image: this.image,
					address: this.address,
					directionsUrl: this.directionsUrl,
					typeIds: this.typeIds,
					notes: this.notes,
					slug: this.slug,
					favoriteValue: this.favoriteValue,
					toGoValue: this.toGoValue
				}
			}
		},
		computed: {
			isUpdate () {
				return !!this.title
			}
		},
		methods: {
			save () {
				this.$emit('save', {
					title: this.form.title,
					image: this.form.image,
					address: this.form.address,
					directionsUrl: this.form.directionsUrl,
					typeIds: this.form.typeIds,
					notes: this.form.notes,
					slug: this.form.slug,
					favoriteValue: this.form.favoriteValue,
					toGoValue: this.form.toGoValue
				})
			},
			cancel () {
				this.$emit('cancel')
			}
		}
	}
</script>
<style scoped>

</style>