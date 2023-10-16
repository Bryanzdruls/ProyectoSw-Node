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
const conexion_1 = __importDefault(require("./conexion"));
const models_1 = require("../models");
const relacionar = () => __awaiter(void 0, void 0, void 0, function* () {
    //Relaciones
    models_1.Cargo.hasMany(models_1.Usuario);
    models_1.Usuario.belongsTo(models_1.Cargo);
    models_1.Calificacion.belongsTo(models_1.Usuario, {
        as: "UsuarioCalificado",
        foreignKey: 'usuarioId'
    });
    //Usuario.hasMany(Calificacion);
    models_1.Premio.belongsTo(models_1.Categoria, {
        as: 'CategoriaPremio',
        foreignKey: 'categoriaId'
    });
    //Categoria.hasMany(Premio);
    models_1.Premio.belongsTo(models_1.Proveedor, {
        as: 'ProveedorDelPremio',
        foreignKey: 'proveedorId'
    });
    //Proveedor.hasMany(Premio);
    models_1.Premio.belongsTo(models_1.Usuario, {
        as: 'UsuarioPremiado',
        foreignKey: 'usuarioId'
    });
    //Usuario.hasMany(Premio);
    //PELIGROOOOOOOOO
    try {
        conexion_1.default.sync({ alter: true }).then(() => {
            console.log('Sincronizado');
        });
    }
    catch (error) {
        console.log(error);
    }
});
exports.default = relacionar;
//# sourceMappingURL=relaciones.js.map