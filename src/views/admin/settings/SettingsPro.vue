
<template>
    <div>
        <div>
            <AdminHeader title="Settings" icon="fa-solid fa-gear"></AdminHeader>
            <div class=" m-4 2xl:container ">
            
                <div class="pb-24 ">

      <div class="bg-gray-100 border-t border-b border-gray-500 text-gray-700 px-4 py-3" role="alert">
    <p class="font-bold">Settings</p>
    <p>
        Manage and configure your admin settings here. Make sure to save any changes you make for them to take effect.
    </p>
</div>

                    <div class="p-6 mx-auto bg-white rounded-xl shadow-md flex items-center space-x-4 mt-4">
                          
                        <div class=" space-y-2 w-full">
                       <div class="flex items-center justify-between">
   
    <img :src="data.logo" alt="logo" class="flex-none w-64 rounded-full">
     <UploadImg
     v-if="isEditing"
        title="Upload Logo"
        class="my-4"
        v-on:link="linkImgMeta"
    ></UploadImg>
</div>


                            <div v-if="isEditing" class="text-sm font-medium text-black">

                                 <FormKit
                                v-model="data.title"
                                style="color:black"
                                class="mt-4"
                                type="text"
                                name="name"
                                label="Title"
                                placeholder="Title"
                                help="What is the site title ?"
                                validation="required"
                              />
                            </div>
                            <div v-else class="text-xl font-medium text-black">{{ data.title }}</div>
                            <div v-if="isEditing" class="text-gray-500">

                                <FormKit
                                v-model="data.description"
                                style="color:black"
                                class="mt-2"
                                type="textarea"
                                name="name"
                                label="Description"
                                placeholder="Description"
                                help="What is the site description ?"
                                validation="required"
                              />
                                <!-- <textarea v-model="data.description" class="border" rows="4"></textarea> -->
                            </div>
                            <div v-else class="text-gray-500">{{ data.description }}</div>
                            <div class="text-gray-500">Theme: {{ data.theme }}</div>
                            <div class="p-6 mx-auto bg-white rounded-xl shadow-md flex items-center space-x-4 mt-4">
                            <div class="text-gray-500">
                               <p class="float-left mr-4 font-bold w-24 text-black"> Products: {{data.products}}</p>
                                <input v-if="isEditing" type="checkbox" v-model="data.products" class="toggle" id="products-toggle" />
                                <label for="products-toggle"></label>
                            </div>
                            <div class="text-gray-500">
                                 <p class="float-left mr-4 font-bold w-24 text-black"> Events: {{data.events}}</p>
                                <input v-if="isEditing" type="checkbox" v-model="data.events" class="toggle" id="events-toggle" />
                                <label for="events-toggle"></label>
                            </div>
                            <div class="text-gray-500">
                                 <p class="float-left mr-4 font-bold w-24 text-black"> Blogs: {{data.blog}}</p>
                                <input v-if="isEditing" type="checkbox" v-model="data.blog" class="toggle" id="blog-toggle" />
                                <label for="blog-toggle"></label>
                            </div>
                            <div class="text-gray-500">
                                 <p class="float-left mr-4 font-bold w-24 text-black"> Users: {{data.users}}</p>
                                <input v-if="isEditing" type="checkbox" v-model="data.users" class="toggle" id="users-toggle" />
                                <label for="users-toggle"></label>
                            </div>
                            <div class="text-gray-500">
                                <p class="float-left mr-4 font-bold w-24 text-black"> Admin: {{data.admin}}</p>
                                <input v-if="isEditing" type="checkbox" v-model="data.admin" class="toggle" id="admin-toggle" />
                                <label for="admin-toggle"></label>
                            </div>

                            </div>
                            
                        </div>
                      
                        
                        
                    </div>
                      <div class="p-6 mx-auto bg-white rounded-xl shadow-md flex items-center space-x-4 mt-4">
                        <div class="text-gray-500 text-black" style="color:black">Plugins:
                                <ul class="list-disc list-inside">
                                    <li v-for="(plugin, index) in data.plugins" :key="index">{{ plugin }}</li>
                                </ul>
                            </div>
                      </div>
                    <div class="ml-auto m-4 ">
                            <button v-if="!isEditing" @click="toggleEdit" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Edit Settings
          </button>
                            <button v-if="isEditing" @click="saveSettings" class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
            Save Settings
          </button>
                        </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import StylePageEdit from "../../../components/admin/StylePageEdit.vue";
import EmojiPicker from '../../../components/EmojiPicker.vue';
import { mapActions, mapGetters } from 'vuex';
// import BreadCrumbs from '@/components/admin/Breadcrumbs.vue';
import AdminHeader from '@/components/admin/AdminHeader.vue';
import UploadImg from '@/components/admin/UploadImg.vue';
import FeathersClient from '@/FeathersClient';



export default {
    //logout
    // name: "AdminDashboard",
    data() {
        return {
            isEditing: false,

            data: {},
        }
    },
    async mounted(){
        // console.log('mounted');

        try {
            this.loadingSet(true);
            const response = await FeathersClient.service('settings').find();
            this.data = response.data[0];
            this.loadingSet(false);
           
        } catch (error) {
            console.log('error', error);
            this.loadingSet(false);
           
        }
    },
    components: {
        // BreadCrumbs,
        AdminHeader,
        StylePageEdit,
        EmojiPicker,
        UploadImg,

    },
    methods: {
      ...mapActions(['loadingSet']),
        toggleEdit() {
            this.isEditing = !this.isEditing;
        },
        async saveSettings() {
            // Implement logic to save the settings here
            this.isEditing = false;
            try {
                this.loadingSet(true);
                const response = await FeathersClient.service('settings').patch(this.data._id, this.data);
                this.loadingSet(false);
                 this.$snotify.success('Settings Save', 'Success', {
              timeout: 2000,
              showProgressBar: false,
              closeOnClick: false,
              pauseOnHover: true,
            });
            } catch (error) {
                console.log('error', error);
                this.loadingSet(false);
                 this.$snotify.error('Error', 'Error', {
              timeout: 2000,
              showProgressBar: false,
              closeOnClick: false,
              pauseOnHover: true,
            });
            }


        },
          //esta funcion recibe el link de la imagen que se sube al componente UploadImg
      linkImgMeta(link) {
        console.log('linkImgMeta', link);
        this.data.logo = link;
      },
    },
}
</script>

<style>

</style>