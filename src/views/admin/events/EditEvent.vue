<template>
  <div>
    <div>
      <AdminHeader
        title="Edit Event"
        icon="fa-solid fa-calendar-days"
      ></AdminHeader>
      {{ formData.tags }}
      <div class="mt-6">
        <router-link
          to="/admin/events"
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold px-4 py-3 ml-4 rounded"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6 inline-block -ml-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            ></path>
          </svg>
          Go back
        </router-link>
      </div>
      <div class="2xl:container md:w-2/3 m-auto px-8">
        <div class="mt-8 m-auto">
          <!-- {{formData.images}} -->
          <div class="carousel-item" v-for="image in images" :key="image.index">
            <div class="m-auto">
              <img class="w-64" style="margin: auto" :src="image" alt="Drink" />
              <button
                class="bg-white m-auto mt-2 text-sm"
                @click="deleteImage(image.index)"
              >
                X
              </button>
            </div>
          </div>
          <!-- componente para subir muchas imagenes  -->
          <UploadImages
            title="Upload Event Images/Flayers"
            class="my-4"
            v-on:links="links"
          ></UploadImages>

          <!-- Este es el framework formkit fijate que hay otros adentro de uno pero este es el 
                                    importante porque es el que tiene la funcion a disparar cuando se le da al boton. -->
          <FormKit
            type="form"
            id="guardar-example"
            :form-class="submitted ? 'hide' : 'show'"
            submit-label="Register"
            @submit="editEvent()"
            :actions="false"
            v-model="formData"
          >
            <FormKit
              class="mt-4"
              type="text"
              name="title"
              label="Title Event"
              placeholder="Leather jacket like new"
              help="What is your title event ?"
              validation="required"
            />
            <p for="description" class="description">Description</p>
            <ckeditor
              id="ckeditor"
              class="my-4"
              v-model="formData.content"
              :placeholder="editorData"
              label="description"
              :editor="editor"
              :config="editorConfig"
            ></ckeditor>
            <br />
            <FormKit
              type="date"
              name="date"
              value="2023-10-01"
              label="Start Event"
              help="Enter your birth day"
              validation="required|date_after:2023-01-01"
              validation-visibility="live"
            />
            <br />
            <p for="map" class="description">
              Search Location for event {{ formData.location }}
            </p>
            <MapBox
              v-on:placeName="setPlaceName"
              label="map"
              v-on:location="setLocation"
            ></MapBox>
            <br />

            <FormKit
              class="mt-4 fix-margin"
              type="number"
              name="price"
              label="USD TICKET"
              placeholder="800"
              help="What is your ticket price  ?"
              validation="required"
            />
            <br />

            <EventSelectCategory
              label="What is your event category ?"
              :category="formData.category"
              v-on:category="setCategory"
            />
            <p class="text-lg font-bold">Meta Data SEO</p>
            <br />
            <FormKit
              class="mt-4"
              type="text"
              name="meta-title"
              label="title for meta"
              placeholder="red jacket like new"
              help="event title for meta seo"
            />
            <FormKit
              class="mt-4"
              type="text"
              name="meta-content"
              label="content for meta"
              placeholder="It is very well cared for, I used it very little."
              help="Describe your event ?"
            />
            <FormKit type="submit" label="Save Event" />
            <!-- {{formData}} -->
          </FormKit>
          <div class="relative">
            <div class="flex flex-wrap my-4">
              <p>Tags</p>
              <span
                v-for="(tag, index) in tags"
                :key="index"
                class="bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 ml-2 mb-2"
              >
                {{ tag }}
              </span>
            </div>
            <FormKit
              v-model="tagInput"
              @input="handleInput"
              type="text"
              class="border rounded-md py-2 px-3 w-full"
              placeholder="insert tags for example #music #concerts #live #nature"
            />
            <div
              class="absolute top-full left-0 w-full bg-white border border-t-0 rounded-b-md z-10 mt-4"
            ></div>
          </div>
          <div name="metaData" style="padding-bottom: 50px">
            <!-- <img class="w-24 m-auto" :src="metaData.img" alt="IMG" /> -->
            <!-- componente para subir una imagen -->

            <UploadImg
              title="Upload Meta Image"
              class="my-4"
              v-on:link="linkImgMeta"
            ></UploadImg>

            <div class="">
              <img class="w-64 m-auto" :src="image" alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex';
  // import BreadCrumbs from '@/components/admin/Breadcrumbs.vue';
  import AdminHeader from '@/components/admin/AdminHeader.vue';
  import MapBox from '@/components/MapBox.vue';
  import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
  import UploadImages from '@/components/admin/UploadImages.vue';
  import UploadImg from '@/components/admin/UploadImg.vue';
  import EventSelectCategory from '@/components/admin/EventSelectCategory.vue';
  import FeathersClient from '@/FeathersClient';
  export default {
    data() {
      return {
        //esto es para el editor de texto
        editor: ClassicEditor,
        editorData: '<p>Enter event details here...</p>',
        editorConfig: {
          height: '500px !important',
          // The configuration of the editor.
          // height: 800,
        },
        //esto es para el formulario
        formData: {
          title: '',
          content: '',
          price: 0,
          category: {
            _id: '650c8c5adde77fbc419fcc31',
            title: 'Music Events',
            description: 'Upcoming music events, concerts, and festivals.',
            image: 'https://picsum.photos/300/200/?random',
            slug: 'music-events',
            metaData: {
              title: 'Meta Title',
              content: 'Meta Description',
              img: 'Meta Image URL',
            },
          },
        },
        //esto es para el componente de subir imagenes
        images: [],
        //esto es para el componente de subir imagen
        image: '',
        //esto es para el componente de seleccionar categoria
        newProduct: {
          category: '',
        },
        tagInput: '',
        tags: [],
      };
    },
    components: {
      MapBox,
      AdminHeader,
      UploadImg,
      UploadImages,
      EventSelectCategory,
    },
    mounted() {
      this.fetchEvent();
    },
    methods: {
      ...mapActions(['loadingSet']),
      convertirArrayAHashtags(array) {
        // Usamos el método Array.map() para agregar un "#" antes de cada elemento y luego usamos join() para unirlos con espacios.
        return array.map((item) => `#${item}`).join(' ');
      },
      handleInput() {
        const tags = this.tagInput
          .split(' ')
          .filter((tag) => tag.startsWith('#'))
          .map((tag) => tag.slice(1));

        this.tags = tags;
      },
      async fetchEvent() {
        this.loadingSet(true);
        try {
          const event = await FeathersClient.service('events').get(
            this.$route.params.id,
          );
          this.formData = event;
          this.formData.category = event.category;
          this.images = event.images;
          this.image = event.metaData.img;
          this.tags = event.tags;
          this.tagInput = this.convertirArrayAHashtags(event.tags);
          // this.
          this.loadingSet(false);
        } catch (error) {
          console.log(error);
          this.loadingSet(false);
        }
      },
      async submitHandler() {
        //esta funcion se dispara cuando se hace click en el boton del form y todos los datos estan validados

        //esto hace que haga un loader al lado del boton por 1 segundo
        await new Promise((resolve) => setTimeout(resolve, 1000));

        console.log('Submitted!');

        //llamamos a la funcion para crear el producto
        // this.createProduct();
        this.editEvent();
      },
      setPlaceName(placeName) {
        // console.log('setPlaceName', placeName);
        this.formData.placeName = placeName;
      },
      setLocation(location) {
        console.log('setLocation', location);
        this.formData.location = location;
      },
      //esta funcion recibe los links de las imagenes que se suben al componente UploadImages
      links(links) {
        console.log('links', links);
        this.images.push(links);
      },
      //esta funcion recibe el link de la imagen que se sube al componente UploadImg
      async linkImgMeta(link) {
        // await new Promise((resolve) => setTimeout(resolve, 1000));
        console.log('linkImgMeta', link);
        this.image = link;
      },
      //eliminar imagen del array de imagenes
      deleteImage(id) {
        this.images.splice(id, 1);
      },
      //funcion que se dispara cuando el componente ProductSelectCategory emite el evento category (hay que hacer otro para blog y para events)
      setCategory(category) {
        this.formData.category = category;
      },
      async editEvent() {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        try {
          //creamos el producto en feathers
          const res = await FeathersClient.service('events').patch(
            this.$route.params.id,
            {
              title: this.formData.title,
              content: this.formData.content,
              price: this.formData.price,
              images: this.images,
              placeName: this.formData.placeName,
              category: this.formData.category,

              user_id: this.getUser._id,
              user: this.getUser,
              location: this.formData.location,
              date: this.formData.date,
              metaData: {
                title: this.formData['meta-title'],
                content: this.formData['meta-content'],
                img: this.image,
              },
              tags: this.tags,
            },
          );

          //notificacion de exito
          this.$snotify.success('Event Edited', 'Success', {
            timeout: 2000,
            showProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
          });
          this.$router.push('/admin/events');
        } catch (error) {
          console.log(error);
        }
      },
    },
    computed: {
      //traemos del store el usuario logueado y el estado de loading ya lo tenemos automaticamente en el componente
      ...mapGetters(['isLoading', 'getUser']), // Map Vuex getters to computed properties
    },
  };
</script>

<!-- Modelo para crear una vista nueva dentro de admin -->
<style>
  .description {
    font-weight: 800;
    margin-top: 20px;
  }

  .fix-margin {
    margin-top: 20px !important;
  }

  .ck-editor__editable {
    min-height: 200px;
  }
</style>
