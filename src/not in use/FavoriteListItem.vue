<template>
	<div class="favorite">
		<form @submit.prevent="save">
			<div class="favoriting">
		        <label
		         class="favorite__heart"
		         v-bind:class="{'favorite__heart__selected': value, 'is-disabled': disabled}"
		         @click.prevent="favorite">
		        <input
		            class="favorite__checkbox"
		            type="checkbox"
		            v-bind:value="form.value"
		            v-model="form.value">
		         	<span class="fas fa-heart" :class="">   
						{{bar.favorites}} 
					</span>
		        </label>
		        {{barsFavoritesCount}} likes
		    </div>
		</form>
	<!-- 	<div class="user-info">
			 	<p class="desktop-only text-small">{{userfavoriteCount}} favorites</p>
		</div>
		<div class="favorite-content">
			<template v-if="!editing">
				<div>
					{{favorite.text}}
				</div>
				<a v-if="authUser" @click.prevent="editing = true" href="#" style="margin-left: auto;" class="link-unstyled" title="Make a change"><i class="fa fa-pencil"></i></a>
			</template>
			<div v-else>
				<FavoriteEditor
				:favorite="favorite"
				@save="editing = false"
				@cancel="editing = false"
				/>
			</div>
		</div> -->
	</div>
</template>

<script>
	import {mapGetters} from 'vuex'
	// import FavoriteEditor from './FavoriteEditor'
export default {
		data () {
			return {
				'form.value': {
					type: Boolean,
					default: false
				},
				'disabled': {
					type: Boolean,
					default: false
				}
			}
		},
		props: {
			bar: {
				required: true,
				type: Object
			}
		},
		computed: {
			...mapGetters({
				authUser: 'auth/authUser'
			}),
			bars () {
				return Object.values(this.$store.state.bars.items)
			},
			user () {
				return this.$store.state.users.items[this.bar.userId]
			},
			barsFavoritesCount () {
				return this.$store.getters['bars/barsFavoritesCount'](this.bar['.key'])
			}
		},
		methods: {
			favorite: function () {
				if (this.disabled === true) {
					return
				}
				this.value = !this.value
				this.$emit('save', {value: this.form.value})
				// this.$store.dispatch('bars/updateBar', {...this.value})
			}
		},
		created () {
			this.$emit('ready')
		}
	}
</script>

<style scoped>
	.card {
		width: 31.333%;
		margin: 1%;
		text-align: center;
		padding: 10px;
	}
	.card-img-top {	
		width: 100%;
		height: 60%;
		object-fit: cover;
		object-position: center;
	}
	h5.card-title{font-size: 1.6rem;}

	.icon-details {text-align: right;}
	.fa-heart.is-favorited  {color: red;}
	.fa-star.is-starred {color: #b79b07;}

	.favoriting{
    display: inline-block
}
.favorite__heart {
    display: inline-block;
    padding: 3px;
    vertical-align: middle;
    line-height: 1;
    font-size: 16px;
    color: #ABABAB;
    cursor: pointer;
    -webkit-transition: color .2s ease-out;
    transition: color .2s ease-out;
}
.favorite__heart.is-disabled:hover {
     cursor: default;
 }
.favorite__checkbox {
    position: absolute;
    overflow: hidden;
    clip: rect(0 0 0 0);
    height: 1px;
    width: 1px;
    margin: -1px;
    padding: 0;
    border: 0;
}
.favorite__heart__selected{
    color: #df470b;
}
</style>