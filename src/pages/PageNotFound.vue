<template>
    <div class="col-full" :class="$style.centered">
    	<h1 :class="$style.headingLarger">OOPS! Not Found</h1>
 
    	<p :class="$style.textLarger">Looks like that train already left the station.
    		<router-link :to="{name: 'PageHome'}">Let's go back home and try again.
    		</router-link>
    	</p>
    </div>
</template>

<script>
	export default {
		created () {
			this.$emit('ready')
		}
	}
</script>

<style module>
	.centered {text-align: center;}
	.headingLarger{
		font-size: 80px;
	}
	.textLarger {
		font-size: 30px;
		font-weight: 100;
	}
</style>