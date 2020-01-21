<template>
	<div v-if="bar && user" class="card">
      	<div>
      		<img class="card-img-top" :src="bar.image" alt="Card image cap">
			<p>       
			<!-- 	<router-link :to="{name: 'PageBarShow', params: {id: bar['.key'], name: bar.slug}}">
					<h2>{{bar.title}}</h2>
				</router-link> -->
			<router-link :to="{name: 'PageBarShow', params: {id: bar['.key']}}">
				<h2>{{bar.title}}</h2>
			</router-link>
			</p>
			<hr>
			<p>
				<ul class="icons">
				  <li v-for="(item, key, index) in bar.icons" v-if="item !== 'null'">
				 	<router-link :to="name: 'Page/"> </router-link>
				 	 <a href="/type/fa-item"><i class="fas fa-item">{{ item }}</i></a>
				  </li>
				</ul>
				<div class="address">
					<p>{{bar.address}}</p>	
					<p v-html="bar.notes" class="barNotes" v-if="bar.notes !== ''">{{bar.notes}}</p>
				</div>
			</p>
			<button class="btn" @click="navigate(bar.title)">Get Directions</button>
		</div>
      </div>
</template>

<script>
	// added this now
	// import {mapGetters} from 'vuex'
	// import FavoriteList from '@/components/FavoriteList'
	// import FavoriteEditor from '@/components/FavoriteEditor'
	export default {
		components: {
			// FavoriteList,
			// FavoriteEditor
		},
		props: {
			bar: {
				required: true,
				type: Object
			}
		},
		data () {
	        return {
				editing: false,
				address: this.bar ? this.bar.address : '',
				notes: this.bar ? this.bar.notes : '',
				favoriteValue: this.favorite ? this.favorite.favoriteValue : '',
				toGoValue: this.favorite ? this.favorite.toGoValue : '',
				text: this.bar ? this.bar.text : '',
				icons: this.bar ? this.bar.icons : '',
				typeIds: this.bar ? this.bar.typeIds : ''
	        }
		},
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
			// ...mapActions('favorites', ['fetchFavorites'])
		},
		computed: {
			// ...mapGetters({
			// 	user: 'auth/authUser'
			// }),
			// not defined
			repliesCount () {
				return this.$store.getters['bars/barFavoriteCount'](this.bar['.key'])
			},
			user () {
				return this.$store.state.users.items[this.bar.userId]
			}
			// ,
			// favorites () {
			// 	const favoriteIds = Object.values(this.bar.favorites)
			// 	return Object.values(this.$store.state.favorites.items)
			// 	.filter(favorite => favoriteIds.includes(favorite['.key']))
			// }
		},
		created () {
		}
	}
</script>
<style scoped>
.flex-grid {
	align-items: stretch;
}
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
	h2{
    	width: 81%;
	}
	hr {
		width: 47%;
		margin: 2.2% auto;
	}
	ul.icons {
		display: flex;
		justify-content: center
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
	svg.svg-inline--fa.fa-hamburger.fa-w-16,
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
		border: 1px dashed black;
		padding: 10px;
		/*font-family: 'Zeyada', cursive;*/
		font-size: 1.2rem;
		margin:7% auto;
		font-weight: 800;
	}
	.icon-details {text-align: right;}
</style>