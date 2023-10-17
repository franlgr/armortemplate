<template>
  <div>
    <div>
      <!-- {{ colors }} -->
      <button @click="toggleColorMenu" class="my-4 bg-black text-white">
        Editar Colores de Página
      </button>
      <div v-if="showColorMenu" class="color-menu">
        <div>
          <div class="py-2">
            <button
              class="btn"
              @click="openColorPicker('backgroundColor')"
              :style="{
                color: colors.pageTextColor,
                background: colors.backgroundColor,
              }"
            >
              Background Page
            </button>
            <button
              @click="closeColorPicker('backgroundColor')"
              class="close-button rounded-full m-1"
              style="color: red"
              v-if="open.backgroundColor"
            >
              X
            </button>
            <ColorPicker
          
              :color="data.siteViews.backNav"
              v-if="open.backgroundColor"
              @color-selected="(color) => updateColor('backgroundColor', color)"
            />
          </div>
          <div class="py-2">
            <button
              class="btn my-2"
              @click="openColorPicker('coverSiteColor')"
              :style="{
                background: colors.coverSiteColor,
                color: colors.pageTextColor,
              }"
            >
              Color cover IMG
            </button>
            <button
              @click="closeColorPicker('coverSiteColor')"
              class="close-button rounded-full m-1"
              style="color: red"
              v-if="open.coverSiteColor"
            >
              X
            </button>
            <ColorPicker
              v-if="open.coverSiteColor"
              @color-selected="(color) => updateColor('coverSiteColor', color)"
            />
          </div>
          <div class="py-2">
            <button
              class="btn my-2"
              @click="openColorPicker('pageTextColor')"
              :style="{
                background: colors.backgroundColor,
                color: colors.pageTextColor,
              }"
            >
              Color font page
            </button>
            <button
              @click="closeColorPicker('pageTextColor')"
              class="close-button rounded-full m-1"
              style="color: red"
              v-if="open.pageTextColor"
            >
              X
            </button>
            <ColorPicker
              v-if="open.pageTextColor"
              @color-selected="(color) => updateColor('pageTextColor', color)"
            />
          </div>
          <div class="py-2">
            <button
              class="btn my-2"
              @click="openColorPicker('menuColor')"
              :style="{
                color: colors.menuTextColor,
                background: colors.menuColor,
              }"
            >
              Background menu
            </button>
            <button
              @click="closeColorPicker('menuColor')"
              class="close-button rounded-full m-1"
              style="color: red"
              v-if="open.menuColor"
            >
              X
            </button>
            <ColorPicker
              v-if="open.menuColor"
              @color-selected="(color) => updateColor('menuColor', color)"
            />
          </div>
          <div class="py-2">
            <button
              class="btn my-2"
              @click="openColorPicker('menuTextColor')"
              :style="{
                color: colors.menuTextColor,
                background: colors.menuColor,
              }"
            >
              Color font menu
            </button>
            <button
              @click="closeColorPicker('menuTextColor')"
              class="close-button rounded-full m-1"
              style="color: red"
              v-if="open.menuTextColor"
            >
              X
            </button>
            <ColorPicker
              v-if="open.menuTextColor"
              @color-selected="(color) => updateColor('menuTextColor', color)"
            />
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
        data: {
          title: '',
          description: '',
          logo: '',
          theme: '',
          products: false,
          events: false,
          blog: false,
          users: false,
          admin: false,
          pricing: false,
          support: false,
          documentation: false,
          plugins: [],
          meta: {
            title: '',
            description: '',
            img: '',
          },
          siteViews: {
            coverImg: '',
            colorCoverImg: '',
            backNav: '',
            colorFont: '',
            fontStyle: '',
            headerFontSize: 25,
            lang: 'EN',
          },
          adminViews: {
            backMenu: '',
            colorFont: '',
            fontStyle: '',
          },
        },
        colors: {
          coverSiteColor: '',
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
        settings: {},
      };
    },
    async mounted() {
      // console.log('mounted');

      try {
        // this.loadingSet(true);
        const response = await FeathersClient.service('settings').find();
        this.data = response.data[0];
        // this.loadingSet(false);
      } catch (error) {
        console.log('error', error);
        // this.loadingSet(false);
      }
    },
    methods: {
      openColorPicker(colorKey) {
  // Asigna el color correspondiente a la variable data.siteViews.backNav
  this.data.siteViews.backNav = this.colors[colorKey];
  
  // Abre el ColorPicker
  this.open[colorKey] = true;
  
  // Emite el color actual al componente ColorPicker
  this.$emit('color-selected', { [colorKey]: this.data.siteViews.backNav });
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
