<template>
	<div v-if="asyncDataStatus_ready" class="typeWrapper">
		<div class="col-full push-top">
			<div class="type-header">
				<div class="type-details">
					<h1>{{type.name}}</h1>
					<h2 class="text-lead">{{type.description}}</h2>
				</div>
					<div v-if="user">
						<div v-if="user.permissions === 'admin'">
							<router-link
							:to="{name: 'PageBarCreate', params: {typeId: this.type['.key']}}"
							class="btn-green btn-small"
							>
							 Create a new bar ({{user.permissions}} only)
							</router-link>
						</div>
					</div>
			</div>
		</div>
		<!-- Display Bar List of this type  -->
		<div class="col-full">
			<AllBarList :bars="filtered"/>
		</div>
	</div>
</template>

<script>
	import {mapActions, mapGetters} from 'vuex'
	// import {mapActions} from 'vuex'
	import AllBarList from '@/components/AllBarList'
	import asyncDataStatus from '@/mixins/asyncDataStatus'

	export default {
		components: {
			AllBarList
		},

		props: {
			id: {
				required: true,
				type: String
			}
		},
		data () {
			return {
				bars: this.type ? this.type.bars : '',
				admin: this.user ? this.user.permissions : '',
				search: ''
			}
		},
		mixins: [asyncDataStatus],

		computed: {
			...mapGetters({
				user: 'auth/authUser'
			}),
			// types () {
			// 	return this.$store.state.types.items
			// },
			type () {
				return this.$store.state.types.items[this.id]
			},
			filtered () {
				let bars = Object.values(this.$store.state.bars.items).filter(bar => bar.typeIds[this.type['.key']] === this.type['.key'])
				let barArray = []
				bars.forEach(function (bar) {
					barArray.push(bar)
				})
				bars = barArray.sort((a, b) => (a.title > b.title) ? 1 : -1)
				return bars
			}
		},

		methods: {
			...mapActions('types', ['fetchType']),
			...mapActions('bars', ['fetchBars']),
			...mapActions('users', ['fetchUser'])
		},

		created () {
			this.fetchType({id: this.id})
			.then(type => this.fetchBars({ids: type.bars}))
			.then(bars => Promise.all(bars.map(bar => this.fetchUser({id: bar.userId}))))
			.then(bars => Promise.all(bars.map(bar => this.favorites)))
			.then(() => { this.asyncDataStatus_fetched() })
		}
	}
</script>

<style scoped>
	.typeWrapper {
		width: 100%;
	}
	.card {
	    height: 100%;
	}
</style>