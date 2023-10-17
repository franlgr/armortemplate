<template>
  <div>
    <div>
      <AdminHeader
        title="Dashboard"
        icon="fa-solid fa-chart-line"
      ></AdminHeader>

      <div class="m-4 2xl:container">
        <div
          class="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 pb-24 p-4"
        >
          <div class="md:col-span-2 lg:col-span-1">
            <div
              class="h-full py-8 px-6 space-y-6 rounded-xl border border-gray-200 bg-[#2c7b600d] shadow-lg"
            >
              <div class="mb-8">
                <h1 class="text-5xl font-bold text-gray-800">ChartLine</h1>
                <h1 class="text-5xl font-bold text-gray-800">64,5%</h1>
                <span class="text-gray-500">Compared to last week $13,988</span>
              </div>
              <ChartLine></ChartLine>
            </div>
          </div>
          <div>
            <div
              class="h-full p-4 px-6 rounded-xl border border-gray-200 bg-[#2c7b600d] shadow-lg"
            >
              <div class="mb-8">
                <h1 class="text-5xl font-bold text-gray-800">General</h1>
                <h1 class="text-5xl font-bold text-gray-800">64,5%</h1>
                <span class="text-gray-500">Compared to last week $13,988</span>
              </div>
              <Doughnut> </Doughnut>
            </div>
          </div>
          <div>
            <div
              class="lg:h-full px-6 p-4 text-gray-600 rounded-xl border border-gray-200 bg-[#2c7b600d] shadow-lg"
            >
              <div class="mb-8">
                <h1 class="text-5xl font-bold text-gray-800">Bar</h1>
                <h1 class="text-5xl font-bold text-gray-800">64,5%</h1>
                <span class="text-gray-500">Compared to last week $13,988</span>
              </div>
              <Bar> </Bar>
            </div>
          </div>
          <div>
            <div
              class="h-full p-4 px-6 rounded-xl border border-gray-200 bg-[#2c7b600d] shadow-lg"
            >
              <div class="mb-8">
                <h1 class="text-5xl font-bold text-gray-800">Polar</h1>
                <h1 class="text-5xl font-bold text-gray-800">64,5%</h1>
                <span class="text-gray-500">Compared to last week $13,988</span>
              </div>
              <Polar> </Polar>
              <!-- <h5 class="text-xl text-gray-700">Downloads</h5> -->
            </div>
          </div>
          <div>
            <div
              class="h-full p-4 px-6 rounded-xl border border-gray-200 bg-[#2c7b600d] shadow-lg"
            >
              <div class="mb-8">
                <h1 class="text-5xl font-bold text-gray-800">FloatingBars</h1>
                <h1 class="text-5xl font-bold text-gray-800">64,5%</h1>
                <span class="text-gray-500">Compared to last week $13,988</span>
              </div>
              <FloatingBars> </FloatingBars>
              <!-- <h5 class="text-xl text-gray-700">Downloads</h5> -->
            </div>
          </div>
          <div>
            <div
              class="h-full p-4 px-6 rounded-xl border border-gray-200 bg-[#2c7b600d] shadow-lg"
            >
              <div class="mb-8">
                <h1 class="text-5xl font-bold text-gray-800">Radar</h1>
                <h1 class="text-5xl font-bold text-gray-800">64,5%</h1>
                <span class="text-gray-500">Compared to last week $13,988</span>
              </div>
              <Radar> </Radar>
              <!-- <h5 class="text-xl text-gray-700">Downloads</h5> -->
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import { mapActions, mapGetters } from 'vuex';
  import BreadCrumbs from '@/components/admin/Breadcrumbs.vue';
  import AdminHeader from '@/components/admin/AdminHeader.vue';
  import FeathersClient from '@/FeathersClient.js';
  import ChartLine from '@/components/admin/charts/Line.vue';
  import Doughnut from '@/components/admin/charts/Doughnut.vue';
  import Bar from '@/components/admin/charts/Bar.vue';
  import Polar from '@/components/admin/charts/Polar.vue';
  import FloatingBars from '@/components/admin/charts/FloatingBars.vue';
  import Radar from '@/components/admin/charts/Radar.vue';

  export default {
    //logout
    // name: "AdminDashboard",
    layout: 'AdminLayout',

    components: {
      BreadCrumbs,
      AdminHeader,
      ChartLine,
      Doughnut,
      Bar,
      Polar,
      FloatingBars,
      Radar,
    },
    created() {
      // app.authenticate().then(() => {
      //   this.user.authenticated = true
      // })
      // We will also see when new users get created in real-time
      // On errors we just redirect back to the login page
      // .catch(error => {
      //   console.log('Error authenticating!', error)
      // });
    },
    mounted() {},
    methods: {
      logout() {
        this.$store.dispatch('logout');
      },
    },
  };
</script>
<style>
  .fix {
    position: relative;
  }

  .fix-search {
    position: relative;
  }
  @import url('https://fonts.googleapis.com/css2?family=Abril+Fatface&family=Architects+Daughter&family=Bebas+Neue&family=Black+Ops+One&family=Roboto:ital,wght@0,700;1,300&family=Russo+One&family=Young+Serif&display=swap');
</style>
