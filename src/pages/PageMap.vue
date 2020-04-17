<template>
	<div class="">
		<div class="col-full push-top">
			<div class="bar-header">
				<div class="bar-details">
					<h1>Bar Map</h1>
					<p class="text-lead" style="text-align: center">
						Bars, restaurants, and coffee shops within a 20 minute or less walk from the Portland's eastside streetcar loop. 
					</p>
					<p>Click on a marker below to get details about a location. Click the link <em>View in Google Maps</em> to get directions from your current location.</p>
				</div>
			</div>
			 <div id="map"></div> 
			<div class="map">
				<iframe src="https://www.google.com/maps/d/u/0/embed?mid=1iv-zaDdspY6bSj8Eld8KyIVxTceaiNOc" style="width:100%;" height="980"></iframe>
			</div>
		</div>
	</div>
</template>


<script>
	import asyncDataStatus from '@/mixins/asyncDataStatus'

	export default {
		mixins: [asyncDataStatus],
		created () {
			this.asyncDataStatus_fetched()
		}
	}
</script>
<!-- <script>
	function initMap () {
        if (navigator.geolocation) { // Checks if browser supports geolocation
           // Create an array of styles.
           var styles = [
            {
              stylers: [
                { hue: '#00ffe6' },
                { saturation: -20 }
              ]
            },
            {
              featureType: 'road',
              elementType: 'geometry',
              stylers: [
                { lightness: 100 },
                { visibility: 'simplified' }
              ]
            },
            {
              featureType: 'road',
              elementType: 'labels',
              stylers: [
                { visibility: 'off' }
              ]
            }
           ]
           // Create a new StyledMapType object, passing it the array of styles,
           // as well as the name to be displayed on the map type control.
           var styledMap = new google.maps.StyledMapType(styles, {name: 'Styled Map'})

           navigator.geolocation.getCurrentPosition(function (position) { // This gets the
             var latitude = position.coords.latitude // users current
             var longitude = position.coords.longitude // location
             var coords = new google.maps.LatLng(latitude, longitude)
             // Creates variable for map coordinates

			// create new service and display
             var directionsService = new google.maps.DirectionsService()
             var directionsDisplay = new google.maps.DirectionsRenderer()
             // Sets map options
             var mapOptions = {
               zoom: 15,  // Sets zoom level (0-21)
               scrollwheel: false,
               panControl: true,
               center: coords, // zoom in on users location
               mapTypeControl: false, // allows you to select map type eg. map or satellite
               navigationControlOptions: styles,
               mapTypeId: google.maps.MapTypeId.ROADMAP // sets type of map Options:ROADMAP, SATELLITE, HYBRID, TERRIAN
             }
             // create the new map
             var map = new google.maps.Map(document.getElementById('map'), {
                zoom: 11,
                center: coords,
                scrollwheel: true, // Prevent users to start zooming the map when scrolling down the page
                panControl: true,
                draggable: true
              })
              // set up the directions and map
              directionsDisplay.setMap(map)
              directionsDisplay.setPanel(document.getElementById('right-panel'))
              map.mapTypes.set('map_style', styledMap)
              map.setMapTypeId('map_style')

              $('button.dir').bind('touchstart click', function () {
                    value = {}
                    var value = this.value
                    clearRoute(directionsService, directionsDisplay)
                    calculateAndDisplayRoute(directionsService, directionsDisplay, value)
                    function scrollWin () {
                      $('html, body').animate({
                          scrollTop: $('#right-panel').offset().top
                      }, 600)
                    }
                    scrollWin()
              }) // click get directions to get directions
              function clearRoute (directionsService, directionsDisplay) {
                  directionsService.route({
                    origin: coords,
                    destination: coords,
                    travelMode: google.maps.TravelMode.TRANSIT
                  }, function (response, status, end) {
                    if (status === google.maps.DirectionsStatus.OK) {
                      directionsDisplay.setDirections(null)
                    } else {
                      alert('To view map, adjust your phone\'s location settings.')
                      window.alert('Directions request failed due to ' + status)
                    }
                  })
              }; // clear the directions route
              function calculateAndDisplayRoute (directionsService, directionsDisplay, value) {
                    directionsService.route({
                      origin: coords,
                      destination: value,
                      travelMode: google.maps.TravelMode.TRANSIT
                    }, function (response, status, end) {
                    if (status === google.maps.DirectionsStatus.OK) {
                      directionsDisplay.setDirections(response)
                    } else {
                      window.alert('Directions request failed due to ' + status)
                    }
                    })
              } // get and set the directions

              // Create the marker array to store the markers you'll create
              var markers = []
              var marker = ''
              var createMarker = function () {
                  $.getJSON('/bars/bars.json', function (json1) {
 
                      $.each(json1, function (key, data) {
                          var latLng = new google.maps.LatLng(data.lat, data.lng) 
                          //Creating a marker and putting it on the map
                            
                          marker = new google.maps.Marker({
                              map: map,
                              position: latLng, 
                              animation: google.maps.Animation.DROP
                          })
                        
                          var contentString = '<div class="card"><strong>' +data.name
                          contentString += '</strong><br><img src="' + data.image + '"><br><a target="_blank" href="' + data.url;
                          contentString +='">website</a><br>' + data.address + '<br><br><button value="' + data.lat + '' +data.lng
                          contentString += '"id="marker">GET DIRECTIONS HERE</button></div>'
                        
                          var infoWindow = new google.maps.InfoWindow({
                                content: contentString
                          })

                          google.maps.event.addListener(marker, 'click', function (contentString){ 
                              infoWindow.open(map, this)
                              $('button#marker').click(function () {
                                        value = {}
                                        var value = this.value
                                        clearRoute(directionsService, directionsDisplay)
                                        calculateAndDisplayRoute(directionsService, directionsDisplay, latLng)                       
                               })
                          })

                          markers.push(marker)
                          
                      })
                  })    
              }//end createMarker
            
              $('button#showMarkers').click(function(){
                    function addMarkerWithTimeout(position, timeout) {
                        window.setTimeout(function() {
                          markers.push(new google.maps.Marker({
                            position: position,
                            map: map,
                            animation: google.maps.Animation.DROP
                          }))
                        }, timeout)
                      }
                      function drop () {
                        createMarker ()
                          for (var i =0; i < markers.length; i++) {
                            setTimeout(function() {
                              addMarkerWithTimeout()
                            }, i * 500)
                          }
                      }
                      drop()
              }) // click show all to show all makers 
              $('button#hideMarkers').click(function (){
                    if (markers) {
                        for (i=0; i < markers.length; i++) {
                            markers[i].setMap(null)
                        }
                    markers.length = 0
                    }
              })// click hide all to hide all markers
           })//end getcurrentpostition
        }//end if geolocation
        else {
          alert('Maps will not work if your locations settings are turned off. Please check your location settings and refresh the page.')
        }
    } //end functioninitMap
</script> -->
<!--  <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCXOqIYw5VQH9kCQwj3buLfVV3vHvKfxsM&amp;signed_in=true&amp;callback=initMap" async="" defer="">
  </script>  -->
<style scoped>
.map {
	width: 94%;margin:auto;
}
</style>