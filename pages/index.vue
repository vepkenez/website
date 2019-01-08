<template lang="pug">
div

        form.contact-form(
            method='POST',
            name='Contact Form',
            data-netlify="true",
            data-netlify-honeypot="bot-field",
          )
          .form-controls
            .form-input
              textarea(placeholder='Send us a message',
                name='message',
                v-model='feedbackText',
                required)
              label(for='contact-email').sr-only Enter your email address
              input(type='email',
                name='email',
                placeholder='Enter your email address',
                v-model='feedbackEmail'
                required)#contact-email
              input(type='hidden',
                name='form-name',
                value='Contact Form'
              )
            .sr-only
              label Don't fill this out if you're human:
                input(name='bot-field')
            button(type='submit').btn.btn-primary Send message

</template>

<script>
import axios from 'axios';
import content from '~/static/content/index.md';
import { ACTION_NETWORK_API } from '~/constants/action-network';

export default {
  data() {
    return {
      contents: content.attributes,
      quickSignupEmail: '',
      quickSignupLoading: false,
      quickSignupSubmitted: false,
      feedbackEmail: '',
      feedbackText: '',
      feedbackLoading: false,
      feedbackSubmitted: false
    };
  },
  methods: {
    submitQuickSignup() {
      if (this.quickSignupLoading) {
        return;
      }
      this.quickSignupLoading = true;
      this.quickSignupSubmitted = false;
      this.submitEmail(this.quickSignupEmail).then(() => {
        this.quickSignupLoading = false;
        this.quickSignupSubmitted = true;
        this.quickSignupEmail = '';
      });
    },
    submitFeedback() {
      if (this.feedbackLoading) {
        return;
      }
      this.feedbackLoading = true;
      this.feedbackSubmitted = false;
      return this.submitEmail(this.feedbackEmail)
        .then(() => {
          return axios.post('/thank-you', {
            message: this.feedbackText,
            email: this.feedbackEmail
          });
        })
        .then(() => {
          this.feedbackLoading = false;
          this.feedbackSubmitted = true;
          this.feedbackEmail = '';
          this.feedbackText = '';
        });
    },
    submitEmail(email) {
      return axios.post(
        'https://actionnetwork.org/api/v2/people/',
        {
          person: {
            email_addresses: [
              {
                address: email
              }
            ]
          }
        },
        {
          headers: {
            'OSDI-API-Token': ACTION_NETWORK_API,
            'Content-Type': 'application/json'
          }
        }
      );
    }
  }
};
</script>

<style></style>
