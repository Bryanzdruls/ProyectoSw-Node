import db from './conexion';
import { Calificacion, Cargo, Categoria, Premio, Proveedor, Usuario } from '../models';
const relacionar = async() =>{
    //Relaciones
    Cargo.hasMany(Usuario);
    Usuario.belongsTo(Cargo);
    
    Calificacion.belongsTo(Usuario, {
        as:"UsuarioCalificado",
        foreignKey:'usuarioId'
    })
    //Usuario.hasMany(Calificacion);

    Premio.belongsTo(Categoria,{
        as:'CategoriaPremio',
        foreignKey:'categoriaId'
    })
    //Categoria.hasMany(Premio);

    Premio.belongsTo(Proveedor,{
        as:'ProveedorDelPremio',
        foreignKey:'proveedorId'
    })
    //Proveedor.hasMany(Premio);

    Premio.belongsTo(Usuario,{
        as:'UsuarioPremiado',
        foreignKey:'usuarioId'
    })
    //Usuario.hasMany(Premio);

    //PELIGROOOOOOOOO
   try {
        db.sync({alter:true}).then(()=>{
            console.log('Sincronizado');
        })
    } catch (error) {
        console.log(error);        
    }
   
}
export default relacionar;
