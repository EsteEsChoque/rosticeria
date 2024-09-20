<template>
  <div id="app">
    
    <router-view/>
  </div>
</template>

<script>
export default {
  methods: {
    seleccionar(evento) {
      const links = document.querySelectorAll('#links a');
      
      links.forEach(link => link.classList.remove('seleccionado'));
      
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

</style>
