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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getHumidorsHandler = getHumidorsHandler;
exports.addHumidorHandler = addHumidorHandler;
const humidorsQueries_1 = require("../dbQueries/humidorsQueries");
function getHumidorsHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = req.user;
        if (!user) {
            res.status(500).json("Server Error: user not found");
            return;
        }
        const cigars = yield (0, humidorsQueries_1.getHumidorsQuery)({ uid: user.id });
        res.json(cigars);
    });
}
function addHumidorHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = req.user;
        if (!user) {
            res.status(500).json("Server Error: user not found");
            return;
        }
        if (!req.body || !req.body.humidor) {
            res.status(400);
            res.send("Request missing humidor object");
            return;
        }
        const newHumidorId = yield (0, humidorsQueries_1.createHumidorQuery)({
            humidor: req.body.humidor,
            uid: user.id
        });
        res.status(200);
        res.send(`Created Humidor ID: ${newHumidorId}`);
    });
}
