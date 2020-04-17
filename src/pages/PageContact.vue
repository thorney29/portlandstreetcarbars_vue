<template>
  	<div class="">
		<div class="col-full push-top">
			<div class="contact-header">
				<h1>Contact Us</h1>
			  	<h2>Would you like your venue on our list?</h2>
			</div>
			<div class="formContainer" v-show="!isShowing">
			  	<form class="contact-form" @submit.prevent="sendEmail">
			    <div class="labelInput">
				    <label>Name:</label>
				    <!-- <input v-model="user_name" type="text" name="user_name"> -->
				    <input
					v-model.lazy="user_name"
					@blur="$v.user_name.$touch()"
					id="name" name="user_name" type="text">
					<template v-if="$v.user_name.$error">
						<span v-if="!$v.user_name.required" class="form-error">
							This field is required.
						</span>
					</template>
				</div>
				<div class="labelInput">
				    <label>Email:</label>
				    <!-- <input v-model="user_email" type="email" name="user_email"> -->
				    <input
					v-model.lazy="user_email"
					@blur="$v.user_email.$touch()"
					id="email" type="email">
					<template v-if="$v.user_email.$error">
						<span v-if="!$v.user_email.required" class="form-error">
							Your email address is required.
						</span>
						<span v-else-if="!$v.form.email.email" class="form-error">
							Sorry! 😔 This is not a valid email.
						</span>
					</template>
				</div>
				<div class="labelInput">
				    <label>Message:</label>
				    <textarea v-model.lazy="user_message" @blur="$v.user_message.$touch()">
				    </textarea>
				    <template v-if="$v.user_message.$error">
							<span v-if="!$v.user_message.required" class="form-error">
								A message is required to send.
							</span>
						</template>
				   <!-- <textarea v-model="user_message" name="message"></textarea> -->
				    <input style="height:.2px;margin: 0;padding:0" v-model.lazy="user_message" @blur="$v.user_message.$touch()"
					id="message" name="user_message">
						
						
				</div>
				<div class="labelInput">
					<label for="human_status">What city is *this streetcar* located? <em>(Confirm you're not a robot to activate the submit button.)</em></label>
					<input type="text" id="human_status" name="human_status"
					v-model.lazy="human_status"
					@blur="$v.human_status.$touch()">
					<template v-if="$v.human_status.$error">
						<span v-if="!$v.human_status.required" class="form-error">
							Please prove you're human with the correct answer.
						</span>
					</template>
				</div>
				<div>
			    	<input :disabled="!(human_status == 'Portland' || human_status == 'portland')" @click="isShowing ^= true" class="btn-green" type="submit" value="Send">
			    </div>
			  </form>
			</div>
			<div class="formSubmission" v-show="isShowing">
				<div class="success"> 
				    <p style="text-align: center; font-size: 27px;margin: 4% auto;font-weight: 800;text-transform: uppercase;">{{successMessage}}</p>
				</div>				
				<p><strong>Form Details:</strong><br>
				Your Name: {{user_name}}<br>
				Your Email: {{user_email}} <br>
				Your Message: {{user_message}}
				</p>
			</div>
		</div>
	</div>
</template>

<script>
import {required, email} from 'vuelidate/lib/validators'
import asyncDataStatus from '@/mixins/asyncDataStatus'
import emailjs from 'emailjs-com'
export default {
	data () {
		return {
			user_name: '',
			user_email: '',
			user_message: '',
			human_status: '',
			successMessage: `Thank you for contacting us. We appreciate your feedback.`,
			isShowing: false
		}
	},
	mixins: [asyncDataStatus],
	validations: {
			user_name: {
				required
			},
			user_email: {
				required,
				email
			},
			user_message: {
				required
			},
			human_status: {
				required
			}
		},
	methods: {
		sendEmail: (e) => {
			emailjs.sendForm('gmail', 'template_a3BtNqNs', e.target, 'user_Wh5OPWTqmBtxSFAYO0v7N')
			.then((result, success) => {
				console.log('SUCCESS!', result.status, result.text)
			}, (error) => {
				console.log('FAILED...', error)
			})
		}
	},
	created () {
		this.asyncDataStatus_fetched()
	}
}
</script>
<style scoped>
	form {
		display:flex;
		flex-flow:column wrap;
		margin:1% auto 8%;
		width:50%;
	} 
	.labelInput {
		margin:2% 0;
	}
	.labelInput:last-of-type {
		margin:0;
	}
	label {margin-bottom: 2px;}
	input,
	textarea {
		background:white;
		width: 100%;
	}
	input {padding: 8px;}
	input:disabled {background: gray;}
	textarea {
		padding: 8px 0 0 8px;
	}
	.btn-green {
	    color: #fff;
	    background: #9dc209;
	}

</style>
<!-- <template>
<div class="contactForm">
  <form class="form" @submit.prevent="submit">
    <input required name="first_name" id ="first_name" v-model='contact.first_name' placeholder="First name" type="text" autocomplete="on">
    <input required name="last_name" id ="last_name" v-model='contact.last_name' placeholder="Last name" type="text" autocomplete="on">
    <input required :class="['input-group', isEmailValid()]" name="email" id ="email" v-model="contact.email" placeholder="E-mail" type="email" autocomplete="on">
    <input name="phone" id ="phone" v-model='contact.phone' placeholder="Phone" type="text" autocomplete="on">
    <v-select placeholder="Reason" name="subjects" class="subject_selection" multiple :options="contact.options"></v-select>
    <textarea name="message" id ="message" v-model="contact.message" rows="4" placeholder="Message"></textarea>
    <div class='captcha-input'>
            <vue-recaptcha
            ref="recaptcha"
            @verify="onCaptchaVerified"
            @expired="onCaptchaExpired"
            size="invisible"
            sitekey="<KEY>">
            </vue-recaptcha>
    </div>
    <button class="button">Send</button>
</form>

<script>

// import vSelect from 'vue-select'
import VueRecaptcha from 'vue-recaptcha'

export default {
	components: {
		'vue-recaptcha': VueRecaptcha

	},

	data () {
		return {
			contact: {
				first_name: '',
				last_name: '',
				email: '',
				phone: '',
				message: '',
				options: ['Sell','Become a student','Become a teacher', 'General enquiry'],
				reg: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/,
			}
		}
	},

	methods: {
		isEmailValid () {
			return (this.contact.email == "")? "" : (this.contact.reg.test(this.email)) ? 'has-success' : 'has-error'
		},
		submit () {
			// this.status = "submitting";
			// Verify email
			// Verify phone
			this.$refs.recaptcha.execute()
		},
		onCaptchaVerified (recaptchaToken) {
			const self = this
			self.status = "submitting"
			self.$refs.recaptcha.reset()

			this.isSending = true

			setTimeout(() => {
				// Build for data
				let form = new FormData()
				for (let field in this.contact) {
					form.append(field, this.contact[field])
				}
				// Send form to server  
				axios.post("https://api.airstudy.com.au/contacts/", form).then((response) => {
					console.log(response)
					this.clearForm()
					this.isSending = false
					}).catch((e) => {
					console.log(e)
				})
				}, 1000)
			},
			onCaptchaExpired () {
				this.$refs.recaptcha.reset()
			},
			/**
			* Clear the form
			*/  
			clearForm () {
				for (let field in this.contact) {
					this.contact[field] = ''
				}
			},
		}
	}
}
</script> -->