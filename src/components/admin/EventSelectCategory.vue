<template>
  <div>
    <FormKit type="select" :label="label" @change="onSelectedCategory" :options="options"
      help="Don’t worry, you can’t get this one wrong." v-model="value" />
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
      value: {},
    };
  },
  props: {
    category: {
      type: Object,
    },
    label: {
      type: String,
      default: 'Category',
    },
  },
  created() {
    this.dataLoaded = false;
    this.fetchCategories();
  },
  methods: {
    onSelectedCategory() {
      this.$emit('category', this.value);
    },
    async fetchCategories() {
      try {
        const res = await FeathersClient.service('events-categories').find({
          query: {
            $limit: 100,
            $skip: 0,
          },
        });
        //options es una variable que necesita un array de objetos con las propiedades label y value es para el plugin formKit

        this.options = res.data.map((item) => {
          return {
            label: item.title,
            value: item,
            attrs: { disabled: false },
          };
        });
        if (this.category) {
          this.value = this.category;
        }
        this.dataLoaded = true;
      } catch (error) {
        this.$router.push('/login');
        console.error('Error al obtener las categorías:', error);
      }
    },
  },
};
</script>
