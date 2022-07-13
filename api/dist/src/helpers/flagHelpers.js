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
exports.getReportsByDenounced = exports.reportOwner = void 0;
const flags_1 = __importDefault(require("../models/flags"));
const propertyHelpers_1 = require("./propertyHelpers");
function reportOwner(id, reason) {
    return __awaiter(this, void 0, void 0, function* () {
        const denounced = yield (0, propertyHelpers_1.getOwnersId)(id);
        const report = yield flags_1.default.create({ denounced, reason });
        const savedReport = yield report.save();
        return savedReport;
    });
}
exports.reportOwner = reportOwner;
function getReportsByDenounced(denounced) {
    return __awaiter(this, void 0, void 0, function* () {
        const report = yield flags_1.default.find({ denounced });
        if (report.length) {
            return report;
        }
        throw new Error("No hay contactos para esta propiedad.");
    });
}
exports.getReportsByDenounced = getReportsByDenounced;
