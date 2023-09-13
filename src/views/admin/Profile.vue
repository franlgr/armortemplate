<!-- Modelo para crear una vista nueva dentro de admin -->
<template>
    <div>
        <div>
            <AdminHeader title="Profile"></AdminHeader>
            <!-- {{getUser}} -->
            
            <div class="m-4 2xl:container ">
                <div class=" ">
                    <div>
                       <div class="mb-4">
                        <img :src="formData.image" alt=""
                            class="w-10 h-10 m-auto rounded-full object-cover lg:w-28 lg:h-28">
                       </div>
                        <UploadImg class="" title="Upload Image" v-on:links="links"></UploadImg>
                        <FormKit type="form" id="registration-example" :form-class="submitted ? 'hide' : 'show'" submit-label="Register" @submit="submitHandler" :actions="false" #default="{ value }" v-model="formData">
                            <h1>Profile</h1>
                            <p>
                                You can put any type of element inside a form, not just FormKit inputs (although only FormKit inputs are included with the submission).
                            </p>
    
                            <hr />
    
                            <FormKit type="text" name="name" label="Your name" placeholder="Jane" help="What is your name?" validation="required" />
                            <FormKit type="text" name="lastname" label="Your Last Name" placeholder="Doe" help="What is your first name?" validation="required" />
                            <FormKit type="text" name="email" label="Your email" placeholder="jane@example.com" help="What email should we use?" validation="required|email" />
                            <FormKit type="number" name="telephone" label="Your Telephone" placeholder="+54 3548 639432" help="What is your Telephone?" validation="required|number" />
                            <FormKit type="text" name="address" label="Your Address" placeholder="Av. Libertador 1421" help="What is address?" validation="required" />
                            <FormKit type="text" name="city" label="Your City" placeholder="Las Vegas, EEUU" help="What is your City?" validation="required" />
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
    
                            <FormKit type="submit" label="Guardar" />
                            <!-- <pre wrap>{{ value }}</pre> -->
                        </FormKit>
                    </div>
                    <!-- <div v-if="submitted">
                        <h2>Submission successful!</h2>
                    </div> -->
                    <br>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import BreadCrumbs from '@/components/admin/Breadcrumbs.vue';
import AdminHeader from '@/components/admin/AdminHeader.vue';
import FeathersClient from '@/FeathersClient';
import UploadImg from '@/components/admin/UploadImg.vue';

export default {
    data: () => ({
        submitted: false,
        formData: {},
    }),
    mounted() {
        this.formData = this.getUser
    },
    components: {
        BreadCrumbs,
        AdminHeader,
        UploadImg

    },
    methods: {
        ...mapActions(['setUser', 'loadingSet']),
        async submitHandler() {
            // Simulate an AJAX request (replace with actual AJAX call)
            await new Promise((resolve) => setTimeout(resolve, 1000));
            this.loadingSet(true);
            // Send the form data to the server
            FeathersClient.service('users').patch(this.getUser._id, this.formData).then(res => {
                console.log(res)
                
                this.$snotify.success('Product Save', 'Save', {
                        timeout: 2000,
                        showProgressBar: false,
                        closeOnClick: false,
                        pauseOnHover: true
                    });
                this.loadingSet(false);
                this.setUser(res)
                this.$router.push({ name: 'admin-dashboard' })
            }).catch(error => {
                console.log(error)
                this.loadingSet(false);
                 this.$snotify.error(error, 'Error', {
                        timeout: 2000,
                        showProgressBar: false,
                        closeOnClick: false,
                        pauseOnHover: true
                    });
            })

            this.submitted = true;
        },
        links(url) {
            console.log(url)
            this.formData.image = url;
        },
    },
    computed: {
        ...mapGetters(['getUser']),
    },
}
</script>

<style>
@import "@formkit/themes/genesis";
</style>