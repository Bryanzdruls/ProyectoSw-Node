import {DataTypes} from 'sequelize';
import db from '../db/conexion';


const Categoria = db.define('Categoria',{
    nombreCategoria:{
        type:DataTypes.STRING,
        allowNull:false
    },
},{
    tableName:'Categoria',
    timestamps:false
});

export default Categoria;