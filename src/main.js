import { createApp } from "vue";
import { createRouter, createWebHistory } from "vue-router";
import "./style.css";
import App from "./App.vue";
import Products from "./components/Products.vue";
import BrandDetails from "./views/BrandDetails.vue";
import ProductDetails from "./views/ProductDetails.vue";

const routes = [
  { path: "/", component: Products },
  { path: "/brand/:brandName", component: BrandDetails },
  { path: "/products/:brand/:title", component: ProductDetails },
];

const router = createRouter({
  // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
  history: createWebHistory(),
  routes, // short for `routes: routes`
});

createApp(App).use(router).mount("#app");
