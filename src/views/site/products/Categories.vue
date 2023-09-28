<template>
    <div>
        categorias
        {{categories}}
    </div>
</template>
<script>
import FeathersClient from '@/FeathersClient';
export default {
    data() {
        return {
            categories: [],
            // title: 'Product Categories',
        }
    },
    mounted() {
        this.fetchCategories();
    },
    methods: {
        fetchCategories() {
            FeathersClient.service('products-categories').find({
                query: {
                    $limit: 100,
                }
            }).then(res => {
                this.categories = res.data;
            })
        },
    }
}
</script>