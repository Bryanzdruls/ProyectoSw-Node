"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const conexion_1 = __importDefault(require("../db/conexion"));
const Proveedor = conexion_1.default.define('Proveedor', {
    nombreProveedor: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: 'Proveedor',
    timestamps: false
});
exports.default = Proveedor;
//# sourceMappingURL=proveedor.js.map