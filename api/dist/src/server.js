"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const helmet_1 = __importDefault(require("helmet"));
const cors_1 = __importDefault(require("cors"));
const config_json_1 = __importDefault(require("../config.json"));
const getFilesWithKeyword_1 = require("./utils/getFilesWithKeyword");
const app = (0, express_1.default)();
/************************************************************************************
 *                              Basic Express Middlewares
 ***********************************************************************************/
app.set('json spaces', 4);
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// Handle logs in console during development
if (process.env.NODE_ENV === 'development' || config_json_1.default.NODE_ENV === 'development') {
    app.use((0, morgan_1.default)('dev'));
    app.use((0, cors_1.default)());
}
// Handle security and origin in production
if (process.env.NODE_ENV === 'production' || config_json_1.default.NODE_ENV === 'production') {
    app.use((0, helmet_1.default)());
}
/************************************************************************************
 *                               Register all routes
 ***********************************************************************************/
(0, getFilesWithKeyword_1.getFilesWithKeyword)('router', __dirname + '/app').forEach((file) => {
    const { router } = require(file);
    app.use('/', router);
});
/************************************************************************************
 *                               Express Error Handling
 ***********************************************************************************/
// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err, req, res, next) => {
    return res.status(500).json({
        errorName: err.name,
        message: err.message,
        stack: err.stack || 'no stack defined'
    });
});
exports.default = app;
