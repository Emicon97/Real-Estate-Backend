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
exports.createPayment = exports.getPaymentById = void 0;
const axios = require("axios");
const dotenv_1 = __importDefault(require("dotenv"));
const properties_1 = __importDefault(require("../models/properties"));
dotenv_1.default.config({ override: true });
function getPaymentById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const url = "https://api.mercadopago.com/checkout/preferences";
        const payment = yield axios.get(`${url}/${id}`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
            },
        });
        for (let item of payment.data.items) {
            yield properties_1.default.findByIdAndUpdate(item.title, {
                status: "hot",
            });
        }
        return payment.data;
    });
}
exports.getPaymentById = getPaymentById;
function createPayment({ email, items, }) {
    return __awaiter(this, void 0, void 0, function* () {
        const url = "https://api.mercadopago.com/checkout/preferences";
        const body = {
            payer_email: email,
            items,
            back_urls: {
                failure: "/failure",
                pending: "/pending",
                success: "https://mikasa-nueva.vercel.app/purchase",
            },
        };
        const payment = yield axios.post(url, body, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
            },
        });
        for (let item of payment.data.items) {
            yield properties_1.default.findByIdAndUpdate(item.title, {
                payment: payment.data.id,
            });
        }
        // await purchaseMail(email);
        return payment.data.init_point;
    });
}
exports.createPayment = createPayment;
