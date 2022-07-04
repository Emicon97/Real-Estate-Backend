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
exports.Refresh = void 0;
const typegoose_1 = require("@typegoose/typegoose");
const users_1 = require("./users");
class Refresh {
}
__decorate([
    (0, typegoose_1.prop)({ required: true, unique: true }),
    __metadata("design:type", String)
], Refresh.prototype, "token", void 0);
__decorate([
    (0, typegoose_1.prop)({ required: true, unique: true, ref: () => users_1.User }),
    __metadata("design:type", Object)
], Refresh.prototype, "owner", void 0);
exports.Refresh = Refresh;
const refreshModel = (0, typegoose_1.getModelForClass)(Refresh);
exports.default = refreshModel;
