<template>
  <div class="col-full push-top"> 
  	<h1>Bar Map</h1>
  	<div style='text-align: center;margin-bottom: 4%;'>
  	 <p class="text-lead">Bars, restaurants, and coffee shops within a 20 minute or less walk from the Portland's eastside streetcar loop.</p>

	<p>Scroll the bar list and click on your selection to view it on the map or click on a marker on the map to get details about a location. Click the link View in Google Maps to get directions from your current location.</p></div>
	<h6>directions from the convention center</h6>
	<p id="lat">45.528347</p>
	<p id="lng">-122.663043</p>
	<ul style="display:flex;">
	<li><button class="btn-blue" @click="getDistance">find bars that are less than 1/4 miles from me</button></li>
	<li><button  class="btn-blue" @click="">find bars that are less than 1/2 miles from me</button></li>
	<li><button  class="btn-blue" @click="">find bars that are less than 1 miles from me</button></li>
	<li><button  class="btn-blue" @click="">find bars that are less than 2 miles from me</button></li>
	</ul>
	<p>the distance answer:</p><div id="distance"></div>
  	<div class="flex">
  	<aside>
      <ul>
  		<li v-for="(m, index) in sortedMarkers" @click="toggleInfoWindow(m,index)">{{m.name}}</li>
  	</ul>
  	</aside>
  	<section>
    <gmap-map
      ref="gmap"
      :center="center"
      :zoom="15"
      style="width:100%;  height: 100vh;"
    >
      
      <gmap-marker
        :key="index"
        v-for="(m, index) in markers"
        :position="m.position"
        @click="toggleInfoWindow(m,index)">
      </gmap-marker>

      <gmap-info-window
        :options="infoOptions"
        :position="infoWindowPos"
        :opened="infoWinOpen"
        @closeclick="infoWinOpen=false"
      >
        <div v-html="infoContent"></div>
      </gmap-info-window>
    </gmap-map>
    </section>
    </div>
  </div>
</template>

<script>
import {mapActions} from 'vuex'
import asyncDataStatus from '@/mixins/asyncDataStatus'
import * as VueGoogleMaps from 'vue2-google-maps'
import GmapCustomMarker from 'vue2-gmap-custom-marker'
export default {
	name: 'GoogleMapLoader',
	components: {
		GmapCustomMarker
	},
	props: {
		markers: {
			required: true,
			type: Array
		}
	},
    data () {
		return {
			// a default center for the map
			center: {lat: 45.5226478, lng: -122.6569671},
			map: null,
			infoContent: '',
			infoWindowPos: {
				lat: 0,
				lng: 0
			},
			infoWinOpen: false,
			currentMidx: null,
			// optional: offset infowindow so it visually sits nicely on top of our marker
			infoOptions: {
				pixelOffset: {
				width: 0,
				height: -35
				}
			}
			// markers: [
			// 	{
			// 	name: 'Doug Fir Lounge',
			// 	image: 'static/assets/img/small/doug-fir.jpg',
			// 	description: 'https://www.google.com/maps/dir/your+location/Doug+Fir+Lounge,+830+E+Burnside+St,+Portland,+OR+97214,+United+States/@45.5226478,-122.6591558,17z/data=!4m16!1m6!3m5!1s0x0:0x32ea9f088ca52a1f!2sDoug+Fir+Lounge!8m2!3d45.5226478!4d-122.6569671!4m8!1m0!1m5!1m1!1s0x5495a0a576347c27:0x32ea9f088ca52a1f!2m2!1d-122.6569671!2d45.5226478!3e3',
			// 	date_build: '',
			// 	position: {lat: 45.5226478, lng: -122.6591558}
			// 	},
			// 	{
			// 	name: 'Spirit of 77',
			// 	image: 'static/assets/img/small/spirit-of-77.jpg',
			// 	description: 'https://www.google.com/maps/dir/your+location/Spirit+of+77,+500+NE+Martin+Luther+King+Jr+Blvd,+Portland,+OR+97232,+United+States/@45.5267444,-122.6613944,15z/data=!4m16!1m6!3m5!1s0x0:0x91b17a8f9b962cb2!2sSpirit+of+77!8m2!3d45.5267444!4d-122.6613944!4m8!1m0!1m5!1m1!1s0x5495a0ae8f8c51dd:0x91b17a8f9b962cb2!2m2!1d-122.6613944!2d45.5267444!3e3',
			// 	date_build: '',
			// 	position: {lat: 45.5267444, lng: -122.6613944}
			// 	},
			// 	{
			// 	name: 'Altabira City Tavern',
			// 	image: 'static/assets/img/small/altabira-city-tavern.jpg',
			// 	description: 'https://www.google.com/maps/dir/your+location/Altabira+City+Tavern,+1021+NE+Grand+Ave+%23600,+Portland,+OR+97232,+United+States/@45.5304484,-122.6630594,17z/data=!4m21!1m6!3m5!1s0x0:0x332747f9a47a8043!2sAltabira+City+Tavern!8m2!3d45.5304484!4d-122.6608707!4m13!1m5!1m1!1s0x5486716e860c35e5:0xa2dce6ec5d0043bc!2m2!1d-123.0937343!2d49.2777428!1m5!1m1!1s0x5495a0b2818ab609:0x332747f9a47a8043!2m2!1d-122.6608707!2d45.5304484!3e3',
			// 	date_build: '',
			// 	position: {lat: 45.5304484, lng: -122.6630594}
			// 	}
			// ]
		}
	},
	computed: {
		google: VueGoogleMaps.gmapApi,
		sortedMarkers (markers) {
			return this.markers.sort((a, b) => (a.name > b.name) ? 1 : -1)
		}
	},
	mounted () {
		this.geolocate()
		this.$nextTick(() => {
			this.$refs.gmap.$gmapApiPromiseLazy().then(this.loadControls)
		})
	},
	methods: {
		...mapActions('markers', ['fetchAllMarkers']),
		geolocate: function () {
			navigator.geolocation.getCurrentPosition(position => {
				this.center = {
					lat: 45.5226478, lng: -122.6569671
					// lat: position.coords.latitude,
					// lng: position.coords.longitude
				}
			})
		},
		toggleInfoWindow: function (marker, idx) {
			this.infoWindowPos = marker.position
			this.infoContent = this.getInfoWindowContent(marker)
			// check if its the same marker that was selected if yes toggle
			if (this.currentMidx === idx) {
				this.infoWinOpen = !this.infoWinOpen
			} else {
			// if different marker set infowindow to open and reset current marker index
				this.infoWinOpen = true
				this.currentMidx = idx
			}
		},
		getInfoWindowContent: function (marker) {
			return (`<div class="card">
			<div class="card-image">
			<figure class="image is-4by3">
			<img src="/static/assets/img/small/${marker.image}" alt="Placeholder image">
			</figure>
			</div>
			<div class="card-content">
			<div class="media">
			<div class="media-content">
			<h3 class="title is-4">${marker.name}</h3>
			<p style="text-align:center;" class="is-4">${marker.address}</p>
			</div>
			</div>
			<div class="content">
			<a class="btn-green" target="_blank" href="${marker.directionsUrl}">Get Directions From Your Location</a>
			<br>
			</div>
			</div>
			</div>`)
		},
		loadControls (map) {
            var controlDiv = document.createElement('div')
            var firstChild = document.createElement('button')
            firstChild.style.backgroundColor = '#fff'
            firstChild.style.border = 'none'
            firstChild.style.outline = 'none'
            firstChild.style.width = '28px'
            firstChild.style.height = '28px'
            firstChild.style.borderRadius = '2px'
            firstChild.style.boxShadow = '0 1px 4px rgba(0,0,0,0.3)'
            firstChild.style.cursor = 'pointer'
            firstChild.style.marginRight = '10px'
            firstChild.style.padding = '0px'
            firstChild.title = 'Your Location'
            controlDiv.appendChild(firstChild)
            var secondChild = document.createElement('div')
            secondChild.style.margin = '5px'
            secondChild.style.width = '18px'
            secondChild.style.height = '18px'
            secondChild.style.backgroundImage = 'url(https://maps.gstatic.com/tactile/mylocation/mylocation-sprite-1x.png)'
            secondChild.style.backgroundSize = '180px 18px'
            secondChild.style.backgroundPosition = '0px 0px'
            secondChild.style.backgroundRepeat = 'no-repeat'
            secondChild.id = 'you_location_img'
            firstChild.appendChild(secondChild)
            window.google.maps.event.addListener(this.$refs.gmap.$mapObject, 'center_changed', function () {
              secondChild.style['background-position'] = '0 0'
            })
            var ref = this
            firstChild.addEventListener('click', function () {
              navigator.geolocation.getCurrentPosition(position => {
                let latlng = new window.google.maps.LatLng(
                  parseFloat(position.coords.latitude),
                  parseFloat(position.coords.longitude))
                ref.center = {
                  lat: position.coords.latitude,
                  lng: position.coords.longitude
                }
                ref.createMarker(latlng)
              })
            })
            controlDiv.index = 1
            this.$refs.gmap.$mapObject.controls[window.google.maps.ControlPosition.RIGHT_BOTTOM].push(controlDiv)
		},
		getDistance (lat1, lon1, lat2, lon2, unit) {
			lat1 = document.querySelector('#lat').innerHTML
			lon1 = document.querySelector('#lat').innerHTML
			lat2 = 45.5127313
			lon2 = -122.6909015
			if ((lat1 === lat2) && (lon1 === lon2)) {
				return 0
			} else {
				var radlat1 = Math.PI * lat1 / 180
				var radlat2 = Math.PI * lat2 / 180
				var theta = lon1 - lon2
				var radtheta = Math.PI * theta / 180
				var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta)
				if (dist > 1) {
					dist = 1
				}
				dist = Math.acos(dist)
				dist = dist * 180 / Math.PI
				dist = dist * 60 * 1.1515
				if (unit === 'K') { dist = dist * 1.609344 }
				if (unit === 'N') { dist = dist * 0.8684 }
				const distanceAnswer = document.querySelector('#distance')
				distanceAnswer.innerHTML = dist
				return dist
			}
		}
	},
	mixins: [asyncDataStatus],
	created () {
		this.fetchAllMarkers()
		.then(() => {
			this.asyncDataStatus_fetched()
		})
	}
}
</script>

<style scoped>
  .vue-map-container, .vue-map {
    width: 900px;
    height: 900px;
  }
  .flex {
  	display:flex;
  	margin:auto;
  	justify-content: center;
  }
  section {
  	width: 65%;
  	margin:0;
  }
  aside {
	width: 26%;
	 height: 100vh;
	 overflow: scroll;
  }
  aside ul {
  	margin-top: 0;
  }
  aside li {
  	border: #ccc solid 1px;
    padding: 1.2em 1em;
  }
  aside li:hover {
  	border: #000 solid 1px;
  }
  @media (max-width:736px) {
  	aside {
  		width: 96%;
  		margin:auto;
  		order:2;
  	}
	section {
		width:96%;
		margin:auto;
		order:1;
	}
  }
</style>
