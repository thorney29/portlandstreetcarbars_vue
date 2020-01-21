0o90<template>
	<div class="col-3 push-top">
		<div class="profile-card">
			<p class="text-center">
				<img :src="user.avatar" alt="" class="avatar-xlarge img-update">
			</p>
			<!-- Update image -->
			<div class="form-group">
				<label for="user_bio">Avatar URL</label>
				<input
					v-model="activeUser.avatar"
					@blur="$v.activeUser.avatar.$touch()"
					id="avatar" type="text" class="form-input">
				<template v-if="$v.activeUser.avatar.$error">
					<span v-if="!$v.activeUser.avatar.url" class="form-error">
						This URL provided is invalid.
					</span>
					<span v-else-if="!$v.activeUser.avatar.supportedImageFile" class="form-error">
						Sorry! 😔 This file type is not supported by our system.
					</span>
				<!-- 	<span v-else-if="!$v.activeUser.avatar.responseOk" class="form-error">
						This image cannot be found. Please check the url.
					</span> -->
				</template>
			</div>
			<!-- Update Username -->
			<div class="form-group">
				<label for="user_bio">Username</label>
				<input
				v-model.lazy="activeUser.username"
				@blur="$v.activeUser.username.$touch()"
				id="username" type="text" class="form-input">
				<template v-if="$v.activeUser.username.$error">
					<span v-if="!$v.activeUser.username.required" class="form-error">
						This field is required.
					</span>
					<span v-if="!$v.activeUser.username.unique" class="form-error">
						Sorry! 😔 This username is already taken.
					</span>
				</template>
			</div>

			<div class="form-group">	
				<label for="user_bio">Display Name</label>
				<input
					v-model="activeUser.name"
					@blur="$v.activeUser.name.$touch()"
					id="name" type="text" class="form-input" placeholder="Name as you'd like it displayed">
				<template v-if="$v.activeUser.name.$error">
					<span v-if="!$v.activeUser.name.required" class="form-error">
						This field is required.
					</span>
					<span v-if="!$v.activeUser.name.unique" class="form-error">
						Sorry! 😔 This name is already taken.
					</span>
				</template>
			</div>
			<div class="form-group">
				<label for="user_bio">Bio</label>
				<template v-if="$v.activeUser.bio.$error">
					<span v-if="!$v.activeUser.bio.minLength" class="form-error">Your bio must be at least 18 characters long</span>
				</template>
				<textarea v-model="activeUser.bio" @blur="$v.activeUser.bio.$touch()" class="form-input" id="user_bio" placeholder="Write a few words about yourself."></textarea>
			</div>

			<!-- <div class="stats">
				<span>{{userPostsCount}} posts</span>
				<span>{{userThreadsCount}} threads</span>
				<br>
				<span>{{userFavoritesCount}} likes</span>
				<span>{{userStarsCount}} to visit</span>
			</div> -->

			<hr>
	
			<div class="form-group">
				<input 
				v-model.lazy="activeUser.website"
				@blur="$v.activeUser.website.$touch()"
				autocomplete="off" class="form-input" id="user_website">
				<template v-if="$v.activeUser.website.$error">
					<span v-if="!$v.activeUser.website.url" class="form-error">
						This url is not valid.
					</span>
				</template>
				<label style="float: left;width: 100%;" class="form-label" for="user_website">Website</label>
			</div>

			<div class="form-group">
				<input
					v-model.lazy="activeUser.email"
					@blur="$v.activeUser.email.$touch()"
					id="user_email" type="email" class="form-input" autocomplete="off">
				<template v-if="$v.activeUser.email.$error">
					<span v-if="!$v.activeUser.email.required" class="form-error">
						This is not a valid email address.
					</span>
					<span v-else-if="!$v.activeUser.email.unique" class="form-error">
						Sorry! 😔 This email is already taken.
					</span>
					<span v-else-if="!$v.activeUser.email.email" class="form-error">
						Sorry! 😔 This is not a valid email.
					</span>
				</template>
			</div>
			<div class="form-group">
				<label class="form-label" for="user_email">Email</label>
			</div>

			<input v-model="activeUser.location" autocomplete="off" class="form-input" id="user_location">
			<div class="form-group">
				<label class="form-label" for="user_location">Location</label>
			</div>

			<div class="btn-group space-between">
				<button @click.prevent="cancel" class="btn-ghost">Cancel</button>
				<button @click.prevent="save" type="submit" class="btn-blue">Save</button>
			</div>
		</div>
	</div>
</template>

<script>
	import {required, email, minLength, url} from 'vuelidate/lib/validators'
	import {uniqueUsername, uniqueEmail, supportedImageFile, responseOk} from '@/utils/validators'
	
	export default {
		props: {
			user: {
				required: true,
				type: Object
			}
		},
		data () {
			return {
				activeUser: {...this.user}
			}
		},
		validations: {
			activeUser: {
				name: {
					required
				},
				username: {
					required,
					unique (value) {
						if (value.toLowerCase() === this.user.usernameLower) {
							return true
						}
						return uniqueUsername(value)
					}
				},
				bio: {
					minLength
				},
				email: {
					required,
					email,
					unique (value) {
						if (value.toLowerCase() === this.user.email) {
							return true
						}
						return uniqueEmail(value)
					}
				},
				website: {
					url
				},
				avatar: {
					url,
					supportedImageFile,
					responseOk
				}
			}
		},
		computed: {
			userThreadsCount () {
				return this.$store.getters['users/userThreadsCount'](this.user['.key'])
			},
			userPostsCount () {
				return this.$store.getters['users/userPostsCount'](this.user['.key'])
			},
			userFavoritesCount () {
				return this.$store.getters['users/userFavoritesCount'](this.user['.key'])
			}
		},

		methods: {
			save () {
				this.$v.activeUser.$touch()
				if (!this.$v.activeUser.$invalid) {
					this.$store.dispatch('users/updateUser', {...this.activeUser})
					this.$router.push({name: 'PageProfile'})
				}
			},
			cancel () {
				this.$router.push({name: 'PageProfile'})
			}
		},

		created () {
			this.$emit('ready')
		}
	}
</script>


<style scoped>

</style>