import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import About from "../views/About.vue";
import Contact from "../views/Contact.vue";
import Product from "../views/Product.vue";
import Login from "../views/Login.vue";
import UserAccount from "../views/UserAccount.vue";
import Admin from "../views/Admin.vue";
import ProductShow from "../components/product/ProductShow.vue";
import Payment from "../views/Payment.vue";
import Cart from "../views/Cart.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
  },
  {
    path: "/about",
    name: "about",
    component: About,
  },
  { path: "/contact", name: "contact", component: Contact },
  { path: "/product", name: "product", component: Product },
  { path: "/item/:id", name: "ProductShow", component: ProductShow },
  {
    path: "/login",
    name: "Login",
    component: Login,
    meta: { requiresGuest: true },
  },
  {
    path: "/cart",
    name: "Cart",
    component: Cart,
    meta: { requiresAuth: true },
  },

  {
    path: "/admin",
    name: "Admin",
    component: Admin,
    meta: { requiresAuth: true, requiresAdminOrStaff: true },
  },
  {
    path: "/payment",
    name: "Payment",
    component: Payment,
    meta: { requiresAuth: true },
  },

  {
    path: "/profile",
    name: "profile",
    component: UserAccount,
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
  const userData = localStorage.getItem("user");
  const user = userData ? JSON.parse(userData) : null;
  const roleSlug = user?.role?.slug;

  if (to.meta.requiresAuth && !token) {
    return next("/login");
  }

  if (to.meta.requiresGuest && token) {
    return next("/");
  }

  if (to.meta.requiresAdminOrStaff) {
    if (roleSlug === "admin" || roleSlug === "staff") {
      return next();
    } else {
      alert("Access denied!.");
      return next("/");
    }
  }

  next();
});

export default router;
