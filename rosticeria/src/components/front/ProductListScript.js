import com from '@/img/com.jpg';
import emp from '@/img/emp.jpg'; 
import piz from '@/img/piz.jpg';
import san from '@/img/san.jpg';
import fondo from '@/img/fondo.jpg';
import CategoryCard from './CategoryCard.vue';

export default {
  
  name: 'Footer',
  components: {
    CategoryCard,
  },
  data() {
    return {
      com,
      emp,
      piz,
      san,
      fondo,
      productos: [], // Lista de productos
    };
  },
  computed: {
    sanProductos() {
      return this.productos.filter(producto => producto.nombre.startsWith('san-'));
    },
    empProductos() {
      return this.productos.filter(producto => producto.nombre.startsWith('emp-'));
    },
    pizProductos() {
      return this.productos.filter(producto => producto.nombre.startsWith('piz-'));
    },
    comProductos() {
      return this.productos.filter(producto => producto.nombre.startsWith('com-'));
    },
  },
  methods: {
    // Método para cargar la lista de productos desde el servidor
    async cargarProductos() {
      try {
        const response = await fetch('https://bd-rosticeria.onrender.com/productos'); // Hacer una solicitud GET al servidor
        if (!response.ok) {
          throw new Error('Error al cargar los productos');
        }
        const data = await response.json(); // Convertir la respuesta a JSON
        console.log('Productos cargados:', data);
        this.productos = data; // Actualizar la lista de productos con los datos recibidos
      } catch (error) {
        console.error('Error al cargar los productos:', error);
      }
    },
  },
  // Ciclo de vida de Vue: cargar los productos al montar el componente
  mounted() {
    this.cargarProductos();
  },
};