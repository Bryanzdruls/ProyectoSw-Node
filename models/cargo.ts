import {DataTypes} from 'sequelize';
import db from '../db/conexion';

const Cargo = db.define('Cargo',{
    nombreCargo: {
        type: DataTypes.STRING,
        allowNull:false
    }
},{
    tableName:'Cargo',
    timestamps:false
});

export default Cargo;