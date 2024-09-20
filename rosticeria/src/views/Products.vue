<template>
  <nav id="nav">
      <ul id="links">
      <li><a href="#inicio" class="nav-link" @click="seleccionar($event)">INICIO</a></li>
      <li><a href="#comidas" class="nav-link" @click="seleccionar($event)">COMIDAS</a></li>
      <li><a href="#dondeestamos" class="nav-link" @click="seleccionar($event)">DONDE ESTAMOS</a></li>
      <li><a href="#contacto" class="nav-link" @click="seleccionar($event)">CONTACTO</a></li>
      <li><router-link to="/actualizarPrecios">ADMIN</router-link></li>
    </ul>
    </nav>
  <ProductList />
</template>

<script>
import ProductList from '../components/ProductList.vue';

export default {
  name: 'ProductListPage',
  components: {
    ProductList
  }
}
</script>

<style scoped>

nav {
    background-color: rgba(0,0,0,.8);
    position: fixed;
    width: 100%;
    z-index: 100;
    top: 0;
    padding-right: 20px;
}

nav ul {
    max-width: 1100px;
    margin: auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px 15px;
    list-style: none;
    
}

nav ul li {
    margin: 0 12px;
}

nav ul li a, nav ul li .nav-link {
    text-decoration: none;
    color: #fff;
    font-weight: 400;
    transition: .5s;
}

nav ul li a:hover, nav ul li .nav-link:hover {
    color: rgb(21, 35, 236);
}

nav ul li a.seleccionado, nav ul li .nav-link.seleccionado {
    color: rgb(21, 35, 236);
}
@media (max-width: 600px) {
    nav ul li a, nav ul li .nav-link {
        font-size: 12px;
    }
}

@media (max-width: 420px) {
    nav ul {
        justify-content: center;
        
    }

    nav ul li {
      
        margin: 0 5px;
    }

}
</style>
