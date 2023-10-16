"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = void 0;
const models_1 = require("../../models");
const bcryptjs_1 = require("bcryptjs");
const helpers_1 = require("../../helpers");
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const usuario = yield models_1.Usuario.findOne({
            where: {
                email,
            }
        });
        //Se valida que el usuario Exista
        if (!usuario) {
            return res.status(400).json({
                msg: 'El usuario con ese email no existe'
            });
        }
        //Se valida que el usuario se encuentre activo
        if (!usuario.estado) {
            return res.status(400).json({
                msg: 'El usuario se encuentra inhabilitado'
            });
        }
        //Se valida que la contraseña este correcta
        const validPassword = (0, bcryptjs_1.compareSync)(password, usuario.password);
        if (!validPassword) {
            return res.status(400).json({
                msg: 'La contraseña no es valida'
            });
        }
        //Se genera el JWT
        const token = yield (0, helpers_1.generarJWT)(usuario.id);
        res.json({
            msg: 'Login Ok',
            usuario,
            token
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: 'Error interno del servidor, comunicarse con BRIAN'
        });
    }
});
exports.login = login;
//# sourceMappingURL=auth.js.map