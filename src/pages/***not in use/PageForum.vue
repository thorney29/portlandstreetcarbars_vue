<template>
	<div v-if="asyncDataStatus_ready" class="forumWrapper">
		<div class="col-full push-top">
			<div class="forum-header">
				<div class="forum-details">
					<h1>{{forum.name}}</h1>
					<p class="text-lead">{{forum.description}}</p>
				</div>
				<router-link 
				:to="{name: 'PageThreadCreate', params: {forumId: this.forum['.key']}}"
				class="btn-green btn-small"
				>
					Start a thread
				</router-link>
			</div>
		</div>
		<div class="col-full">
			<ThreadList :threads="threads" />
		</div>
		<div class="forum-stats desktop-only">
			<hr>
			<ul>
				<li><i class="fa fa-user-circle-o"></i>47 users online</li>
				<li><i class="fa fa-user-o"></i>497 users registered</li>
				<li><i class="fa fa-comments-o"></i>49 threads</li>
				<li><i class="fa fa-comment-o"></i>763 posts</li>
			</ul>
		</div>
	</div>
</template>

<script>
	import {mapActions} from 'vuex'
	import ThreadList from '@/components/ThreadList'
	import asyncDataStatus from '@/mixins/asyncDataStatus'

	export default {
		components: {
			ThreadList
		},

		props: {
			id: {
				required: true,
				type: String
			}
		},

		mixins: [asyncDataStatus],

		computed: {
			forum () {
				return this.$store.state.forums.items[this.id]
			},
			threads () {
				return Object.values(this.$store.state.threads.items)
				.filter(thread => thread.forumId === this.id)
			}
		},

		methods: {
			...mapActions('forums', ['fetchForum']),
			...mapActions('threads', ['fetchThreads']),
			...mapActions('users', ['fetchUser'])
		},

		created () {
			this.fetchForum({id: this.id})
			.then(forum => this.fetchThreads({ids: forum.threads}))
			.then(threads => Promise.all(threads.map(thread => this.fetchUser({id: thread.userId}))))
			.then(() => { this.asyncDataStatus_fetched() })
		}
	}
</script>

<style scoped>
	.forumWrapper {
		width: 100%;
	}
</style>