import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/home.vue";
import About from "../views/About.vue";
import Contact from "../views/contact.vue";
import Product from "../views/Product.vue";
import Login from "../views/Login.vue";
import UserProfile from "../components/User/UserProfile.vue";
import Admin from "../views/Admin.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/about",
    name: "About",
    component: About,
  },
  { path: "/contact", name: "Contact", component: Contact },
  { path: "/product", name: "Product", component: Product },
  {
    path: "/login",
    name: "Login",
    component: Login,
    meta: { requiresGuest: true },
  },
  {
    path: "/admin",
    name: "Admin",
    component: Admin,
    meta: { requiresAuth: true },
  },

  {
    path: "/profile",
    name: "Profile",
    component: UserProfile,
    meta: { requiresAuth: true },
  },

  {
    path: "/:pathMatch(.*)*",
    redirect: "/",
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem("authToken");

  if (to.meta.requiresAuth && !token) {
    next("/login");
  } else if (to.meta.requiresGuest && token) {
    next("/");
  } else {
    next();
  }
});

export default router;
