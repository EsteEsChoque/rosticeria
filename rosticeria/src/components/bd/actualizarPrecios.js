export default {
  name: 'ProductList',
  data() {
    return {
      productos: [],
      nombre: '',
      precio: '',
    };
  },
  methods: {
    // Método para cargar los productos desde el servidor
    async cargarProductos() {
      console.log('Cargando productos...');
      try {
        const response = await fetch('https://bd-rosticeria.onrender.com/productos');
        if (!response.ok) {
          throw new Error('Error al cargar los productos');
        }

        const data = await response.json();
        console.log('Productos recibidos:', data);
        this.productos = data; // Actualizar los productos en el estado
      } catch (error) {
        console.error('Error al cargar los productos:', error);
        alert('Hubo un problema al cargar los productos: ' + error.message);
      }
    },

    // Método para enviar el formulario y actualizar el precio de un producto
    async actualizarProducto() {
      if (!this.nombre || !this.precio) {
        alert('Por favor, completa ambos campos.');
        return;
      }

      if (isNaN(this.precio)) {
        alert('El precio debe ser un número.');
        return;
      }

      const password = prompt('Introduce la contraseña');
      if (!password) {
        alert('Por favor, introduce una contraseña.');
        return;
      }

      try {
        const response = await fetch('https://bd-rosticeria.onrender.com/productos', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': password,
          },
          body: JSON.stringify({ nombre: this.nombre, precio: this.precio }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Error al actualizar el producto');
        }

        const data = await response.json();
        console.log('Producto actualizado:', data);
        alert('Producto actualizado correctamente');
        this.cargarProductos(); // Recargar los productos después de la actualización
      } catch (error) {
        console.error('Error al actualizar el producto:', error);
        alert('Hubo un problema al actualizar el producto: ' + error.message);
      }
    },
  },
  mounted() {
    this.cargarProductos(); // Cargar los productos al montar el componente
  },
};