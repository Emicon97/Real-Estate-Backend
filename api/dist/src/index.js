"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const config_json_1 = __importDefault(require("../config.json"));
// Start the application by listening to specific port
const port = Number(process.env.PORT || config_json_1.default.PORT || 3001);
app_1.default.listen(port, () => {
    console.info('Express application started on port: ' + port);
});
