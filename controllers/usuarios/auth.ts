import { Request,Response } from "express";
import { Usuario } from "../../models";
import {compareSync} from 'bcryptjs'
import { generarJWT } from "../../helpers";

export const login = async(req:Request, res:Response) =>{
    const {email, password} = req.body;
    
    try {
        const usuario = await Usuario.findOne({
            where:{
                email,
            }
        });
        //Se valida que el usuario Exista
        if (!usuario) {
            return res.status(400).json({
                msg: 'El usuario con ese email no existe'
            })
        }
        //Se valida que el usuario se encuentre activo
        if (!usuario.estado) {
            return res.status(400).json({
                msg: 'El usuario se encuentra inhabilitado'
            })
        }

        //Se valida que la contraseña este correcta
        const validPassword = compareSync(password, usuario.password);
        if (!validPassword) {
            return res.status(400).json({
                msg: 'La contraseña no es valida'
            })
        }

        //Se genera el JWT
        const token  = await generarJWT(usuario.id);
        res.json({
            msg: 'Login Ok',
            usuario,
            token
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: 'Error interno del servidor, comunicarse con BRIAN'
        })
    }
}
export const revalidarToken = async(req:Request,res:Response) => {
    const {usuario} = req;
    

    //generar nuevo token y retornarlo
    const token =  await generarJWT(usuario.id);
    res.json({
        ok:true,
        usuario, 
        token
    })
};