import {DataTypes} from 'sequelize';
import db from '../db/conexion';
import Proveedor from './proveedor';
import Usuario from './usuario';
import Categoria from './categoria';


const Premio = db.define('Premio',{
    fechaEntregaPremio: {
        type: DataTypes.DATE,
        allowNull:false
    }
},{
    timestamps:false,
    tableName:"Premio"
});


export default Premio;