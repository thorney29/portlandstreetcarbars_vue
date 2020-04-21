 <template>
	<li v-if="bar" class="flex-item card" v-bind:class = "{ 'yellow-border': barFavoritesCount >= 10 }">
  		<div class="card-details">
  			<div class="card-header"  :class="{ 'addFlex100Class' : isShowing == false}">
	      		<!-- <router-link :to="{name: 'PageBarShow', params: {id: bar['.key']}}"> -->
	      		<router-link :to="{name: 'PageBarShow', 
	      		params: {id: bar['.key'], slug: bar.slug}
	      		}">
		      		<img @error="imageUrlAlt" class="card-img-top card__image" :src="'/static/assets/img/small/' + image" alt="Card image cap">
		      		<!-- Heading -->
					<div class="wrapper">       
						<h2 class="sparkle u-hover--sparkle">{{bar.title}}</h2>
						<h5 style="color:#211E1E">{{bar.title}}</h5>
					</div>
				</router-link>
			</div>
			<div class="card__content">
				<div class="card__text">
					<!-- type was here -->

					<p class="favorited" style="text-align: center;">
						<span v-if="barFavoritesCount === 0" class="inactive">
						<i class="fas fa-heart"></i>
						</span>
						<span v-if="barFavoritesCount > 0" class="active">
							<i class="fas fa-heart"></i>
							<span>  &nbsp; {{barFavoritesCount}}  </span>
						</span>
					</p>
					<!-- click to view -->
					<div v-show="!isShowing">
						<button class="btn-green" @click="isShowing ^= true">Show More</button>
					</div>
					<div v-show="isShowing">
						<button class="btn-green show-less" @click="isShowing ^= true">Show Less</button>
					</div>
					
					<div v-show="isShowing" class="showMoreDetails">
						<p><!-- Bar Type Icons -->
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
						</p>
						<div class="address">
							<p>Address: {{bar.address}}</p>			
							<p v-html="bar.notes" class="barNotes" v-if="bar.notes !== ''">{{bar.notes}}</p>
						</div>				
						
						<div v-if="!user" class="text-center" style="margin-bottom: 50px">
							<router-link :to="{name: 'PageLogin', query: {redirectTo: $route.path}}">Login</router-link>&nbsp;or&nbsp;
							<router-link :to="{name: 'PageRegister', query: {redirectTo: $route.path}}">Register</router-link>&nbsp;to save your favorite bars, keep a list of places you'd like to visit, and add notes.
						</div>
						<div v-else class="card" style="border: 2px solid #ccc;">
					 		<div style="padding: 20px;" v-if="!isFavorite">
								<!-- {{isFavorite}} -->
								<FavoriteEditor
								@save="editing = false"
								@cancel="editing = false"
								:user="user"
								:barId="id"
								/> 
							</div>
					 		<div v-else-if="isFavorite">
					 			<!-- {{isFavorite}} -->
					 			<FavoriteList 
								:favorites="favorites"
								v-if="favorite !== null"
								/>
						 	</div>
						</div>
						<p>
						<a class="btn-green" target="_blank" :href="bar.directionsUrl">Get Directions</a></p>
					</div>
				</div>
			</div>
		</div>
    </li>
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
			bar: {
				required: true,
				type: Object
			},
			favorite: {
				type: Object,
				require: true
			}
		},
		data () {
	        return {
				id: this.bar ? this.bar['.key'] : '',
				slug: this.bar ? this.bar.slug : '',
				editing: false,
				image: this.bar ? this.bar.image : '',
				address: this.bar ? this.bar.address : '',
				directionsUrl: this.bar ? this.bar.directionsUrl : '',
				notes: this.bar ? this.bar.notes : '',
				typeIds: this.bar ? this.bar.typeIds : '',
				favoriteValue: this.bar ? this.bar.favoriteValue : '',
				toGoValue: this.bar ? this.bar.toGoValue : '',
				text: this.bar ? this.bar.text : '',
				isShowing: false
			}
		},
		mixins: [asyncDataStatus],
		methods: {
			// getImgUrl (image) {
			// 	return require('../assets/img/small/' + image)
			// },
			imageUrlAlt (event) {
				// event.target.src = '/static/img/pattern2.jpg'
			},
			...mapActions('bars', ['fetchBar']),
			...mapActions('users', ['fetchUser']),
			// ...mapActions('favorites', ['fetchFavorites']),
			...mapActions('favorites', ['fetchAllFavorites']),
			...mapActions('types', ['fetchAllTypes'])
		},
		computed: {
			// Get user object
			...mapGetters({
				user: 'auth/authUser'
			}),
			types () {
				return Object.values(this.$store.state.types.items)
			},
			// Bar ID obtained in prop
			// Get Total of Favorites for this bar
			barFavoritesCount (bar) {
				return this.$store.getters['bars/barFavoritesCount'](this.bar['.key'])
			},
			// It's easy to build chains!
			// How many notes for each bar
			contributorsCount () {
				return countObjectProperties(this.bar.contributors)
			},
			// Get this User's Bar Favorites
			favorites () {
				const favoriteIds = Object.values(this.bar.favorites)
				const userFavoriteIds = undefined
				if (this.user.favorites) {
					const userFavoriteIds = Object.values(this.user.favorites)
					// console.log(favoriteIds)
					// console.log(userFavoriteIds)
					const favorites = Object.values(this.$store.state.favorites.items)
					.filter(favorite => favoriteIds.includes(favorite['.key']))
					.filter(favorite => userFavoriteIds.includes(favorite['.key']))
					// console.log(favorites)
					return favorites
				}
				return userFavoriteIds
			},
			// Check to see if this
			isFavorite () {
				if (this.bar.favorites === undefined || this.bar.favorites === null) {
					return
				}
				const favoriteIds = Object.values(this.bar.favorites)
				// const userFavoriteIds = null
				const userFavoriteIds = undefined
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
				return userFavoriteIds
			}
		}
		// ,
		// created () {
		// 	this.fetchAllTypes()
		// 	// fetch bar
		// 	this.fetchBar({id: this.id})
		// 	.then(bar => {
		// 		// fetch user
		// 		// this.fetchFavorite({id: this.id})
		// 		return this.fetchAllFavorites({ids: Object.keys(bar.favorites)})
		// 	})
		// 	.then(favorites => {
		// 		return Promise.all(favorites.map(favorite => {
		// 		// this.fetchUser({id: favorite.userId})
		// 		console.log('success fetched favorites')
		// 		// this.asyncDataStatus_fetched()
		// 		}))
		// 	})
		// 	.then(() => {
		// 		this.asyncDataStatus_fetched()
		// 	})
		// }
		// created () {
		// 	this.fetchAllTypes()
		// 	// fetch bar
		// 	this.fetchBar({id: this.id})
		// 	.then(bar => {
		// 		// fetch user
		// 		// this.fetchFavorite({id: this.id})
		// 		// this.fetchUser({id: bar.userId})
		// 		return this.fetchFavorites({ids: Object.keys(bar.favorites)})
		// 	})
		// 	.then(favorites => {
		// 		this.asyncDataStatus_fetched()
		// 		return Promise.all(favorites.map(favorite => {
		// 	// 		// this.fetchUser({id: favorite.userId})
		// 			console.log('success fetched favorites')
		// 		}))
		// 	})
		// 	.then(() => {
		// 			this.asyncDataStatus_fetched()
		// 	})
		// }
	}
</script>
<style scoped>

	.yellow-border {
		border: 3px solid yellow;
	}
	.wrapper {
		text-align: center;
	}
	.addFlex100Class {
		flex:80%;
		-webkit-flex:80%;
	}
	a:hover h2 {
		color: #fff;
		background: linear-gradient(to right, #000 10%, rgb(9,128,140) 50%, #822357 60%);
		background-size: auto auto;
		background-clip: border-box;
		background-size: 200% auto;
		color: #fff;
		background-clip: text;
		text-fill-color: transparent;
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		animation: textclip 1.5s linear infinite;
		display: inline-block;
		font-weight: 900;
	}
	.sparkle {
	  max-width: 10em;
	  margin: auto;
	}
	.sparkle:hover {
	  cursor: pointer;
	}

	.u-hover--sparkle {
	  box-sizing: border-box;
	  position: relative;
	  padding: 0.75em .35em;
	}
	.u-hover--sparkle::before, .u-hover--sparkle::after {
	  content: '';
	  box-sizing: border-box;
	  position: absolute;
	  top: 0;
	  left: 0;
	  height: 100%;
	  width: 100%;
	  transform-origin: center;
	}
	.u-hover--sparkle::before {
	  border-top: 0.2em solid #822357;
	  border-bottom: 0.2em solid #822357;
	  transform: scale3d(0, 1, 1);
	}
	.u-hover--sparkle::after {
	  border-left: 0.2em solid #822357;
	  border-right: 0.2em solid #822357;
	  transform: scale3d(1, 0, 1);
	}
	.u-hover--sparkle:hover::before, .u-hover--sparkle:hover::after {
	  transform: scale3d(1, 1, 1);
	  transition: transform 900ms;
	}
	@keyframes textclip {
		to {
			background-position: 200% center;
		}
	}
	.card-img-top {
		width: 100%;
		object-fit: cover;
		object-position: center;
	}

	.showMoreDetails {
		/*border: #54b09b 10px dotted;
	    padding: .8rem;*/
	    margin: 7% 3%;
	    width: 94%;
	    padding: .8rem;
	    padding: 20px 0;
	    border-style: dotted;
	    border: 10px solid;
		border-color: #54b09b; 
		border-image-source: url('../assets/img/svg/dots.svg');;
		border-image-slice:33% 33%; 
		border-image-repeat:round; 
	}
	.barNotes {
		border-top: 1px dashed black;
		border-bottom: 1px dashed black;
		padding: 20px 0;
		width: 67%;
		font-size: 1.2rem;
		margin:7% auto;
	}
	.icon-details {text-align: right;}
	.favorited {color: red;margin: 3% auto;}
	.show-less {margin: 2% auto;}

	/* card code */
	.flex-item.card{
	  display: flex;
	  padding: .5rem;
	  width: 360px;
	  height: auto;
	  border-top-left-radius: 0.25rem;
	  border-top-right-radius: 0.25rem;
	}
	@media (min-width: 1344px) {
	  .flex-item.card{
		width: 419px;
	  }
	}
	@media (min-width: 56rem) {
	  .flex-item.card {
	    /*flex: 0 0 33.11111%*/
	  }
	}
	.card-details {
	  background-color: white;
	  border-radius: 0.25rem;
	  box-shadow: 0 20px 40px -14px rgba(0, 0, 0, 0.25);
	  display: flex;
	  flex-direction: column;
	  justify-content: center;
	  overflow: hidden;
	 /* flex: 0 0 100%;*/
	}
	.card:hover .card__image {
	  -webkit-filter: contrast(100%);
	          filter: contrast(100%);
	}
	.card__content {
	  display: flex;
	  /*flex: 1 1 auto;*/
	  flex-direction: column;
	  padding: 0;
	  text-align: center;
	}
	.card__image {
	  background-position: center center;
	  background-repeat: no-repeat;
	  background-size: cover;
	  border-top-left-radius: 0.25rem;
	  border-top-right-radius: 0.25rem;
	  -webkit-filter: contrast(70%);
	          filter: contrast(70%);
	  overflow: hidden;
	  position: relative;
	  transition: -webkit-filter 0.5s cubic-bezier(0.43, 0.41, 0.22, 0.91);
	  transition: filter 0.5s cubic-bezier(0.43, 0.41, 0.22, 0.91);
	  transition: filter 0.5s cubic-bezier(0.43, 0.41, 0.22, 0.91), -webkit-filter 0.5s cubic-bezier(0.43, 0.41, 0.22, 0.91);
	}
	.card__image::before {
	  content: "";
	  display: block;
	  padding-top: 56.25%;
	}
	ul.icons {
		margin:auto auto 4%;
	}
	ul.icons li:hover {
	    background:black;
	    color: white;
	}
	svg.svg-inline--fa:hover {
	    color:#fff !important;
	}
	svg.svg-inline--fa.fa-heart.fa-w-16:hover {
	    color: red !important;
	}
	@media (min-width: 40rem) {
	  .card__image::before {
	    padding-top: 66.6%;
	  }
	}
	.card-header {
		/*flex: 0 1 100%;
		-webkit-flex: 100%;*/
	}
	.wrapper {
	  color: #696969;
	  font-size: 1.25rem;
	  font-weight: 300;
	  letter-spacing: 2px;
	  text-transform: uppercase;
	}
	.card__text {
	  /*flex: 1 1 auto;*/
	  font-size: 0.875rem;
	  line-height: 1.5;
	  margin-bottom: 1.25rem;
	}
	@media (max-width:736px) {
		.card {width: 360px;margin:4% auto;}
		.sparkle {
	        max-width: 100%;    
	    }
	}
	/*@media (max-width:580px) {
		.card {width: 320px;margin:4% auto;}
		.sparkle {
	        max-width: 100%;    
	    }
	}*/
</style>