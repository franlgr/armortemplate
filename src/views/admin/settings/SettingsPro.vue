<template>
    <div>{{ settings}} {{ settingsId }}
        <div  :style="{ color: colors.pageTextColor, background: colors.backgroundColor }">
      <button  @click="toggleColorMenu">Editar Colores de Página</button>
      <div v-if="showColorMenu" class="color-menu">
        <div>
          <div>
            <button class="btn" @click="openColorPicker('backgroundColor')" :style="{ color: colors.pageTextColor, background: colors.backgroundColor }">
              Background Page
            </button>
            <button   @click="closeColorPicker('backgroundColor')" class="close-button rounded-full m-1" style="color: red" v-if="open.backgroundColor">X</button>
            <ColorPicker v-if="open.backgroundColor" @color-selected="color => updateColor('backgroundColor', color)" />
          </div>
          <div>
            <button class="btn"  @click="openColorPicker('pageTextColor')" :style="{ background: colors.backgroundColor, color: colors.pageTextColor }">
              Color font page
            </button>
            <button   @click="closeColorPicker('pageTextColor')" class="close-button rounded-full m-1" style="color: red" v-if="open.pageTextColor">X</button>
            <ColorPicker v-if="open.pageTextColor" @color-selected="color => updateColor('pageTextColor', color)" />
          </div>
          <div>
            <button class="btn"  @click="openColorPicker('menuColor')" :style="{ color: colors.menuTextColor, background: colors.menuColor }">
              Background menu
            </button>
            <button  @click="closeColorPicker('menuColor')" class="close-button rounded-full m-1" style="color: red" v-if="open.menuColor">X</button>
            <ColorPicker v-if="open.menuColor" @color-selected="color => updateColor('menuColor', color)" />
          </div>
          <div>
            <button class="btn"  @click="openColorPicker('menuTextColor')" :style="{ color: colors.menuTextColor, background: colors.menuColor }">
              Color font menu
            </button>
            <button  @click="closeColorPicker('menuTextColor')" class="close-button rounded-full m-1" style="color: red" v-if="open.menuTextColor">X</button>
            <ColorPicker v-if="open.menuTextColor" @color-selected="color => updateColor('menuTextColor', color)" />
          </div>
        </div>
        <div :style="{ background: colors.backgroundColor, color: colors.pageTextColor }">
        <div>Background page: {{ colors.backgroundColor }}</div>
      </div>
      <div :style="{ background: colors.menuColor, color: colors.menuTextColor }">
        <div>Background menu: {{ colors.menuColor }}</div>
      </div>
      <div :style="{ color: colors.menuTextColor, background: colors.menuColor }">
        <div>Color font menu: {{ colors.menuTextColor }}</div>
      </div>
      <div :style="{ color: colors.pageTextColor, background: colors.backgroundColor }">
        <div>Color font page: {{ colors.pageTextColor }}</div>
      </div>
      <button @click="updateSettings()">Save changes</button>
      </div>
     
    </div>
    </div>
    
  </template>
  
  <script>
  import ColorPicker from '../../../components/ColorPicker.vue';
  import FeathersClient from '@/FeathersClient';
  export default {
    components: {
      ColorPicker,
    },
    data() {
      return {
        colors: {
          backgroundColor: '',
          menuColor: '',
          menuTextColor: '',
          pageTextColor: '',
        },
        open: {
          backgroundColor: false,
          menuColor: false,
          menuTextColor: false,
          pageTextColor: false,
        },
        showColorMenu: false,
        settingsId: '',
        settings: {}
      };
    },
    async mounted() {
 this.getSett()
},

    methods: {
        async getSett() {
            try {
    // Realiza una solicitud GET para obtener el objeto de configuración de settings
    const response = await FeathersClient.service('settings').find();
    const res = response.data
    // Almacena el _id del registro en una variable (reemplaza 'idField' por el campo real que contiene el _id)
    this.settingsId = res[0]._id;
    this.settings = res
  } catch (error) {
    console.error(error);
  }
        },
        async updateSettings() {
  try {
    // Realiza una solicitud PATCH al servicio de 'settings' con el _id del registro
    const res = await FeathersClient.service('settings').patch(
      this.settingsId, // Utiliza el _id del registro de settings obtenido previamente
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
          backgroundColor: this.colors.backgroundColor,
          menuColor: this.colors.menuColor,
          menuTextColor: this.colors.menuTextColor,
          pageTextColor: this.colors.pageTextColor
        }
      }
    );
    
    // Aquí puedes agregar el resto de la lógica de actualización de tu configuración si es necesario
    this.getSett()
    this.$snotify.success('Settings Updated', 'Success', {
      timeout: 2000,
      showProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
    });

    // this.$router.push({ name: 'admin-settings' }); // Asegúrate de redirigir a la página correcta
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
        this.colors[colorKey] = selectedColor;
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
  