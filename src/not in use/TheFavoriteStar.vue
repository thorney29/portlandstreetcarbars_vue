<template>
	<div>
		<div class="icon-details">
			<form @submit.prevent="save">
			<!-- <form> -->
				<div class="favoriting">
			        <label
			         class="favorite__heart"
			         v-bind:class="[favorites ? 'is-favorited' : 'not-favorited']"
			         @click.prevent="updateFavorite">
			        <input
			            class="favorite__checkbox"
			            type="checkbox"
			            v-bind:value="bar.favorites"
			            v-model="bar.favorites">
			         	<span class="fas fa-heart" 
			         	:class="[favorites ? 'is-favorited' : 'not-favorited']">   
							{{favorites}}
						</span>
			        </label>
			        {{barsFavoritesCount}} likes
			    </div>
			</form>
		</div>
	</div>
</template>
<script>
	import {mapActions, mapGetters} from 'vuex'
	// import firebase from 'firebase'
	export default {
		// data () {
		// 	return {
		// 		value: {
		// 			type: Boolean,
		// 			default: false
		// 		},
		// 		disabled: {
		// 			type: Boolean,
		// 			default: false
		// 		},
		// 		form: {
		// 			value: null,
		// 			heart: ''
		// 		},
		// 		heart: this.favorite ? this.favorite.heart : ''
		// 	}
		// },
		// // components: {
		// // },

		props: {
			favorites: {
				required: true,
				type: Array
			}
		},
		// 	favorite: {
		// 		required: true,
		// 		type: Object
		// 	},
		// 	favorites: {
		// 		required: true,
		// 		type: Array
		// 	}
		// 	// ,
		// 	// favorite: {
		// 	// 	type: Object,
		// 	// 	validator: obj => {
		// 	// 		const keyIsValid = typeof obj['.key'] === 'string' // valid
		// 	// 		const textIsValid = typeof obj.heart === 'string' // valid
		// 	// 		const valid = keyIsValid && textIsValid
		// 	// 		if (!textIsValid) {
		// 	// 			console.error('This post property object must include a \'text\' attribute.')
		// 	// 		}
		// 	// 		if (!keyIsValid) {
		// 	// 			console.error('This post property object must include a \'key\' attribute.')
		// 	// 		}
		// 	// 		return valid
		// 	// 	}
		// 	// }
		// },
		computed: {
			...mapGetters({
				authUser: 'auth/authUser'
			}),
			bars () {
				return Object.values(this.$store.state.bars.items)
			},
			user () {
				return this.$store.state.users.items[this.bar.userId]
			},
			barsFavoritesCount () {
				return this.$store.getters['bars/barsFavoritesCount'](this.bar['.key'])
			},
			favorites () {
				return Object.values(this.$store.state.favorites.items)
			}
		},

		methods: {
			...mapActions('bars', ['fetchBar', 'createBar']),
			...mapActions('users', ['fetchUser']),
			...mapActions('favorites', ['createFavorite', 'updateBarFavorites', 'fetchFavorites'])
		// 	save () {
		// 		this.persist()
		// 		.then(favorite => {
		// 			this.$emit('save', {favorite})
		// 		})
		// 	},
		// 	create () {
		// 		const favorite = {
		// 			heart: this.heart,
		// 			favoriteId: this.favorite['.key']
		// 		}
		// 		// this.heart = ''

		// 		return this.createFavorite(favorite)
		// 	},
		// 	persist () {
		// 		return this.isUpdate ? this.update() : this.create()
		// 	},
		// 	favorited: function () {
		// 		if (this.disabled === true) {
		// 			return
		// 		}
		// 		this.heart = !this.heart
		// 		console.log(this.heart)
		// 		const payload = {
		// 			id: this.favorite['.key'],
		// 			heart: this.heart
		// 		}
		// 		return this.updateBarFavorites(payload)
		// 	}
		}
		// created () {
		// 	this.$emit('ready')
		// }
	}
</script>

<style scoped>
	.card {
		width: 31.333%;
		margin: 1%;
		text-align: center;
		padding: 10px;
	}
	.card-img-top {	
		width: 100%;
		height: 60%;
		object-fit: cover;
		object-position: center;
	}
	h5.card-title{font-size: 1.6rem;}

	.icon-details {text-align: right;}
	.fa-heart.is-favorited  {color: red;}
	.fa-star.is-starred {color: #b79b07;}

	.favoriting{
    display: inline-block
}
.favorite__heart {
    display: inline-block;
    padding: 3px;
    vertical-align: middle;
    line-height: 1;
    font-size: 16px;
    color: #ABABAB;
    cursor: pointer;
    -webkit-transition: color .2s ease-out;
    transition: color .2s ease-out;
}
.favorite__heart.is-disabled:hover {
     cursor: default;
 }
.favorite__checkbox {
    position: absolute;
    overflow: hidden;
    clip: rect(0 0 0 0);
    height: 1px;
    width: 1px;
    margin: -1px;
    padding: 0;
    border: 0;
}
.favorite__heart__selected{
    color: #df470b;
}