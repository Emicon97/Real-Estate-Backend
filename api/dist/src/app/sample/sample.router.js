"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
// Export module for registering router in express app
exports.router = (0, express_1.Router)();
// Define your routes here
exports.router.get("/", (req, res) => {
    res.status(200).send({
        message: "GET request from sample router"
    });
});
exports.router.post("/", (req, res) => {
    res.status(200).send({
        message: "POST request from sample router"
    });
});
exports.router.put("/", (req, res) => {
    res.status(200).send({
        message: "PUT request from sample router"
    });
});
exports.router.delete("/", (req, res) => {
    res.status(200).send({
        message: "DELETE request from sample router"
    });
});
