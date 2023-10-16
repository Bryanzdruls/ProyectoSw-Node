import jwt, { Secret } from 'jsonwebtoken';

export const generarJWT =(id:string) =>{
    return new Promise((resolve,reject)=>{
        const payload = {id};
        const key:Secret  = process.env.SECRET_KEY;

        jwt.sign(payload, key,{
            expiresIn:'4h',
        }, (err, token)=>{
            if (err) {
                console.log(err);
                reject("No se pudo generar el token");
            } else {
                resolve(token);
            }
        });
    })
}