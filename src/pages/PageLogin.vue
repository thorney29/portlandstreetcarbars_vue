<template>
	<div class="flex-grid justify-center">
		<div class="col-2 card card-form">
			<h1 class="text-center">Login</h1>
			<div class="push-top text-center" >
				<button class="googleSignIn" @click="signInWithGoogle">
				<span style="border-radius: 2px;margin: 3px;width: 20%;background: white;">
				<img style="width: 70%;margin: 10% 0 0 0;" src="/static/assets/img/google-icon.png"></span>
				<h3 style="margin: auto 2%;color: white;">Sign in with Google</h3> 
				</button>
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
	.flex-grid {background:transparent;}
	.card {height: auto;margin-bottom: 4%}
	.googleSignIn {
		display:flex;
		background:#4285F4;
		border-radius: 2px;
		width: 300px;
		margin: auto;

	}
	.googleSignIn:hover {
        box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
	}
</style>
