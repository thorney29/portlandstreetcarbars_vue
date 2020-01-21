<template>
    <div class="type-list-item">
        <div class="card-body">
          <!--   <router-link 
            class="type-name"
            :to="{name: 'PageType', params: {id : this.type['.key'], slug: this.type.slug}}">
                <h2>{{type.name}}</h2>
            </router-link> -->
             <router-link 
            class="type-name"
            :to="{name: 'PageType', params: {id : this.type['.key']}}">
                <h2>{{type.name}}</h2>
                <h3 class="type-description">{{type.description}}</h3>
                <div class="icon"><i class="fas fa-type.icon">{{ type.icon }}</i></div>
            </router-link>
         </div>
        <div class="bar-count">
            <p class="count text-lead">
            {{BarsCount}}
            {{BarsCount === 1 ? 'bar': 'bars'}}</p> 
        </div>
    </div>
</template>
<script>
import {countObjectProperties} from '@/utils'
export default {
	props: {
		type: {
			required: true,
			type: Object
		}
        // ,
        //  id: {
        //     type: String,
        //     required: true
        // }
	},
    data () {
        return {
            slug: this.type.slug
        }
    },
	computed: {
		BarsCount () {
			return countObjectProperties(this.type.bars)
		}
        // BarsCount (bar) {
        //     return this.$store.getters['bars/BarsCount'](this.bar['.key'])
        // }
	}
}
</script>
<style scoped>
    .type-list-item {
        background: white;
        /*width: 31.333%;*/
        margin:  0 auto 2%;
        text-align: center;
        padding: 10px;
    }
    .type-list-item h2 {
        width: 90%;
        margin: 12% auto auto;
        color: #822357;
        font-size: 2.1rem;
        /*font-family: 'Staatliches', cursive;
        font-family: 'Baumans', cursive;
        font-family: 'Vibes', cursive;*/
        font-family: 'Megrim', cursive;
    }
    .bar-count {text-align: center;}
    .type-description {
        font-size: 18px;
    }
    .icon{
        list-style: none;
        align-items: center;
        align-content: center;
        align-self: center;
        border: 2px solid #0c6534;
        height: 60px;
        display: flex;
        justify-content: center;
        width: 60px;
        border-radius: 50%;
        margin: 1% auto;
    }
    svg.svg-inline--fa.fa-beer.fa-w-14,
    svg.svg-inline--fa.fa-cocktail.fa-w-18,
    svg.svg-inline--fa.fa-wine-glass-alt.fa-w-9 {
        color: #0c6534;
        padding: 4px;
        font-size: 3rem;
    }
    svg.svg-inline--fa.fa-beer.fa-w-14{
        margin-left: 13%;
    }
</style>    