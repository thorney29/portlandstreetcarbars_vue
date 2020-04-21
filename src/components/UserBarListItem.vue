<template v-if="bar">
	<div v-if="userIsContributor" class="card">
	<!-- <div class="card"> -->
			<img class="card-img-top" :src="'/static/assets/img/small/' + bar.image"  alt="Card image cap">
      		<!-- Heading -->
			<div class="wrapper">       
				<router-link :to="{name: 'PageBarShow', params: {id: bar['.key']}}">
					<h2 class="sparkle u-hover--sparkle">{{bar.title}}</h2>
				</router-link>
			</div>
			
			<!-- Bar Favorite Count -->
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
				<div class="address">
					<p>{{bar.address}}</p>					
					<p v-html="bar.notes" class="barNotes" v-if="bar.notes !== ''">{{bar.notes}}</p>
				</div>				
				<div>
		 			<FavoriteList 
					:favorites="favorites"
					v-if="favorite !== null"
					/>
				</div>
				<button class="btn" @click="navigate(bar.title)">Get Directions</button>
			</div>
	</div>
</template>

<script>
	// added this now
	import {mapGetters} from 'vuex'
	import FavoriteList from '@/components/FavoriteList'
	import FavoriteEditor from '@/components/FavoriteEditor'
	import {countObjectProperties} from '@/utils'
	import asyncDataStatus from '@/mixins/asyncDataStatus'
	// import { filter, count } from 'vue-computed-helpers'

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
				editing: false,
				address: this.bar ? this.bar.address : '',
				notes: this.bar ? this.bar.notes : '',
				favoriteValue: this.bar ? this.bar.favoriteValue : '',
				toGoValue: this.bar ? this.bar.toGoValue : '',
				barNotes: this.bar ? this.bar.barNotes : '',
				icons: this.bar ? this.bar.icons : '',
				isShowing: false
			}
		},
		mixins: [asyncDataStatus],
		methods: {
			navigate: function (title) {
				var ua = navigator.userAgent.toLowerCase()

				function iOSversion () {
					if (/iP(hone|od|ad)/.test(navigator.platform)) {
						// supports iOS 2.0 and later: <http://bit.ly/TJjs1V>
						var v = (navigator.appVersion).match(/OS (\d+)_(\d+)_?(\d+)?/)
						return [parseInt(v[1], 10), parseInt(v[2], 10), parseInt(v[3] || 0, 10)]
					}
				}
				var ver = iOSversion() || [0]
				// var addressLongLat = lat + ',' + lng
				if (ver[0] >= 5) {
					window.open('https://maps.apple.com/?q=' + title, '_system')
					if (navigator.userAgent.match('CriOS')) {
						window.open('comgooglemaps://?q=' + title)
						// window.open("geo:0,0?q="+ name , '_system')
					}
				} else if ((ua.indexOf('android') !== -1)) {
					// window.open("geo:"+addressLongLat)
					window.open('geo:0,0?q=' + title, '_system')
				} else {
					// window.open("http://maps.google.com/?q="+addressLongLat, '_system')
					window.open('https://www.google.com/maps/place/?key=AIzaSyCXOqIYw5VQH9kCQwj3buLfVV3vHvKfxsM&q=' + title)
				}
			}
			// ,
			// ...mapActions('bars', ['fetchBar']),
			// ...mapActions('users', ['fetchUser']),
			// ...mapActions('favorites', ['fetchFavorites'])
		},
		computed: {
			// Get user object
			...mapGetters({
				user: 'auth/authUser'
			}),

			// Bar ID obtained in prop
			// Get Total of Favorites for this bar
			barFavoritesCount () {
				return this.$store.getters['bars/barFavoritesCount'](this.bar['.key'])
			},
			// It's easy to build chains!
			// How many notes for each bar
			contributorsCount () {
				return countObjectProperties(this.bar.contributors)
			},
			// userFavoritedBars () {
			// 	return this.$store.getters['users/userFavoritedBars']
			// },
			// Get this User's Bar Favorites
			favorites () {
				const favoriteIds = Object.values(this.bar.favorites)
				const userFavoriteIds = Object.values(this.user.favorites)
				const favorites = Object.values(this.$store.state.favorites.items)
				.filter(favorite => favoriteIds.includes(favorite['.key']))
				.filter(favorite => userFavoriteIds.includes(favorite['.key']))
				return favorites
			},
			userIsContributor () {
				return this.$store.getters['bars/userIsContributor'](this.bar['.key'])
			},
			favoriteUser () {
				const favoriteObjects = Object.values(this.favorites)
				const user = this.user['.key']
				const userIsInFavorite = favoriteObjects.filter(function (favorite) {
					return favorite.userId === user
				})
				for (var key in userIsInFavorite) {
					var value = userIsInFavorite[key]
				}
				const favoriteUser = value
				return favoriteUser
			},
			// Check to see if this
			isFavorite () {
				const favoriteIds = Object.values(this.bar.favorites)
				const userFavoriteIds = ''
				if (this.user.favorites) {
					const userFavoriteIds = Object.values(this.user.favorites)
					return userFavoriteIds
				}
				const isFavorite = Object.values(this.$store.state.favorites.items)
				.filter(favorite => favoriteIds.includes(favorite['.key']))
				.filter(favorite => userFavoriteIds.includes(favorite['.key']))
				for (var key in isFavorite) {
					var value = isFavorite[key]
				}
				return value
			}
		},

		created () {
		}
	}
</script>
<style scoped>
.card {
		width: 48%;
		margin: 1%;
		text-align: center;
		padding: 10px;
		height: 100%;
		background: white;
	}
	
	.active {color:red;}
	.showMoreDetails {
		border: #54b09b 10px dotted;
	    padding: .8rem;
	    margin: 7% auto 0;
	}
	@media (max-width:580px) {
		.card {width: 320px;margin:4% auto;}
		.sparkle {
	        max-width: 100%;    
	    }
	}

	/*.yellow-border {
		border: 3px solid yellow;
	}*/
	.wrapper {
		text-align: center;
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
	}
	.barNotes {
		border-top: 1px dashed black;
		border-bottom: 1px dashed black;
		padding: 20px 0;
		width: 67%;
		font-size: 1.2rem;
		margin:7% auto;
		font-weight: 800;
	}
	.icon-details {text-align: right;}
	.favorited {color: red;margin: 3% auto;}
	.show-less {margin: 2% auto;}

	/* card code */
	.flex-item.card{
	  display: flex;
	  padding: .5rem;
	  width: 320px;
	  height: auto;
	  border-top-left-radius: 0.25rem;
	  border-top-right-radius: 0.25rem;
	}
	@media (min-width: 540px) {
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
	  flex: 0 0 100%;
	}
	.card:hover .card__image {
	  -webkit-filter: contrast(100%);
	          filter: contrast(100%);
	}
	.card__content {
	  display: flex;
	  flex: 1 1 auto;
	  flex-direction: column;
	  padding: 1rem;
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
	ul.icons li:hover {
	    background:black;
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
		flex: 0 1 100%;
		-webkit-flex: 1;
	}
	.wrapper {
	  color: #696969;
	  font-size: 1.25rem;
	  font-weight: 300;
	  letter-spacing: 2px;
	  text-transform: uppercase;
	}
	.card__text {
	  flex: 1 1 auto;
	  font-size: 0.875rem;
	  line-height: 1.5;
	  margin-bottom: 1.25rem;
	}
	@media (max-width:736px) {
		.card {width: 320px;margin:4% auto;}
		.sparkle {
	        max-width: 100%;    
	    }
	}
</style>