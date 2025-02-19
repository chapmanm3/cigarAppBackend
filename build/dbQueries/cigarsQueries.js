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
exports.getCigarsQuery = getCigarsQuery;
exports.createCigarQuery = createCigarQuery;
const db_1 = require("./db");
function getCigarsQuery(_a) {
    return __awaiter(this, arguments, void 0, function* ({ uid }) {
        const cigars = yield db_1.prismaClient.cigar.findMany({
            where: {
                userId: uid
            }
        });
        return cigars;
    });
}
function createCigarQuery(_a) {
    return __awaiter(this, arguments, void 0, function* ({ cigar, uid }) {
        const createdCigar = yield db_1.prismaClient.cigar.create({
            data: Object.assign(Object.assign({}, cigar), { userId: uid })
        });
        return createdCigar.id;
    });
}
