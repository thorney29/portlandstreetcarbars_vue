'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

// module.exports = merge(prodEnv, {
//   	NODE_ENV: '"development"',
// 	FIREBASE_API_KEY: '"AIzaSyCT8-VmlYeVdoWvn6YZQPRpuIWm3nGecUU"',
// 	FIREBASE_AUTH_DOMAIN: '"portlandstreetcarbars-2f057.firebaseapp.com"',
// 	FIREBASE_DATABASE_URL: '"https://portlandstreetcarbars-2f057.firebaseio.com"',
// 	FIREBASE_PROJECT_ID: '"portlandstreetcarbars-2f057"',
// 	FIREBASE_STORAGE_BUCKET: '"portlandstreetcarbars-2f057.appspot.com"',
// 	FIREBASE_MESSAGING_SENDER_ID: '"747010976662"',
// 	FIREBASE_APP_ID: '"1:747010976662:web:b9a1451903491558"'
// })

module.exports = merge(prodEnv, {
  	NODE_ENV: '"development"',
	FIREBASE_API_KEY: '"AIzaSyClEwYKij_mjb00TJFU-caS4wh2MdYXtmA"',
	FIREBASE_AUTH_DOMAIN: '"portlandstreetcarbars.firebaseapp.com"',
	FIREBASE_DATABASE_URL: '"https://portlandstreetcarbars.firebaseio.com"',
	FIREBASE_PROJECT_ID: '"portlandstreetcarbars"',
	FIREBASE_STORAGE_BUCKET: '"portlandstreetcarbars.appspot.com"',
	FIREBASE_MESSAGING_SENDER_ID: '"70844690268"',
	FIREBASE_APP_ID: '"1:70844690268:web:bd523d0680eb2d27"'
})