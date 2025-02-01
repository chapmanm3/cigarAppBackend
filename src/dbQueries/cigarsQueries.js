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
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
function getCigarsQuery({ uid }) {
    const cigars = prisma.cigar.findMany({
        where: {
            userId: uid
        }
    });
    return cigars;
}
function createCigarQuery(_a) {
    return __awaiter(this, arguments, void 0, function* ({ cigar, uid }) {
        const createdCigar = yield prisma.cigar.create({
            data: Object.assign(Object.assign({}, cigar), { userId: uid })
        });
        return createdCigar.id;
    });
}
