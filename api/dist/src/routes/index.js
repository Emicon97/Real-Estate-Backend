"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const routes = (0, express_1.Router)();
routes.get('/', (req, res) => {
    res.status(200).send({
        message: 'Hola Mundo'
    });
});
module.exports = routes;