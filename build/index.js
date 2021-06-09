"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = express_1.default();
const port = 1337;
app.use(express_1.default.static('build/public'));
app.listen(port, () => {
    console.log("Server is running on 1337 port!");
});
