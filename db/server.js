const express = require('express');
const { Sequelize, DataTypes } = require('sequelize');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
const cors = require('cors');

// Cargar variables de entorno desde el archivo .env
dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Conectar a la base de datos SQLite en disco
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './mi_base_de_datos.db',
    logging: false,
});

const Producto = sequelize.define('Producto', {
    nombre: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    precio: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    timestamps: true,
});

// Middleware de autenticación
const passwordHash = bcrypt.hashSync(process.env.PASSWORD, 10);

function authenticate(req, res, next) {
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
        return res.status(403).json({ message: 'Forbidden1' });
    }

    if (bcrypt.compareSync(authHeader, passwordHash)) {
        next();
    } else {
        res.status(403).json({ message: 'Forbidden2' });
    }
}


// Endpoint para obtener todos los productos
app.get('/productos', async (req, res) => {
    try {
        const productos = await Producto.findAll();
        res.json(productos);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error al cargar los productos' });
    }
});

// Endpoint para actualizar el precio de un producto
app.put('/productos', authenticate, async (req, res) => {
    const { nombre, precio } = req.body;
    try {
        const [updated] = await Producto.update({ precio }, {
            where: { nombre },
        });
        if (updated) {
            res.json({ message: 'Precio actualizado' });
        } else {
            res.status(404).json({ message: 'Producto no encontrado' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error al actualizar el precio' });
    }
});

// Endpoint para vaciar la base de datos
app.delete('/productos', authenticate, async (req, res) => {
    try {
        await Producto.destroy({
            where: {},
            truncate: true
        });
        res.json({ message: 'Todos los productos han sido eliminados' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error al vaciar la base de datos' });
    }
});

// Nueva ruta para cargar la base de datos con los productos iniciales
app.post('/productos/cargar', authenticate, async (req, res) => {
    const productosIniciales = [
        { nombre: 'san- lechuga tomate', precio: 6000 },
        { nombre: 'san- lechuga tomate, huevo queso', precio: 7000 },
        { nombre: 'emp- pollo, jamon y queso doc', precio: 5500 },
        { nombre: 'emp- pollo, jamon y queso media doc', precio: 3000 },
        { nombre: 'emp- pollo, jamon y queso c/u', precio: 500 },
        { nombre: 'piz- muzzarella', precio: 4500 },
        { nombre: 'piz- tomate y jamon', precio: 5500 },
        { nombre: 'piz- jamon y morron', precio: 6000 },
        { nombre: 'piz- huevo', precio: 5000 },
        { nombre: 'piz- jamon', precio: 5000 },
        { nombre: 'com- pure con milanesa', precio: 4500 },
        { nombre: 'com- ensalada con milanesa', precio: 5000 },
        { nombre: 'com- napolita con papafritas', precio: 5800 }
    ];

    try {
        await Producto.bulkCreate(productosIniciales, { ignoreDuplicates: true });
        res.json({ message: 'Productos iniciales cargados exitosamente' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error al cargar los productos iniciales' });
    }
});

// Servir archivos estáticos
app.use(express.static('public'));

// Iniciar el servidor
const PORT = process.env.PORT || 3000;
sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
});
