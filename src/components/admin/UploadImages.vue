<template>
    <div class="uw">
    
        <div v-if="url == ''">
            <img :src="url" alt="">
        </div>
        <!-- aca hay que mostrar los archivos subidos aca dejo un modelo -->
                    <FormKit
  type="file"
  label="Your files"
  help="This input starts with files already “attached”."
  multiple="true"
  :value="[{ name: 'purple-taste.pdf' }, { name: 'chocolate-recipe.docx' }]"
/>
        <button class="btn btn-xs uploadButton" v-on:click="open" id="upload_widget" >{{ title }}</button>
        
    </div>
  </template>
  
  <script>
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
  
  