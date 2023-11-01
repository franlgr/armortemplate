import { createRouter, createWebHistory } from 'vue-router';

// Import your site views
import SiteHome from '@/views/site/SiteHome.vue';
import AboutView from '@/views/site/AboutView.vue';
import SiteProducts from '@/views/site/products/Products.vue';
import SingleProduct from '@/views/site/products/SingleProduct.vue';
import NotFound from '@/views/NotFound.vue';
import SiteBlog from '@/views/site/blogs/Blog.vue';
import SiteEvents from '@/views/site/events/Events.vue';
import SingleEvent from '@/views/site/events/SingleEvent.vue';
import SingleBlog from '@/views/site/blogs/SingleBlog.vue';
import Checkout from '@/views/site/products/Checkout.vue';
import SiteUsers from '@/views/site/users/SiteUsers.vue';
import SingleUser from '@/views/site/users/SingleUser.vue';
import Pricing from '@/views/site/Pricing.vue';
import Sites from '@/views/site/sites/Sites.vue';
import SiteSingle from '@/views/site/sites/SingleSite.vue';
import Offer from '@/views/site/Offer.vue';
import Support from '@/views/site/support/SupportContact.vue';

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
import AdminProductsCategories from '@/views/admin/products/categories/ProductsCategories.vue';
import EditProductCategories from '@/views/admin/products/categories/EditCategory.vue';
import AllProducts from '@/views/admin/products/AllProducts.vue';
import AdminBlogsCategories from '@/views/admin/blogs/categories/BlogsCategories.vue';
import EditBlogCategories from '@/views/admin/blogs/categories/EditCategoryBlogs.vue';
import AllBlogs from '@/views/admin/blogs/AllBlogs.vue';
import SettingsPro from '@/views/admin/settings/SettingsPro.vue';
import Applications from '@/views/admin/applications/Applications.vue';
import CreateApplication from '@/views/admin/applications/CreateApplication.vue';

import HtmlEditor from '@/views/admin/HtmlEditor.vue';

import Scraping from '@/views/admin/scraping/ScrapingConfigs.vue'



//// IImport your store
import CreateEvent from '@/views/admin/events/CreateEvent.vue';
import EditEvent from '@/views/admin/events/EditEvent.vue';
import Events from '@/views/admin/events/Events.vue';
import EventsCategories from '@/views/admin/events/categories/EventsCategories.vue';
import EditEventsCategories from '@/views/admin/events/categories/EditCategory.vue';
import CreateEventsCategories from '@/views/admin/events/categories/CreateCategory.vue';
import CreateBlog from '@/views/admin/blogs/CreateBlog.vue';
import CreateBlogCategory from '@/views/admin/blogs/categories/CreateCategory.vue';

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
        path: '/admin/settings',
        name: 'settings-pro',
        component: SettingsPro,
      },
      {
        path: '/admin/scraping',
        name: 'admin-scraping',
        component: Scraping,
      },
      {
        path: '/admin/products/all',
        component: AllProducts,
        name: 'admin-products-all',
      },
      { path: '/admin/categories', component: Categories },
      { path: '/admin/blogs', component: Blogs, name: 'admin-blogs' },
      {
        path: '/admin/blogs/allblogs',
        component: AllBlogs,
        name: 'admin-allblogs',
      },
      { path: '/admin/components', component: Components },
      { path: '/admin/profile', component: Profile, name: 'admin-profile' },
      { path: '/admin/users', component: Users },
      { path: '/admin/default', component: DefaultAdmin },
      { path: '/admin/chat', component: Chat },
      { path: '/admin/events', component: Events, name: 'admin-events' },

      {
        path: '/admin/events/create',
        component: CreateEvent,
        name: 'admin-events-create',
      },
      {
        path: '/admin/events/edit/:id',
        component: EditEvent,
        name: 'admin-events-edit',
      },
      {
        path: '/admin/events/categories',
        component: EventsCategories,
        name: 'admin-events-categories',
      },
      {
        path: '/admin/events/categories/edit/:id',
        component: EditEventsCategories,
        name: 'admin-events-categories-edit',
      },
      {
        path: '/admin/events/categories/create',
        component: CreateEventsCategories,
        name: 'admin-events-categories-create',
      },
      // { path: '/admin/blogs/categories', component: BlogsCategories, name: 'admin-blogs-categories' },
      {
        path: '/admin/blogs/create/',
        component: CreateBlog,
        name: 'admin-blogs-create',
      },
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
      // {
      //   path: '/admin/categories/edit/:id',
      //   component: EditProductCategories,
      //   name: 'admin-categories-edit',
      // },
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
        component: EditProductCategories,
        name: 'admin-products-categories-edit',
      },
      {
        path: '/admin/blogs/categories',
        component: AdminBlogsCategories,
        name: 'admin-blogs-categories',
      },
      {
        path: '/admin/blogs/categories/edit/:id',
        component: EditBlogCategories,
        name: 'admin-blogs-categories-edit',
      },
      {
        path: '/admin/blogs/categories/create',
        component: CreateBlogCategory,
        name: 'admin-blogs-categories-create',
      },
      {
        path: '/admin/applications',
        component: Applications,
        name: 'admin-applications',
      },
      {
        path: '/admin/applications/create',
        component: CreateApplication,
        name: 'admin-applications-create',
      },
     
    ],
  },
  {
    path: '/admin/html-editor',
    component: HtmlEditor,
    name: 'admin-html-editor',
  },
  // Auth routes
  {
    path: '/login',
    component: Login,
    name: 'login',
    meta: { requiresAuth: false },
  },
  {
    path: '/register',
    component: Register,
    name: 'register',
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
      { path: '/blogs', name: 'site-blogs', component: SiteBlog },
      { path: '/blog/:id', name: 'site-blog', component: SingleBlog },
      { path: '/events', name: 'site-events', component: SiteEvents },
      { path: '/support', name: 'support', component: Support },
      //single
      { path: '/events/:id', name: 'site-event', component: SingleEvent },
      {
        path: '/products/checkout',
        name: 'site-products-checkout',
        component: Checkout,
      },
      { path: '/users', name: 'site-users', component: SiteUsers },
      { path: '/users/:id', name: 'site-user', component: SingleUser },
      { path: '/pricing', name: 'site-pricing', component: Pricing },
      { path: '/sites', name: 'site-sites', component: Sites },
      { path: '/sites/:id', name: 'site-site', component: SiteSingle },

      // { path: '/products/categories', name: 'site-products-categories', component: SiteProductsCategories },
      // {
      //   path: '/products/categories/:id',
      //   name: 'site-products-categories',
      //   component: SiteProductsCategories,
      // },
    ],
  },
  { path: '/offer', name: 'site-offer', component: Offer },
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
