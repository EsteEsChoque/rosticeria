<template>
  <div id="app">
    
    <router-view/>
  </div>
</template>

<script>
export default {
  mounted() {
    this.verificarProductos();
  },
  methods: {
    async verificarProductos() {
      try {
        const response = await fetch('https://bd-rosticeria.onrender.com/productos', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        });

        if (!response.ok) {
          throw new Error('Error al obtener productos');
        }

        const productos = await response.json();

        // Si la respuesta es un array vacío, entonces ejecutamos el POST para cargar productos
        if (productos.length === 0) {
          this.cargarProductos();
        } else {
          console.log('Productos ya cargados:', productos);
        }
      } catch (error) {
        console.error('Error al verificar productos:', error);
      }
    },

    async cargarProductos() {
      try {
        const response = await fetch('https://bd-rosticeria.onrender.com/productos/cargar', {
          method: 'POST',
          headers: {
            'Authorization': 'casa1234',
            'Content-Type': 'application/json'
          }
        });

        if (!response.ok) {
          throw new Error('Error al cargar productos');
        }

        const data = await response.json();
        console.log('Productos cargados:', data);
      } catch (error) {
        console.error('Error al cargar productos:', error);
      }
    },

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
