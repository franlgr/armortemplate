<template>
    <div>
        <AdminHeader title="Edit Product"></AdminHeader>
        <div class="p-4">
            {{ product }}
        </div>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import FeathersClient from '@/FeathersClient';
import AdminHeader from '@/components/admin/AdminHeader.vue';

export default {
    layout: "AdminLayout",
    data() {
        return {
            product: {},
        };
    },
    components: {
        AdminHeader,
    },

    mounted() {
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