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
exports.getContactByReceiver = exports.createContactForm = void 0;
const contact_1 = __importDefault(require("./../models/contact"));
function createContactForm(data) {
    return __awaiter(this, void 0, void 0, function* () {
        const contact = yield contact_1.default.create(data);
        const savedContact = yield contact.save();
        return savedContact;
    });
}
exports.createContactForm = createContactForm;
function getContactByReceiver(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield contact_1.default.findById(id);
        if (user !== null) {
            return user;
        }
        throw new Error("Hubo un error al procesar sus datos.");
    });
}
exports.getContactByReceiver = getContactByReceiver;
