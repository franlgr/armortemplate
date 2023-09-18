import { createRouter, createWebHistory } from 'vue-router';

// Import your site views
import SiteHome from '@/views/site/SiteHome.vue';
import AboutView from '@/views/site/AboutView.vue';
import SiteProducts from '@/views/site/products/Products.vue';
import SingleProduct from '@/views/site/products/SingleProduct.vue';
import NotFound from '@/views/NotFound.vue';
import SiteBlog from '@/views/site/blogs/Blog.vue';
// import SiteProductsCategories from '@/views/site/products/Categories.vue';
// import SiteProductsCategories from '@/views/site/products/Categories.vue';

// Import your layouts
import DefaultLayout from '@/layouts/DefaultLayout.vue';
import AdminLayout from '@/layouts/AdminLayout.vue';

// Import your admin views
import Dashboard from '@/views/admin/Dashboard.vue';
import AdminProducts from '@/views/admin/products/Products.vue';
import Categories from '@/views/admin/categories/Categories.vue';
import Blogs from '@/views/admin/blogs/Blogs.vue';
import Components from '@/views/admin/Components.vue';
import Profile from '@/views/admin/Profile.vue';
import Users from '@/views/admin/users/Users.vue';
import Login from '@/views/admin/auth/Login.vue';
import Register from '@/views/admin/auth/Register.vue';
import DefaultAdmin from '@/views/admin/DefaultAdmin.vue';
import Chat from '@/views/admin/Chat.vue';
import EditProduct from '@/views/admin/products/EditProduct.vue';
import EditBlogs from '@/views/admin/blogs/EditBlogs.vue';
import CreateProduct from '@/views/admin/products/CreateProduct.vue';
// import ProductCategories from '@/views/admin/products/ProductCategories.vue';
import BlogsCategories from '@/views/admin/blogs/BlogsCategories.vue';
// import PostBlog from '@/views/admin/blogs/PostBlog.vue';
import AdminProductsCategories from '@/views/admin/products/categories/ProductsCategories.vue';
import EditCategories from '@/views/admin/products/categories/EditCategory.vue';

import store from '../store/index.js';

// Define your routes
const routes = [
  // Admin routes
  {
    path: '/admin',
    component: AdminLayout,
    meta: { requiresAuth: true },
    children: [
      { path: '', component: Dashboard },
      {
        path: '/admin/dashboard',
        component: Dashboard,
        name: 'admin-dashboard',
      },
      {
        path: '/admin/products',
        name: 'admin-products',
        component: AdminProducts,
      },
      {
        path: '/admin/products',
        name: 'admin-products',
        component: AdminProducts,
      },
      { path: '/admin/categories', component: Categories },
      { path: '/admin/blogs', component: Blogs },
      { path: '/admin/components', component: Components },
      { path: '/admin/profile', component: Profile, name: 'admin-profile' },
      { path: '/admin/users', component: Users },
      { path: '/admin/default', component: DefaultAdmin },
      { path: '/admin/chat', component: Chat },
      // { path: '/admin/blogs/create/', component: PostBlog, name: 'admin-blogs-create',},
      {
        path: '/admin/products/edit/:id',
        component: EditProduct,
        name: 'admin-products-edit',
      },
      {
        path: '/admin/blogs/edit/:id',
        component: EditBlogs,
        name: 'admin-blogs-edit',
      },
      {
        path: '/admin/categories/edit/:id',
        component: EditCategories,
        name: 'admin-categories-edit',
      },
      // {
      //   path: '/admin/categories/edit/:id',
      //   component: EditCategories,
      //   name: 'admin-categories-edit',
      // },
      {
        path: '/admin/products/create',
        component: CreateProduct,
        name: 'admin-products-create',
      },
      {
        path: '/admin/products/categories',
        component: AdminProductsCategories,
        name: 'admin-products-categories',
      },
      {
        path: '/admin/products/categories/edit/:id',
        component: EditCategories,
        name: 'admin-products-categories-edit',
      },
    ],
  },
  // Auth routes
  {
    path: '/login',
    component: Login,
    meta: { requiresAuth: false },
  },
  {
    path: '/register',
    component: Register,
    meta: { requiresAuth: false },
  },
  // Default layout routes
  {
    path: '/',
    component: DefaultLayout,
    children: [
      { path: '/', name: 'home', component: SiteHome },
      { path: '/about', name: 'about', component: AboutView },
      { path: '/products', name: 'site-products', component: SiteProducts },
      { path: '/products/:id', name: 'site-product', component: SingleProduct },
      { path: '/blog', name: 'site-blog', component: SiteBlog },
      // {
      //   path: '/products/categories/:id',
      //   name: 'site-products-categories',
      //   component: SiteProductsCategories,
      // },
    ],
  },
  // Catch-all route for not found
  { path: '/:pathMatch(.*)*', name: 'not-found', component: NotFound },
];

// Create router instance
const history = createWebHistory();
const router = createRouter({
  history,
  routes,
});

// Navigation guard for authentication
router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    // Check if the route requires authentication
    if (store.getters.isAuthenticated) {
      // User is authenticated, allow access
      next();
    } else {
      // User is not authenticated, redirect to login page or handle as needed
      next('/login'); // Redirect to the login page
    }
  } else {
    // Route does not require authentication, allow access
    next();
  }
});

export default router;
