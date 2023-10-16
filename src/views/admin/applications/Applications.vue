<!-- Modelo para crear una vista nueva dentro de admin -->
<template>
  <div>
    <div>
      <AdminHeader title="Applications" icon="fa-solid fa-laptop"></AdminHeader>
 <div class="max-w-4xl mx-auto bg-white p-8 rounded shadow">
        <h1 class="text-3xl font-bold mb-6">Últimas versiones de mi App</h1>

        <!-- Información de la última versión -->
        <div class="mb-8">
            <h2 class="text-xl font-semibold mb-2">Versión X.X.X</h2>
            <p class="text-gray-700 mb-2">Cambios:</p>
            <ul class="list-disc list-inside">
                <li>Descripción de los cambios en la versión X.X.X.</li>
                <li>Otro cambio importante en la versión X.X.X.</li>
            </ul>
        </div>

        <!-- Información de la versión anterior -->
        <div class="mb-8">
            <h2 class="text-xl font-semibold mb-2">Versión X.X.X</h2>
            <p class="text-gray-700 mb-2">Cambios:</p>
            <ul class="list-disc list-inside">
                <li>Descripción de los cambios en la versión X.X.X.</li>
                <li>Otro cambio importante en la versión X.X.X.</li>
            </ul>
        </div>

        <!-- Agrega más bloques de información según sea necesario -->

    </div>
      <div class="m-4 2xl:container">
   

        <!-- <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3 pb-24 " > -->
        <router-link :to="{name: 'admin-applications-create'}" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
  New Application
</router-link>
        <div class="grid gap-6 pb-24 mt-4">
         <!-- <router-link
                :to="{ name: 'Single', params: { id: sorteo._id } }"
                class="btn btn-sm btn-success"
                >Comprar Rifa</router-link
              > -->
           
          <!-- {{ applications }} -->
          <div
            class="bg-blue-100 border-t border-b border-blue-500 text-blue-700 px-4 py-3"
            role="alert"
          >
            <p class="font-bold">Applications</p>
            <p>
              Using the same CMS model, applications are created. These apps are
              automatically generated using Docker based on the main model. A
              subdomain is also automatically generated and mounted for each
              app. The creation process for each app takes approximately 1
              minute.
            </p>
          </div>

          <table class="table">
            <!-- head -->
            <thead>
              <tr>
                <th>
                  <label>
                    <input type="checkbox" class="checkbox" />
                  </label>
                </th>
                <th>Logo</th>
                <th>Title</th>
                <th>Plugins</th>
                <th>LINK SUBDOMAIN</th>
                <th>State</th>

                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <!-- row 1 -->
              <tr v-for="app in applications" :key="app.index">
                <th>
                  <label>
                    <input type="checkbox" class="checkbox" />
                  </label>
                </th>
                <td>
                  <div class="flex items-center space-x-3">
                    <div class="avatar">
                      <div class="mask mask-squircle w-12 h-12">
                        <img
                          :src="app.logo"
                          :alt="app.title"
                        />
                      </div>
                    </div>
                    <!-- <div>
                                                <div class="font-bold">Hart Hagerty</div>
                                                <div class="text-sm opacity-50">United States</div>
                                            </div> -->
                  </div>
                </td>
                <td>
                  {{app.title}}
                  <br />
                </td>
                <!-- <td>Purple</td> -->
                
                <td> <a href="#" v-for="plugin in app.plugins" :key="plugin.index">{{plugin}} <br> </a></td>
                
                <td><a :href="'https://'+app.subdomain + '.armortemplate.site'">{{app.subdomain}}.armortemplate.site</a></td>

                <td><p class="bg-green-500 p-1 text-center border-2 border-green-300 rounded-lg">online</p></td>
                <th class="w-48">
                  <!-- <button class="p-1  border-solid border-black bg-green-400">show</button> -->
                  <!-- <button class="p-1  border-solid border-black mx-1 bg-blue-400">edit</button> -->
                  <button class="p-1 border-solid border-black bg-red-400 ml-2">
                    delete
                  </button>
                </th>
              </tr>
            </tbody>
            <!-- foot -->
            <!-- <tfoot>
                                            <tr>
                                                <th></th>
                                                <th>Name</th>
                                                <th>Job</th>
                                                <th>Favorite Color</th>
                                                <th></th>
                                            </tr>
                                        </tfoot> -->
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex';
  // import BreadCrumbs from '@/components/admin/Breadcrumbs.vue';
  import AdminHeader from '@/components/admin/AdminHeader.vue';
  import FeathersClient from '@/FeathersClient';

  export default {
    layout: 'AdminLayout',
    data() {
      return {
        applications: [],
      };
    },
    mounted() {
      this.fetchApplications();
    },
    components: {
      AdminHeader,
    },
    methods: {
      async fetchApplications() {
        await FeathersClient.service('applications')
          .find({
            query: {
              $sort: {
                createdAt: -1,
              },
            },
          })
          .then((res) => {
            console.log(res.data);
            this.applications = res.data;
          });
      },
    },
  };
</script>

<style></style>
