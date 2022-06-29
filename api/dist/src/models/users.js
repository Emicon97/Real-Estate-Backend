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
exports.User = void 0;
const typegoose_1 = require("@typegoose/typegoose");
const properties_1 = require("./properties");
var Range;
(function (Range) {
    Range["free"] = "free";
    Range["premium"] = "premium";
    Range["vip"] = "vip";
    Range["admin"] = "admin";
})(Range || (Range = {}));
;
class User {
}
__decorate([
    (0, typegoose_1.prop)({ required: true }),
    __metadata("design:type", String)
], User.prototype, "name", void 0);
__decorate([
    (0, typegoose_1.prop)({ required: true }),
    __metadata("design:type", String)
], User.prototype, "lastName", void 0);
__decorate([
    (0, typegoose_1.prop)({ required: true }),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    (0, typegoose_1.prop)({ required: true }),
    __metadata("design:type", Date)
], User.prototype, "birthday", void 0);
__decorate([
    (0, typegoose_1.prop)({ required: true }),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    (0, typegoose_1.prop)({ required: true }),
    __metadata("design:type", Number)
], User.prototype, "dni", void 0);
__decorate([
    (0, typegoose_1.prop)({ required: true }),
    __metadata("design:type", Number)
], User.prototype, "telephone", void 0);
__decorate([
    (0, typegoose_1.prop)({ required: true, enum: Range, default: 'free' }),
    __metadata("design:type", String)
], User.prototype, "range", void 0);
__decorate([
    (0, typegoose_1.prop)(),
    __metadata("design:type", String)
], User.prototype, "avatar", void 0);
__decorate([
    (0, typegoose_1.prop)({ ref: () => properties_1.Property }),
    __metadata("design:type", Array)
], User.prototype, "favourites", void 0);
__decorate([
    (0, typegoose_1.prop)({ ref: () => properties_1.Property }),
    __metadata("design:type", Array)
], User.prototype, "properties", void 0);
__decorate([
    (0, typegoose_1.prop)({ ref: () => User }),
    __metadata("design:type", Array)
], User.prototype, "user", void 0);
exports.User = User;
const userModel = (0, typegoose_1.getModelForClass)(User);
exports.default = userModel;
