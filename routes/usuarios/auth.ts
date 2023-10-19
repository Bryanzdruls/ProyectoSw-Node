import { Router } from "express";
import { login, revalidarToken } from "../../controllers/usuarios/auth";
import { validarCampos, validateJWT } from "../../middlewares";
import { check } from 'express-validator';



const router = Router();


router.post(['/','/login'],[
    check('email', 'Email is a must').isEmail(),
    check('password', 'password is a must').not().isEmpty().isLength({ min:6 }),
    validarCampos,
], login);
router.get('/renovar',validateJWT, revalidarToken); 
export default router;