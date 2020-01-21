<template>
	<div class="flex-grid justify-center">
		<div class="col-2 card card-form">
			<h1 class="text-center">Login</h1>
			<div class="push-top text-center">
				<button @click="signInWithGoogle" class="btn-red btn-xsmall">
				<i class="fab fa-google"></i> Log in with Google</button>
			</div>
			<br>
			<hr>
			<form @submit.prevent="signIn">
				<div style="text-align:center"><p><em>Or login with your email and password</em></p></div><br>
				<div class="form-group">
					<label for="email">Email</label>
					<input
					v-model.lazy="form.email"
					@blur="$v.form.email.$touch()"
					id="email" type="email" class="form-input">
						<template v-if="$v.form.email.$error">
							<span v-if="!$v.form.email.required" class="form-error">
							You did not enter an email. This field is required.
							</span>
							<span v-else-if="!$v.form.email.email" class="form-error">
							This is not a valid email address.
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
						You did not enter your password. Your password is required.
						</span>
					</template>
				</div>
				<div class="push-top">
					<button type="submit" class="btn btn-block">Login</button>
				</div>

				<div class="form-actions text-right">
					<router-link :to="{name: 'PageRegister'}">Create an account?</router-link>
				</div>
			</form>
		</div>
	</div>
</template>

<script>
	import {required, email} from 'vuelidate/lib/validators'
	export default {
		data () {
			return {
				form: {
					email: null,
					password: null
				}
			}
		},

		validations: {
			form: {
				email: {
					required,
					email
				},
				password: {
					required
				}
			}
		},

		methods: {
			signIn () {
				this.$v.form.$touch()
				if (!this.$v.form.$invalid) {
					this.$store.dispatch('auth/signInWIthEmailAndPassword', {
						email: this.form.email,
						password: this.form.password
					})
					.then(() => this.successRedirect())
					.catch(error => alert('🤷🏽‍♀' + error.message))
				}
			},
			signInWithGoogle () {
				this.$store.dispatch('auth/signInWithGoogle')
				.then(() => this.successRedirect())
				.catch(error => alert('🙆🏼‍♀️' + error.message))
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
	.card {height: auto;margin-bottom: 4%}
</style>
