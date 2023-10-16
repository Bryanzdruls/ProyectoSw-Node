import { Cargo } from "../models";
import Usuario from "../models/usuario";

export const emailValido = async (email='') =>{
    const emailExiste = await Usuario.findOne({
        where:{
            email,
        }
    });
    if (emailExiste) {
      throw new Error('Email ya existe en la base de datos.')
    }
}
export const cargoValido  = async(cargoId:any) =>{
    const cargoArr = await Cargo.findAll();
    let existeCargo= false;
    for (let i = 0; i < cargoArr.length; i++) {
        const cargo= cargoArr[i];
        const {dataValues} = cargo;
        
        if (dataValues.id === cargoId) {
            existeCargo = true;
        }
        
    }
    if (!existeCargo) {
        throw new Error('No existe ese cargo')
    }
}
export const idValido = async (id:number) =>{
    
    
    const existUser = await Usuario.findOne({
        where:{
            id,
        }
    });
    if (!existUser) {
      throw new Error("No existe Usuario con ese id")
    }
}