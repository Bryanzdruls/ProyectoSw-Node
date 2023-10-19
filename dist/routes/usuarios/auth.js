"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../../controllers/usuarios/auth");
const middlewares_1 = require("../../middlewares");
const express_validator_1 = require("express-validator");
const router = (0, express_1.Router)();
router.post(['/', '/login'], [
    (0, express_validator_1.check)('email', 'Email is a must').isEmail(),
    (0, express_validator_1.check)('password', 'password is a must').not().isEmpty().isLength({ min: 6 }),
    middlewares_1.validarCampos,
], auth_1.login);
router.get('/renovar', middlewares_1.validateJWT, auth_1.revalidarToken);
exports.default = router;
//# sourceMappingURL=auth.js.map