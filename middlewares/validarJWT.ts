import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { Cargo, Usuario } from "../models";

export const validateJWT = async(req:Request, res:Response, next:NextFunction) =>{
    const token = req.header('x-token');
    if (!token) {
        return res.status(401).json({
            msg: 'No hay token en la peticion'
        })
    }
    try {       
        const {id} =jwt.verify( token, process.env.SECRET_KEY );
        const usuario = await Usuario.findOne({
            where:{
                id,
            },
            include: { model: Cargo }
        });
        //verificar user
        if (!usuario) {
            return res.status(401).json({
                msg: 'Usuario no existe'
            })
        }
        //Verificar si el uid no esta eliminado
        if (!usuario.estado) {
            return res.status(401).json({
                msg: 'Usuario deshabilitado'
            })
        }
        req.usuario = usuario;
        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({
            msg: 'Token No es valido'
        })
    }
}