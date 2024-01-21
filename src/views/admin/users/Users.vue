<template>
    <div>
        <div>
            <AdminHeader title="Users" icon="fa-solid fa-users"></AdminHeader>

            <div class="p-8 bg-red-100" hidden>
                <p class="font-bold">DEBUG</p>
                {{ users }}
            </div>

            <div class="2xl:container">
                <div class="grid gap-6">
                    <div class="overflow-x-auto">
                        <table class="table">
                            <!-- head -->
                            <thead>
                                <tr>
                                    <th>
                                        <button
                                        :disabled="!showDeleteButton"
                                        @click="deleteSelectedUsers()"
                                        class="border w-12 h-12 border-red-500 hover:border-red-700 rounded-full p-2"
                                        >
                                        <i class="fas fa-trash-alt text-red-500"></i>
                                        </button>
                                        <th>
                                            <div><span>Select All</span></div>
                                            <label>
                                            <input
                                                type="checkbox"
                                                class="checkbox"
                                                v-model="selectAll"
                                                @change="selectAllUsers"
                                            />
                                            </label>
                                        </th>
                                    </th>
                                    <th>Full Name</th>
                                    <th>City</th>
                                    <th>Email</th>
                                    <th>Permissions</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                <!-- row 1 -->
                                <tr v-for="user in users" :key="user.index">
                                    <th>
                                        <label>
                                        <input
                                            type="checkbox"
                                            class="checkbox"
                                            v-model="user.selected"
                                            @change="checkDeleteButtonState"
                                        />
                                        </label>
                                    </th>
                                    <td>
                                        <div class="flex items-center space-x-3">
                                            <div class="avatar">
                                                <div class="mask mask-squircle w-12 h-12">
                                                    <img v-if="user.image" :src="user.image" alt=""
                                                        class="w-10 h-10 m-auto rounded-full object-cover lg:w-28 lg:h-28">
                                                    <img v-if="!user.image"
                                                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/Windows_10_Default_Profile_Picture.svg/1024px-Windows_10_Default_Profile_Picture.svg.png?20221210150350"
                                                        alt=""
                                                        class="w-10 h-10 m-auto rounded-full object-cover lg:w-28 lg:h-28">

                                                </div>
                                            </div>
                                            <div>
                                                <div class="font-bold">{{ user.name }}</div>
                                                <div class="text-sm font-bold">{{ user.lastname }}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        {{ user.city }}
                                        <br />
                                    </td>
                                    <td>
                                        {{ user.email }}
                                    </td>
                                    <td>
                                        <ul>
                                            <li v-for="permission in user.permissions" :key="user.index">{{ permission }}
                                            </li>
                                        </ul>
                                    </td>
                                    <th>
                                        <div class="flex justify-between">
                                <router-link :to="{ name: 'site-user', params: { id: user._id } }" class="flex items-center">
                                    <button class="border w-12 h-12 border-blue-500 hover:border-blue-700 rounded-full p-2">
                                            <i class="fas fa-eye text-blue-500"></i>
                                        </button>
                                </router-link>
                                <router-link :to="{ name: 'admin-users-edit', params: { id: user._id } }" class="flex items-center">
                                    <button class="border w-12 h-12 border-yellow-500 hover:border-yellow-700 rounded-full p-2">
                                            <i class="fas fa-edit text-yellow-500"></i>
                                        </button>
                                </router-link>
                                <div class="flex items-center">
                                </div>
                            </div>
                                    </th>
                                </tr>
                            </tbody>
                            <!-- foot -->
                        </table>
                    </div>
                </div>
            </div>

            <!-- Paginación -->
            <div class="join grid grid-cols-2 pagination w-64 m-auto py-8">
                <button class="join-item btn btn-outline" @click="prevPage" :disabled="currentPage === 1">Previous</button>
                <button class="join-item btn btn-outline" @click="nextPage" :disabled="users.length < perPage">Next</button>
            </div>

        </div>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import BreadCrumbs from '@/components/admin/Breadcrumbs.vue';
import AdminHeader from '@/components/admin/AdminHeader.vue';
import FeathersClient from '@/FeathersClient';
export default {
    layout: "AdminLayout",
    data: () => ({
        users: [],
        currentPage: 1, // Página actual
        perPage: 10,   // Cantidad de elementos por página
        selectAll: false,
        showDeleteButton: false,
    }),
    components: {
        BreadCrumbs,
        AdminHeader,
    },
    mounted() {
        this.fetchUsers();
    },
    methods: {
        ...mapActions(['loadingSet']),
        async fetchUsers() {
            this.loadingSet(true);
            try {
                const res = await FeathersClient.service('users').find({
                    query: {
                        $limit: this.perPage,
                        $skip: (this.currentPage - 1) * this.perPage,
                    }
                });
                this.users = res.data;
                this.loadingSet(false);
            } catch (error) {
                console.error(error);
                this.loadingSet(false);
            }
        },
        async deleteUser(userId) {
        try {
          await FeathersClient.service('users').remove(userId);
          this.users = this.users.filter((user) => user._id !== userId);
          console.log('Usuario/s eliminado con éxito.');
          this.$snotify.success('usuario/s eliminado/s con éxito', 'Éxito', {
            timeout: 2000,
            showProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
          });

        } catch (error) {
          console.error('Error al eliminar el usuario:', error);
          this.$snotify.error('Error al eliminar el/los usuario/s', 'Error: ', error, {
            timeout: 2000,
            showProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
          });
        }
      },

      deleteSelectedUsers() {
        const selectedUsers = this.users.filter((user) => user.selected);
        if (selectedUsers.length > 0) {
          const confirmationMessage =
            'Are you sure you want to delete selected users?';
          const toastId = this.$snotify.info(
            confirmationMessage,
            'Deleted Users!',
            {
              timeout: 0,
              showProgressBar: true,
              closeOnClick: false,
              pauseOnHover: true,
              buttons: [
                {
                  text: 'Yes',
                  action: (toast) => {
                    selectedUsers.forEach((user) => {
                      this.deleteUser(user._id);
                    });
                    this.$snotify.remove(toast.id);
                  },
                  bold: false,
                },
                {
                  text: 'Close',
                  action: (toast) => {
                    console.log('Clicked: No');
                    this.$snotify.remove(toast.id);
                  },
                  bold: true,
                },
              ],
            },
          );
        }
      },

      selectAllUsers() {
        this.users.forEach((user) => {
            user.selected = this.selectAll;
        });
        this.checkDeleteButtonState();
      },

      checkDeleteButtonState() {
        this.showDeleteButton = this.users.some((user) => user.selected);
      },
        nextPage() {
            this.currentPage++;
            this.fetchUsers();
        },
        prevPage() {
            if (this.currentPage > 1) {
                this.currentPage--;
                this.fetchUsers();
            }
        },
        goToPage(pageNumber) {
            this.currentPage = pageNumber;
            this.fetchUsers();
        },
    },
    computed: {
        totalPages() {
            return Math.ceil(this.totalUsers / this.perPage);
        },
    },
}
</script>

<style scoped>
/* Estilos CSS específicos para este componente, si es necesario */
</style>
