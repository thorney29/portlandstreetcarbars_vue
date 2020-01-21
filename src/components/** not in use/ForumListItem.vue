<template>
    <div class="forum-listing">
        <div class="forum-details">
            <router-link 
            class="forum-name"
            :to="{name: 'PageForum', params: {id: forum['.key']}}">
                {{forum.name}}
            </router-link>
            <p class="forum-description">{{forum.description}}</p>
        </div>
        <div class="threads-count">
            <p class="count text-lead">{{threadsCount}}</p> 
            🦄 {{threadsCount === 1 ? 'thread': 'threads'}} 🦄
        </div>
        <div class="last-thread">
        <!-- TODO: Implement later -->
        </div>
    </div>
</template>
<script>
import {countObjectProperties} from '@/utils'
export default {
	props: {
		forum: {
			required: true,
			type: Object
		}
	},
	computed: {
		threadsCount () {
			return countObjectProperties(this.forum.threads)
		}
	}
}
</script>
<style scoped>

</style>    