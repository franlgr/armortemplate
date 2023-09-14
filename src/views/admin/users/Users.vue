<template>
    <div>
        <div>
            <AdminHeader title="Users"></AdminHeader>

            <div class="p-8 bg-red-100" hidden>
                <p class="font-bold">DEBUG</p>
                {{ users }}
            </div>

            <div class="m-4 2xl:container">
                <div class="grid gap-6">
                    <div class="overflow-x-auto">
                        <table class="table">
                            <!-- head -->
                            <thead>
                                <tr>
                                    <th>
                                        <label>
                                            <input type="checkbox" class="checkbox" />
                                        </label>
                                    </th>
                                    <th>Full Name</th>
                                    <th>City</th>
                                    <th>Email</th>
                                    <th>Permissions</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                <!-- row 1 -->
                                <tr v-for="user in users" :key="user.index">
                                    <th>
                                        <label>
                                            <input type="checkbox" class="checkbox" />
                                        </label>
                                    </th>
                                    <td>
                                        <div class="flex items-center space-x-3">
                                            <div class="avatar">
                                                <div class="mask mask-squircle w-12 h-12">
                                                   <img v-if="user.image" :src="user.image" alt=""
                            class="w-10 h-10 m-auto rounded-full object-cover lg:w-28 lg:h-28">
                        <img v-if="!user.image" src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/Windows_10_Default_Profile_Picture.svg/1024px-Windows_10_Default_Profile_Picture.svg.png?20221210150350" alt=""
                            class="w-10 h-10 m-auto rounded-full object-cover lg:w-28 lg:h-28">

                                                </div>
                                            </div>
                                            <div>
                                                <div class="font-bold">{{user.name}}</div>
                                                <div class="text-sm font-bold">{{user.lastname}}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        {{user.city}}
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
                                        <button class="btn btn-sm border-solid border-black bg-green-400">view</button>
                                        <button class="btn btn-sm border-solid border-black bg-blue-400 mx-2">edit</button>
                                        <button @click="deleteUserConfirm(user._id)"
                                            class="btn btn-sm border-solid border-black bg-red-400">delete</button>
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
        deleteUserConfirm(id) {
            this.$snotify.confirm('Are you sure you want to delete this user ?', 'Delete User', {
                timeout: 5000,
                showProgressBar: true,
                closeOnClick: false,
                pauseOnHover: true,
                buttons: [
                    { text: 'Yes', action: (toast) => this.deleteUser(id, toast.id), bold: false },
                    { text: 'Close', action: (toast) => { console.log('Clicked: No'); this.$snotify.remove(toast.id); }, bold: true },
                ]
            });
        },
        deleteUser(id, toastId) {
            console.log('deleteUser', id);
            this.$snotify.remove(toastId);
            FeathersClient.service('users').remove(id)
                .then(res => {
                    console.log('deleteUser', res);
                    this.$snotify.success('User deleted', 'Success', {
                        timeout: 2000,
                        showProgressBar: false,
                        closeOnClick: false,
                        pauseOnHover: true
                    });
                    this.fetchUsers();
                })
                .catch(err => {
                    console.error(err);

                    this.$snotify.error(err, 'Error', {
                        timeout: 2000,
                        showProgressBar: false,
                        closeOnClick: false,
                        pauseOnHover: true
                    });
                });
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
