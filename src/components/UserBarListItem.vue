<template v-if="bar">
	<div v-if="userIsContributor" class="card">
			<img class="card-img-top" :src="bar.image" alt="Card image cap">
      		<!-- Heading -->
			<div class="wrapper">       
				<!-- 	<router-link :to="{name: 'PageBarShow', params: {id: bar['.key'], name: bar.slug}}">
						<h2>{{bar.title}}</h2>
				</router-link> -->
					<router-link :to="{name: 'PageBarShow', params: {id: bar['.key']}}">
					<h2 class="sparkle u-hover--sparkle">{{bar.title}}</h2>
				</router-link>
			</div>
			
			<p><!-- Bar Icons -->
				<ul class="icons">
				  <li v-for="(item, key, index) in bar.icons" v-if="item !== 'null'">
				  <i class="fas fa-item">{{ item }}</i>
				  </li>
				</ul>
			</p>
			<!-- Bar Favorite Count -->
			<p class="favorited" style="text-align: center;">
				<i class="fas fa-heart"></i>
				{{barFavoritesCount}} {{barFavoritesCount === 1 ? 'favorite': 'favorites' }} 
			</p>
			<!-- click to view -->
			<div v-show="!isShowing">
			 <button class="btn-green" @click="isShowing ^= true">Show More</button>
			</div>
			<div v-show="isShowing">
			 <button class="btn-green show-less" @click="isShowing ^= true">Show Less</button>
			</div>
			 <div v-show="isShowing">
				<div class="address">
					<p>{{bar.address}}</p>					
					<p v-html="bar.notes" class="barNotes" v-if="bar.notes !== ''">{{bar.notes}}</p>
				</div>				
			<!-- 	<div v-if="!user" class="text-center" style="margin-bottom: 50px">
					<router-link :to="{name: 'PageLogin', query: {redirectTo: $route.path}}">Login</router-link>&nbsp;or&nbsp;
					<router-link :to="{name: 'PageRegister', query: {redirectTo: $route.path}}">Register</router-link>&nbsp;to save a favorite and add notes.
				</div> -->
				<div>
			 		<!-- <div  v-if="!isFavorite && user">
				 			<router-link :to="{name: 'PageBarShow', params: {id: bar['.key']}}">
								<p>Edit </p>
							</router-link>	
						<FavoriteEditor
						@save="editing = false"
						@cancel="editing = false"
						:user="user"
						:barId="id"
						/> 
					</div> -->
			 		<!-- 	<div v-else-if="isFavorite && user"> -->
			 			<FavoriteList 
						:favorites="favorites"
						v-if="favorite !== null"
						/>
				<!--  	</div> -->
				</div>
				<button class="btn" @click="navigate(bar.title)">Get Directions</button>
			</div>
	</div>
</template>

<script>
	// added this now
	import {mapActions, mapGetters} from 'vuex'
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
				text: this.bar ? this.bar.text : '',
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
			},
			...mapActions('bars', ['fetchBar']),
			...mapActions('users', ['fetchUser']),
			...mapActions('favorites', ['fetchFavorites'])
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
			// Get this User's Bar Favorites
			favorites () {
				const favoriteIds = Object.values(this.bar.favorites)
				const userFavoriteIds = Object.values(this.user.favorites)
				// console.log(favoriteIds)
				// console.log(userFavoriteIds)
				const favorites = Object.values(this.$store.state.favorites.items)
				.filter(favorite => favoriteIds.includes(favorite['.key']))
				.filter(favorite => userFavoriteIds.includes(favorite['.key']))
				// console.log(favorites)
				return favorites
			},
			userIsContributor () {
				return this.$store.getters['bars/userIsContributor'](this.bar['.key'])
			},
			favoriteUser () {
				const favoriteObjects = Object.values(this.favorites)
				// console.log('contributorIds')
				// console.log(contributorIds)
				const user = this.user['.key']
				// console.log(user)
				const userIsInFavorite = favoriteObjects.filter(function (favorite) {
					return favorite.userId === user
				})
				for (var key in userIsInFavorite) {
					var value = userIsInFavorite[key]
				}
				// // console.log(value)
				// console.log(value)
				// console.log('userIsInFavorite')
				// console.log(userIsInFavorite)
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
				// console.log(favoriteIds)
				// console.log(userFavoriteIds)
				const isFavorite = Object.values(this.$store.state.favorites.items)
				.filter(favorite => favoriteIds.includes(favorite['.key']))
				.filter(favorite => userFavoriteIds.includes(favorite['.key']))
				// console.log(typeof isFavorite)
				for (var key in isFavorite) {
					var value = isFavorite[key]
				}
				console.log(value)
				return value
			}
		},

		created () {
			// fetch bar
			if (this.user.favorites) {
				this.fetchBar({id: this.id})
				.then(bar => {
					// fetch user
					// this.fetchFavorite({id: this.id})
					this.fetchUser({id: bar.userId})
					return this.fetchFavorites({ids: Object.keys(bar.favorites)})
				})
				.then(favorites => {
					return Promise.all(favorites.map(favorite => {
						// this.fetchUser({id: favorite.userId})
						console.log('favorites fetched success')
					}))
				})
				.then(() => {
						this.asyncDataStatus_fetched()
				})
			} else {
				this.asyncDataStatus_fetched()
			}
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
	}
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
	  padding: 0.75em;
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
	.card {
		background: white;
	}
	.card .card {
		width: 100%;
		margin: 1% auto;
	}
	.card-img-top {
		width: 100%;
		height: 60%;
		object-fit: cover;
		object-position: center;
	}
	ul.icons {
		display: flex;
		justify-content: center;
		margin: 3% auto;
	}
	ul.icons li {
		list-style: none;
	    align-items: center;
	    align-content: center;
	    align-self: center;
	    border: 2px solid #0c6534;
	    height: 40px;
	    width: 40px;
	    display: flex;
	    justify-content: center;
	   
	    border-radius: 50%;
	    margin:1%;
	}
	svg.svg-inline--fa.fa-umbrella-beach.fa-w-20,
	svg.svg-inline--fa.fa-biking.fa-w-20,
	svg.svg-inline--fa.fa-utensils.fa-w-13,
	svg.svg-inline--fa.fa-beer.fa-w-14,
	svg.svg-inline--fa.fa-cocktail.fa-w-18,
	svg.svg-inline--fa.fa-music.fa-w-16,
	svg.svg-inline--fa.fa-wine-glass-alt.fa-w-9 {
	    color: #0c6534;
	    padding: 4px;
	    font-size: 2rem;
	}
	svg.svg-inline--fa.fa-umbrella-beach.fa-w-20 {
		 font-size: 1.6rem;
	}
	svg.svg-inline--fa.fa-biking.fa-w-20,
	svg.svg-inline--fa.fa-music.fa-w-16 {
		 font-size: 1.8rem;
	}
	svg.svg-inline--fa.fa-beer.fa-w-14{
	    margin-left: 13%;
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
</style>