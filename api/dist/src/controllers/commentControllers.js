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
exports.postContactForm = exports.getContact = void 0;
const contactHelpers_1 = require("../helpers/contactHelpers");
function getContact(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            const contact = yield (0, contactHelpers_1.getContactByProperty)(id);
            res.status(201).json(contact);
        }
        catch (error) {
            if (error instanceof Error) {
                console.log(error.message);
                res.status(404).json(error);
            }
            else {
                console.log("Unexpected Error", error);
            }
        }
    });
}
exports.getContact = getContact;
function postContactForm(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const data = req.body;
            const contact = yield (0, contactHelpers_1.createContactForm)(data);
            res.status(201).json(contact);
        }
        catch (error) {
            if (error instanceof Error) {
                console.log(error.message);
                res.status(404).json(error);
            }
            else {
                console.log("Unexpected Error", error);
            }
        }
    });
}
exports.postContactForm = postContactForm;
