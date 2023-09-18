<template>
  <div class="sticky z-10 top-0 h-24 border-b lg:py-2.5 bg-white">
    <div class="px-6 flex items-center justify-between space-x-4 2xl:container">
      <h5 hidden class="text-2xl text-gray-600 font-medium lg:block">
        {{ title }}
        <BreadCrumbs></BreadCrumbs>
      </h5>

      <button
        @click="toggleMenu()"
        class="w-16 h-16 -mr-2 border-r lg:hidden text-white mt-4"
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
        <div hidden class="md:block">
          <div
            class="relative flex items-center text-gray-400 focus-within:text-cyan-400"
          >
            <span
              class="absolute left-4 h-6 flex items-center pr-3 border-r border-gray-300"
            >
              <svg
                xmlns="http://ww50w3.org/2000/svg"
                class="w-4 fill-current fix-search"
                viewBox="0 0 35.997 36.004"
              >
                <path
                  id="Icon_awesome-search"
                  data-name="search"
                  d="M35.508,31.127l-7.01-7.01a1.686,1.686,0,0,0-1.2-.492H26.156a14.618,14.618,0,1,0-2.531,2.531V27.3a1.686,1.686,0,0,0,.492,1.2l7.01,7.01a1.681,1.681,0,0,0,2.384,0l1.99-1.99a1.7,1.7,0,0,0,.007-2.391Zm-20.883-7.5a9,9,0,1,1,9-9A8.995,8.995,0,0,1,14.625,23.625Z"
                ></path>
              </svg>
            </span>
            <input
              type="search"
              name="leadingIcon"
              id="leadingIcon"
              placeholder="Search here"
              class="w-full pl-14 pr-4 py-2.5 rounded-xl text-sm text-gray-600 outline-none border border-gray-300 focus:border-cyan-300 transition"
            />
          </div>
        </div>
        <!--/search bar -->
        <button
          aria-label="search"
          class="w-10 h-10 rounded-xl border bg-gray-100 focus:bg-gray-100 active:bg-gray-200 md:hidden"
        >
          <svg
            xmlns="http://ww50w3.org/2000/svg"
            class="w-4 mx-auto fill-current text-gray-600 fix-search"
            viewBox="0 0 35.997 36.004"
          >
            <path
              id="Icon_awesome-search"
              data-name="search"
              d="M35.508,31.127l-7.01-7.01a1.686,1.686,0,0,0-1.2-.492H26.156a14.618,14.618,0,1,0-2.531,2.531V27.3a1.686,1.686,0,0,0,.492,1.2l7.01,7.01a1.681,1.681,0,0,0,2.384,0l1.99-1.99a1.7,1.7,0,0,0,.007-2.391Zm-20.883-7.5a9,9,0,1,1,9-9A8.995,8.995,0,0,1,14.625,23.625Z"
            ></path>
          </svg>
        </button>
        <button
          aria-label="chat"
          class="w-10 h-10 rounded-xl border bg-gray-100 focus:bg-gray-100 active:bg-gray-200"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5 m-auto text-gray-600 fix"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
            />
          </svg>
        </button>
        <button
          aria-label="notification"
          class="w-10 h-10 rounded-xl border bg-gray-100 focus:bg-gray-100 active:bg-gray-200"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5 m-auto text-gray-600 fix"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z"
            />
          </svg>
        </button>
       <div class="relative">
    <button @click="notification = !notification" aria-label="notification" class="w-10 h-10 rounded-xl border bg-gray-100 focus:bg-gray-100 active:bg-gray-200 relative">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 m-auto text-gray-600 fix" viewBox="0 0 20 20" fill="currentColor">
            <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
        </svg>
        <span class="absolute top-0 right-0 bg-red-500 text-white w-4 h-4 rounded-full flex items-center justify-center text-xs">5</span>
    </button>
    
    <div class="absolute noty" v-if="notification">
       <div class="flex items-center bg-green-300 p-4">
        <div class="relative inline-block shrink-0">
            <img class="w-12 h-12 rounded-full" src="https://picsum.photos/200/300" alt="Jese Leos image"/>
            <span class="absolute bottom-0 right-0 inline-flex items-center justify-center w-6 h-6 bg-blue-600 rounded-full">
                <svg class="w-3 h-3 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 18" fill="currentColor">
                    <path d="M18 4H16V9C16 10.0609 15.5786 11.0783 14.8284 11.8284C14.0783 12.5786 13.0609 13 12 13H9L6.846 14.615C7.17993 14.8628 7.58418 14.9977 8 15H11.667L15.4 17.8C15.5731 17.9298 15.7836 18 16 18C16.2652 18 16.5196 17.8946 16.7071 17.7071C16.8946 17.5196 17 17.2652 17 17V15H18C18.5304 15 19.0391 14.7893 19.4142 14.4142C19.7893 14.0391 20 13.5304 20 13V6C20 5.46957 19.7893 4.96086 19.4142 4.58579C19.0391 4.21071 18.5304 4 18 4Z" fill="currentColor"/>
                    <path d="M12 0H2C1.46957 0 0.960859 0.210714 0.585786 0.585786C0.210714 0.960859 0 1.46957 0 2V9C0 9.53043 0.210714 10.0391 0.585786 10.4142C0.960859 10.7893 1.46957 11 2 11H3V13C3 13.1857 3.05171 13.3678 3.14935 13.5257C3.24698 13.6837 3.38668 13.8114 3.55279 13.8944C3.71889 13.9775 3.90484 14.0126 4.08981 13.996C4.27477 13.9793 4.45143 13.9114 4.6 13.8L8.333 11H12C12.5304 11 13.0391 10.7893 13.4142 10.4142C13.7893 10.0391 14 9.53043 14 9V2C14 1.46957 13.7893 0.960859 13.4142 0.585786C13.0391 0.210714 12.5304 0 12 0Z" fill="currentColor"/>
                    </svg>
                <span class="sr-only">Message icon</span>
            </span>
        </div>
        <div class="ml-3 text-sm font-normal">
            <div class="text-sm font-semibold text-gray-900 dark:text-white">Bonnie Green</div>
            <div class="text-sm font-normal">commmented on your photo</div> 
            <span class="text-xs font-medium text-blue-600 dark:text-blue-500">a few seconds ago</span>   
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
    },
    methods: {
      ...mapActions(['toggleMenu']),
      // activeMenu() {
      //     this.toggleMenu(true)
      // },
    },
    computed: {
      ...mapGetters(['getMenuState']),
    },
  };
</script>
<style>
.noty {
    right: 1px;
    top:80px;
    width: 300px;
}
</style>
