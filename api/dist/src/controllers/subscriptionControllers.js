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
exports.updateSubscription = exports.postSubscription = exports.getSubscription = void 0;
const subscriptionHelpers_1 = require("../helpers/subscriptionHelpers");
function getSubscription(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let { id } = req.params;
            const user = yield (0, subscriptionHelpers_1.getUserBySubscription)(id);
            return res.json(user);
        }
        catch (error) {
            console.log(error);
            return res
                .status(500)
                .json({ error: true, msg: "Failed to create payment" });
        }
    });
}
exports.getSubscription = getSubscription;
function postSubscription(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const data = req.body;
            const payment = yield (0, subscriptionHelpers_1.createSubscription)(data);
            return res.json(payment);
        }
        catch (error) {
            console.log(error);
            return res
                .status(500)
                .json({ error: true, msg: "Failed to create payment" });
        }
    });
}
exports.postSubscription = postSubscription;
function updateSubscription(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            let data = req.body;
            const payment = yield (0, subscriptionHelpers_1.updateSubscriptionById)(id, data);
            return res.json(payment);
        }
        catch (error) {
            console.log(error);
            return res
                .status(500)
                .json({ error: true, msg: "Failed to create payment" });
        }
    });
}
exports.updateSubscription = updateSubscription;
