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
			 	<p><input type="text" v-model="search" value="Rum Club" placeholder="Search by name.."/></p>
       		 	<p><label style="padding-top:8px;"><em>Bar name: {{search}}</em></label></p>
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
			    		<span class="filter-label">{{type}}</span>
			  			<span class="addAnother" style="margin:auto;padding: 2px 4px 0;font-size: 12px;" v-if="selectedTypes.length > 1">
			  			<i class="fas fa-plus-circle"></i></span>
		  			</li>
	  			</ul>
		  	</p>
		</div>
		<div class="all-bars-directions">
			<!-- get the results of the search
			* default is empty string -- all bars shown -->
			<AllBarList :bars="filteredList"/>
		</div>
	</div>
</template>

<script>
	import {mapActions, mapGetters} from 'vuex'
	import AllBarList from '@/components/AllBarList'
	import asyncDataStatus from '@/mixins/asyncDataStatus'

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
				search: '',
				seeSearch: false,
				seeFilter: false,
				upHere: false
			}
		},
		mixins: [asyncDataStatus],

		computed: {
			types () {
				return Object.values(this.$store.state.types.items)
			},
			// bars () {
			// 	return Object.values(this.$store.state.bars.items)
			// },
			favorites () {
				return Object.values(this.$store.state.favorites.items)
			},
			...mapGetters({
				user: 'auth/authUser'
			}),
			// This is for search by name
			filteredList () {
				let bars = Object.values(this.$store.state.bars.items)

				// bars.sort(function (a, b) {
				// 	var textA = a.DepartmentName.toUpperCase()
				// 	var textB = b.DepartmentName.toUpperCase()
				// 	return (textA < textB) ? -1 : (textA > textB) ? 1 : 0
				// })
				// console.log(bars)
				// if there are no types selected -- zero items in array
				if (this.selectedTypes.length === 0) {
					// define the bars
					// review a list of bars and return a specific list of bars that includes the string of letters in the search based on bar titles
					// transform the text to lowercase
					return bars.filter(bar => {
					return bar.title.toLowerCase().includes(this.search.toLowerCase())
					})
				} else if (this.selectedTypes.length > 0) {
					let checkedFilters = this.selectedTypes.map(v => v.toLowerCase().replace(/\s+/g, '-'))
					// create array to store bars that meet conditions (checked filters are not null in the typeIds)
					let barArray = []
					bars.forEach(function (bar) {
						let typeIds = Object.values(bar.typeIds)
						for (let i = 0; i < typeIds.length; i++) {
							var array = []
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
				} else {
					// if there is more than one filter selected find all of the bars that have
				}
				return bars
			}
		},

		methods: {
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
			}
		},

		created () {
			// get all bars
			this.fetchAllTypes()
			this.fetchAllBars()
			.then(bars => {
				return Promise.all(bars.map(bar => {
			// 		// this.fetchUser({id: favorite.userId})
					console.log('success fetched bars')
				}))
			})
			.then(() => {
					this.asyncDataStatus_fetched()
			})
			// this.fetchAllFavorites()
			// .then(favorites => Object.keys(favorites).map(key => { return favorites[key] }))
			// .then(favorites => Promise.all(favorites.map(favorite => this.fetchUser({id: favorite.userId}))))
			// .then(() => {
			// 	this.asyncDataStatus_fetched()
			// })
			// .fetchFavorites({ids: Object.keys(bar.favorites)})
			// 	.then(() => {
			// 		this.asyncDataStatus_fetched()
			// })
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
		/*border: 1px solid #666;*/
		width: 70%;
		margin: 2% auto;
		padding: .825em;
	}
	p input{
		border: 1px solid #ccc;
	    width: 100%;
	    text-align: center;
	    padding: .625em;
	}
	.filterArea {width: 90%}
	.type-label {
		background: transparent; 
		display: inline;
		padding: 10px;
		margin:2%;
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
	}
	li.type-label.checkedtype{
		border: 5px #BCDE1E solid;
	    cursor: pointer;
	   /* box-shadow: 0px 1px 7px rgba(0,0,0,.5);*/
	    height: 150px;
	    margin:auto 1px;
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
		/*border: limegreen 2px solid;*/
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
	    ul.filterArea.flex-grid.types {
	    	height: 178px;
	    }
	    li.type-label {
	        -webkit-box-flex: 1;
	        -ms-flex: 1;
	        flex: 1;
	        cursor: pointer;
	       /* border: 5px solid transparent;*/
	        display: -webkit-box;
	        display: -ms-flexbox;
	        display: flex;
	        border: 5px transparent double;
	      /*  border-right: 5px ;*/
	        cursor: pointer;
	        margin: auto;
	        height: 90%;
	        /* -webkit-box-shadow: 0px 1px 7px rgba(0,0,0,.5); */
	        /* box-shadow: 0px 1px 7px rgba(0,0,0,.5); */
	    }
	   /* li.type-label:last-of-type {
	        border-right: 5px #BCDE1E double;
	    }*/
	     li.type-label span {
	        font-size: 1.8vw;
	     }
	}
</style>