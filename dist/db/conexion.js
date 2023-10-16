"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const db = new sequelize_1.Sequelize('postgresql://isytugmb:9cnAy_-S8JzKg56AM2gvDlsZ77EPbmW_@snuffleupagus.db.elephantsql.com/isytugmb', {
    logging: false
});
exports.default = db;
//# sourceMappingURL=conexion.js.map