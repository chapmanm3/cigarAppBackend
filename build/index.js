"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const cigars_1 = require("./handlers/cigars");
const humidors_1 = require("./handlers/humidors");
const authMiddleware_1 = require("./middleware/authMiddleware");
const app = (0, express_1.default)();
exports.app = app;
const port = 3000;
app.use(body_parser_1.default.json());
app.use((0, cors_1.default)());
app.use(authMiddleware_1.authMiddleware);
app.get('/cigars', (req, res) => (0, cigars_1.getAllCigarsHandler)(req, res));
app.get('/cigar/:cigarId', (req, res) => (0, cigars_1.getCigarDetailsHandler)(req, res));
app.delete('/cigar/:cigarId', (req, res) => (0, cigars_1.deleteCigarHandler)(req, res));
app.post('/cigar/:cigarId', (req, res) => (0, cigars_1.updateCigarHandler)(req, res));
app.post('/createCigar', (req, res) => (0, cigars_1.addCigarHandler)(req, res));
app.get('/humidors', (req, res) => (0, humidors_1.getHumidorsHandler)(req, res));
app.post('/createHumidor', (req, res) => (0, humidors_1.addHumidorHandler)(req, res));
app.get('/healthCheck', (req, res) => {
    res.sendStatus(200);
});
if (require.main === module) {
    app.listen(port, () => {
        console.log(`cigarApp backend listening on port ${port}`);
    });
}
