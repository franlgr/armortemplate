<template>
  <div class="bg-white" id="auth">
    <!-- Example -->
    <div class="flex min-h-screen">
      <!-- Container -->
      <div class="flex flex-row w-full">
        <!-- Sidebar -->
        <div
          class="hidden lg:flex flex-col justify-between bg-[#1ddd7e] lg:p-8 xl:p-12 lg:max-w-sm xl:max-w-lg background-register"
        >
          <div class="flex items-center justify-start space-x-3">
            <div>
              <img
                src="@/assets/logoAlone.svg"
                class="w-10 bg-black rounded-full p-1"
                alt="tailus logo"
                style="margin: auto"
              />
            </div>

            <a href="#" class="font-medium text-xl text-black"
              >Armor Template</a
            >
          </div>
          <div class="space-y-5">
            <h1
              class="lg:text-3xl xl:text-5xl xl:leading-snug font-extrabold text-white p-4"
              style="background: #000000d1"
            >
              Enter your account and discover new experiences
            </h1>
            <p class="text-lg">ya tienes cuenta (esto va en ingles)?</p>
            <router-link
              to="/login"
              class="inline-block text-lg flex w-full px-4 py-3 border-2 rounded-lg font-medium border-black bg-black text-white"
              >Log-In</router-link
            >
          </div>
          <p class="font-medium">© 2023 Company</p>
        </div>

        <!-- Register -->
        <div
          class="flex flex-1 flex-col items-center justify-center relative w-full bg-black"
        >
          <div class="flex lg:hidden justify-between items-center w-full py-4">
            <div class="flex items-center justify-start space-x-3">
              <span class="bg-black rounded-full w-6 h-6"></span>
              <a href="#" class="font-medium text-lg">Armor</a>
            </div>
            <div class="flex items-center space-x-2">
              <span>member? </span>
              <router-link
                :to="{ name: 'login' }"
                class="underline font-medium text-[#070eff]"
              >
                Sign up now
              </router-link>
            </div>
            <p class="font-medium">© 2023 Company</p>
          </div>
          <!-- Login box -->
          <div
            class="flex flex-1 flex-col justify-center space-y-5 max-w-md w-full mt-8"
          >
            <div class="flex flex-col max-w-md space-y-5">
              <FormKit
                :wrapper-class="{
                  'i-will-append': true,
                  'i-will-not': false,
                }"
                type="form"
                prefix-icon="email"
                id="auth"
                :form-class="submitted ? 'hide' : 'show'"
                submit-label="Login"
                @submit="submitHandler"
                :actions="false"
                #default="{ value }"
                v-model="formData"
              >
                <img
                  src="@/assets/AuthLogo.svg"
                  class="w-64 mx-12 mt-2 logo"
                  alt="tailus logo"
                  style="margin: auto"
                />
                <h1 class="text-white mt-12">Register!</h1>
                <p class="my-4 text-white">
                  You can put any type of element inside a form, not just
                  FormKit inputs (although only FormKit inputs are included with
                  the submission).
                </p>
                <hr class="my-4" />
                <FormKit
                  class="register"
                  type="text"
                  name="name"
                  label="Your name"
                  placeholder="Jane Doe"
                  help="What do people call you?"
                  validation="required"
                />
                <FormKit
                  class="register"
                  type="text"
                  name="email"
                  label="Your email"
                  placeholder="jane@example.com"
                  help="What email should we use?"
                  validation="required|email"
                />
                <div class="double">
                  <FormKit
                    class="register"
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
                    class="register"
                    type="password"
                    name="password_confirm"
                    label="Confirm password"
                    placeholder="Confirm password"
                    validation="required|confirm"
                    help="Confirm your password"
                  />
                </div>

                <FormKit type="submit" id="register" label="Register" />
                <!-- <pre wrap>{{ value }}</pre> -->
              </FormKit>
              Already account?
              <router-link
              to="/login"
              class="inline-block text-lg flex w-full px-4 py-3 border-2 rounded-lg font-medium border-black bg-black text-white"
              >Log-In</router-link>

              <div v-if="submitted">
                <h2>Submission successful!</h2>
              </div>
            </div>
          </div>

          <!-- Footer -->
          <div
            class="flex justify-center flex-col m-auto mb-16 text-center text-lg dark:text-slate-200"
          >
            <div
              class="flex items-center justify-center space-x-2 mt-4 flex-wrap"
            >
              <div
                class="flex items-center justify-center space-x-2 mt-4 flex-wrap"
              >
                <a
                  href="https://www.linkedin.com/in/carlo-gammarota-23493b24/"
                  class="flex flex-none items-center justify-center rounded-full w-12 h-12 hover:bg-slate-200 transition-all bg-white mt-6 rounded-lg dark:hover:bg-slate-700"
                  ><svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle
                      cx="4.983"
                      cy="5.009"
                      r="2.188"
                      fill="currentColor"
                    ></circle>
                    <path
                      d="M9.237 8.855v12.139h3.769v-6.003c0-1.584.298-3.118 2.262-3.118 1.937 0 1.961 1.811 1.961 3.218v5.904H21v-6.657c0-3.27-.704-5.783-4.526-5.783-1.835 0-3.065 1.007-3.568 1.96h-.051v-1.66H9.237zm-6.142 0H6.87v12.139H3.095z"
                      fill="currentColor"
                    ></path></svg
                ></a>
                <div class="mt-6 justify-between gap-1 md:flex grid">
                  <img
                    class="w-12 lg:w-12 m-2 bg-white p-1 rounded-lg"
                    src="https://cdn.worldvectorlogo.com/logos/vue-js-1.svg"
                    loading="lazy"
                    alt="airbnb"
                  />
                  <img
                    class="w-12 lg:w-12 m-2 bg-white p-1 rounded-lg"
                    src="https://cdn.worldvectorlogo.com/logos/vitejs.svg"
                    loading="lazy"
                    alt="bissell"
                  />
                  <img
                    class="w-12 lg:w-12 m-2 bg-white p-1 rounded-lg"
                    src="https://cdn.worldvectorlogo.com/logos/tailwindcss.svg"
                    loading="lazy"
                    alt="ge"
                  />
                  <img
                    class="w-14 lg:w-14 m-2 bg-white p-1 rounded-lg"
                    src="https://cdn.worldvectorlogo.com/logos/express-109.svg"
                    loading="lazy"
                    alt="microsoft"
                  />
                  <br />
                  <img
                    class="w-12 lg:w-12 m-2 bg-white p-1 rounded-lg"
                    src="https://cdn.worldvectorlogo.com/logos/cloudflare-1.svg"
                    loading="lazy"
                    alt="microsoft"
                  />
                  <img
                    class="w-12 lg:w-12 m-2 bg-white p-1 rounded-lg"
                    src="https://cdn.worldvectorlogo.com/logos/feathersjs.svg"
                    loading="lazy"
                    alt="microsoft"
                  />
                  <img
                    class="w-12 lg:w-12 m-2 bg-white p-1 rounded-lg"
                    src="https://cdn.worldvectorlogo.com/logos/nginx-1.svg"
                    loading="lazy"
                    alt="microsoft"
                  />
                  <img
                    class="w-12 lg:w-12 m-2 bg-white p-1 rounded-lg"
                    src="https://cdn.worldvectorlogo.com/logos/docker.svg"
                    loading="lazy"
                    alt="microsoft"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Example -->
  </div>
</template>

<script>
  import { mapActions } from 'vuex';
  import FeathersClient from '@/FeathersClient';
  export default {
    data() {
      return {
        //
        email: 'test@email.com',
        password: 'my-password',
        rePassword: 'my-password',
        submitted: false,
        formData: {},
      };
    },
    mounted() {
      //
      // login({ email, password })
    },
    methods: {
      //
      ...mapActions(['loadingSet', 'setUser', 'login']),
      async submitHandler() {
        // Simulate an AJAX request (replace with actual AJAX call)

        await new Promise((resolve) => setTimeout(resolve, 1000));

        console.log('Submitted!');

        console.log(this.formData);
        this.register();
        // After the request is complete, set submitted to true
        this.submitted = true;
      },
      register() {
        this.loadingSet(true);
        console.log('register');
        FeathersClient.service('users')
          .create({
            email: this.formData.email,
            password: this.formData.password,
            name: this.formData.name,
            //image default for profile
            image:
              'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/Windows_10_Default_Profile_Picture.svg/1024px-Windows_10_Default_Profile_Picture.svg.png?20221210150350',
          })
          .then((res) => {
            console.log(res);
            this.setUser(res);

            this.login({
              email: this.formData.email,
              password: this.formData.password,
            });

            this.$snotify.success('Succes Login', 'Registration', {
              timeout: 4000,
              // showProgressBar: true,
              closeOnClick: false,
              pauseOnHover: true,
            });
            // this.$router.push({ name: 'admin-dashboard' });
            this.loadingSet(false);
          })
          .catch((error) => {
            this.$snotify.error(error, 'Registration', {
              timeout: 4000,
              // showProgressBar: true,
              closeOnClick: false,
              pauseOnHover: true,
            });
            console.log(error);
            this.loadingSet(false);
          });
      },
    },
  };
</script>

<style>
  #auth .formkit-wrapper {
    max-width: 100% !important;
  }

  #auth .formkit-input {
    width: 100% !important;
  }

  #auth .formkit-input {
    border: 1.5px solid white !important;
  }
  #auth .formkit-label {
    color: white;
  }
  #register {
    color: black;
    background: #1ddd7e !important;
  }
  #auth .background-register {
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='331' height='331' viewBox='0 0 800 800'%3E%3Cg fill='none' stroke='%23404' stroke-width='1'%3E%3Cpath d='M769 229L1037 260.9M927 880L731 737 520 660 309 538 40 599 295 764 126.5 879.5 40 599-197 493 102 382-31 229 126.5 79.5-69-63'/%3E%3Cpath d='M-31 229L237 261 390 382 603 493 308.5 537.5 101.5 381.5M370 905L295 764'/%3E%3Cpath d='M520 660L578 842 731 737 840 599 603 493 520 660 295 764 309 538 390 382 539 269 769 229 577.5 41.5 370 105 295 -36 126.5 79.5 237 261 102 382 40 599 -69 737 127 880'/%3E%3Cpath d='M520-140L578.5 42.5 731-63M603 493L539 269 237 261 370 105M902 382L539 269M390 382L102 382'/%3E%3Cpath d='M-222 42L126.5 79.5 370 105 539 269 577.5 41.5 927 80 769 229 902 382 603 493 731 737M295-36L577.5 41.5M578 842L295 764M40-201L127 80M102 382L-261 269'/%3E%3C/g%3E%3Cg fill='%23505'%3E%3Ccircle cx='769' cy='229' r='13'/%3E%3Ccircle cx='539' cy='269' r='13'/%3E%3Ccircle cx='603' cy='493' r='13'/%3E%3Ccircle cx='731' cy='737' r='13'/%3E%3Ccircle cx='520' cy='660' r='13'/%3E%3Ccircle cx='309' cy='538' r='13'/%3E%3Ccircle cx='295' cy='764' r='13'/%3E%3Ccircle cx='40' cy='599' r='13'/%3E%3Ccircle cx='102' cy='382' r='13'/%3E%3Ccircle cx='127' cy='80' r='13'/%3E%3Ccircle cx='370' cy='105' r='13'/%3E%3Ccircle cx='578' cy='42' r='13'/%3E%3Ccircle cx='237' cy='261' r='13'/%3E%3Ccircle cx='390' cy='382' r='13'/%3E%3C/g%3E%3C/svg%3E");
  }
  #auth .formkit-input {
    color: white;
  }
</style>
