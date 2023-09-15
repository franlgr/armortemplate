<template>
    <div class="uw">
      <div v-for="(image, index) in images" :key="index">
        <img :src="image" alt="" class="thumbnail">
        <button @click="removeImage(index)" class="remove-button">Eliminar</button>
      </div>
      <button @click="openUploadWidget" class="cloudinary-button">
        <i class="fa-solid fa-upload text-white pr-2"></i> Subir Imágenes
      </button>
    </div>
  </template>
  
  <script>
  export default {
    name: "UploadImg",
    data() {
      return {
        images: [],
        cloudName: "doznjtpmk",
        uploadPreset: "eimrafgu",
      };
    },
    methods: {
      openUploadWidget() {
        cloudinary.openUploadWidget(
          {
            cloudName: this.cloudName,
            uploadPreset: this.uploadPreset,
            multiple: true, // Habilitar carga múltiple
            folder: "user_images",
          },
          (error, result) => {
            if (!error && result && result.event === "success") {
              console.log("Imagen cargada con éxito: ", result);
              this.images.push(result.info.secure_url); // Agregar la URL directamente
              this.$emit("images", this.images); // Emitir las imágenes al componente padre
            }
          }
        );
      },
      removeImage(index) {
        this.images.splice(index, 1);
        this.$emit("images", this.images); // Emitir las imágenes actualizadas al componente padre
      },
    },
  };
  </script>
  
  <style scoped>
  .thumbnail {
    max-width: 100px;
    max-height: 100px;
    margin: 5px;
  }
  
  .remove-button {
    background-color: red;
    color: white;
    border: none;
    cursor: pointer;
  }
  </style>