<template>
	<div class="card">
		<img class="card-img-top" :src="bar.image" alt="Card image cap">
		<div class="card-body">
			<!-- favorites -->

			 	<div v-if="this.bar.favorites === userId">
			 		<button
					@click.prevent="save()"
				 	type="submit"
				 	v-is-favorite="FavoriteStatus"
				 	v-model="bar.favorites" 
				 	:class="[isFavorited ? 'is-favorited' : 'not-favorited']" 
				 	>
				 		<span class="fas fa-heart">
				 			isFavorited = true, this should be red and show true <br>
					 	  
					 		<div>
							{{barsFavoritesCount}} {{barsFavoritesCount === 1 ? 'faved': 'favorites' }} 
							</div>
						</span>
					</button>  
				</div>
				<div v-else>
					<button 
	 				:value="true"
					@click.prevent="save()"
				 	type="submit"
				 	v-is-favorite="FavoriteStatus"
				 	v-model="bar.favorites" 
				 	:class="[isFavorited === true ? 'is-favorited' : 'not-favorited']" 
				 	> 
					 	<span class="fas fa-heart">  
					 		isFavorited = false
					 		<div>
							{{barsFavoritesCountMinusOne}} {{barsFavoritesCount === 0 ? 'no favorites': 'favorites' }}
							</div>
						</span>
					</button>
				</div>
			<!-- <div v-else>
				<span class="fas fa-heart">  
				</span>
				alert("Sign in or create an account to save favorites.")
			</div> -->
			<h5 class="card-title">{{bar.name}}</h5>
			<p class="card-text">		
			<div><strong><span> {{bar.type}}</span></strong></div>
			<div class="address"> {{bar.address}}</div></p>
			<a target="_blank" :href="bar.url" class="btn btn-primary">View Website</a>
			<button class="btn" @click="navigate(bar.name)">Get Directions</button>
		</div>
	</div>
</template>

<script>
	// import firebase from 'firebase'
	import {mapActions, mapGetters} from 'vuex'
	import isFavorite from '@/directives/is-favorite'
	export default {
		directives: {
			isFavorite
		},
		components: {
		},
		data () {
			return {
				isFavorited: this.favorites ? this.favorites : false,
				bars: Object,
				userId: this.authUser['.key']
				// favorites: [{
				// 	barId: this.bar['.key'],
				// 	isFavorited: this.bar.favorites ? this.bar.favorites : false,
				// 	userId: this.authUser['.key']
				// }]
			}
		},
		props: {
			bar: {
				required: true,
				type: Object
			}
		},
		methods: {
			FavoriteStatus () {
				this.isFavorited = this.user.favorites
			},
			...mapActions('bars', ['createBarFavorite', 'deleteBarFavorites', 'fetchFavorites']),

			save (barId, favoriteId, authUser, isFavorited) {
				this.isFavorited = !this.isFavorited
				if (this.isFavorited === true) {
					this.createBarFavorite({
						barId: this.bar['.key'],
						userId: this.authUser['.key'],
						// favoriteId: barId.favorites,
						isFavorited: this.isFavorited
					})
				} else {
					this.deleteBarFavorites({
					favoriteId: favoriteId,
					userId: this.authUser['.key'],
					bar: this.bars,
					barId: this.bar['.key'],
					// favoriteId: favoriteId,
					// userId: this.authUser['.key'],
					isFavorited: this.isFavorited
					})
				}
			},

			navigate: function (lat, lng, name) {
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
					window.open('https://maps.apple.com/?q=' + name, '_system')
					if (navigator.userAgent.match('CriOS')) {
						window.open('comgooglemaps://?q=' + name)
						// window.open("geo:0,0?q="+ name , '_system')
					}
				} else if ((ua.indexOf('android') !== -1)) {
					// window.open("geo:"+addressLongLat)
					window.open('geo:0,0?q=' + name, '_system')
				} else {
					// window.open("http://maps.google.com/?q="+addressLongLat, '_system')
					window.open('https://www.google.com/maps/place/?key=AIzaSyCXOqIYw5VQH9kCQwj3buLfVV3vHvKfxsM&q=' + name)
				}
			}
		},
		computed: {
			...mapGetters({
				authUser: 'auth/authUser'
			}),
			barFavorites () {
				return this.$store.getters['bars/barFavorites'](this.bar['.key'])
			},
			user () {
				return this.$store.state.users.items
			},
			barsFavoritesCount () {
				return this.$store.getters['bars/barsFavoritesCount'](this.bar['.key'])
			},
			barsFavoritesCountMinusOne () {
				return this.$store.getters['bars/barsFavoritesCountMinusOne'](this.bar['.key'])
			}
		},
		created () {
			this.$emit('ready')
			// firebase.database().ref('bars').on('child_added', snapshot => this.favorites.push(snapshot.val()))
			// firebase.database().ref('bars').on('child_removed', snapshot => this.bars.find(bar => bar.id.favorites === snapshot.key))
		}
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
	.is-favorited  {color: red;}
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
.favorite__heart__selected, 
.is-favorited{
    color: #df470b;
}
.not-favorited {
	color: #666;
}
</style>