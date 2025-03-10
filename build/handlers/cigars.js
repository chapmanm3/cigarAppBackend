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
exports.getAllCigarsHandler = getAllCigarsHandler;
exports.addCigarHandler = addCigarHandler;
exports.updateCigarHandler = updateCigarHandler;
exports.getCigarDetailsHandler = getCigarDetailsHandler;
exports.deleteCigarHandler = deleteCigarHandler;
const cigarsQueries_1 = require("../dbQueries/cigarsQueries");
const cigarSchemas_1 = require("../schemas/cigarSchemas");
const tiny_invariant_1 = __importDefault(require("tiny-invariant"));
function getAllCigarsHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = req.user;
        (0, tiny_invariant_1.default)(user, "User should be defined at this point");
        const cigars = yield (0, cigarsQueries_1.getCigarsQuery)({ uid: user.id });
        res.json(cigars);
    });
}
function addCigarHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = req.user;
        (0, tiny_invariant_1.default)(user, "User should be defined at this point");
        try {
            const parsedCigar = cigarSchemas_1.createCigarRequestBodySchema.parse(req.body);
            const newCigarId = yield (0, cigarsQueries_1.createCigarQuery)({
                cigar: Object.assign({}, parsedCigar.cigar),
                uid: user.id
            });
            res.status(200);
            res.send(`Cigar: ${newCigarId} created.`);
        }
        catch (error) {
            res.status(400).json({
                message: 'Validation error',
                errors: error,
            });
        }
    });
}
function updateCigarHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = req.user;
        (0, tiny_invariant_1.default)(user, "User should be defined at this point");
        try {
            const parsedCigar = cigarSchemas_1.updateCigarRequestBodySchema.parse(req.body);
            const updatedCigar = yield (0, cigarsQueries_1.updateCigarQuery)({
                cigar: parsedCigar.cigar,
                uid: user.id
            });
        }
        catch (err) {
            res.status(400).json({
                message: "Validation error",
                errors: err
            });
        }
    });
}
function getCigarDetailsHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = req.user;
        const { cigarId } = req.params;
        (0, tiny_invariant_1.default)(user, "User should be defined at this point");
        const cigar = yield (0, cigarsQueries_1.getCigarDetailsQuery)({
            cigarId: parseInt(cigarId),
            uid: user.id
        });
        res.json(cigar);
    });
}
function deleteCigarHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = req.user;
        const { cigarId } = req.params;
        (0, tiny_invariant_1.default)(user, "User should be defined at this point");
        const deletedId = yield (0, cigarsQueries_1.deleteCigarQuery)({
            cigarId: parseInt(cigarId),
            uid: user.id
        });
        res.json(deletedId);
    });
}
