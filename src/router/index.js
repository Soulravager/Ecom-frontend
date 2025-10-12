import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/home.vue";
import About from "../views/About.vue";
import Contact from "../views/contact.vue";

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
