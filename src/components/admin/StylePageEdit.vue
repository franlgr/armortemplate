<template>
    <div>{{ settings }}
      <div >
        <button @click="toggleColorMenu" style="color:white">Editar Colores de Página</button>
        <div v-if="showColorMenu" class="color-menu" >
          <div>
            <div>
              <button class="btn" @click="openColorPicker('backgroundColor')" :style="{ color: pageTextColor, background: backgroundColor }">
                Background Page
              </button>
              <button @click="closeColorPicker('backgroundColor')" class="close-button rounded-full m-1" style="color: red" v-if="open.backgroundColor">X</button>
              <ColorPicker v-if="open.backgroundColor" @color-selected="color => updateColor('backgroundColor', color)" />
            </div>
            <div>
              <button class="btn" @click="openColorPicker('pageTextColor')" :style="{ background: backgroundColor, color: pageTextColor }">
                Color font page
              </button>
              <button @click="closeColorPicker('pageTextColor')" class="close-button rounded-full m-1" style="color: red" v-if="open.pageTextColor">X</button>
              <ColorPicker v-if="open.pageTextColor" @color-selected="color => updateColor('pageTextColor', color)" />
            </div>
            <div>
              <button class="btn" @click="openColorPicker('menuColor')" :style="{ color: menuTextColor, background: menuColor }">
                Background menu
              </button>
              <button @click="closeColorPicker('menuColor')" class="close-button rounded-full m-1" style="color: red" v-if="open.menuColor">X</button>
              <ColorPicker v-if="open.menuColor" @color-selected="color => updateColor('menuColor', color)" />
            </div>
            <div>
              <button class="btn" @click="openColorPicker('menuTextColor')" :style="{ color: menuTextColor, background: menuColor }">
                Color font menu
              </button>
              <button @click="closeColorPicker('menuTextColor')" class="close-button rounded-full m-1" style="color: red" v-if="open.menuTextColor">X</button>
              <ColorPicker v-if="open.menuTextColor" @color-selected="color => updateColor('menuTextColor', color)" />
            </div>
          </div>
          <div :style="{ background: backgroundColor, color: pageTextColor }">
            <div>Background page: {{ backgroundColor }}</div>
          </div>
          <div :style="{ background: menuColor, color: menuTextColor }">
            <div>Background menu: {{ menuColor }}</div>
          </div>
          <div :style="{ color: menuTextColor, background: menuColor }">
            <div>Color font menu: {{ menuTextColor }}</div>
          </div>
          <div :style="{ color: pageTextColor, background: backgroundColor }">
            <div>Color font page: {{ pageTextColor }}</div>
          </div>
          <button @click="updateSettings()">Save changes</button>
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
    data() {
      return {
        backgroundColor: '',
        menuColor: '',
        menuTextColor: '',
        pageTextColor: '',
        open: {
          backgroundColor: false,
          menuColor: false,
          menuTextColor: false,
          pageTextColor: false,
        },
        showColorMenu: false,
        settingsId: '',
        settings:{}
      };
    },
    async mounted() {
      this.getSettings();
    },
    methods: {
      async getSettings() {
        try {
          const response = await FeathersClient.service('settings').find();
          const res = response.data;
          this.settings= response.data
          this.settingsId = res[0]._id;
          const colors = res[0].colors;
          this.backgroundColor = colors.backgroundColor;
          this.menuColor = colors.menuColor;
          this.menuTextColor = colors.menuTextColor;
          this.pageTextColor = colors.pageTextColor;
        } catch (error) {
          console.error(error);
        }
      },
      async updateSettings() {
        try {
          const res = await FeathersClient.service('settings').patch(
            this.settingsId,
            {
              hostPort: null,
              subdomain: "",
              logo: "",
              title: "",
              description: "",
              theme: "",
              plugins: [],
              user: {},
              link: "",
              colors: {
                backgroundColor: this.backgroundColor,
                menuColor: this.menuColor,
                menuTextColor: this.menuTextColor,
                pageTextColor: this.pageTextColor,
              }
            }
          );
  
          this.getSettings();
          this.$snotify.success('Settings Updated', 'Success', {
            timeout: 2000,
            showProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
          });
  
          console.log('res', res);
        } catch (error) {
          console.error(error);
          this.$snotify.error(error, 'Error', {
            timeout: 2000,
            showProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
          });
        }
      },
      openColorPicker(colorKey) {
        this.open[colorKey] = true;
      },
      updateColor(colorKey, selectedColor) {
        this[colorKey] = selectedColor;
        this.open[colorKey] = false;
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
  