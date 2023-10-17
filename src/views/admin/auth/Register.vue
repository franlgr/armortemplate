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
              >Authenticate</router-link
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

              <div v-if="submitted">
                <h2>Submission successful!</h2>
              </div>

              <div class="flex justify-center items-center">
                <span class="w-full border border-black"></span>
                <span class="px-4">Social</span>
                <span class="w-full border border-black"></span>
              </div>
              <!-- <button class="flex items-center justify-center flex-none px-3 py-2 md:px-4 md:py-3 border-2 rounded-lg font-medium border-black relative">
                                    <span class="absolute left-4">
                                        <svg width="24px" height="24px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"
                                            xmlns:xlink="http://www.w3.org/1999/xlink">
                                            <path fill="#EA4335 "
                                                d="M5.26620003,9.76452941 C6.19878754,6.93863203 8.85444915,4.90909091 12,4.90909091 C13.6909091,4.90909091 15.2181818,5.50909091 16.4181818,6.49090909 L19.9090909,3 C17.7818182,1.14545455 15.0545455,0 12,0 C7.27006974,0 3.1977497,2.69829785 1.23999023,6.65002441 L5.26620003,9.76452941 Z" />
                                            <path fill="#34A853"
                                                d="M16.0407269,18.0125889 C14.9509167,18.7163016 13.5660892,19.0909091 12,19.0909091 C8.86648613,19.0909091 6.21911939,17.076871 5.27698177,14.2678769 L1.23746264,17.3349879 C3.19279051,21.2936293 7.26500293,24 12,24 C14.9328362,24 17.7353462,22.9573905 19.834192,20.9995801 L16.0407269,18.0125889 Z" />
                                            <path fill="#4A90E2"
                                                d="M19.834192,20.9995801 C22.0291676,18.9520994 23.4545455,15.903663 23.4545455,12 C23.4545455,11.2909091 23.3454545,10.5272727 23.1818182,9.81818182 L12,9.81818182 L12,14.4545455 L18.4363636,14.4545455 C18.1187732,16.013626 17.2662994,17.2212117 16.0407269,18.0125889 L19.834192,20.9995801 Z" />
                                            <path fill="#FBBC05"
                                                d="M5.27698177,14.2678769 C5.03832634,13.556323 4.90909091,12.7937589 4.90909091,12 C4.90909091,11.2182781 5.03443647,10.4668121 5.26620003,9.76452941 L1.23999023,6.65002441 C0.43658717,8.26043162 0,10.0753848 0,12 C0,13.9195484 0.444780743,15.7301709 1.23746264,17.3349879 L5.27698177,14.2678769 Z" />
                                        </svg>
                                    </span>
                                    <span class="text-white">Sign in with Google</span>
                                </button> -->
            </div>
          </div>

          <!-- Footer -->
          <div
            class="flex justify-center flex-col m-auto mb-16 text-center text-lg dark:text-slate-200"
          >
            <div
              class="flex items-center justify-center space-x-2 mt-4 flex-wrap"
            ></div>
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
