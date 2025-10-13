import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/home.vue";
import About from "../views/About.vue";
import Contact from "../views/contact.vue";
import Product from "../views/Product.vue";

const routes = [
  {
    path: "/home",
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
    path: "/",
    redirect: "/home",
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
