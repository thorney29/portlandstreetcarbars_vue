<template>
	<div v-if="asyncDataStatus_ready" class="">
		<div class="col-full push-top">
			<div class="bar-header">
				<div class="bar-details">
					<h1>All Bars</h1>
					<p class="text-lead" style="text-align: center">Search, find, and save your favorites <i class="fas fa-heart"></i>, where you'd like to go <i class="fas fa-star"></i>, and add notes about your visit <i class="fas fa-pencil">edit</i>.</p>
					<p>Find bars, restaurants, even coffee shops that are less than a 20 minute walk from Portland's eastside streetcar loop. Click <em>Get Directions</em> to get directions from your current location. <router-link :to="{name: 'PageMap'}">View our Map</router-link> to view options nearby. </p>
				</div>
			</div>
			<div class="searchArea">
				<h3 class="type-label" style="text-align: center;" v-on:click="seeSearch = !seeSearch">
					<span>Search by Bar Name </span>
       				<span v-show="seeSearch">
       					<i class="fas fa-chevron-up"></i>
					</span>
					<span v-show="!seeSearch">
						<i class="fas fa-chevron-down"></i>
					</span>
				</h3>
				<h3 class="type-label" style="text-align: center;"  v-on:click="seeFilter = !seeFilter"><span>Filter by Bar Type </span>
					<span v-show="seeFilter">
       					<i class="fas fa-chevron-up"></i>
					</span>
					<span v-show="!seeFilter">
						<i class="fas fa-chevron-down"></i>
					</span>
				</h3> 
       		</div>
				
   			<div v-if="seeSearch">
			 	<p><input type="text" v-model="searchKeyword" placeholder="Search by name..."/></p>
			    <p><label style="padding-top:8px;"><em>Bar name: {{searchKeyword}}</em></label></p>
   			</div>
			<ul class="filterArea flex-grid types"  v-if="seeFilter">
				<li @mouseover="upHere = true" @mouseleave="upHere = false" 
			    class="type-label" v-for="(type, index) in types"  :key="index"  :class="{ 'checkedtype': isChecked(type.name)}">
				    <label for="tag-type"> 
				   	<input class="searchArea" type="checkbox" :value="type.name" id="tag-type" v-model="selectedTypes"><i class="fa fa-type-icon">{{type.icon}}</i><span>{{type.name}}</span></label>
			  	</li> 
		  	</ul>

			<!-- </div> -->
		  	<p class="filters" v-show="selectedTypes.length !== 0">
		    	{{selectedTypes.length > 1 ? 'Filters: ': 'Filter: '}}
	    		<ul style="display: flex;justify-content: flex-start;">
	    			<li style="display: flex;flex-flow: row nowrap;justify-content: flex-start;white-space: nowrap;" v-for="type in selectedTypes" >
			    		<span class="filter-label">{{type}} ({{filteredList.length}})</span>
			  			<span class="addAnother" style="margin:auto;padding: 2px 4px 0;font-size: 12px;" v-if="selectedTypes.length > 1">
			  			<i class="fas fa-plus-circle"></i></span>
		  			</li>
	  			</ul>
		  	</p>
		</div>
		<!-- This is for the return to top and search bar -->
			<div id="staticReturnTop">
				<div id="more" @click="isShowing ^= true" v-show="!isShowing">
					<i class="fas fa-ellipsis-h"></i>
				</div>
				<div id="fixedIcons" v-show="isShowing">
					<div id="close" @click="isShowing ^= true">
						<i class="far fa-times-circle"></i></div>
					<div id="returnTop" v-show="isShowing" view-scroll-to="el:'#MainContainerFluid'" @click="scrollTop">
						<i class="fas fa-arrow-up"></i>
						</div>
					<div id="staticSearch" v-show="isShowing" @click="showSearch ^= true"><i class="fas fa-search"></i>
					</div>
					<input id="showSearchInput" v-show="showSearch" type="text" v-model="searchKeyword" placeholder="Search bars" onfocus="this.placeholder = ''" onblur="this.placeholder = 'enter your text'"/>
				</div>
			</div>
		<div class="all-bars-directions">
			<!-- get the results of the search
			* default is empty string. all bars shown -->

			<AllBarList :bars="filteredList"/>
		</div>
	</div>
</template>

<script>
	import {mapActions, mapGetters} from 'vuex'
	import AllBarList from '@/components/AllBarList'
	import asyncDataStatus from '@/mixins/asyncDataStatus'
	import _ from 'lodash'
	export default {
		components: {
			AllBarList
		},
		props: {
		},
		data () {
			return {
				selectedTypes: [],
				bars: this.bars ? this.bars : [],
				searchKeyword: '',
				seeSearch: false,
				seeFilter: false,
				upHere: false,
				isShowing: false,
				showSearch: false,
				// new
				onOff: true,
				search: ''
			}
		},
		mixins: [asyncDataStatus],
		computed: {
			types () {
				return Object.values(this.$store.state.types.items)
			},
			favorites () {
				return Object.values(this.$store.state.favorites.items)
			},
			...mapGetters({
				user: 'auth/authUser'
			}),
			// This is for search by name
			filteredList () {
				let results = []
				// let barsArray = []
				let bars = Object.values(this.$store.state.bars.items).sort((a, b) => (a.title > b.title) ? 1 : -1)

				if (this.selectedTypes.length === 0) {
					// define the bars
					// review a list of bars and return a specific list of bars that includes the string of letters in the search based on bar titles
					// transform the text to lowercase
					// return this.bars.filter(bar => bar.title.toLowerCase().includes(this.searchKeyword))
					Object.values(bars).forEach(bar => {
						if (bar['title'].toLowerCase().startsWith(this.searchKeyword)) {
							results.push(bar)
						}
					})
					console.log(results)
					bars = results
				} else if (this.selectedTypes.length > 0) {
					let checkedFilters = this.selectedTypes.map(v => v.toLowerCase().replace(/\s+/g, '-'))
					// create array to store bars that meet conditions (checked filters are not null in the typeIds)
					let barArray = []
					Object.values(bars).forEach(bar => {
						let typeIds = Object.values(bar.typeIds)
						var array = []
						for (let i = 0; i < typeIds.length; i++) {
							typeIds.map(function (val) {
								return array.push(val)
							})
						}
						let ifTrue = array.some((val) => checkedFilters.indexOf(val) !== -1)
						if (ifTrue === true) {
							barArray.push(bar)
						}
						bars = barArray.sort((a, b) => (a.title > b.title) ? 1 : -1)
					})
				// 	bars.forEach(function (bar) {
				// 		let typeIds = Object.values(bar.typeIds)
				// 		for (let i = 0; i < typeIds.length; i++) {
				// 			var array = []
				// 			typeIds.map(function (val) {
				// 			return array.push(val)
				// 			})
				// 		}
				// 		let ifTrue = array.some((val) => checkedFilters.indexOf(val) !== -1)
				// 		if (ifTrue === true) {
				// 			barArray.push(bar)
				// 		}
				// 		bars = barArray.sort((a, b) => (a.title > b.title) ? 1 : -1)
				// 	})
				} else {
					return bars
				}
				return bars
			}
		},
		watch: {
			searchKeyword: _.debounce(function () {
			return this.searchKeyword
			}, 300)
		},
		methods: {
			toggleOnOff () {
				this.onOff = !this.onOff
			},
			// searchBars: function (searchQuery) {
			// 	this.isLoading = true
			// 	let bars = Object.values(this.$store.state.bars.items).sort((a, b) => (a.title > b.title) ? 1 : -1)
			// 	if (searchQuery) {
			// 		this.bars = bars.filter((i) => i.title.toLowerCase().includes(this.searchQuery.toLowerCase()))
			// 		this.isLoading = false
			// 	} else {
			// 		this.bars = Object.values(this.$store.state.bars.items).sort((a, b) => (a.title > b.title) ? 1 : -1)
			// 		this.isLoading = false
			// 	}
			// 	console.log(this.searchResult)
			// },
			...mapActions('types', ['fetchAllTypes']),
			...mapActions('bars', ['fetchBar', 'fetchBars', 'fetchAllBars', 'createBar']),
			...mapActions('favorites', ['fetchFavorite', 'fetchFavorites', 'fetchAllFavorites']),
			...mapActions('users', ['fetchUser']),
			isChecked (value) {
				return this.selectedTypes.includes(value)
			},
			mouseover: function () {
				alert('hi')
				this.mycolor = '#' + (Math.random() * 0xFFFFFF << 0).toString(16)
				document.getElementsByClassName('li.type-label').style.background = this.mycolor
			},
			scrollTop () {
				window.scrollTo(0, 0)
			}
		},

		created () {
			this.fetchAllTypes()
			this.fetchAllBars()
			.then(bars => Promise.all(bars.map(bar => this.favorites)))
			this.fetchAllFavorites()
			.then(favorites => Promise.all(favorites.map(favorite => this.favoritesId)))
			.then(() => {
					this.asyncDataStatus_fetched()
			})
		}
	}
</script>

<style scoped>
	.flex-grid.types {
		background: transparent;
	}
	.searchArea,
	.filterArea {
		text-align: center;
		width: 100%;
		margin: 2% auto;
		padding: .825em;
	}
	.filterArea {width: 90%}
	p input{
		border: 1px solid #ccc;
	    width: 100%;
	    text-align: center;
	    padding: .625em;
	}
	.type-label {
		background: transparent; 
		display: inline;
		padding: 10px;
		margin: 1%;
		position: relative;
	}
	.searchArea>h3 {
		border: 2px #9DC209 solid;
		padding: .825em;
		cursor: pointer;
	}
	h3.type-label,
	p.type-label  {
		max-width: 100%;
		width: 100%;
	}

	li.type-label  {
		flex: 1;
		cursor: pointer;
		border: 5px solid transparent;
		display: flex;
		margin: auto 1px;
	}
	li.type-label.checkedtype{
		border: 5px #BCDE1E solid;
	    cursor: pointer;
	    margin: auto 1px;
	}
	li.type-label:hover{
     background-color: #B2D414;
     -webkit-animation: random 5s;
     animation: random 5s infinite;
	}

	@keyframes  random {
	    15% { background-color: #A8CA0A; } 
	    30% { background-color: #9EC000; } 
	    45% { background-color: #94B600; } 
	    60% { background-color: #8AAC00; }
	    75% { background-color: #80A200; }  
	}
	.type-label label {
		display: flex;
		justify-content: center;
		flex-flow: column wrap;
		margin: auto;
	}
	.type-label input {
		display: table;
	    margin: auto;
	    height: 100%;
	    width: 100%;
	    z-index: 1;
	    position: absolute;
	    top: 0;
	    bottom: 0;
	    right: 0;
	    left: 0;
	    opacity: 0;
	    cursor: pointer;
	}
	.type-label svg.svg-inline--fa{ margin: auto !important;}

	.filters {
		margin: 2.6% auto;
	}
	.filter-label {
		padding: .625em;
		margin: auto 1%;
		text-align: center;
		font-style: italic;
		font-size: 14px;
	}
	@media (max-width: 1244px) {
	    .searchArea>h3 {
	        font-size: 2vw;
	    }
	    li.type-label {
	        -webkit-box-flex: 1;
	        -ms-flex: 1;
	        flex: 1;
	        cursor: pointer;
	        display: -webkit-box;
	        display: -ms-flexbox;
	        display: flex;
	        border: 5px transparent double;
	        cursor: pointer;
	        margin: 0;
	        height: 90%;
	    }
	   
	     li.type-label span {
	        font-size: 1.8vw;
	     }
	 }
     @media screen and (max-width: 1024px) {
     	 li.type-label { 
     	 	flex: 0;
     	 	height: 100px;
     	 }
		.type-label label {
			flex: 1; 
		}
	}
	@media (max-width: 580px) {
		.searchArea>h3 {
		    font-size: 3vw;
		}
		.type-label {
		    padding: 8px;
		}
	}
	#staticReturnTop {
		display:flex;
		justify-content:flex-end;
		right:40px;
		bottom: 15px;
		position: fixed;
		z-index: 1000;
	}
	#staticReturnTop .far,
	#staticReturnTop .fas {
		width:45px;
		height: 45px;
		text-align: center;
		font-size: 2rem;
		border-radius:50%;
	}
	#more {
		width:48px;
		height: 45px;
		text-align: center;
		font-size: 2rem;
		border-radius:50%;
		background: #9DC216;
		color:white;
	}
	#fixedIcons {
		display: flex;
		flex-flow:row;
		justify-content: flex-end;
		width: 100%;
	}
	#close {
		order: 3;
		background: black;
		width:48px;
		height: 45px;
		text-align: center;
		font-size: 2rem;
		border-radius:50%;
		color:white;

	}
	#returnTop {
		background: #4e9c7f;
		color:white;
		width:48px;
		height: 45px;
		text-align: center;
		font-size: 2rem;
		border-radius:50%;
		order: 2;
		margin: 0 4px;
	}
	#staticSearch {
		background: orange;
		color:white;
		width:48px;
		height: 45px;
		text-align: center;
		font-size: 2rem;
		border-radius:50%;
		order:1;
	}
	#showSearchInput {
		position: fixed;
	    background: #5A183F;
	    padding: 20px;
	    bottom: 80px;
	    max-width: 100%;
	    width: 100%;
	    margin: 0;
	    right: 0;
	    left: 0;
	    color:white;
	}
</style>
