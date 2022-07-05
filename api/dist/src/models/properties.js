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
exports.Property = void 0;
const typegoose_1 = require("@typegoose/typegoose");
var Status;
(function (Status) {
    Status["available"] = "available";
    Status["reserved"] = "reserved";
    Status["negotiation"] = "negotiation";
    Status["invisible"] = "invisible";
})(Status || (Status = {}));
;
var Operation;
(function (Operation) {
    Operation["sell"] = "sell";
    Operation["rent"] = "rent";
})(Operation || (Operation = {}));
class Property {
}
__decorate([
    (0, typegoose_1.prop)({ required: true }),
    __metadata("design:type", String)
], Property.prototype, "address", void 0);
__decorate([
    (0, typegoose_1.prop)({ required: true, enum: Operation }),
    __metadata("design:type", String)
], Property.prototype, "operation", void 0);
__decorate([
    (0, typegoose_1.prop)({ required: true }),
    __metadata("design:type", Number)
], Property.prototype, "price", void 0);
__decorate([
    (0, typegoose_1.prop)({ required: true }),
    __metadata("design:type", String)
], Property.prototype, "area", void 0);
__decorate([
    (0, typegoose_1.prop)({ required: true }),
    __metadata("design:type", String)
], Property.prototype, "type", void 0);
__decorate([
    (0, typegoose_1.prop)({ required: true }),
    __metadata("design:type", Number)
], Property.prototype, "rooms", void 0);
__decorate([
    (0, typegoose_1.prop)({ default: 1 }),
    __metadata("design:type", Number)
], Property.prototype, "bathrooms", void 0);
__decorate([
    (0, typegoose_1.prop)({ required: true }),
    __metadata("design:type", String)
], Property.prototype, "city", void 0);
__decorate([
    (0, typegoose_1.prop)({ default: 'No especificado' }),
    __metadata("design:type", String)
], Property.prototype, "neighbourhood", void 0);
__decorate([
    (0, typegoose_1.prop)(),
    __metadata("design:type", Number)
], Property.prototype, "constructionDate", void 0);
__decorate([
    (0, typegoose_1.prop)(),
    __metadata("design:type", Number)
], Property.prototype, "renovationDate", void 0);
__decorate([
    (0, typegoose_1.prop)({ default: false }),
    __metadata("design:type", Boolean)
], Property.prototype, "parkingSlot", void 0);
__decorate([
    (0, typegoose_1.prop)({ required: true, enum: Status, default: 'available' }),
    __metadata("design:type", String)
], Property.prototype, "status", void 0);
__decorate([
    (0, typegoose_1.prop)({ type: String }),
    __metadata("design:type", Array)
], Property.prototype, "pictures", void 0);
exports.Property = Property;
const propertyModel = (0, typegoose_1.getModelForClass)(Property);
exports.default = propertyModel;
