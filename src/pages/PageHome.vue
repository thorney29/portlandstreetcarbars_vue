<template>
	<div class="flex-grid home"> 
		<div class="parallax-container logo-header">
			<div class="parallax-content valign-wrapper first">
				<section class="no-pad-bot logo-header-area"> 
					<div class="logo-bg">
						<a class="set" href="https://portlandstreetcarbars.com">
						<div class="shot">
							<h1>
								<span>PORTLAND</span>
								<span>STREETCAR</span>
								<span>BARS</span>
							</h1>
						</div>
						</a>
					</div><!-- e-col6 -->
					<div class="train-bg">
						<div class="train">
							<img src="../assets/img/train-in-green-small.png">
						</div><!-- e-train -->
					</div><!-- e-cols6 -->
				</section><!-- e-section -->
			</div><!-- e-e-parallaxcontainervali-->
			<Parallax :speed-factor="0.3" breakpoint="(min-width: 80px)">
				<img src="../assets/img/pattern1.jpg" alt="very cool bg"> 
			</Parallax>
		</div> <!-- e-parallax container -->
		<section class="columns-flex middleBoxes">
	        <!--   Icon Section   -->
            <div class="columns-3">
				<div class="icon-block">
					<i class="fas fa-utensils"></i>
				</div><!-- e-iconblock -->
				<div class="content">
					<h2 class="center"><router-link :to="{name: 'PageMap'}">Options Near You</router-link></h2>
					<p class="light">Get directions to popular bars, restaurants, and music venues located within a 20 minute walk of Portland's eastside streetcar loop. <router-link :to="{name: 'PageMap'}">Find your next stop</router-link> minutes from Portland's Convention Center, the Rose Garden Transit Center, the Moda Center, OMSI, and more.</p>
                </div><!-- e-content -->
            </div><!-- e-1st column -->
            <div class="columns-3">
				<div class="icon-block">
					<i class="fas fa-directions"></i>
				</div><!-- e-iconblock -->
				<div class="content">
					<h2 class="center"><router-link :to="{name: 'PageDirections'}">Get Directions</router-link></h2>
					<p class="light">Use the <em><router-link :to="{name: 'PageDirections'}">portlandstreetcarbar map</router-link></em> to scope out your next stop. View an extensive list of bars, breweries, and restaurants located with a 1/2 mile of Portland's eastside streetcar loop.</p> 
				</div><!-- e-content -->
            </div><!-- e-2nd column -->
			<div class="columns-3">
				<div class="icon-block"> 
					<i class="fas fa-heart"></i>
				</div>
				<div class="content">
					<h2 class="center"><router-link :to="{name: 'PageProfile'}">Track Your Favorites</router-link></h2>
					<p class="light">Want to keep track of all of the places you've tried? Start a list of all of the places you like to visit? Create an account and make your past and possible favorites and we'll keep track for you. <router-link :to="{name: 'PageProfile'}">Login or create an account</router-link> to get started now.</p>
				</div><!-- e-content -->
      		</div><!-- e-3rd column -->
  		</section><!-- e-section --> 
 
   		<section class="parallax-container home-bottom-banner">
			<ParallaxContainer class="background">
				<ParallaxElement
				  :factor="0.625"
				  class="whiteBox">
					<h3>Hop on the streetcar and head to your next stop.</h3>
					<p>View <a href="https://portlandstreetcar.org/schedules" target="_blank">maps and schedules</a> to plan your next stop.</p>
				</ParallaxElement>
     		</ParallaxContainer>
    	</section> 

  		<section class="columns-flex bottomBoxes">
<!--   			<div class="full-width">
	            <h4>Have Fun</h4>
	        </div> -->
            <div class="columns-3">
				<div class="icon-block">
					<i class="fas fa-train"></i>
				</div>
				<div class="content">
					<h2 class="center">Easy to Find</h2>
					<p class="light">Use the <em>portlandstreetcarbar</em> map to easily find and meet up with your friends in inner SE/NE Portland. </p>   
	            </div><!-- e-iconblock -->
	        </div><!-- e-cols12m4 -->
            <div class="columns-3">
				<div class="icon-block">
					<i class="fas fa-map-signs"></i>
				</div>
				<div class="content">
					<h2 class="center">Easy to Get There</h2>
					<p class="light">Take the Bus, MAX, or ride your bike to the streetcar. No driving means a safer night for everyone.</p>
            	</div><!-- e-iconblock -->
            </div><!-- e-cols12m4 -->
            <div class="columns-3">
				<div class="icon-block">
					<i class="fas fa-laugh-beam"></i>
				</div>
				<div class="content">
					<h2 class="center">More Time for Fun</h2>
					<p class="light">Plan a streetcarbar crawl to explore new locations with friends in Portland's inner northeast and southeast neighborhoods.</p>
            	</div><!-- e-iconblock -->
          	</div><!-- e-cols12m4 -->
  		</section>
  		<section class="App__example o-vertical-spacing o-vertical-spacing--l parallax-container parallax-footer-image">
			<h2></h2>
			<ParallaxContainer>
				<ParallaxImage
				:width="432"
				:height="289"
				:factor="0.5"
				>
				<img
				src="../assets/img/Streetcar_on_Tilikum_Crossing_with_fog-shrouded_hills_in_background_11-2015.jpg"
				alt="portland streetcar"
				>
				</ParallaxImage>
			</ParallaxContainer>
		</section>
	</div><!-- flex-grid -->
</template>

<script>
	import Parallax from 'vue-parallaxy'
	import asyncDataStatus from '@/mixins/asyncDataStatus'
	import ParallaxContainer from '@/components/ParallaxContainer.vue'
	import ParallaxElement from '@/components/ParallaxElement.vue'
	import ParallaxImage from '@/components/ParallaxImage.vue'

	export default {
		components: {
			Parallax,
			ParallaxContainer,
			ParallaxElement,
			ParallaxImage
		},
		mixins: [asyncDataStatus],
		created () {
			this.asyncDataStatus_fetched()
		}
	}
</script>

  <style scoped>
  .flex-grid {padding: 0;}
	section.columns-flex {
		display:flex;
		-webkit-justify-content: space-around;
		justify-content: space-around;
		-webkit-flex-flow: row wrap;
		flex-flow: row wrap;
		-webkit-align-items: stretch;
		align-items: stretch;
		width: 1300px;
		margin: 2% auto auto;
		padding: 30px;
	}
	section.columns-flex.bottomBoxes {
		margin: 9% auto auto;
	}
	section.columns-flex .columns-3 {
		width: 31.333%;
		margin:1%;
	    background: white;
	    text-align: center;
	    padding: 20px;
	}

	section.columns-flex h2,
	section.columns-flex h3 {
	      font-size: 28px;
	      text-align: center;
	      margin: 2% auto;
	}
	.icon-block {
		text-align: center;
	}
	.fa-utensils,
	.fa-directions,
	.fa-heart {
		font-size: 3.2rem
	}
	.parallax-container.home-bottom-banner img {
	      height: 340px;
	      width: 100%;
	      object-fit: cover;
	}
    .parallax-container.home-bottom-banner {
      height: 400px;
      text-align: center;
      font-family: sans-serif;
    }
    .whiteBox {
    	background: rgba(255, 255, 255, .45);
    	margin: 1% 0;
    }
	.parallax-container.home-bottom-banner .background {
		background: url(../assets/img/pattern2.jpg) no-repeat;
		height:500px;
	}
/*font-family: 'Bungee Inline', cursive;
font-family: 'Gochi Hand', cursive;
font-family: 'Open Sans', sans-serif;
font-family: 'Over the Rainbow', cursive;
font-family: 'Zeyada', cursive;
font-family: 'Staatliches', cursive;
font-family: 'Baumans', cursive;
font-family: 'Vibes', cursive;
font-family: 'Megrim', cursive;*/
    .home-bottom-banner h3 {
    	width: 70%;
    	margin: auto;
    	color: #545454;
    	font-size: 3.2rem;
		font-family: 'Megrim', cursive;
    }
    .home-bottom-banner p {
		padding: 20px;
    }
	svg.svg-inline--fa.fa-train.fa-w-14,
	svg.svg-inline--fa.fa-map-signs.fa-w-16,
	svg.svg-inline--fa.fa-laugh-beam.fa-w-16 {
    	font-size: 3.2rem;
    }
    section.parallax-footer-image {width: 100%;}
    .bottomBoxes h2,
    .middleBoxes h2 {
		font-family: 'Megrim', cursive;
    }
    .ParallaxImage {height: 500px;}
    .ParallaxImage img {width: 100%;}
    .footer-copyright {text-align:center;}
  </style>