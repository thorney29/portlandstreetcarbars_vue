<template>
	<div  v-if="asyncDataStatus_ready" class="col-large push-top">
		<div class="card">
			<div v-if="user">
				<div v-if="user.permissions === 'admin'">
					<router-link
					:to="{name: 'PageBarEdit', params: {id: this.id}}"
					class="btn-green btn-small"
					tag="button"
					>
					Edit Bar	
					</router-link>
				</div>
			</div>
			<h1>{{bar.title}}</h1>
			<img class="card-img-top" :src="'/static/assets/img/bars/' + bar.image" alt="Card image cap">
			<p class="favorited" style="text-align: center;">
					<span v-if="barFavoritesCount === 0" class="inactive">
					<i 	class="fas fa-heart"></i>
					</span>
					<span v-if="barFavoritesCount > 0" class="active">
						<i class="fas fa-heart"></i>
						<span>  &nbsp; {{barFavoritesCount}}  </span>
					</span>
				</p>
				<div class="details">
			 	<ul class="icons">
					<template
					  v-for="(typeId, key, index) in bar.typeIds">
					  	<li style="" 
					  	v-if="typeId !== 'null'">
					  	<!-- {{typeId}} -->
					  	<template v-for="item in types">	
					  	  <span v-if="item.name === typeId">
					  	  	 <router-link 
					            class="type-name" 
					            :title="item.description"
					            :to="{name: 'PageType', params: {id : item['.key']}}"> 
					  		 <i class="fas fa-item">{{ item.icon }}</i> 
					  		  </router-link>
					  		</span>
					  	</template> 
					  	</li> 
					</template>
				</ul>

				<p style="text-align: center" class="barAddress">{{bar.address}}</p>
				<p v-html="bar.notes" class="barNotes" v-if="bar.notes !== ''">{{bar.notes}}</p>

				<div v-if="!user" class="text-center">
					<em><router-link :to="{name: 'PageLogin', query: {redirectTo: $route.path}}"> Login </router-link>&nbsp;or&nbsp;
					<router-link :to="{name: 'PageRegister', query: {redirectTo: $route.path}}">Register</router-link>&nbsp;to save a favorite and add notes.</em>
				</div>
				<!-- if this is a user favorite --> 
				<!-- then show the following List of User Favorites -->	 
				<div v-else class="card inner">
			 		<div  v-if="!isFavorite">
						<FavoriteEditor
						@save="editing = false"
						@cancel="editing = false"
						:user="user"
						:barId="id"
						/> 
					</div>
			 		<div v-else-if="isFavorite">
			 			<FavoriteList 
						:favorites="favorites"
						v-if="favorite !== null"
						/>
				 	</div>
				</div>
				<p>
					<a class="btn-green" target="_blank" :href="bar.directionsUrl">Get Directions</a>
				</p>
				</div>
			</div>
			<div style="margin: auto;display: table;margin: auto;" class="btn hvr-pop">
				<router-link
					:to="{name: 'PageDirections'}">
					Go Back to All Bars
				</router-link>
			</div>
	</div>
</template>

<script>
	import {mapActions, mapGetters} from 'vuex'
	import FavoriteList from '@/components/FavoriteList'
	import FavoriteEditor from '@/components/FavoriteEditor'
	import {countObjectProperties} from '@/utils'
	import asyncDataStatus from '@/mixins/asyncDataStatus'

	export default {
		components: {
			FavoriteList,
			FavoriteEditor
		},

		props: {
			id: {
				require: true,
				type: String
			},
			favorite: {
				type: Object,
				require: true
			},
			type: {
				type: String,
				require: true
			}
		},
		data () {
	        return {
				editing: false,
				title: this.bar ? this.bar.title : '',
				image: this.bar ? this.bar.image : '',
				address: this.bar ? this.bar.address : '',
				directionsUrl: this.bar ? this.bar.directionsUrl : '',
				notes: this.bar ? this.bar.notes : '',
				favoriteValue: this.favorite ? this.favorite.favoriteValue : '',
				toGoValue: this.favorite ? this.favorite.toGoValue : '',
				slug: this.bar ? this.bar.slug : ''
			}
		},
		mixins: [asyncDataStatus],

		methods: {
			...mapActions('bars', ['fetchBar']),
			...mapActions('users', ['fetchUser']),
			...mapActions('favorites', ['fetchFavorites']),
			...mapActions('types', ['fetchAllTypes'])
		},

		computed: {
			// Get user object
			...mapGetters({
				user: 'auth/authUser'
			}),
			// Get this bar ID
			bar () {
				return this.$store.state.bars.items[this.id]
			},
			// Get Total of Favorites for this bar
			barFavoritesCount () {
				return this.$store.getters['bars/barFavoritesCount'](this.bar['.key'])
			},
			// How many notes for each bar
			contributorsCount () {
				return countObjectProperties(this.bar.contributors)
			},
			types () {
				return Object.values(this.$store.state.types.items)
			},
			// Get this User's Bar Favorites
			favorites () {
				const favoriteIds = Object.values(this.bar.favorites)
				const userFavoriteIds = Object.values(this.user.favorites)
				const favorites = Object.values(this.$store.state.favorites.items)
				.filter(favorite => favoriteIds.includes(favorite['.key']))
				.filter(favorite => userFavoriteIds.includes(favorite['.key']))
				return favorites
			},
			isFavorite () {
				const favoriteIds = Object.values(this.bar.favorites)
				if (this.user.favorites === 'undefined' || this.user.favorites === undefined || this.user.favorites === null) {
					this.user.favorites = null
				} else {
					if (this.user.favorites) {
						const userFavoriteIds = Object.values(this.user.favorites)
						const isFavorite = Object.values(this.favorites)
						.filter(favorite => favoriteIds.includes(favorite['.key']))
						.filter(favorite => userFavoriteIds.includes(favorite['.key']))
						for (var key in isFavorite) {
							var value = isFavorite[key]
						}
						if (value === undefined) {
							return false
						} else {
							return true
						}
					}
				}
			}
		},

		created () {
			this.fetchAllTypes()
			// fetch bar
			this.fetchBar({id: this.id})
			.then(bar => {
				// fetch user
				// this.fetchFavorite({id: this.id})
				this.fetchUser({id: bar.userId})
				return this.fetchFavorites({ids: Object.keys(bar.favorites)})
			})
			.then(favorites => {
				return Promise.all(favorites.map(favorite => {
					this.fetchUser({id: favorite.userId})
				}))
			})
			.then(() => {
					this.asyncDataStatus_fetched()
			})
			// if (this.user.favorites) {
			// 	this.$store.dispatch('favorites/fetchFavorites', {ids: this.user.favorites})
			// 	.then(() => this.asyncDataStatus_fetched())
			// } else {
			// 	this.asyncDataStatus_fetched()
			// }
		}
	}
</script>
<style scoped>
	/*
	font-family: 'Bungee Inline', cursive;
	font-family: 'Give You Glory', cursive;
	font-family: 'Zeyada', cursive;
	font-family: 'Open Sans', sans-serif;
	font-family: 'Over the Rainbow', cursive;
	font-family: 'Gochi Hand', cursive;*/
	h1 {
	color: black;
	font-style: normal;
	font-family: 'Megrim', cursive;
	font-size: 2.6rem;
	}
	p {margin: 2% auto;}
	.card {
	    background: white;
	    width: 55%;
	    margin: 1% auto;
	    text-align: center;
	    background: #f5f5f5;
	}
	.card.inner {
		width: 67%;
	}
	img {
		width: 100%;
	}
	.details {
	    padding: .8rem;
	    padding: 20px 0;
	    border-style: dotted;
	    border: 10px solid;
		border-color: #54b09b; 
		border-image-source: url('../assets/img/svg/dots.svg');;
		border-image-slice:33% 33%; 
		border-image-repeat:round; 
	}
	.barAddress {margin: 4% auto;}
	.favorite__heart {
		position: relative;
		padding: 3px;
		vertical-align: middle;
		/*   line-height: 1;*/
		font-size: 20px;
		color: #ABABAB;
		cursor: pointer;
		-webkit-transition: color .2s ease-out;
		transition: color .2s ease-out;
	}
	.favorite__heart.is-disabled:hover {
		cursor: default;
	}
	.favorite__checkbox {
		opacity: 0;
		height: 20px;
		border: blue 1px solid;
		width: 30px;
		position: absolute;
		left: 4px;
		top: 0px;
		height: 30px;
	}
	.favorite__heart__selected,
	.favorited {
		color: red;
	}
	ul.icons li:hover {
	    background:black;
	}
	svg.svg-inline--fa:hover {
	    color:#fff !important;
	}
	svg.svg-inline--fa.fa-heart.fa-w-16:hover {
	    color: red !important;
	}
	hr {
		margin: 8% auto;
	}
	@media (max-width: 580px) {
		.card {
	        width: initial !important;
	        border: none !important;
	    }
	    .details {
	    	width: 90%;
	    	margin: auto auto 9%;
	    }
	    .card.inner {
			width: 90%;
			margin: auto;
		}
	    h1 {
		    font-size: 3.4rem;
		    margin: -2% auto 5%;
		}
	}
</style>