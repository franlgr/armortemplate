<template>
    <div>
        <AdminHeader title="Edit Product"></AdminHeader>
        <div class="p-8">
            <FormKit type="text" name="name" label="Product Title" placeholder="Jane" help="Sell title product" validation="required" />
            <label for="ckeditor" class="font-bold">Content</label>
            <Ckeditor name="ckeditor"></Ckeditor>
            <FormKit class="mt-4" type="text" name="lastname" label="Your Last Name" placeholder="Doe" help="What is your first name?" validation="required" />
            <!-- <FormKit type="text" name="email" label="Your email" placeholder="jane@example.com" help="What email should we use?" validation="required|email" />
                    <FormKit type="number" name="telephone" label="Your Telephone" placeholder="+54 3548 639432" help="What is your Telephone?" validation="required|email" /> -->
            <div class="p-4">
                {{ product }}
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import FeathersClient from '@/FeathersClient';
import AdminHeader from '@/components/admin/AdminHeader.vue';
import Ckeditor from '@/components/Ckeditor.vue';


export default {
    layout: "AdminLayout",
    data() {
        return {
            product: {},
        };
    },
    components: {
        AdminHeader,
        Ckeditor,
    },


    Ckeditored() {
        const id = this.$route.params.id;
        if (id) {
            this.fetchProduct(id);
        }
    },
    methods: {
        ...mapActions(['loadingSet']),
        async fetchProduct(id) {
            this.loadingSet(true);
            try {
                const res = await FeathersClient.service('products').get(id);
                this.product = res;
                console.log('fetchProducts', res);
                this.loadingSet(false);
            } catch (error) {
                console.error(error);
                this.loadingSet(false);
                this.$snotify.error(error, 'Error', {
                    timeout: 2000,
                    showProgressBar: false,
                    closeOnClick: false,
                    pauseOnHover: true
                });
            }
        },

    },
}
</script>