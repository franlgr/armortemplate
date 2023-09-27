<template>
  <div>
    <div>
      <FormKit
        type="form"
        id="registration-example"
        :form-class="submitted ? 'hide' : 'show'"
        submit-label="Register"
        @submit="submitHandler"
        :actions="false"
        #default="{ value }"
        v-model="formData"
      >
        <h1>Register!</h1>
        <p>
          You can put any type of element inside a form, not just FormKit inputs
          (although only FormKit inputs are included with the submission).
        </p>

        <hr />
        <FormKit
          type="text"
          name="name"
          label="Your name"
          placeholder="Jane"
          help="What is your name?"
          validation="required"
        />
        <FormKit
          type="text"
          name="lastname"
          label="Your Last Name"
          placeholder="Doe"
          help="What is your first name?"
          validation="required"
        />
        <FormKit
          type="text"
          name="email"
          label="Your email"
          placeholder="jane@example.com"
          help="What email should we use?"
          validation="required|email"
        />
        <FormKit
          type="number"
          name="telephone"
          label="Your Telephone"
          placeholder="+54 3548 639432"
          help="What is your Telephone?"
          validation="required|email"
        />
        <!-- <div class="double">
          <FormKit
            type="password"
            name="password"
            label="Password"
            validation="required|length:6|matches:/[^a-zA-Z]/"
            :validation-messages="{
              matches: 'Please include at least one symbol',
            }"
            placeholder="Your password"
            help="Choose a password"
          />
          <FormKit
            type="password"
            name="password_confirm"
            label="Confirm password"
            placeholder="Confirm password"
            validation="required|confirm"
            help="Confirm your password"
          />
        </div> -->

        <FormKit type="submit" label="Register" />
        <pre wrap>{{ value }}</pre>
      </FormKit>
    </div>
    <div v-if="submitted">
      <h2>Submission successful!</h2>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        submitted: false,
        formData: {},
      };
    },
    methods: {
      async submitHandler() {
        // Simulate an AJAX request (replace with actual AJAX call)
        await new Promise((resolve) => setTimeout(resolve, 1000));
        console.log('Submitted!');

        // After the request is complete, set submitted to true
        this.submitted = true;
      },
    },
  };
</script>
