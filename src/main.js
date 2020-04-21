// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import firebase from 'firebase'
import App from './App'
import router from './router'
import store from '@/store'
import AppDate from '@/components/AppDate'
import vuelidate from 'vuelidate'
import * as VueGoogleMaps from 'vue2-google-maps'

// import css here because it did not work
import '@/assets/css/style.css'
import '../node_modules/nprogress/nprogress.css'
import '@fortawesome/fontawesome-free/css/all.css'
import '@fortawesome/fontawesome-free/js/all.js'

Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyC7qaErvFSoFYoco-WbWvz1e5U0JE3i1cM',
    libraries: 'places, directions' // necessary for places input
  }
})

Vue.use(vuelidate)

Vue.component('AppDate', AppDate)

Vue.config.productionTip = false

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: process.env.FIREBASE_API_KEY,
	authDomain: process.env.FIREBASE_AUTH_DOMAIN,
	databaseURL: process.env.FIREBASE_DATABASE_URL,
	projectId: process.env.FIREBASE_PROJECT_ID,
	storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
	messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
	appId: process.env.FIREBASE_APP_ID
}
// Initialize Firebase
firebase.initializeApp(firebaseConfig)

/* eslint-disable no-new */
new Vue({
	el: '#app',
	router,
	store,
	template: '<App/>',
	components: { App }
})
