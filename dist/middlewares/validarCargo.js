"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAdminRole = void 0;
const isAdminRole = (req, res, next) => {
    if (!req.usuario) {
        return res.status(500).json({
            msg: 'No existe Usuario con este token',
        });
    }
    const { dataValues, nombre } = req.usuario;
    const { CargoId } = dataValues;
    if (CargoId !== 1) {
        return res.status(401).json({
            msg: `${nombre} No es administrador`,
        });
    }
    next();
};
exports.isAdminRole = isAdminRole;
//# sourceMappingURL=validarCargo.js.map