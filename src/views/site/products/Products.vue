<template>
    <div>
        PRODUCTS FRONT
        <!-- {{products}} -->
        
         <ul class="mt-24">
                    <li v-for="product in products" :key="product.index">{{ product.title }}</li>
                </ul>
    </div>
</template>
<script>
import FeathersClient from '@/FeathersClient'
export default {
    data() {
        return {
            products: []
        }
    },
    mounted() {
        FeathersClient.service('products').find({
            query: {
                // $limit: 10
            }
        }).then(products => {
            console.log(products)
            this.products = products.data
        })
    }
}
</script>