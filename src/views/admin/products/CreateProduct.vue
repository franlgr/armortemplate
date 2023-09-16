<!-- Modelo para crear una vista nueva dentro de admin -->
<template>
    <div>
        <div>
            <AdminHeader title="Create Product"></AdminHeader>
            <!-- {{getUser}} -->
            <div class="carousel carousel-end rounded-box fix">
                <div class="carousel-item m-auto" v-for="image in images" :key="image.index">
                    <div>
                        <img class="w-24 m-auto" :src="image" alt="Drink" />
                        <button class="bg-white m-auto mt-2 text-sm" @click="deleteImage(image.index)">X</button>
                    </div>
    
                </div>
                <!-- {{options}} -->
    
            </div>
            <div class=" m-4 2xl:container my-4">
                <div class="">
                
                    <UploadImages title="Upload Product Images" class="my-4" v-on:links="links"></UploadImages>
                    
                    <FormKit type="form" id="guardar-example" :form-class="submitted ? 'hide' : 'show'" submit-label="Register" @submit="submitHandler" :actions="false"  v-model="formData">
                        <FormKit class="mt-4" type="text" name="name" label="Title Product" placeholder="Leather jacket like new" help="What is your title product ?" validation="required" />
                        <ckeditor class="my-4" :editor="editor" v-model="editorData" :config="editorConfig"></ckeditor>
                        <!-- <FormKit class="mt-4" type="text" name="name" label="Your name" placeholder="Jane"
                                                        help="What is your name?" validation="required" /> -->
                        <br>
                        <!-- <label for="price">USD PRICE</label> -->
                        <FormKit class="mt-4" type="number" name="price" label="USD PRICE" placeholder="800" help="What is your title product ?" validation="required" />
                        <br>
                        <ProductSelectCategory v-on:category="setCategory" />
                        <br>
                        <p class="text-lg font-bold">Meta Data Description</p>
    
                        <br>
                        <!-- {{value}} -->
    
                        <br>
                        <FormKit class="mt-4" type="text" name="title" label="title for meta" placeholder="red jacket like new" help="product title for meta seo" validation="required" />
                        <FormKit class="mt-4" type="text" name="content" label="content for meta" placeholder="It is very well cared for, I used it very little." help="Describe your product ?" validation="required" />
                        <FormKit type="submit" label="Create Product" />
                    </FormKit>
                    <div name="metaData" style="padding-bottom:50px">
                        <p>Image for Meta Data Seo</p>
                        <img class="w-24 m-auto" :src="metaData.img" alt="IMG" />
                        <UploadImg title="Upload Meta Image" class="my-4" v-on:links="linkImgMeta"></UploadImg>
                    </div>
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
import UploadImages from '@/components/admin/UploadImages.vue';
import UploadImg from '@/components/admin/UploadImg.vue';
import ProductSelectCategory from '@/components/admin/ProductSelectCategory.vue';
import FeathersClient from '@/FeathersClient';
export default {
    //logout
    // name: "AdminDashboard",
    data() {
        return {
            editor: ClassicEditor,
            editorData: '<p>Content of the editor.</p>',
            editorConfig: {
                // The configuration of the editor.
            },
            options: [],

            images: [],
            metaData: {
                "title": "Meta Título",
                "content": "Meta Descripción",
                "img": "URL de la imagen de meta"
            },
            //hay que ordenar la data en este objeto
            newProduct: {
                // "title": "Título del producto",
                // "content": "Descripción del producto",
                // "price": "Precio del producto",
                // "images": "URL de las imágenes del producto",
                // "category": "ID de la categoría del producto",
                // "metaData": "Objeto con los datos de meta"
                category: {},
            },
        }
    },
    mounted() {
        this.fetchCategories();
    },

    components: {
        // BreadCrumbs,
        AdminHeader,
        UploadImages,
        UploadImg,
        ProductSelectCategory

    },
    methods: {
        ...mapActions(['loadingSet']),
        async submitHandler() {
            // Simulate an AJAX request (replace with actual AJAX call)
            await new Promise((resolve) => setTimeout(resolve, 1000));
            console.log('Submitted!');
            this.createProduct();
        },
        async fetchCategories() {
            this.loadingSet(true);
            //con await
            try {
                const res = await FeathersClient.service('products-categories').find();
                this.categories = res.data;
                console.log('fetchCategories', res);
                this.setCategories();
                this.loadingSet(false);
            } catch (error) {
                console.error(error);
                this.loadingSet(false);
            }

        },
        setCategories() {
            this.categories.forEach((category) => {
                this.options.push({
                    value: category._id,
                    label: category.title,
                });
            });
        },
        links(links) {
            console.log('links', links);
            this.images.push(links);
        },
        linkImgMeta(link) {
            console.log('linkImgMeta', link);
            this.metaData.img = link;
        },
        deleteImage(id) {
            this.images.splice(id, 1);
        },
        async createProduct() {
            try {
                const res = await FeathersClient.service('products').create({
                    title: this.formData.name,
                    content: this.editorData,
                    price: this.formData.price,
                    images: this.images,
                    category: this.newProduct.category,
                    metaData: this.metaData,
                    user: this.getUser,
                });
                this.$snotify.success('Product Created', 'Success', {
                    timeout: 2000,
                    showProgressBar: false,
                    closeOnClick: false,
                    pauseOnHover: true,
                });
                this.$router.push({ name: 'admin-products' });
            } catch (error) {
                console.error(error);
                this.$snotify.error(error, 'Error', {
                    timeout: 2000,
                    showProgressBar: false,
                    closeOnClick: false,
                    pauseOnHover: true,
                });
            }
            
        },

        setCategory(category) {
            this.newProduct.category = category;
        },



    },

        computed: {
            ...mapGetters(['isLoading', 'getUser']), // Map Vuex getters to computed properties
        },
}
</script>

<style scoped>
.fix {
    margin: auto;
    margin-top: auto;
    margin-bottom: auto;
    display: flex;
    margin-top: 30px;
    margin-bottom: 30px;
}
</style>