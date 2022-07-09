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
dotenv_1.default.config({ override: true });
function getPaymentById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const url = "https://api.mercadopago.com/preapproval";
        const subscription = yield axios.get(`${url}/${id}`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
            },
        });
        return subscription.data.init_point;
    });
}
exports.getPaymentById = getPaymentById;
function createPayment({ email, reason, }) {
    return __awaiter(this, void 0, void 0, function* () {
        const url = "https://api.mercadopago.com/preapproval";
        const body = {
            reason,
            auto_recurring: {
                frequency: 1,
                frequency_type: "months",
                transaction_amount: reason === "Mikasa Nueva Premium" ? 100 : 200,
                currency_id: "ARS",
            },
            back_url: "https://mikasa-nueva.vercel.app/success",
            payer_email: email,
            // payer_email: email,
            // items,
            // back_urls: {
            //   failure: "/failure",
            //   pending: "/pending",
            //   success: "https://mikasa-nueva.vercel.app/success"
            // }
        };
        const subscription = yield axios.post(url, body, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
            },
        });
        console.log(subscription.data);
        return subscription.data.init_point;
    });
}
exports.createPayment = createPayment;
function updateSubscription(id, { status, reason, }) {
    return __awaiter(this, void 0, void 0, function* () {
        const url = "https://api.mercadopago.com/preapproval";
        const body = {
            reason,
            auto_recurring: {
                frequency: 1,
                frequency_type: "months",
                transaction_amount: 10,
                currency_id: "ARS",
            },
            back_url: "https://mikasa-nueva.vercel.app/success",
            status,
        };
        const subscription = yield axios.put(`${url}/${id}`, body, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
            },
        });
        console.log(subscription.data);
        return subscription.data.init_point;
    });
}
