<template>
    <div>
        <AdminHeader title="Edit Product"></AdminHeader>
        <div class="carousel carousel-end rounded-box fix p-8">
            <div class="carousel-item m-auto" v-for="image in images" :key="image.index">
                <div>
                    <img class="w-24 m-auto" :src="image" alt="Drink" />
                    <button class="bg-white m-auto mt-2 text-sm" @click="deleteImage(image.index)">X</button>
                </div>

            </div>
            <!-- {{options}} -->

        </div>
        <UploadImages title="Upload Product Images" class="my-4" v-on:links="links"></UploadImages>
        <div class=" m-4 2xl:container my-4">
            <div class="">

                <FormKit type="form" id="guardar-example" :form-class="submitted ? 'hide' : 'show'" submit-label="Register"
                    @submit="submitHandler" :actions="false" #default="{ value }" v-model="formData">
                    <FormKit class="mt-4" type="text" name="title" label="Title Product"
                        placeholder="Leather jacket like new" help="What is your title product ?" validation="required" />
                    <ckeditor class="my-4" :editor="editor" v-model="editorData" :config="editorConfig"></ckeditor>
                    <!-- <FormKit class="mt-4" type="text" name="name" label="Your name" placeholder="Jane"
                                                                help="What is your name?" validation="required" /> -->
                    <br>
                    <!-- <label for="price">USD PRICE</label> -->
                    <FormKit class="mt-4" type="number" name="price" label="USD PRICE" placeholder="800"
                        help="What is your title product ?" validation="required" />
                    <br>
                    <ProductSelectCategory v-if="options.length > 0" :options="options" />
                    <br>
                    <p class="text-lg font-bold">Meta Data Description</p>


                    <br>
                    <FormKit class="mt-4" type="text" name="titleMeta" label="title for meta"
                        placeholder="red jacket like new" help="product title for meta seo" validation="required" />
                    <FormKit class="mt-4" type="text" name="contentMeta" label="content for meta"
                        placeholder="It is very well cared for, I used it very little." help="Describe your product ?"
                        validation="required" />
                    <FormKit type="submit" label="Save Product" /> {{ value }}
                </FormKit>
                <div name="metaData" style="padding-bottom:50px">
                    <p>Image for Meta Data Seo</p>
                    <img class="w-24 m-auto" :src="metaData.img" alt="IMG" />
                    <UploadImg title="Upload Meta Image" class="my-4" v-on:links="linkImgMeta"></UploadImg>
                </div>

            </div>
        </div>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import FeathersClient from '@/FeathersClient';
import AdminHeader from '@/components/admin/AdminHeader.vue';

import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import ProductSelectCategory from '@/components/admin/ProductSelectCategory.vue';
import UploadImages from '@/components/admin/UploadImages.vue';
import UploadImg from '@/components/admin/UploadImg.vue';

export default {
    data() {
        return {
            editor: ClassicEditor,
            editorData: '',
            editorConfig: {
                // The configuration of the editor.
            },
            product: {},
            metaData: {
                img: '',
            },
            options: [],
            images: [],
            // links: [],
            linkImgMeta: [],
            formData: {},
        };
    },
    mounted() {
        const id = this.$route.params.id;
        if (id) {
            this.fetchProduct(id);

        }
    },
    components: {
        AdminHeader,
        ProductSelectCategory,
        UploadImages,
        // UploadImg,
    },


    methods: {
        ...mapActions(['loadingSet']),

        links(links) {
            console.log('links', links);
            this.images.push(links);
        },
        linkImgMeta(link) {
            console.log('linkImgMeta', link);
            this.metaData.img = link;
        },

        async fetchProduct(id) {
            this.loadingSet(true);
            try {
                const res = await FeathersClient.service('products').get(id);
                console.log('fetchProducts', res.content);
                this.fetchCategories();
                this.product = res;
                this.editorData = res.content;
                this.metaData = {
                    title: res.metaData.title,
                    content: res.metaData.content,
                    img: res.metaData.img,
                }
                this.formData = {
                    title: res.title,
                    price: res.price,
                    images: res.images,
                    category: res.category._id,
                    titleMeta: res.metaData.title,
                    contentMeta: res.metaData.content,
                }



                this.loadingSet(false);
            } catch (error) {
                console.error(error);
                this.loadingSet(false);
                this.$snotify.error(error, 'Error', {
                    timeout: 2000,
                    showProgressBar: false,
                    closeOnClick: false,
                    pauseOnHover: true
                });
            }
        },
        async submitHandler() {
            // Simulate an AJAX request (replace with actual AJAX call)
            await new Promise((resolve) => setTimeout(resolve, 1000));
            console.log('Submitted!');
            this.updateProduct();
        },
        async updateProduct() {
            console.log('updateProduct');
            try {
                const res = await FeathersClient.service('products').patch(this.product._id, {
                    title: this.formData.title,
                    content: this.editorData,
                    price: this.formData.price,
                    category: this.formData.category,
                    metaData: {
                        title: this.formData.titleMeta,
                        content: this.formData.contentMeta,
                        img: this.metaData.img,
                    },

                    images: this.images,
                });
                this.$snotify.success('Product Updated', 'Success', {
                    timeout: 2000,
                    showProgressBar: false,
                    closeOnClick: false,
                    pauseOnHover: true
                });
                this.$router.push({ name: 'admin-products' });
                console.log('res', res);
            } catch (error) {
                console.error(error);
                this.$snotify.error(error, 'Error', {
                    timeout: 2000,
                    showProgressBar: false,
                    closeOnClick: false,
                    pauseOnHover: true
                });
            }
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


    },
}
</script>