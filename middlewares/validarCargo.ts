import { NextFunction, Request, Response } from "express";

export const isAdminRole = (req:Request, res:Response,next:NextFunction) =>{
    if (!req.usuario) {
        return res.status(500).json({
            msg: 'No existe Usuario con este token',
        })
    }
    const {dataValues, nombre} = req.usuario
    const {CargoId} =dataValues;

    
    if (CargoId !== 1) {
        return res.status(401).json({
            msg: `${nombre} No es administrador`,
        })
    }
    next();
}