import { createRouter, createWebHistory } from 'vue-router';
import actualizarPrecios from './views/actualizarPrecios.vue';
import ProductList from './views/Products.vue'; // Importar el componente ProductList

const routes = [
  {
    path: '/actualizarPrecios',
    name: 'actualizarPrecios',
    component: actualizarPrecios,
  },
  {
    path: '/',
    name: 'ProductList',
    component: ProductList,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
