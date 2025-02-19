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
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const supabase_js_1 = require("@supabase/supabase-js");
const process_1 = require("process");
const tiny_invariant_1 = __importDefault(require("tiny-invariant"));
const jose_1 = require("jose");
const supabaseUrl = process_1.env.SUPABASE_URL;
const supabaseKey = process_1.env.SUPABASE_KEY;
const supabaseJWTSecret = new TextEncoder().encode(process_1.env.SUPABASE_JWT_SECRET);
(0, tiny_invariant_1.default)(supabaseUrl);
(0, tiny_invariant_1.default)(supabaseKey);
(0, tiny_invariant_1.default)(supabaseJWTSecret);
const supabase = (0, supabase_js_1.createClient)(supabaseUrl, supabaseKey, {
    auth: {
        autoRefreshToken: false,
        persistSession: false
    }
});
// Access auth admin api
const adminAuthClient = supabase.auth.admin;
function authMiddleware(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const idToken = req.header("id-token");
        if (!idToken) {
            res.status(404).json('No id token header provided');
            return;
        }
        const { payload } = yield (0, jose_1.jwtVerify)(idToken, supabaseJWTSecret);
        (0, tiny_invariant_1.default)(payload.sub);
        const userResponse = yield adminAuthClient.getUserById(payload.sub);
        const { user } = userResponse.data;
        if (!user) {
            console.error(userResponse);
            res.status(500).json("Server Error");
            return;
        }
        req.user = user;
        next();
    });
}
const app = (0, express_1.default)();
const port = 3000;
app.use(body_parser_1.default.json());
app.use((0, cors_1.default)());
app.use(authMiddleware);
app.get('/cigars', (req, res) => getAllCigarsHandler(req, res));
app.post('/createCigar', (req, res) => addCigarHandler(req, res));
app.get('/humidors', (req, res) => getHumidorsHandles(req, res));
app.post('/createHumidor', (req, res) => addHumidorHandler(req, res));
app.get('/healthCheck', (req, res) => {
    res.sendStatus(200);
});
app.listen(port, () => {
    console.log(`cigarApp backend listening on port ${port}`);
});
