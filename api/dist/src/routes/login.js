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
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
// import { logIn } from '../controller/logInController';
// import { getUserById } from '../controller/userController';
// import { TokenCreation, RefreshToken } from '../libs/verifyToken';
const router = (0, express_1.Router)();
router.post('/', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let { dni, password } = req.body;
        // let findUser = await logIn(dni, password);
        //  if(findUser){
        //       const token = TokenCreation(findUser.id);
        //       const refresh = RefreshToken(findUser.email);
        //       let dataUser = await getUserById(findUser.id);
        //       dataUser.push(token);
        //       dataUser.push(refresh);
        //       res.cookie('refresh-token', refresh);
        //       res.cookie('auth-token', token).json(dataUser);
        //  } else {
        //    res.redirect('/');
        //  }
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(404).json(error);
        }
        else {
            console.log('Unexpected Error', error);
        }
    }
}));
exports.default = router;
