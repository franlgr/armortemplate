<template>
    <div>
        SINGLE PRODUCT ID
        {{$route.params.id}}
        {{product}}
    </div>
</template>
<script>
import FeathersClient from '@/FeathersClient'
export default {
    data() {
        return {
            product: {}
        }
    },
    mounted() {
        FeathersClient.service('products').get(this.$route.params.id).then(product => {
            console.log(product)
            this.product = product
        })
    }
}
</script>