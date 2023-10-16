"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Server = void 0;
const express_1 = __importDefault(require("express"));
const conexion_1 = __importDefault(require("../db/conexion"));
const cors_1 = __importDefault(require("cors"));
const usuarioRouter = __importStar(require("../routes/usuarios/usuario"));
const authRouter = __importStar(require("../routes/usuarios/auth"));
const relaciones_1 = __importDefault(require("../db/relaciones"));
class Server {
    constructor() {
        this.rutas = {
            usuarios: '/api/usuarios',
            auth: '/api/auth',
        };
        this.app = (0, express_1.default)();
        this.port = process.env.PORT || '8000';
        //db
        this.conexion();
        //middlewares
        this.middlewares();
        //rutas
        this.routes();
    }
    middlewares() {
        //Cors
        this.app.use((0, cors_1.default)());
        // Lectura del body
        this.app.use(express_1.default.json());
        // Carpeta pública
        this.app.use(express_1.default.static('public'));
    }
    routes() {
        this.app.use(this.rutas.usuarios, usuarioRouter.default);
        this.app.use(this.rutas.auth, authRouter.default);
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log('Server en puerto', this.port);
        });
    }
    conexion() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield conexion_1.default.authenticate();
                //NO ACTIVAR
                yield (0, relaciones_1.default)();
                console.log("DB ONLINE");
            }
            catch (error) {
                throw new Error(error);
            }
        });
    }
}
exports.Server = Server;
//# sourceMappingURL=server.js.map