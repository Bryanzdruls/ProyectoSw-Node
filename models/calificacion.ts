import {DataTypes} from 'sequelize';
import db from '../db/conexion';

const Calificacion = db.define('Calificacion',{
    cuantitativa: {
        type: DataTypes.INTEGER,
        allowNull:false
    },
    descripcion:{
        type:DataTypes.STRING,
        allowNull:false
    },
    idEmpleadoACalificar:{
        type:DataTypes.INTEGER,
        allowNull:false
    }
},{
    timestamps:false,
    tableName:'Calificacion'
});

export default Calificacion;