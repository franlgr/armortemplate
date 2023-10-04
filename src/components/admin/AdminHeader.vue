<template>
  <div class="sticky z-10 top-0 border-b lg:py-2.5 bg-white">
    <div
      class="px-6 flex items-center justify-between space-x-4 2xl:container pb-4"
    >
      <h5 hidden class="text-2xl text-gray-600 font-medium lg:block">
        <i :class="icon"></i
        ><span class="ml-2"
          >{{ title }} <span v-if="count">({{ count }})</span></span
        >
        <BreadCrumbs></BreadCrumbs>
      </h5>

      <button
        @click="toggleMenu()"
        class="w-16 h-16 -mr-2 border-r lg:hidden text-black bg-green-300 mt-4"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6 my-auto"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>

      <div class="flex space-x-4">
        <!--search bar -->

        <!--/search bar -->
        <div class="relative mt-4">
          <!-- <button @click="notification = !notification" aria-label="notification"
            class="w-14 h-14 rounded-xl border left-1 bg-gray-100 focus:bg-gray-100 active:bg-gray-200 relative mr-2">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 m-auto text-gray-600 fix right-1"
              style="margin-left: 5px;" viewBox="0 0 20 20" fill="currentColor">
              <path
                d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
            </svg>
            <span
              class="absolute bottom-10 left-10 bg-red-500 text-white w-4 h-4 rounded-full flex items-center justify-center text-xs">5</span>
          </button>
          <button @click="notification = !notification" aria-label="notification"
            class="w-14 h-14  rounded-xl border left-1 bg-gray-100 focus:bg-gray-100 active:bg-gray-200 relative">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 m-auto text-gray-600 fix right-1"
              style="margin-left: 5px;" viewBox="0 0 20 20" fill="currentColor">
              <path
                d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
            </svg>
            <span
              class="absolute bottom-10 left-10 bg-red-500 text-white w-4 h-4 rounded-full flex items-center justify-center text-xs">5</span>
          </button> -->
          <div class="navbar">
            <div class="flex-none">
              <div class="dropdown dropdown-end">
                <label tabindex="0" class="btn btn-ghost btn-circle">
                  <div class="indicator">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                      />
                    </svg>
                    <span class="badge badge-sm indicator-item">8</span>
                  </div>
                </label>
                <div
                  tabindex="0"
                  class="mt-3 z-[1] card card-compact dropdown-content w-52 bg-base-100 shadow"
                >
                  <div class="card-body">
                    <span class="font-bold text-lg">8 Items</span>
                    <span class="text-info">Subtotal: $999</span>
                    <div class="card-actions">
                      <button class="btn btn-primary btn-block">
                        View cart
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div class="dropdown dropdown-end">
                <label tabindex="0" class="btn btn-ghost btn-circle avatar">
                  <div class="w-10 rounded-full">
                    <img :src="getUser.image" />
                  </div>
                </label>
                <ul
                  tabindex="0"
                  class="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-green-500 rounded-box w-52"
                >
                  <li>
                    <router-link
                      :to="{ name: 'admin-profile' }"
                      class="justify-between"
                    >
                      Profile
                      <!-- <span class="badge">New</span> -->
                    </router-link>
                  </li>
                  <li><a class="primaryHover">Settings</a></li>
                  <li><div @click="logout()" class="">Logout</div></li>
                </ul>
              </div>
            </div>
          </div>
          <!-- <div class="m-auto mt-4 text-center">
            <router-link to="/" title="home">
              <button class="btn px-4 bg-green-500 text-center ">Go Site</button>
            </router-link>
          </div> -->

          <div class="absolute noty" v-if="notification">
            <div class="flex items-center bg-green-300 p-4 rounded-md">
              <div class="relative inline-block shrink-0">
                <img
                  class="w-12 h-12 rounded-full"
                  src="https://picsum.photos/200/300"
                  alt="Jese Leos image"
                />
                <span
                  class="absolute bottom-0 right-0 inline-flex items-center justify-center w-6 h-6 bg-blue-600 rounded-full"
                >
                  <svg
                    class="w-3 h-3 text-white"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 18"
                    fill="currentColor"
                  >
                    <path
                      d="M18 4H16V9C16 10.0609 15.5786 11.0783 14.8284 11.8284C14.0783 12.5786 13.0609 13 12 13H9L6.846 14.615C7.17993 14.8628 7.58418 14.9977 8 15H11.667L15.4 17.8C15.5731 17.9298 15.7836 18 16 18C16.2652 18 16.5196 17.8946 16.7071 17.7071C16.8946 17.5196 17 17.2652 17 17V15H18C18.5304 15 19.0391 14.7893 19.4142 14.4142C19.7893 14.0391 20 13.5304 20 13V6C20 5.46957 19.7893 4.96086 19.4142 4.58579C19.0391 4.21071 18.5304 4 18 4Z"
                      fill="currentColor"
                    />
                    <path
                      d="M12 0H2C1.46957 0 0.960859 0.210714 0.585786 0.585786C0.210714 0.960859 0 1.46957 0 2V9C0 9.53043 0.210714 10.0391 0.585786 10.4142C0.960859 10.7893 1.46957 11 2 11H3V13C3 13.1857 3.05171 13.3678 3.14935 13.5257C3.24698 13.6837 3.38668 13.8114 3.55279 13.8944C3.71889 13.9775 3.90484 14.0126 4.08981 13.996C4.27477 13.9793 4.45143 13.9114 4.6 13.8L8.333 11H12C12.5304 11 13.0391 10.7893 13.4142 10.4142C13.7893 10.0391 14 9.53043 14 9V2C14 1.46957 13.7893 0.960859 13.4142 0.585786C13.0391 0.210714 12.5304 0 12 0Z"
                      fill="currentColor"
                    />
                  </svg>
                  <span class="sr-only">Message icon</span>
                </span>
              </div>
              <div class="ml-3 text-sm font-normal">
                <div
                  class="text-sm font-semibold text-gray-900 dark:text-white"
                >
                  Bonnie Green
                </div>
                <div class="text-sm font-normal">commmented on your photo</div>
                <span
                  class="text-xs font-medium text-blue-600 dark:text-blue-500"
                  >a few seconds ago</span
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import BreadCrumbs from '@/components/admin/Breadcrumbs.vue';
  import { mapActions, mapGetters } from 'vuex';
  export default {
    name: 'HeaderAdmin',
    data() {
      return {
        notification: false,
      };
    },
    components: {
      BreadCrumbs,
    },
    props: {
      title: {
        type: String,
        default: 'Dashboard',
      },
      count: {
        type: Number,
        default: 0,
      },
      icon: {
        type: String,
        default: 'fa-solid fa-calendar-days',
      },
    },
    methods: {
      ...mapActions(['toggleMenu', 'logout']),
      // activeMenu() {
      //     this.toggleMenu(true)
      // },
    },
    computed: {
      ...mapGetters(['getMenuState', 'getUser']),
    },
  };
</script>
<style>
  .noty {
    right: 1px;
    top: 110px;
    width: 300px;
  }
</style>
