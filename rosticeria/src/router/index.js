import Vue from 'vue';
import Router from 'vue-router';
import Home from '../views/actualizarPrecios.vue';
import Products from '../views/Products.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/home',
      name: 'Home',
      component: Home
    },
    {
      path: '/',
      name: 'Products',
      component: Products
    }
  ]
});
