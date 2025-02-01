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
exports.getAllCigarsHandler = getAllCigarsHandler;
exports.addCigarHandler = addCigarHandler;
const cigarsQueries_1 = require("../dbQueries/cigarsQueries");
function getAllCigarsHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const uid = req.header("uid");
        if (!uid) {
            res.status(500).json("Server Error: uid not found");
            return;
        }
        const cigars = yield (0, cigarsQueries_1.getCigarsQuery)({ uid });
        res.json(cigars);
    });
}
function addCigarHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const uid = req.header("uid");
        if (!req.body || !req.body.cigar) {
            res.status(400);
            res.send("Request missing or malformed cigar object");
            return;
        }
        if (!uid) {
            res.status(500).json("Server Error: uid not found");
            return;
        }
        const newCigarId = yield (0, cigarsQueries_1.createCigarQuery)({
            cigar: req.body.cigar,
            uid
        });
        res.status(200);
        res.send(`Cigar: ${newCigarId} created.`);
    });
}
