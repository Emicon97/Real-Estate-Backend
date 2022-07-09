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
exports.updatePayment = exports.postPayment = exports.getPayment = void 0;
const paymentHelpers_1 = require("../helpers/paymentHelpers");
function getPayment(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let { id } = req.params;
            const payment = yield (0, paymentHelpers_1.getPaymentById)(id);
            return res.json(payment);
        }
        catch (error) {
            console.log(error);
            return res.status(500).json({ error: true, msg: "Failed to create payment" });
        }
    });
}
exports.getPayment = getPayment;
function postPayment(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const data = req.body;
            const payment = yield (0, paymentHelpers_1.createPayment)(data);
            return res.json(payment);
        }
        catch (error) {
            console.log(error);
            return res.status(500).json({ error: true, msg: "Failed to create payment" });
        }
    });
}
exports.postPayment = postPayment;
function updatePayment(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let data = req.body;
            const payment = yield (0, paymentHelpers_1.createPayment)(data);
            return res.json(payment);
        }
        catch (error) {
            console.log(error);
            return res.status(500).json({ error: true, msg: "Failed to create payment" });
        }
    });
}
exports.updatePayment = updatePayment;
