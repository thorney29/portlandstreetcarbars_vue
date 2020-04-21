<!-- ChildMarker -->
<template></template>
<script>
// import { POINT_MARKER_ICON_CONFIG } from '@/constants/mapSettings'

export default {
  // inject: ['google', 'map'],
    data () {
    return {
      google: this.google,
      map: this.map,
      marker: null
    }
  },
  // props: {
  //   google: {
  //     type: Object,
  //     required: true
  //   },
  //   map: {
  //     type: Object,
  //     required: true
  //   },
  //   marker: {
  //     type: Object,
  //     required: true
  //   }
  // },
  methods: {
    dropMarker (position) {
      this.marker = new this.google.maps.Marker({
        position: this.marker.position,
        marker: this.marker,
        map: this.map,
        icon: '../assets/img/svg/map-marker.svg'
      })
      this.map.addObject(this.marker)
    }
  }
}
  // mounted () {
  //   const { Marker } = this.google.maps
  //   this.marker = new Marker({
  //     position: this.position,
  //     map: this.map,
  //     title: 'marker'
  //   })
  // }
// }
  // props: {
  //   google: Object,
  //   map: Object,
  //   position: Object
  // },
  // data () {
  //   return { marker: null }
  // },
  // mounted () {
  //   const { Marker } = this.google.maps
  //   this.marker = new Marker({
  //     position: this.position,
  //     map: this.map,
  //     title: 'Child marker!'
  //   })
  // }
// }
</script>