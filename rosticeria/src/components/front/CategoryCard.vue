<template>
  <div class="cards-container">
    <div class="card">
      <div class="image-container">
        <img :src="image" alt="category image" class="category-image" />
        <div class="overlay">
          <h2>{{ title }}</h2>
        </div>
      </div>
      <ul>
        <li v-for="producto in productos" :key="producto.nombre">
          {{ quitarPrefijo(producto.nombre, prefix) }}: {{ producto.precio }}$
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true,
    },
    productos: {
      type: Array,
      required: true,
    },
    prefix: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
  },
  methods: {
    quitarPrefijo(nombre, prefijo) {
      return nombre.substring(prefijo.length);
    },
  },
}
</script>

<style scoped>
.cards-container {
  display: flex;
  flex-wrap: wrap; 
  justify-content: center; 
  gap: 16px; 
}
.card {
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 16px;
  text-align: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  margin: 16px auto;
  transition: transform 0.3s, box-shadow 0.3s;
  width: 300px; 
  height: auto; 
}

.card:hover {
  transform: scale(1.05);
  box-shadow: 0 8px 12px rgba(0, 0, 0, 0.2);
}

.image-container {
  position: relative;
  width: 100%;
  overflow: hidden;
  border-radius: 4px;
  border-radius: 4px;
}

.category-image {
  width: 100%;
  height: 150px;
  object-fit: cover;
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.5); 
  color: white;
  font-size: 1.5em;
  opacity: 0;
  transition: opacity 0.3s;
}

.image-container:hover .overlay {
  opacity: 1;
}

ul {
  list-style-type: none; 
  padding: 0; 
  margin: 0; 
}
</style>
