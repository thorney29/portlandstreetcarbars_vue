<template>
	<div class="card">
	<img class="card-img-top" :src="bar.image" alt="Card image cap">
	<div class="card-body">
	<!-- favorites -->
	<div v-if="user" style="border:2px red solid"><!-- if this is a user -->
		<h3>if {{user.name}} is logged in >>></h3>
 		<div
	    v-for="favorite in favorites"
	    :favorite="favorite"
	    :key="favorite['.key']">
	    {{favorites}}
	    {{favorite}}
	    {{favorites.favorite}}
		</div>
		<div v-if="user.favorites[this.bar['.key']]" style="border:1px orange solid;padding: 2px; margin:8px"><!-- if this is a user and is in bar favorites -->
		    <div v-if='user.favorites'><!-- if this user has favorites -->
			   if {{user.name}} favorited<br>
			   <div style="border:1px yellow solid;padding: 2px; margin:8px">
			   User Id: {{user['.key']}}  <br>
			   User Favorite Id: {{user.favorites[this.bar['.key']]}}
				{{user.favorite}}
				<button
				@click.prevent="save(fave)"
				type="submit"
				v-model="fave"
				v-bind:class="[fave ? 'is-favorited' : 'not-favorited']"
				>
					<span class="fas fa-heart"></span>
				</button> 
			    </div>
			    from console
			    <div style="border:1px green solid;padding: 2px; margin:8px">
			    Fave: {{fave}} -- should be true<br>
			    UserId as Me: {{me}}  <br>
			    User favoriteId as User Fave: {{userFave}}  <br>
				</div>
			</div>
		</div>
		<div v-else>
			<button
			@click.prevent="save(fave)"
			type="submit"
			v-model="fave"
			class="not-favorited" 

			>
			this is not favorited
			<span class="fas fa-heart"></span>
			</button> 
		</div>
	</div>
	<div v-else>
		<div class="login-text"><a href="/login?redirectTo=%2Fthread%2F-KsjpzIeFTdcsBIPvUfP" class="">Login</a> or <a href="/register?redirectTo=%2Fthread%2F-KsjpzIeFTdcsBIPvUfP" class="">register</a> to save favorites.
		</div>
	</div>
	{{barsFavoritesCount}} {{barsFavoritesCount === 1 ? 'favorite': 'favorites' }}
	<h5 class="card-title">{{bar.name}}</h5>
	<p class="card-text">
	<div><strong><span> {{bar.type}}</span></strong></div>
	<div class="address"> {{bar.address}}</div></p>
		<a target="_blank" :href="bar.url" class="btn btn-primary">View Website</a>
		<button class="btn" @click="navigate(bar.lat, bar.lng, bar.name)">Get Directions</button>
	</div>
	</div>
</template>

<script>
	// import firebase from 'firebase'
	import {mapActions, mapGetters} from 'vuex'
	export default {
	directives: {
	},
	components: {
	},
	data () {
		return {
			me: 'this.user[]',
			// userFave: this.user.favorites[this.barId],
			userFave: ' ',
			fave: ''
			// fave: this.bar.favorite ? this.bar.favorite : false
			// fave: this.$store.state.favorites.items[this.user['.key']]
		}
	},
	props: {
		bar: {
			required: true,
			type: Object
		// }
		},
		favorite: {
			required: false,
			type: Object
		}
		// user: {
		// 	required: true,
		// 	type: Object
		// }
		// id: {
		// 	required: true,
		// 	type: String
		// },
		// bar: {
		// 	required: true,
		// 	type: Object
		// },
		// barId: {
		// 	required: false
		// },
		// favorite: {
		// 		required: true,
		// 		type: Object
		// 	}
		// ,
		// user: {
		// 	required: true,
		// 	type: Object
		// }
	},
	methods: {
		...mapActions('bars', ['createBarFavorite', 'deleteBarFavorites', 'fetchFavorite', 'fetchAllBars']),
		save () {
			this.fave = !this.fave
			if (this.fave === true) {
				const favorite = {
					fave: this.fave,
					bar: this.bars,
					barId: this.bar['.key'],
					userId: this.user['.key']
				}
				console.log('create new with this info: ')
				console.log(favorite)
				return this.createBarFavorite(favorite)
			} else {
				const payload = {
					favoriteId: this.user.favorites[this.bar['.key']],
					favorites: this.$store.state.favorites.items,
					fave: this.fave,
					bars: this.$store.state.bars.items,
					barId: this.bar['.key'],
					userId: this.user['.key']
				}
				console.log('update with this info: ')
				console.log(payload)
				return this.deleteBarFavorites(payload)
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
			user: 'auth/authUser'
		}),
		// users () {
		// 	return Object.values(this.$store.state.users.items)
		// },
		barsFavoritesCount () {
			return this.$store.getters['bars/barsFavoritesCount'](this.bar['.key'])
		},
		favorites () {
			return this.$store.state.favorites.items
		},
		favoriteBars () {
			return Object.values(this.$store.state.bars.items)
				.filter(bar => bar.favoriteId === this.favorite['.key'])
		}
	},
	created () {
		this.fetchFavorite({id: this.id})
			// .then(forum => this.fetchThreads({ids: forum.threads}))
			// .then(bars => Promise.all(bars.map(thread => this.fetchUser({id: userId}))))
			.then(() => { this.asyncDataStatus_fetched() })
		// this.$emit('ready')
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
color:black;
}
.login-text {
font-size: 1rem;
font-style: italic;
margin:.265em auto;
font-family: sans-serif;
font-weight: 300;
}
</style>