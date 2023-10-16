import {DataTypes} from 'sequelize';
import db from '../db/conexion';


const Proveedor = db.define('Proveedor',{
    nombreProveedor: {
        type: DataTypes.STRING,
        allowNull:false
    }
},{
    tableName:'Proveedor',
    timestamps:false
});

export default Proveedor;