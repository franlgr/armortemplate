<template>
    <div>
        <AdminHeader title="Edit Blog"></AdminHeader>
        <div class="p-4">
            {{ blogs }}
        </div>
        <div class=" m-4 2xl:container">
                <div class="">
                    Text Editor
                    <br>
                    <!-- <Ckeditor></Ckeditor>
                    <br> Tabla Default
                    <TableDefault></TableDefault> -->
                    <br>
                    Card Modelo Example
                    <div class="card w-96 bg-base-100 shadow-xl my-8">
                        <figure><img :src="blogs.image " alt="Shoes" /></figure>
                        <div class="card-body">
                            <h2 class="card-title">
                                {{blogs.title}}
                                <div class="badge badge-secondary">NEW</div>
                            </h2>
                            <p>{{ blogs.content }}</p>
                            <div class="card-actions justify-end">
                                <div class="badge badge-outline">Fashion</div>
                                <div class="badge badge-outline">Products</div>
                            </div>
                        </div>
                    </div>
                    <br>
    
                    <!-- Se pueden buscar componentes en https://daisyui.com/components/ -->
    
                </div>
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