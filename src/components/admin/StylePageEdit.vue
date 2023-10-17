<template>
    <div>
      <div >
        <!-- {{ colors }} -->
        <button @click="toggleColorMenu" style="color:white">Editar Colores de Página</button>
        <div v-if="showColorMenu" class="color-menu" >
          <div>
            <div>
              <button class="btn" @click="openColorPicker('backgroundColor')" :style="{ color: colors.pageTextColor, background: colors.backgroundColor }">
                Background Page
              </button>
              <button @click="closeColorPicker('backgroundColor')" class="close-button rounded-full m-1" style="color: red" v-if="open.backgroundColor">X</button>
              <ColorPicker v-if="open.backgroundColor" @color-selected="color => updateColor('backgroundColor', color)" />
            </div>
            <div>
              <button class="btn" @click="openColorPicker('coverSiteColor')" :style="{ background: colors.coverSiteColor, color: colors.pageTextColor }">
                Color cover IMG
              </button>
              <button @click="closeColorPicker('coverSiteColor')" class="close-button rounded-full m-1" style="color: red" v-if="open.coverSiteColor">X</button>
              <ColorPicker v-if="open.coverSiteColor" @color-selected="color => updateColor('coverSiteColor', color)" />
            </div>
            <div>
              <button class="btn" @click="openColorPicker('pageTextColor')" :style="{ background: colors.backgroundColor, color: colors.pageTextColor }">
                Color font page
              </button>
              <button @click="closeColorPicker('pageTextColor')" class="close-button rounded-full m-1" style="color: red" v-if="open.pageTextColor">X</button>
              <ColorPicker v-if="open.pageTextColor" @color-selected="color => updateColor('pageTextColor', color)" />
            </div>
            <div>
              <button class="btn" @click="openColorPicker('menuColor')" :style="{ color: colors.menuTextColor, background: colors.menuColor }">
                Background menu
              </button>
              <button @click="closeColorPicker('menuColor')" class="close-button rounded-full m-1" style="color: red" v-if="open.menuColor">X</button>
              <ColorPicker v-if="open.menuColor" @color-selected="color => updateColor('menuColor', color)" />
            </div>
            <div>
              <button class="btn" @click="openColorPicker('menuTextColor')" :style="{ color: colors.menuTextColor, background: colors.menuColor }">
                Color font menu
              </button>
              <button @click="closeColorPicker('menuTextColor')" class="close-button rounded-full m-1" style="color: red" v-if="open.menuTextColor">X</button>
              <ColorPicker v-if="open.menuTextColor" @color-selected="color => updateColor('menuTextColor', color)" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import ColorPicker from '../ColorPicker.vue';
  import FeathersClient from '@/FeathersClient';
  
  export default {
    components: {
      ColorPicker,
    },
    props: {
    colors: Object, // Asegúrate de que el tipo de dato coincida con el objeto colors
  },
    data() {
      return {
       colors: {
        coverSiteColor:'',
        backgroundColor: '',
        menuColor: '',
        menuTextColor: '',
        pageTextColor: '',
       },
        open: {
          backgroundColor: false,
          coverSiteColor: false,
          menuColor: false,
          menuTextColor: false,
          pageTextColor: false,
        },
        showColorMenu: false,
        settingsId: '',
        settings:{}
      };
    },
    methods:{

      openColorPicker(colorKey) {
        this.open[colorKey] = true;
      },
      updateColor(colorKey, selectedColor) {
        this[colorKey] = selectedColor;
        this.open[colorKey] = false;
        this.$emit('color-selected', { [colorKey]: selectedColor });
      },
      closeColorPicker(colorKey) {
        this.open[colorKey] = false;
      },
      toggleColorMenu() {
        this.showColorMenu = !this.showColorMenu;
      },
    },
  };
  </script>
  