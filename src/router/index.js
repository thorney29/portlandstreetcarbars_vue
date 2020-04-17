import Vue from 'vue'
import store from '@/store'
import Router from 'vue-router'
import PageHome from '@/pages/PageHome'
import PageTypeCategories from '@/pages/PageTypeCategories'
import PageType from '@/pages/PageType'
import PageMap from '@/pages/PageMap'
import PageContact from '@/pages/PageContact'
import PageProfile from '@/pages/PageProfile'
import PageBarShow from '@/pages/PageBarShow'
import PageBarCreate from '@/pages/PageBarCreate'
import PageBarEdit from '@/pages/PageBarEdit'
import PageRegister from '@/pages/PageRegister'
import PageLogin from '@/pages/PageLogin'
import PageDirections from '@/pages/PageDirections'
import PageNotFound from '@/pages/PageNotFound'

Vue.use(Router)

const router = new Router({
	routes: [
		{
			path: '/',
			name: 'PageHome',
			component: PageHome,
			meta: {
				title: 'Portland Streetcar Bars',
				metaTags: [
					{
						name: 'description',
						content: 'Find bars, restaurants & more near you and the Portland Streetcar on Portland\'s eastside.'
					},
					{
						property: 'og:description',
						content: 'Find bars, restaurants & more near you and the Portland Streetcar on Portland\'s eastside.'
					}
				]
			}
		},
		{
			path: '/type',
			name: 'PageTypeCategories',
			component: PageTypeCategories,
			meta: {
				title: 'Find Bars by Type',
				metaTags: [
					{
						name: 'description',
						content: 'Find bars by type including breweries, craftbeer, patios and outdoor seating, games, and more.'
					},
					{
						property: 'og:description',
						content: 'Find bars by type including breweries, craftbeer, patios and outdoor seating, games, and more.'
					}
				]
			}
		},
		// {
		// 	path: '/category/:slug',
		// 	name: 'PageCategory',
		// 	component: PageCategory,
		// 	props: true
		// },
		// {
		// 	path: '/all-bars',
		// 	name: 'PageAllBars',
		// 	component: 'PageAllBars',
		// 	props: true
		// },
		{
			path: '/all-bars',
			name: 'PageDirections',
			component: PageDirections,
			props: true,
			meta: {
				title: 'View All Bars & Restaurants',
				metaTags: [
					{
						name: 'description',
						content: 'View our full list of bars, restaurants & more located near Portland\'s eastside streetcar loop.'
					},
					{
						property: 'og:description',
						content: 'View our full list of bars, restaurants & more located near Portland\'s eastside streetcar loop.'
					}
				]
			}
		},
		{
			path: '/type/:id',
			name: 'PageType',
			component: PageType,
			props: true
		},
		{
			path: '/bar-map',
			name: 'PageMap',
			component: PageMap,
			props: true,
			meta: {
				title: 'Map of Bars & Restaurants',
				metaTags: [
					{
						name: 'description',
						content: 'View the map of bars, restaurants & more near Portland\'s eastside streetcar loop.'
					},
					{
						property: 'og:description',
						content: 'View the map of bars, restaurants & more near Portland\'s eastside streetcar loop. Find your next stop.'
					}
				]
			}
		},
		{
			path: '/contact',
			name: 'PageContact',
			component: PageContact,
			props: true
		},
		{
			path: '/bar/create/:typeId',
			name: 'PageBarCreate',
			component: PageBarCreate,
			props: true,
			meta: {requiresAuth: true}
		},
		{
			// path: '/bar/:id',
			path: '/bar/:id',
			name: 'PageBarShow',
			component: PageBarShow,
			props: true,
			meta: {
				title: 'Viewing Bar Details',
				metaTags: [
					{
						name: 'description',
						content: 'Learn more about this bar or restaurant.'
					},
					{
						property: 'og:description',
						content: 'Learn more about this bar or restaurant.'
					}
				]
			}
		},
		// {
		// 	path: '/bar/:name',
		// 	name: 'PageBarShow',
		// 	component: PageBarShow,
		// 	props: true
		// },

		{
			path: '/bar/:id/edit',
			name: 'PageBarEdit',
			component: PageBarEdit,
			props: true,
			meta: {requiresAuth: true}
		},
		{
			path: '/profile',
			name: 'PageProfile',
			component: PageProfile,
			props: true,
			meta: {
				requiresAuth: true,
				title: 'Your Profile',
				metaTags: [
					{
						name: 'description',
						content: ''
					},
					{
						property: 'og:description',
						content: ''
					}
				]
			}
		},
		{
			path: '/profile/edit-profile',
			name: 'UserProfileCardEditor',
			component: PageProfile,
			props: {edit: true},
			meta: {requiresAuth: true}
		},
		{
			path: '/register',
			name: 'PageRegister',
			component: PageRegister,
			meta: {requiresGuest: true}
		},
		{
			path: '/login',
			name: 'PageLogin',
			component: PageLogin,
			meta: {requiresGuest: true}
		},
		{
			path: '/logout',
			name: 'Logout',
			meta: {requiresAuth: true},
			beforeEnter (to, from, next) {
				store.dispatch('auth/signOut')
				.then(() => next({name: 'PageHome'}))
			}
		},
		{
			path: '*',
			name: 'PageNotFound',
			component: PageNotFound
		}
	],
	mode: 'history'
})
// This callback runs before every route change, including on page load.
// router.beforeEach((to, from, next) => {
//   // This goes through the matched routes from last to first, finding the closest route with a title.
//   // eg. if we have /some/deep/nested/route and /some, /deep, and /nested have titles, nested's will be chosen.
//   const nearestWithTitle = to.matched.slice().reverse().find(r => r.meta && r.meta.title)

//   // Find the nearest route element with meta tags.
//   const nearestWithMeta = to.matched.slice().reverse().find(r => r.meta && r.meta.metaTags)
//   // const previousNearestWithMeta = from.matched.slice().reverse().find(r => r.meta && r.meta.metaTags)
//   // console.log(previousNearestWithMeta)
//   // If a route with a title was found, set the document (page) title to that value.
//   if (nearestWithTitle) document.title = nearestWithTitle.meta.title

//   // Remove any stale meta tags from the document using the key attribute we set below.
//   Array.from(document.querySelectorAll('[data-vue-router-controlled]')).map(el => el.parentNode.removeChild(el))

//   // Skip rendering meta tags if there are none.
//   if (!nearestWithMeta) return next()

//   // Turn the meta tag definitions into actual elements in the head.
//   nearestWithMeta.meta.metaTags.map(tagDef => {
//     const tag = document.createElement('meta')

//     Object.keys(tagDef).forEach(key => {
//       tag.setAttribute(key, tagDef[key])
//     })

//     // We use this to track which meta tags we create, so we don't interfere with other ones.
//     tag.setAttribute('data-vue-router-controlled', '')
//     return tag
//   })
//   // Add the meta tags to the document head.
//   .forEach(tag => document.head.appendChild(tag))
//   next()
// })

router.beforeEach((to, from, next) => {
	console.log(`DIRECTING: 🚦navigating to ${to.name} from ${from.name} from index router page`)
	store.dispatch('auth/initAuthentication')
	.then(user => {
		if (to.matched.some(route => route.meta.requiresAuth)) {
			if (user) {
				next()
			} else {
				next({name: 'PageLogin', query: {redirectTo: to.path}})
			}
		} else if (to.matched.some(route => route.meta.requiresGuest)) {
			if (!user) {
				next()
			} else {
				next({name: 'PageLogin', query: {redirectTo: to.path}})
			}
		} else {
			next()
		}
	})
})
export default router
