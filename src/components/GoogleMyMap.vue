<template>
  <GoogleMapLoader
  :mapConfig="mapConfig"
  apiKey="AIzaSyC7qaErvFSoFYoco-WbWvz1e5U0JE3i1cM"
  >
  <!-- <template slot-scope="{ google, map }">
    <GoogleMapMarker
      v-for="marker in markers"
      :key="marker.id"
      :marker="marker"
      :google="google"
      :map="map"
    />
  </template> -->
</GoogleMapLoader>
</template>
<script>
  // import { mapSettings } from '@/constants/mapSettings'
  import GoogleMapLoader from '@/components/GoogleMapLoader'
  // import GoogleMapMarker from '@/components/GoogleMapMarker'
  export default {
    components: {
      GoogleMapLoader
      // GoogleMapMarker
    },
    data () {
      return {
        markers: [
          { id: 'a', position: { lat: 3, lng: 101 } },
          { id: 'b', position: { lat: 5, lng: 99 } },
          { id: 'c', position: { lat: 6, lng: 97 } }
        ]
      }
    },
    computed: {
      mapConfig () {
        return {
          // ...mapSettings,
          center: this.mapCenter
        }
      },
      mapCenter () {
        return this.markers[1].position
      }
    }
  }
</script>