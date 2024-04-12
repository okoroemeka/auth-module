"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const body_parser_1 = __importDefault(require("body-parser"));
const auth_1 = require("./routes/auth");
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = 8080;
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use('/api/v1/', auth_1.authRouter);
app.use('*', (req, res) => {
    res.status(404).json({
        status: "Fail",
        message: "Not found",
    });
});
app.listen(PORT, () => {
    console.log('SERVER IS UP ON PORT:', PORT);
});
