<template>
    <div>
      <div>
      <AdminHeader title="Scraping" icon="fa-solid fa-business-time"></AdminHeader>
      <div class="m-4 2xl:container">
        
              <!-- <p>Este componente es el modelo para crear una nueva vista en el admin</p> -->
              <div>
                <GetNews/>
            </div>
         
      </div>
  </div>
    </div>
  </template>
  <script>
  import { mapActions, mapGetters } from 'vuex';
  // import BreadCrumbs from '@/components/admin/Breadcrumbs.vue';
  import AdminHeader from '@/components/admin/AdminHeader.vue';
  import GetNews from '../../../components/GetNews.vue';
  
  export default {
      //logout
      // name: "AdminDashboard",
      layout: "AdminLayout",
      components: {
          // BreadCrumbs,
          AdminHeader, GetNews
  
      },
      methods: {
      },
  }
  </script>
  <style>
  </style>