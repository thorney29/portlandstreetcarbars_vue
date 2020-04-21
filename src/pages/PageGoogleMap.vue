<template>
  <div class="col-full push-top">
    <GoogleMapLoader style='width:900px  height: 900px' :markers="markers" />
  </div>
</template>

<script>
import GoogleMapLoader from '@/components/GoogleMapLoader'
import asyncDataStatus from '@/mixins/asyncDataStatus'
import {mapActions} from 'vuex'

export default {
  name: 'PageGoogleMap',
  components: {
    GoogleMapLoader
  },
  data () {
    return {
      // markers: this.markers ? this.markers : []
    }
  },
  mixins: [asyncDataStatus],
  methods: {
    ...mapActions('markers', ['fetchAllMarkers'])
  },
  computed: {
      markers () {
        return Object.values(this.$store.state.markers.items).sort((a, b) => (a.title > b.title) ? 1 : -1)
      }
  },
  created () {
      this.fetchAllMarkers()
      .then(() => {
          this.asyncDataStatus_fetched()
      })
    }
}
</script>