<template>
  <div>
    <form @submit.prevent="submitForm">
      <select v-model="nombre" required>
        <option v-for="producto in productos" :key="producto.nombre" :value="producto.nombre">
          {{ producto.nombre }}
        </option>
      </select>
      <input type="number" v-model="precio" placeholder="Nuevo Precio" required />
      <button type="submit">Actualizar Precio</button>
    </form>
    <ul>
      <li v-for="producto in productos" :key="producto.nombre">
        {{ producto.nombre }}: {{ producto.precio }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      nombre: '',
      precio: '',
      productos: []
    }
  },
  methods: {
    async submitForm() {
      try {
        const response = await fetch('https://bd-rosticeria.onrender.com/productos', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': prompt('Introduce la contraseña')
          },
          body: JSON.stringify({ nombre: this.nombre, precio: this.precio }) // Enviar datos
        });

        if (!response.ok) {
          throw new Error('Error en la solicitud de actualización');
        }

        // Obtener respuesta del servidor
        const data = await response.json();
        console.log('Respuesta del servidor:', data);

        // Actualizar la lista de productos y limpiar el formulario
        this.cargarProductos();
        this.nombre = '';
        this.precio = '';
      } catch (error) {
        console.error('Error al actualizar el precio:', error);
      }
    },
    async cargarProductos() {
      try {
        const response = await fetch('https://bd-rosticeria.onrender.com/productos');
        if (!response.ok) {
          throw new Error('Error al cargar los productos');
        }

        const data = await response.json();
        console.log('Productos cargados:', data);
        this.productos = data;
      } catch (error) {
        console.error('Error al cargar los productos:', error);
      }
    }
  },
  mounted() {
    this.cargarProductos();
  }
}
</script>

<style scoped>
/* Estilos para el formulario y los elementos del formulario */
form {
  margin-bottom: 20px;
}

input, select, button {
  display: block;
  margin: 10px 0;
  padding: 10px;
  width: 100%;
  max-width: 300px;
}
</style>
