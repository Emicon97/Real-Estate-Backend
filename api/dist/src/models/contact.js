"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Contact = void 0;
const typegoose_1 = require("@typegoose/typegoose");
const users_1 = require("./users");
const properties_1 = require("./properties");
class Contact {
}
__decorate([
    (0, typegoose_1.prop)({ required: true }),
    __metadata("design:type", String)
], Contact.prototype, "name", void 0);
__decorate([
    (0, typegoose_1.prop)({ required: true }),
    __metadata("design:type", String)
], Contact.prototype, "email", void 0);
__decorate([
    (0, typegoose_1.prop)({ required: true, default: 0 }),
    __metadata("design:type", Number)
], Contact.prototype, "telephone", void 0);
__decorate([
    (0, typegoose_1.prop)(),
    __metadata("design:type", String)
], Contact.prototype, "message", void 0);
__decorate([
    (0, typegoose_1.prop)({ ref: () => users_1.User }),
    (0, typegoose_1.prop)({ ref: () => properties_1.Property }),
    __metadata("design:type", Object)
], Contact.prototype, "property", void 0);
exports.Contact = Contact;
const contactModel = (0, typegoose_1.getModelForClass)(Contact);
exports.default = contactModel;