<template>
   <div id="app">
   	<TheNavbar/>
	<div id="masterContainerFluid" class="container-fluid">
		<router-view :key="$route.path" v-show="showPage" @ready="pageReady"/>
		<AppSpinner v-show="!showPage" />
	</div>
    <TheFooter/>
    </div>
 </div>  
</template>

<script>
	import TheNavbar from '@/components/TheNavbar'
	import AppSpinner from '@/components/AppSpinner'
	import TheFooter from '@/components/TheFooter'
	import NProgress from 'nprogress'
	export default {
		components: {
			TheNavbar,
			AppSpinner,
			TheFooter
		},
		data () {
			return {
				showPage: false
			}
		},

		methods: {
			pageReady () {
				this.showPage = true
				NProgress.done()
			}
		},

		created () {
			NProgress.configure({
				speed: 200,
				showSpinner: false
			})
			this.$router.beforeEach((to, from, next) => {
				this.showPage = false
				NProgress.start()
				next()
			})
		},
		watch: {
			'$route' (to, from) {
				document.title = to.meta.title || 'Portland Streetcar Bars'
				document.body.setAttribute('class', document.title.replace(/\s+/g, '-').toLowerCase())
			}
		}
	}
</script>

<style>
	#nprogress .bar {
		background: #263859;
	}
</style>
