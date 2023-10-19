import {Request,Response} from 'express';
import Usuario from '../../models/usuario';
import {genSaltSync,hashSync} from 'bcryptjs';
import { Cargo } from '../../models';
import nodemailer from 'nodemailer';
import { transporter } from '../../helpers/nodeEmail';

export const getUsuarios = async(req:Request, res:Response) => {
    try {
        const usuarios = await Usuario.findAll({
            where:{
                estado:true,
            },
            include: { model: Cargo }
        });
        res.status(200).json({
            usuarios,
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg:"Error interno del servidor, comunicarse con BRIAN"
        })
    }
}
export const getUsuario = async(req:Request,res:Response) =>{
    const {id} = req.params;
    try {
        const usuarios = await Usuario.findOne({
            where:{
                id,
                estado:true,
            },
            include: { model: Cargo }
        });
        res.status(200).json({
            usuarios,
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg:"Error interno del servidor, comunicarse con BRIAN"
        })
    }
}
export const crearUsuario = async(req:Request, res:Response) => {
    
    const {nombre, apellido, email, password, fechaNac, CargoId, emailCred} = req.body;
    const salt = genSaltSync(10);
    const passwordEncriptada = hashSync( password, salt );
    
    
    try {
        const usuario = await Usuario.create({
            nombre,
            apellido,
            email,
            password: passwordEncriptada,
            fechaNac: !!fechaNac ? fechaNac:new Date(),
            CargoId
        })
        
        
        await transporter.sendMail({
            from: '"Admin Greco S.A 👻" <eltiobryanz@gmail.com>', // sender address
            to: emailCred, // list of receivers
            subject: "Credenciales para el acceso a la plataforma", // Subject line
            
            html: `
            <h1> Buenos dias señor/a ${nombre}</h1>
            <b> Para ingresar al aplicativo acontinuacion le pasare las credenciales de acceso UNICAS e intrasferibles
                Email Empresa: ${email}
                Contraseña: ${password}
            </b>
            `, // html body
          });
        return res.status(200).json({
            msg: 'usuario creado correctamente',
            usuario,
            emailCred
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg:"Error interno del servidor, comunicarse con BRIAN"
        })
    }
}
export const actualizarUsuario = async(req:Request, res:Response) =>{
    const {id} =req.params
    const {nombre, apellido, email, password, fechaNac, cargoId } = req.body;
    const salt = genSaltSync(10);
    const passwordEncriptada = hashSync( password, salt );
    try {
        await Usuario.update({
            nombre,
            apellido,
            password: passwordEncriptada,
            fechaNac: !!fechaNac ? fechaNac:new Date(),
            cargoId
        },{
            where:{
                id,
            }
        })
        const usuario = await Usuario.findOne({
            where:{
                id,
            }
        })
        //Encriptar Contraseña
        return res.status(200).json({
            msg: 'usuario actualizado correctamente',
            usuario,
            
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg:"Error interno del servidor, comunicarse con BRIAN"
        })
    }
}
export const borrarUsuario = async(req:Request, res:Response) =>{
    const {id} =req.params
    try {
        await Usuario.update({
            estado:false
        },{
            where:{
                id,
            }
        })
        const usuario = await Usuario.findOne({
            where:{
                id,
            }
        })
        //Encriptar Contraseña
        return res.status(200).json({
            msg: 'usuario borrado correctamente',
            usuario,         
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg:"Error interno del servidor, comunicarse con BRIAN"
        })
    }
}