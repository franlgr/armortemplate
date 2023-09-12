<template>
    <div>
        <AdminHeader title="Edit Blog"></AdminHeader>
        <div class="p-4">
            {{ blogs }}
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
            blogs: {},
        };
    },
    components: {
        AdminHeader,
    },

    mounted() {
        const id = this.$route.params.id;
        if (id) {
            this.fetchBlog(id);
        }
    },
    methods: {
        ...mapActions(['loadingSet']),
        async fetchBlog(id) {
            this.loadingSet(true);
            try {
                const res = await FeathersClient.service('blogs').get(id);
                this.blogs = res;
                console.log('fetchBlog', res);
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