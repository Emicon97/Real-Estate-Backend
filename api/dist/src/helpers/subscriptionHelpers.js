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
exports.updateSubscriptionById = exports.createSubscription = exports.propertyStatusManager = exports.rangeManager = exports.getUserBySubscription = void 0;
const axios = require("axios");
const dotenv_1 = __importDefault(require("dotenv"));
const properties_1 = __importDefault(require("../models/properties"));
const users_1 = __importDefault(require("./../models/users"));
dotenv_1.default.config({ override: true });
function getUserBySubscription(subscription) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield users_1.default.findOne({ subscription });
        if (user) {
            const updated = yield rangeManager(user._id);
            return updated;
        }
    });
}
exports.getUserBySubscription = getUserBySubscription;
function rangeManager(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield users_1.default
            .findById(id)
            .populate({ path: "properties" });
        if (user === null || user === void 0 ? void 0 : user.subscription) {
            const updated = getSubscriptionById(user.subscription).then((response) => __awaiter(this, void 0, void 0, function* () {
                if (response.status === "pending" || response.status === "cancelled") {
                    yield propertyStatusManager(user, "free");
                    return yield users_1.default.findByIdAndUpdate(id, { range: "free" });
                }
                if (response.reason === "Mikasa Nueva Premium") {
                    yield propertyStatusManager(user, "premium");
                    return yield users_1.default.findByIdAndUpdate(id, { range: "premium" });
                }
                else {
                    yield propertyStatusManager(user, "vip");
                    return yield users_1.default.findByIdAndUpdate(id, { range: "vip" });
                }
            }));
            return updated;
        }
        throw new Error("Algo salió mal.");
    });
}
exports.rangeManager = rangeManager;
function propertyStatusManager(user, status) {
    return __awaiter(this, void 0, void 0, function* () {
        if (status === "free") {
            for (let property of user.properties) {
                const prop = property;
                if (prop.status !== "hot") {
                    yield properties_1.default.findByIdAndUpdate(prop === null || prop === void 0 ? void 0 : prop._id, {
                        status: "invisible",
                    });
                }
            }
        }
        else if (status === "premium") {
            const visible = [];
            for (let property of user.properties) {
                const prop = property;
                if ((prop.status === "vipHot" || prop.status === "invisible") &&
                    visible.length < 3) {
                    const vis = yield properties_1.default.findByIdAndUpdate(prop === null || prop === void 0 ? void 0 : prop._id, { status: "available" });
                    if (vis)
                        visible.push(vis);
                }
                else if (prop.status === "vipHot") {
                    const vis = yield properties_1.default.findByIdAndUpdate(prop === null || prop === void 0 ? void 0 : prop._id, { status: "invisible" });
                }
            }
        }
        else if (status === "vip") {
            for (let property of user.properties) {
                const prop = property;
                if (prop.status !== "hot") {
                    yield properties_1.default.findByIdAndUpdate(prop === null || prop === void 0 ? void 0 : prop._id, { status: "vipHot" });
                }
            }
        }
        else if (status === "banned") {
            for (let property of user.properties) {
                const prop = property;
                yield properties_1.default.findByIdAndUpdate(prop === null || prop === void 0 ? void 0 : prop._id, {
                    status: "invisible",
                });
            }
        }
    });
}
exports.propertyStatusManager = propertyStatusManager;
function getSubscriptionById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const url = "https://api.mercadopago.com/preapproval";
        const subscription = yield axios.get(`${url}/${id}`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
            },
        });
        return subscription.data;
    });
}
function createSubscription({ email, reason, id, }) {
    return __awaiter(this, void 0, void 0, function* () {
        const url = "https://api.mercadopago.com/preapproval";
        const body = {
            reason,
            auto_recurring: {
                frequency: 1,
                frequency_type: "months",
                transaction_amount: reason === "Mikasa Nueva Premium" ? 1500 : 20000,
                currency_id: "ARS",
            },
            back_url: "https://mikasa-nueva.vercel.app/success",
            payer_email: email,
        };
        const subscription = yield axios.post(url, body, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
            },
        });
        yield users_1.default.findByIdAndUpdate(id, { subscription: subscription.data.id });
        return subscription.data.init_point;
    });
}
exports.createSubscription = createSubscription;
function updateSubscriptionById(id, { status, reason, }) {
    return __awaiter(this, void 0, void 0, function* () {
        const url = "https://api.mercadopago.com/preapproval";
        if (status !== "cancelled") {
            const body = {
                reason,
                auto_recurring: {
                    frequency: 1,
                    frequency_type: "months",
                    transaction_amount: reason === "Mikasa Nueva Premium" ? 1500 : 20000,
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
            return subscription.data.init_point;
        }
        else {
            const body = {
                reason,
                auto_recurring: {
                    frequency: 1,
                    frequency_type: "months",
                    transaction_amount: 0,
                    currency_id: "ARS",
                },
                back_url: `https://mikasa-nueva.vercel.app/goodbye/${id}`,
                status,
            };
            const subscription = yield axios.put(`${url}/${id}`, body, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
                },
            });
            return subscription.data.init_point;
        }
    });
}
exports.updateSubscriptionById = updateSubscriptionById;
