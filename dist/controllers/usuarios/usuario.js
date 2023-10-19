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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.borrarUsuario = exports.actualizarUsuario = exports.crearUsuario = exports.getUsuario = exports.getUsuarios = void 0;
const usuario_1 = __importDefault(require("../../models/usuario"));
const bcryptjs_1 = require("bcryptjs");
const models_1 = require("../../models");
const nodeEmail_1 = require("../../helpers/nodeEmail");
const getUsuarios = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const usuarios = yield usuario_1.default.findAll({
            where: {
                estado: true,
            },
            include: { model: models_1.Cargo }
        });
        res.status(200).json({
            usuarios,
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: "Error interno del servidor, comunicarse con BRIAN"
        });
    }
});
exports.getUsuarios = getUsuarios;
const getUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const usuarios = yield usuario_1.default.findOne({
            where: {
                id,
                estado: true,
            },
            include: { model: models_1.Cargo }
        });
        res.status(200).json({
            usuarios,
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: "Error interno del servidor, comunicarse con BRIAN"
        });
    }
});
exports.getUsuario = getUsuario;
const crearUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { nombre, apellido, email, password, fechaNac, CargoId, emailCred } = req.body;
    const salt = (0, bcryptjs_1.genSaltSync)(10);
    const passwordEncriptada = (0, bcryptjs_1.hashSync)(password, salt);
    try {
        const usuario = yield usuario_1.default.create({
            nombre,
            apellido,
            email,
            password: passwordEncriptada,
            fechaNac: !!fechaNac ? fechaNac : new Date(),
            CargoId
        });
        yield nodeEmail_1.transporter.sendMail({
            from: '"Admin Greco S.A 👻" <eltiobryanz@gmail.com>',
            to: emailCred,
            subject: "Credenciales para el acceso a la plataforma",
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
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: "Error interno del servidor, comunicarse con BRIAN"
        });
    }
});
exports.crearUsuario = crearUsuario;
const actualizarUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { nombre, apellido, email, password, fechaNac, cargoId } = req.body;
    const salt = (0, bcryptjs_1.genSaltSync)(10);
    const passwordEncriptada = (0, bcryptjs_1.hashSync)(password, salt);
    try {
        yield usuario_1.default.update({
            nombre,
            apellido,
            password: passwordEncriptada,
            fechaNac: !!fechaNac ? fechaNac : new Date(),
            cargoId
        }, {
            where: {
                id,
            }
        });
        const usuario = yield usuario_1.default.findOne({
            where: {
                id,
            }
        });
        //Encriptar Contraseña
        return res.status(200).json({
            msg: 'usuario actualizado correctamente',
            usuario,
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: "Error interno del servidor, comunicarse con BRIAN"
        });
    }
});
exports.actualizarUsuario = actualizarUsuario;
const borrarUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        yield usuario_1.default.update({
            estado: false
        }, {
            where: {
                id,
            }
        });
        const usuario = yield usuario_1.default.findOne({
            where: {
                id,
            }
        });
        //Encriptar Contraseña
        return res.status(200).json({
            msg: 'usuario borrado correctamente',
            usuario,
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: "Error interno del servidor, comunicarse con BRIAN"
        });
    }
});
exports.borrarUsuario = borrarUsuario;
//# sourceMappingURL=usuario.js.map