<template>
    <span>{{ total }}</span>
</template>
<script>
import FeathersClient from '@/FeathersClient'
export default {
    props: ['category_id'],
    data() {
        return {
            total: 0
        }
    },
    async created() {
        console.log('category_id', this.category_id)
        FeathersClient.service('products').find({
            query: {
                $limit: 100,
                $sort: {
                    createdAt: -1
                },
                'category._id': this.category_id
            }
        }).then((response) => {
            this.total = response.total
        }).catch((error) => {
            console.log(error);
        });
    }

}
</script>