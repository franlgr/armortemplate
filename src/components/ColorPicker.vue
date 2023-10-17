<template>
    <div :style="{ background: color }">
        <div>Color seleccionado: {{ selectedColor }}</div>
        <div>
    <!-- ...otros elementos del selector de color... -->
    <button style="color:white" class="m-2" @click="selectColor">Seleccionar</button>
  </div>
      <ColorPicker style="  width: 219px;"
        theme="dark"
        :color="color"
        :sucker-hide="false"
        :sucker-canvas="suckerCanvas"
        :sucker-area="suckerArea"
        @changeColor="changeColor"
        @openSucker="openSucker"
      />
      <div>
        {{ color }}
      </div>
    </div>
  </template>
  
  <script>
  import { ColorPicker } from 'vue-color-kit';
  import 'vue-color-kit/dist/vue-color-kit.css';
  
  export default {
    props: {
    value: String, // Recibe el color a través de v-model
  },
    components: {
      ColorPicker,
    },
    data() {
      return {
        color: 'rgba(85, 88, 89, 1)',
        suckerCanvas: null,
        suckerArea: [],
        selectedColor:null
        // selectedColor: this.color,
      };
    },
    methods: {
        selectColor() {
      // Cuando se hace clic en "Seleccionar", emitimos el color seleccionado
      this.$emit('color-selected', this.color);
    },
      changeColor(color) {
        this.$emit('input', this.color);
        const { r, g, b, a } = color.rgba;
        this.color = `rgba(${r}, ${g}, ${b}, ${a})`;
      },


}




    }
  
  </script>
  