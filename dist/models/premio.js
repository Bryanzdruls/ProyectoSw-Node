"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const conexion_1 = __importDefault(require("../db/conexion"));
const Premio = conexion_1.default.define('Premio', {
    fechaEntregaPremio: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false
    }
}, {
    timestamps: false,
    tableName: "Premio"
});
exports.default = Premio;
//# sourceMappingURL=premio.js.map