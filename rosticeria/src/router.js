import { createRouter, createWebHistory } from 'vue-router';
import Home from './views/Home.vue';
import ProductList from './views/Products.vue'; // Importar el componente ProductList

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/products',
    name: 'ProductList',
    component: ProductList,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
