<template>
  <div id="app">
    <nav id="nav">
      <ul id="links">
      <li><a href="#inicio" class="nav-link" @click="seleccionar($event)">INICIO</a></li>
      <li><a href="#comidas" class="nav-link" @click="seleccionar($event)">COMIDAS</a></li>
      <li><a href="#dondeestamos" class="nav-link" @click="seleccionar($event)">DONDE ESTAMOS</a></li>
      <li><a href="#contacto" class="nav-link" @click="seleccionar($event)">CONTACTO</a></li>
    </ul>
    </nav>
    <router-view/>
  </div>
</template>

<script>
export default {
  methods: {
    seleccionar(evento) {
      // Selecciona todos los links dentro del elemento con id="links"
      const links = document.querySelectorAll('#links a');
      
      // Remueve la clase 'seleccionado' de todos los links
      links.forEach(link => link.classList.remove('seleccionado'));
      
      // Añade la clase 'seleccionado' al link que fue clickeado
      evento.target.classList.add('seleccionado');
    }
  }
}
</script>

<style scoped>

#app {
  
  width: 100%;
  margin: 0;
  padding: 0;
  margin-left: -8px;
  margin-top: -20px
}
.background {
  background-size: 100% auto; /* Asegura que cubra el 100% del ancho */
}
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@200;400;600&display=swap');
*{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Montserrat';
}

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
@media (max-width: 400px) {
    nav ul li a, nav ul li .nav-link {
        font-size: 12px; /* Tamaño de fuente más pequeño para pantallas pequeñas */
    }
}
</style>
