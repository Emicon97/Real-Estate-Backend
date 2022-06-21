"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Property = void 0;
const typegoose_1 = require("@typegoose/typegoose");
var Status;
(function (Status) {
    Status[Status["left"] = 0] = "left";
    Status[Status["reserved"] = 1] = "reserved";
    Status[Status["negotiation"] = 2] = "negotiation";
})(Status || (Status = {}));
;
class Property {
}
__decorate([
    (0, typegoose_1.prop)({ required: true })
], Property.prototype, "address", void 0);
__decorate([
    (0, typegoose_1.prop)()
], Property.prototype, "rentPrice", void 0);
__decorate([
    (0, typegoose_1.prop)()
], Property.prototype, "sellPrice", void 0);
__decorate([
    (0, typegoose_1.prop)({ required: true })
], Property.prototype, "area", void 0);
__decorate([
    (0, typegoose_1.prop)({ required: true })
], Property.prototype, "type", void 0);
__decorate([
    (0, typegoose_1.prop)({ required: true })
], Property.prototype, "rooms", void 0);
__decorate([
    (0, typegoose_1.prop)()
], Property.prototype, "bathrooms", void 0);
__decorate([
    (0, typegoose_1.prop)({ required: true })
], Property.prototype, "city", void 0);
__decorate([
    (0, typegoose_1.prop)()
], Property.prototype, "neighbourhood", void 0);
__decorate([
    (0, typegoose_1.prop)()
], Property.prototype, "constructionDate", void 0);
__decorate([
    (0, typegoose_1.prop)()
], Property.prototype, "renovationDate", void 0);
__decorate([
    (0, typegoose_1.prop)()
], Property.prototype, "parkingSlot", void 0);
__decorate([
    (0, typegoose_1.prop)({ required: true, enum: Status })
], Property.prototype, "status", void 0);
exports.Property = Property;
const propertyModel = (0, typegoose_1.getModelForClass)(Property);
exports.default = propertyModel;
