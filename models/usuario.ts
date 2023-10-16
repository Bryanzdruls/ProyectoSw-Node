import {DataTypes} from 'sequelize';
import db from '../db/conexion';

const Usuario = db.define('Usuario',{
    nombre: {
        type: DataTypes.STRING,
        allowNull:false
    },
    apellido: {
        type: DataTypes.STRING,        
    },
    email:{
        type: DataTypes.STRING,
        allowNull:false
    },
    password:{
        type: DataTypes.STRING,
        allowNull:false
    },
    fechaNac:{
        type: DataTypes.DATE,
        allowNull:true
    },
    estado:{
        type: DataTypes.BOOLEAN,
        defaultValue:true
    }
},{
    tableName:'Usuario',
    timestamps:false
});


export default Usuario;