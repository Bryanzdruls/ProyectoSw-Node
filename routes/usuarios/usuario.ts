import {Router} from 'express';
import { actualizarUsuario, borrarUsuario, crearUsuario, getUsuario, getUsuarios } from '../../controllers/usuarios/usuario';
import { validarCampos, validateJWT } from '../../middlewares';
import { check } from 'express-validator';
import { cargoValido, emailValido, idValido } from '../../helpers';
import { isAdminRole } from '../../middlewares/validarCargo';
const router = Router();

router.get("/", getUsuarios);
router.get("/:id",[
    check('id').notEmpty(),
    check('id').custom( idValido ),
    validarCampos,
], getUsuario);

router.post("/",[
    validateJWT,
    isAdminRole,
    check('nombre','Name is a must').not().isEmpty(),
    check('password','password is a must min 6 characteres').isLength({ min:6 }),
    check('email','Email is not valid').isEmail(),
    check('email').custom( emailValido),
    //check('cargoId').custom( cargoValido ),
    validarCampos
], crearUsuario);

router.put("/:id",[
    check('id').notEmpty(),
    check('id').custom( idValido ),
    check('nombre','Name is a must').not().isEmpty(),
    check('password','password is a must min 6 characteres').isLength({ min:6 }),
    check('cargoId').custom( cargoValido),
    validarCampos,
],actualizarUsuario);

router.delete("/:id",[
    validateJWT,
    isAdminRole,
    check('id').notEmpty(),
    check('id').custom( idValido ),
    validarCampos
], borrarUsuario);

export default router;