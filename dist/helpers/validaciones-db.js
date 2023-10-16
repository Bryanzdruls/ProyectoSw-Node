"use strict";
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
exports.idValido = exports.cargoValido = exports.emailValido = void 0;
const models_1 = require("../models");
const usuario_1 = __importDefault(require("../models/usuario"));
const emailValido = (email = '') => __awaiter(void 0, void 0, void 0, function* () {
    const emailExiste = yield usuario_1.default.findOne({
        where: {
            email,
        }
    });
    if (emailExiste) {
        throw new Error('Email ya existe en la base de datos.');
    }
});
exports.emailValido = emailValido;
const cargoValido = (cargoId) => __awaiter(void 0, void 0, void 0, function* () {
    const cargoArr = yield models_1.Cargo.findAll();
    let existeCargo = false;
    for (let i = 0; i < cargoArr.length; i++) {
        const cargo = cargoArr[i];
        const { dataValues } = cargo;
        if (dataValues.id === cargoId) {
            existeCargo = true;
        }
    }
    if (!existeCargo) {
        throw new Error('No existe ese cargo');
    }
});
exports.cargoValido = cargoValido;
const idValido = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const existUser = yield usuario_1.default.findOne({
        where: {
            id,
        }
    });
    if (!existUser) {
        throw new Error("No existe Usuario con ese id");
    }
});
exports.idValido = idValido;
//# sourceMappingURL=validaciones-db.js.map