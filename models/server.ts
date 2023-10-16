import express, {Application} from 'express'
import db from '../db/conexion';
import cors from 'cors'
import * as usuarioRouter from '../routes/usuarios/usuario';
import * as authRouter from '../routes/usuarios/auth'
import relacionar from '../db/relaciones';


export class Server {
    private app: Application;
    private port: string;
    private rutas ={
        usuarios: '/api/usuarios',
        auth: '/api/auth',
    };
    constructor(){
        this.app =express();
        this.port =process.env.PORT || '8000';
        //db
        this.conexion();
        //middlewares
        this.middlewares();
        //rutas
        this.routes();
        
    }
    middlewares(){
        
        //Cors
        this.app.use(cors());
         // Lectura del body
        this.app.use(express.json());
         // Carpeta pública
        this.app.use(express.static('public'));
    }
    routes(){
        this.app.use(this.rutas.usuarios, usuarioRouter.default);
        this.app.use(this.rutas.auth, authRouter.default);
    }
    listen(){
        this.app.listen(this.port,() =>{
            console.log('Server en puerto', this.port);
        })
    }
    async conexion(){
        try {
            await db.authenticate();  
            //NO ACTIVAR
            await relacionar();          
            console.log("DB ONLINE");
        } catch (error:any) {
            throw new Error(error);
        }
    }

    
}