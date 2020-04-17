<template>
    <div class="type-list-item">
        <div class="card-body">
            <router-link 
            class="type-name"
            :to="{name: 'PageType', params: {id : this.type['.key']}}">
                <h2>{{type.name}}</h2>
                <h3 class="type-description">{{type.description}}</h3>
                <div class="icon"><i class="fas fa-type.icon">{{ type.icon }}</i></div>
            </router-link>
        </div>
        <div class="bar-count">
            <p class="count">
            <em>{{BarsCount}}
            {{BarsCount === 1 ? 'option': 'options'}}</em>
            </p> 
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
   /* svg.svg-inline--fa.fa-beer.fa-w-14,
    svg.svg-inline--fa.fa-cocktail.fa-w-18,
    svg.svg-inline--fa.fa-wine-glass-alt.fa-w-9 {
        color: #0c6534;
        padding: 4px;
        font-size: 3rem;
    }*/
    svg.svg-inline--fa.fa-beer.fa-w-14{
        margin-left: 13%;
    }
    @media (max-width:580px) {
        .type-list-item h2 {
            font-size: 2.3rem !important;
        }
        .icon {
            height: 90px;
            width:90px;
        }
        svg.svg-inline--fa.fa-coffee.fa-w-20, 
        svg.svg-inline--fa.fa-umbrella-beach.fa-w-20, 
        svg.svg-inline--fa.fa-biking.fa-w-20, 
        svg.svg-inline--fa.fa-hamburger.fa-w-16, 
        svg.svg-inline--fa.fa-beer.fa-w-14, 
        svg.svg-inline--fa.fa-cocktail.fa-w-18, 
        svg.svg-inline--fa.fa-music.fa-w-16, 
        svg.svg-inline--fa.fa-football-ball.fa-w-16, 
        svg.svg-inline--fa.fa-wine-glass-alt.fa-w-9, 
        svg.svg-inline--fa.fa-utensils.fa-w-13, 
        svg.svg-inline--fa.fa-glass-cheers.fa-w-20, 
        svg.svg-inline--fa.fa-dice.fa-w-20 {
            font-size: 3em;
        }
        .type-name h2 {  -webkit-text-stroke: 1px;}
    }
</style>    