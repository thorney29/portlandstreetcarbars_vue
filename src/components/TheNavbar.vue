<template>
	<header class="header" id="header" 
	 v-click-outside="closeMobileNav" v-handle-scroll="closeMobileNav">
		<router-link
		class="logo"
		:to="{name: 'PageHome'}">
		    <img src="../assets/img/train-in-green-small.png">
		</router-link>
 		
		<div v-toggle-class-on-main-container="toggleClassOnMainContainer" class="btn-hamburger" @click="mobileNavOpen = !mobileNavOpen">
		  <!-- use .btn-humburger-active to open the menu -->
		  <div class="top bar"></div>
		  <div class="middle bar"></div>
		  <div class="bottom bar"></div>
		</div>  

		<!-- use .navbar-open to open nav -->
		<nav class="navbar" :class="{'navbar-open' : mobileNavOpen}">
	 		<ul class="left" v-toggle-class-on-main-container="toggleClassOnMainContainer" @click="mobileNavOpen = !mobileNavOpen">
				<li class="navbar-item">
					<router-link
					:to="{name: 'PageHome'}">
					   Home
					</router-link>
				</li>
				<li class="navbar-item">
					<router-link
					:to="{name: 'PageTypeCategories'}">
					  Find Bars
					</router-link>
				</li>
				<li class="navbar-item">
					<router-link
					:to="{name: 'PageDirections'}">
					  View All Bars
					</router-link>
				</li>
				<li class="navbar-item">
					<router-link
					:to="{name: 'PageMap'}">
					View Bar Map
				</router-link>
				</li>
				<li class="navbar-item">
					<router-link
					:to="{name: 'PageContact'}">
					Contact
				</router-link>
				</li>
			</ul>
			<ul v-if="user">
				<li class="navbar-user" v-click-outside="closeUserDropdown">
					<a @click.prevent="userDropdownOpen =!userDropdownOpen">
						<img class="avatar-small" :src="user.avatar" alt="">
						<span>
							{{user.name}}
							<img class="icon-profile" src="../assets/img/svg/arrow-profile.svg" alt="">
						</span>
					</a>
					<!-- dropdown menu -->
					<!-- add class "active-drop" to show the dropdown -->
					<div id="user-dropdown" :class="{'active-drop': userDropdownOpen}">
						<div class="triangle-drop"></div>
						<ul class="dropdown-menu">
							<li class="dropdown-menu-item">
								<router-link :to="{name: 'PageProfile'}">View profile</router-link>
							</li>
							<li class="dropdown-menu-item">
								<a @click.prevent="$store.dispatch('auth/signOut')">Log out</a>
							</li>
						</ul>
					</div>
				</li>
				<li class="navbar-mobile-item">
					<router-link :to="{name: 'PageProfile'}">View profile</router-link>
				</li>
				<li class="navbar-mobile-item">
					<a @click.prevent="$store.dispatch('auth/signOut')">Log out</a>
				</li>
			</ul>
			<ul class="right" v-else>
				<li class="navbar-item">
					<router-link :to="{name: 'PageLogin'}">Login</router-link>
				</li>
				<li class="navbar-item">
					<router-link :to="{name: 'PageRegister'}">Create a new account</router-link>
				</li>
			</ul>   
      	</nav>
    </header>
</template>

<script>
	import {mapGetters} from 'vuex'
	// import toggleContainerClass from '@/directives/toggle-container-class'
	import clickOutside from '@/directives/click-outside'
	import handleScroll from '@/directives/handle-scroll'
	import toggleClassOnMainContainer from '@/directives/toggle-class-on-main-container'
	export default {
		directives: {
			// toggleContainerClass,
			clickOutside,
			handleScroll,
			toggleClassOnMainContainer
		},

		computed: {
			...mapGetters({
				'user': 'auth/authUser'
			})
		},

		data () {
			return {
				userDropdownOpen: false,
				mobileNavOpen: false,
				navMoreOpen: false
			}
		},

		methods: {
			// toggleClassOnMainContainer () {
			// 	this.navMoreOpen = false
			// },
			closeMore () {
				this.navMoreOpen = false
			},
			closeUserDropdown () {
				this.userDropdownOpen = false
			},
			toggleClassOnMainContainer () {
				document.querySelector('#masterContainerFluid').classList.toggle('moveDown')
	        },
			closeMobileNav () {
				this.mobileNavOpen = false
				document.querySelector('#masterContainerFluid').classList.remove('moveDown')
			}
		}
	}
</script>

<style scoped>
	ul.left {
		justify-content: flex-start;
	}
	ul.right {
		justify-content: flex-end
	}
</style>