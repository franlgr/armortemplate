<!-- Modelo para crear una vista nueva dentro de admin -->
<template>
    <div>
        <div>
            <AdminHeader title="Create Product"></AdminHeader>

            <div class=" m-4 2xl:container my-4">
                <div class="">
                    <FormKit class="mt-4" type="text" name="name" label="Title Product" placeholder="Jane"
                        help="What is your title product ?" validation="required" />
                    <ckeditor class="my-4" :editor="editor" v-model="editorData" :config="editorConfig"></ckeditor>
                    <!-- <FormKit class="mt-4" type="text" name="name" label="Your name" placeholder="Jane"
                        help="What is your name?" validation="required" /> -->
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex';
// import BreadCrumbs from '@/components/admin/Breadcrumbs.vue';
import AdminHeader from '@/components/admin/AdminHeader.vue';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
export default {
    //logout
    // name: "AdminDashboard",
    data() {
        return {
            editor: ClassicEditor,
            editorData: '<p>Content of the editor.</p>',
            editorConfig: {
                // The configuration of the editor.
            }
        }
    },
    layout: "AdminLayout",
    components: {
        // BreadCrumbs,
        AdminHeader

    },
    methods: {
    },
}
</script>
<style></style>