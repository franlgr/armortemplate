<!--
The SiteHome.vue file contains the main view of the website's home page. It includes a header, a hero section with a background image and a call to action button, and sections for displaying the latest products, events, and blog posts. It also includes a sidebar for displaying additional content and a footer with links to social media profiles.

The template section contains the HTML structure of the page, including the SiteHeader component, the hero section with a background image, and the sections for displaying the latest products, events, and blog posts. It also includes a call to action button that links to the registration page.

The script section imports various components used in the template section, including SiteHeader, MoreProductsByCategory, MoreEventsByCategory, MoreBlogsByCategory, ProductsCategories, EventsCategories, LastUsers, and Sidebar. It also defines the HomeView component, which is the main component for the home page. The component includes a layout property that specifies the default layout for the page and a data property that defines the category object used in the template section.
-->
<template>
  <div>
    <div>
      <SiteHeader></SiteHeader>
      <div
        class="hero min-h-screen paralax"
        :style="{
          'background-image': `url('https://i.ibb.co/DkB7fzb/background.jpg')`,
        }"
      >
        <div class="hero-overlay bg-opacity-60"></div>
        <div class="hero-content text-center text-neutral-content">
          <div class="max-w-md">
            <h1 class="mb-5 text-5xl font-bold">
              {{templateSettings.title}}
            </h1>
            <p class="mb-5">
              {{templateSettings.description}}
            </p>
            <!-- <button class="btn btn-primary">Get Started</button> -->
            <!-- registrate -->
            <router-link
              to="/register"
              class="btn bg-green-400 hover:bg-green-500 border-black hover:border-black hover:text-black text-3xl hover:animate-none animate-pulse"
              >Register</router-link
            >
          </div>
        </div>
      </div>
      <div class="px-6 py-8">
        <div class="container flex justify-between mx-auto">
          <div class="w-full sm:w-12/12 lg:w-8/12">
            <div class="">
              <h1 class="text-xl font-bold">Last Products</h1>
              <MoreProductsByCategory></MoreProductsByCategory>
              <h1 class="text-xl font-bold">Last Events</h1>
              <MoreEventsByCategory></MoreEventsByCategory>
              <h1 class="text-xl font-bold">Last Blog</h1>
              <MoreBlogsByCategory></MoreBlogsByCategory>
              <Sidebar class="md:hidden p-4"></Sidebar>
            </div>
          </div>
          <Sidebar class="hidden md:w-12/12 lg:w-5/12 -mx-8 lg:block"></Sidebar>
        </div>
      </div>
      <footer class="px-6 py-2 text-gray-100 bg-gray-800">
        <div
          class="container flex flex-col items-center justify-between mx-auto md:flex-row"
        >
          <a href="#" class="text-2xl font-bold">Armor</a>
          <p class="mt-2 md:mt-0">All rights reserved 2023.</p>
          <div class="flex mt-4 mb-2 -mx-2 md:mt-0 md:mb-0">
            <a href="#" class="mx-2 text-gray-100 hover:text-gray-400"
              ><svg viewBox="0 0 512 512" class="w-4 h-4 fill-current">
                <path
                  d="M444.17,32H70.28C49.85,32,32,46.7,32,66.89V441.61C32,461.91,49.85,480,70.28,480H444.06C464.6,480,480,461.79,480,441.61V66.89C480.12,46.7,464.6,32,444.17,32ZM170.87,405.43H106.69V205.88h64.18ZM141,175.54h-.46c-20.54,0-33.84-15.29-33.84-34.43,0-19.49,13.65-34.42,34.65-34.42s33.85,14.82,34.31,34.42C175.65,160.25,162.35,175.54,141,175.54ZM405.43,405.43H341.25V296.32c0-26.14-9.34-44-32.56-44-17.74,0-28.24,12-32.91,23.69-1.75,4.2-2.22,9.92-2.22,15.76V405.43H209.38V205.88h64.18v27.77c9.34-13.3,23.93-32.44,57.88-32.44,42.13,0,74,27.77,74,87.64Z"
                ></path></svg></a
            ><a href="#" class="mx-2 text-gray-100 hover:text-gray-400"
              ><svg viewBox="0 0 512 512" class="w-4 h-4 fill-current">
                <path
                  d="M455.27,32H56.73A24.74,24.74,0,0,0,32,56.73V455.27A24.74,24.74,0,0,0,56.73,480H256V304H202.45V240H256V189c0-57.86,40.13-89.36,91.82-89.36,24.73,0,51.33,1.86,57.51,2.68v60.43H364.15c-28.12,0-33.48,13.3-33.48,32.9V240h67l-8.75,64H330.67V480h124.6A24.74,24.74,0,0,0,480,455.27V56.73A24.74,24.74,0,0,0,455.27,32Z"
                ></path></svg></a
            ><a href="#" class="mx-2 text-gray-100 hover:text-gray-400"
              ><svg viewBox="0 0 512 512" class="w-4 h-4 fill-current">
                <path
                  d="M496,109.5a201.8,201.8,0,0,1-56.55,15.3,97.51,97.51,0,0,0,43.33-53.6,197.74,197.74,0,0,1-62.56,23.5A99.14,99.14,0,0,0,348.31,64c-54.42,0-98.46,43.4-98.46,96.9a93.21,93.21,0,0,0,2.54,22.1,280.7,280.7,0,0,1-203-101.3A95.69,95.69,0,0,0,36,130.4C36,164,53.53,193.7,80,211.1A97.5,97.5,0,0,1,35.22,199v1.2c0,47,34,86.1,79,95a100.76,100.76,0,0,1-25.94,3.4,94.38,94.38,0,0,1-18.51-1.8c12.51,38.5,48.92,66.5,92.05,67.3A199.59,199.59,0,0,1,39.5,405.6,203,203,0,0,1,16,404.2,278.68,278.68,0,0,0,166.74,448c181.36,0,280.44-147.7,280.44-275.8,0-4.2-.11-8.4-.31-12.5A198.48,198.48,0,0,0,496,109.5Z"
                ></path></svg
            ></a>
          </div>
        </div>
      </footer>
    </div>
  </div>
</template>

<script>
  import SiteHeader from '@/components/site/SiteHeader.vue';
  import MoreProductsByCategory from '@/components/site/market/MoreProductsByCategory.vue';
  import MoreEventsByCategory from '@/components/site/MoreEventsByCategory.vue';
  import MoreBlogsByCategory from '@/components/site/MoreBlogsByCategory.vue';
  import ProductsCategories from '@/components/site/market/ProductsCategories.vue';
  import EventsCategories from '@/components/site/events/EventsCategories.vue';
  import LastUsers from '@/components/site/LastUsers.vue';
  import Sidebar from '@/components/site/Sidebar.vue';
  import FeathersClient from '@/FeathersClient';

  export default {
    name: 'HomeView',
    layout: 'DefaultLayout',
    data() {
      return {
        imagenDeFondo: '@/assets/background.jpg',
        category: {
          _id: '6504a7b5c0eb3e6684d12b39',
          title: 'Consumer Electronics',
          description: 'Electronic devices and gadgets for your everyday life.',
          image: 'https://econtroldevices.com/wp-content/uploads/2021/12/7.png',
          slug: 'consumer-electronics',
          createdAt: '2023-09-15T18:51:33.347Z',
          updatedAt: '2023-09-15T18:51:33.347Z',
          __v: 0,
        },
        templateSettings: {},
        settings: {
          dots: true,
          focusOnSelect: false,
          autoplay: true,
          infinite: true,
          speed: 300,
          slidesToShow: 1,
          slidesToScroll: 1,
          touchThreshold: 1,
          subdomain: '',
        },
      };
    },
    components: {
      // HelloWorld,
      SiteHeader,
      MoreProductsByCategory,
      MoreEventsByCategory,
      MoreBlogsByCategory,
      ProductsCategories,
      EventsCategories,
      LastUsers,
      Sidebar,
    },
    // data() {
    //   return {
    //     templateSettings: {},
    //     settings: {
    //       dots: true,
    //       focusOnSelect: false,
    //       autoplay: true,
    //       infinite: true,
    //       speed: 300,
    //       slidesToShow: 1,
    //       slidesToScroll: 1,
    //       touchThreshold: 1,
    //       subdomain: '',
    //     },
    //   };
    // },
    created() {
      this.FetchTemplateSettings();
    },
    methods: {
        async FetchTemplateSettings() {
            // Obtener la URL actual
            // const currentURL = window.location.hostname;


            try {
                const settings = await FeathersClient.service('settings').find({
                    query: {
                        $limit: 1,
                    }

                })
                // console.log(settings.data)
                this.templateSettings = settings.data[0];
            } catch (error) {
                console.log(error)
            }

        },
    },
  };
</script>
<style>
  .paralax {
    /* Set a specific height */
    min-height: 500px;

    /* Create the parallax scrolling effect */
    background-attachment: fixed;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
  }
</style>
