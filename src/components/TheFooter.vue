<template>
	<div class="footer-copyright">
		<div class="container">
			<div>
				©
				<span id="copyright">
				2019</span>
				Site design and development by <a href="http://tresahorney.com" target="_blank"><b>Tresa Horney</b></a> 
				<div class="footer-btn">
					<router-link
					class="btn"
					:to="{name: 'PageContact'}">Contact Us</router-link>
				</div>
			</div>
		</div><!-- e-container -->
	</div>
</template>

<script>
	export default {}
</script>

<style scoped>
	.footer-btn a.btn {
		border-radius: 2px;
	    background: white;
	    color: #BCDE19;
	    border: 2px solid #BCDE19;
	    margin: 10px auto;
	    display: table;
	}
	.footer-btn a:hover.btn  {
	    border-radius: 2px;
	    background: #BCDE19;
	    color: white;
	    border: 2px solid #BCDE19;
	    margin: 10px auto;
	}
</style>