<template>
    <div class="col-2">
    	<form @submit.prevent="register" class="card card-form">
			<h1 class="text-center">Register</h1>
			<div class="form-group">
				<label for="name">Full Name</label>
				<input
				v-model="form.name"
				@blur="$v.form.name.$touch()"
				id="name" type="text" class="form-input">
				<template v-if="$v.form.name.$error">
					<span v-if="!$v.form.name.required" class="form-error">
						This field is required.
					</span>
				</template>
			</div>

			<div class="form-group">
				<label for="username">Username</label>
				<input
				v-model.lazy="form.username"
				@blur="$v.form.username.$touch()"
				id="username" type="text" class="form-input">
				<template v-if="$v.form.username.$error">
					<span v-if="!$v.form.username.required" class="form-error">
						This field is required.
					</span>
					<span v-if="!$v.form.username.unique" class="form-error">
						Sorry! 😔 This username is already taken.
					</span>
				</template>
			</div>

			<div class="form-group">
				<label for="email">Email</label>
				<input
				v-model.lazy="form.email"
				@blur="$v.form.email.$touch()"
				id="email" type="email" class="form-input">
				<template v-if="$v.form.email.$error">
					<span v-if="!$v.form.email.required" class="form-error">
						Your email address is required.
					</span>
					<span v-else-if="!$v.form.email.unique" class="form-error">
						Sorry! 😔 This email is already taken.
					</span>
					<span v-else-if="!$v.form.email.email" class="form-error">
						Sorry! 😔 This is not a valid email.
					</span>
				</template>
			</div>

			<div class="form-group">
				<label for="password">Password</label>
				<input
				v-model="form.password"
				@blur="$v.form.password.$touch()"
				id="password" type="password" class="form-input">
				<template v-if="$v.form.password.$error">
					<span v-if="!$v.form.password.required" class="form-error">
						Your password should be longer than 8 characters.
					</span>
					<span v-if="!$v.form.password.minLength" class="form-error">The password must be at least 8 characters long</span>
				</template>
			</div>

			<div class="form-group">
				<label for="avatar">Avatar</label>
				<input
				v-model="form.avatar"
				@blur="$v.form.avatar.$touch()"
				id="avatar" type="text" class="form-input">
				<template v-if="$v.form.avatar.$error">
					<span v-if="!$v.form.avatar.url" class="form-error">
						This URL provided is invalid.
					</span>
					<span v-if="!$v.form.avatar.supportedImageFile" class="form-error">
						Sorry! 😔 This file type is not supported by our system.
					</span>
					<span v-if="!$v.form.avatar.responseOk" class="form-error">
						This image cannot be found. Please check the url.
					</span>
				</template>
			</div>

			<div class="form-actions">
				<button type="submit" class="btn-blue btn-block">Register</button>
			</div>

		</form>
		<div class="text-center push-top">
			<button @click="registerWithGoogle" class="btn-red btn-xsmall">
				<i class="fab fa-google"></i> Sign up with Google</button>
		</div>
	</div>
</template>

<script>
	import {required, email, minLength, url} from 'vuelidate/lib/validators'
	import {uniqueUsername, uniqueEmail, supportedImageFile, responseOk} from '@/utils/validators'
	export default {
		data () {
			return {
				form: {
					name: null,
					username: null,
					email: null,
					password: null,
					avatar: null
				}
			}
		},
		validations: {
			form: {
				name: {
					required
				},
				username: {
					required,
					unique: uniqueUsername
				},
				email: {
					required,
					email,
					unique: uniqueEmail
				},
				password: {
					required,
					minLength: minLength(8)
				},
				avatar: {
					url,
					supportedImageFile,
					responseOk
				}
			}
		},

		methods: {
			register () {
				this.$v.form.$touch()
				if (this.$v.form.$invalid) {
					return
				}
				this.$store.dispatch('auth/registerUserWithEmailAndPassword', this.form)
				.then(() => this.successRedirect())
			},
			registerWithGoogle () {
				this.$store.dispatch('auth/signInWithGoogle')
				.then(() => this.successRedirect())
			},
			successRedirect () {
				const redirectTo = this.$route.query.redirectTo || {name: 'PageHome'}
				this.$router.push(redirectTo)
			}
		},

		created () {
			this.$emit('ready')
		}
	}
</script>

<style scoped>

</style>