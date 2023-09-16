

<template>
    <div>
        <FormKit type="select" label="What is your product category ?" @change="onSelectedCategory" name="category" placeholder="Select a country" :options="options" help="Don’t worry, you can’t get this one wrong." v-model="value"  />
    </div>
</template>

<script>
import FeathersClient from '@/FeathersClient';
export default {
    data() {
        return {
            options: [],
            state: false,
            dataLoaded: false,
            value: {
            },

        }
    },
    props: {
        // value: {
        //     type: Object,
        //     default: () => {
        //         return {
        //             label: '',
        //             value: '',
        //             attrs: { disabled: false },
        //         };
        //     },
        // },
    },
    mounted() {


        this.fetchCategories()


    },
    methods: {
        onSelectedCategory() {
            this.$emit('category', this.value);
        },
        async fetchCategories() {
            try {
                const res = await FeathersClient.service('products-categories').find({
                    query: {
                        $limit: 100,
                        $skip: 0,
                    },
                });
                
                this.options = res.data.map(item => {
                    console.log('item', item.title);
                    return {
                        label: item.title,
                        value: item,
                        attrs: { disabled: false },
                    };
                });
                 this.dataLoaded = true;
            } catch (error) {
                console.error('Error al obtener las categorías:', error);
            }
        },
    },
    //onchange
    watch: {
        value: function (val) {
            // this.$emit('category', this.value);
            // this.sendCategory();
        }
    },
}
</script>