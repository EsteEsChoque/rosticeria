<template>
  <div>
    <!-- Formulario para actualizar el precio de un producto -->
    <form @submit.prevent="submitForm">
      <!-- Menú desplegable para seleccionar un producto -->
      <select v-model="nombre" required>
        <!-- Opciones del menú generadas dinámicamente -->
        <option v-for="producto in productos" :key="producto.nombre" :value="producto.nombre">
          {{ producto.nombre }}
        </option>
      </select>
      <!-- Campo de entrada para el nuevo precio -->
      <input type="number" v-model="precio" placeholder="Nuevo Precio" required />
      <!-- Botón para enviar el formulario -->
      <button type="submit">Actualizar Precio</button>
    </form>
    <!-- Lista de productos y sus precios -->
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
      nombre: '', // Nombre del producto seleccionado
      precio: '', // Nuevo precio del producto
      productos: [] // Lista de productos
    }
  },
  methods: {
    // Método para manejar el envío del formulario
    async submitForm() {
      try {
        // Hacer una solicitud PUT al servidor para actualizar el precio
        const response = await fetch('http://localhost:3000/productos', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': prompt('Introduce la contraseña') // Solicitar contraseña
          },
          body: JSON.stringify({ nombre: this.nombre, precio: this.precio }) // Enviar datos
        });

        // Verificar si la solicitud fue exitosa
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
    // Método para cargar la lista de productos desde el servidor
    async cargarProductos() {
      try {
        // Hacer una solicitud GET al servidor
        const response = await fetch('http://localhost:3000/productos');
        if (!response.ok) {
          throw new Error('Error al cargar los productos');
        }

        // Obtener y actualizar la lista de productos
        const data = await response.json();
        console.log('Productos cargados:', data);
        this.productos = data;
      } catch (error) {
        console.error('Error al cargar los productos:', error);
      }
    }
  },
  // Ciclo de vida de Vue: cargar los productos al montar el componente
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
