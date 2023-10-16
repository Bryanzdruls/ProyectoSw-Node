"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const usuario_1 = require("../../controllers/usuarios/usuario");
const middlewares_1 = require("../../middlewares");
const express_validator_1 = require("express-validator");
const helpers_1 = require("../../helpers");
const validarCargo_1 = require("../../middlewares/validarCargo");
const router = (0, express_1.Router)();
router.get("/", usuario_1.getUsuarios);
router.get("/:id", [
    (0, express_validator_1.check)('id').notEmpty(),
    (0, express_validator_1.check)('id').custom(helpers_1.idValido),
    middlewares_1.validarCampos,
], usuario_1.getUsuario);
router.post("/", [
    middlewares_1.validateJWT,
    validarCargo_1.isAdminRole,
    (0, express_validator_1.check)('nombre', 'Name is a must').not().isEmpty(),
    (0, express_validator_1.check)('password', 'password is a must min 6 characteres').isLength({ min: 6 }),
    (0, express_validator_1.check)('email', 'Email is not valid').isEmail(),
    (0, express_validator_1.check)('email').custom(helpers_1.emailValido),
    //check('cargoId').custom( cargoValido ),
    middlewares_1.validarCampos
], usuario_1.crearUsuario);
router.put("/:id", [
    (0, express_validator_1.check)('id').notEmpty(),
    (0, express_validator_1.check)('id').custom(helpers_1.idValido),
    (0, express_validator_1.check)('nombre', 'Name is a must').not().isEmpty(),
    (0, express_validator_1.check)('password', 'password is a must min 6 characteres').isLength({ min: 6 }),
    (0, express_validator_1.check)('cargoId').custom(helpers_1.cargoValido),
    middlewares_1.validarCampos,
], usuario_1.actualizarUsuario);
router.delete("/:id", [
    middlewares_1.validateJWT,
    validarCargo_1.isAdminRole,
    (0, express_validator_1.check)('id').notEmpty(),
    (0, express_validator_1.check)('id').custom(helpers_1.idValido),
    middlewares_1.validarCampos
], usuario_1.borrarUsuario);
exports.default = router;
//# sourceMappingURL=usuario.js.map