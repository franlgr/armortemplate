<template>
    <div class="uw">
<<<<<<< HEAD
      <div v-for="(image, index) in images" :key="index">
        <img :src="image" alt="" class="thumbnail">
        <button @click="removeImage(index)" class="remove-button">Eliminar</button>
      </div>
      <button @click="openUploadWidget" class="cloudinary-button">
        <i class="fa-solid fa-upload text-white pr-2"></i> Subir Imágenes
      </button>
=======
        <div v-if="url == ''">
            <img :src="url" alt="">
        </div>
        <button class="btn btn-xs uploadButton" v-on:click="open" id="upload_widget" >{{ title }}</button>
        
>>>>>>> a77b55b (update)
    </div>
  </template>
  
  <script>
<<<<<<< HEAD
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
=======
//   const cloudName = "doznjtpmk"; // replace with your own cloud name
//   const uploadPreset = "eimrafgu"; // replace with your own upload preset
  
  // Remove the comments from the code below to add
  // additional functionality.
  // Note that these are only a few examples, to see
  // the full list of possible parameters that you
  // can add see:
  //   https://cloudinary.com/documentation/upload_widget_reference
  
// import cloudinary from 'cloudinary-vue';
  
  export default {
    name: "UploadWidget",
    data: () => ({
      open: function () {
        this.myWidget.open();
      },
      myWidget: null,
      cloudName : "doznjtpmk",
      uploadPreset : "eimrafgu",
      url: ''
    }),
    props: {
      title: {
        type: String,
        default: 'Upload Image',
      },
      msg: {
        type: String,
        default: 'Upload Image',
      }

    },
    mounted() {
        // alert('test')
        this.myWidget = cloudinary.createUploadWidget(
        {
        cloudName: this.cloudName,
        uploadPreset: this.uploadPreset,
        // cropping: true, //add a cropping step
        // showAdvancedOptions: true,  //add advanced options (public_id and tag)
        // sources: [ "local", "url"], // restrict the upload sources to URL and local files
        multiple: true,  //restrict upload to a single file
        folder: "user_images", //upload files to the specified folder
        // tags: ["users", "profile"], //add the given tags to the uploaded files
        // context: {alt: "user_uploaded"}, //add the given context data to the uploaded files
        // clientAllowedFormats: ["images"], //restrict uploading to image files only
        // maxImageFileSize: 2000000,  //restrict file size to less than 2MB
        // maxImageWidth: 2000, //Scales the image down to a width of 2000 pixels before uploading
        // theme: "purple", //change to a purple theme
        },
        (error, result) => {
            if (!error && result && result.event === "success") {
                console.log("Done! Here is the image info: ", result);
                this.url = result.info.secure_url
                this.$emit('links', result.info.secure_url)
            }
        }
  );
  
    },
    methods: {
    },
  };
  </script>
  <style>
  .uploadButton {
    padding-bottom: 20px;
    margin:auto;
    display: block;

  }
  </style>
  
  
>>>>>>> a77b55b (update)
