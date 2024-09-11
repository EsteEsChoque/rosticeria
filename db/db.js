const { Sequelize } = require('sequelize');

// Configurar la conexión a la base de datos SQLite
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './mi_base_de_datos.db'
});

// Definir el modelo Producto
const Producto = sequelize.define('Producto', {
  nombre: {
    type: Sequelize.STRING,
    allowNull: false
  },
  precio: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
});

// Exportar la conexión y el modelo
module.exports = {
  conn: sequelize,
  Producto
};
