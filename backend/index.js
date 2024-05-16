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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var uuid_1 = require("uuid");
var cors = require("cors");
var express = require("express");
var pg_1 = require("pg");
var dotenv = require("dotenv");
var bcrypt = require("bcrypt");
dotenv.config();
var client = new pg_1.Client({
    connectionString: process.env.PGURI
});
var port = process.env.PORT || 3000;
client.connect();
var app = express();
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
var authenticate = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var token, rows, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                token = req.headers.authorization;
                if (!token) {
                    return [2 /*return*/, res.status(401).json({ error: 'No token provided' })];
                }
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, client.query('SELECT * FROM users WHERE token = $1', [token])];
            case 2:
                rows = (_a.sent()).rows;
                if (rows.length === 0) {
                    return [2 /*return*/, res.status(401).json({ error: 'Invalid token' })];
                }
                req.user = rows[0];
                next();
                return [3 /*break*/, 4];
            case 3:
                error_1 = _a.sent();
                console.error(error_1);
                res.status(500).json({ error: 'An error occurred' });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
// Login section
app.post('/login', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, username, password, rows, user, passwordMatch, token, error_2;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, username = _a.username, password = _a.password;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 5, , 6]);
                return [4 /*yield*/, client.query('SELECT * FROM users WHERE username = $1', [username])];
            case 2:
                rows = (_b.sent()).rows;
                user = rows[0];
                if (!user) {
                    return [2 /*return*/, res.status(400).json({ error: 'Invalid username or password' })];
                }
                return [4 /*yield*/, bcrypt.compare(password, user.password_hash)];
            case 3:
                passwordMatch = _b.sent();
                if (!passwordMatch) {
                    return [2 /*return*/, res.status(400).json({ error: 'Invalid username or password' })];
                }
                token = (0, uuid_1.v4)();
                // Store the token in the database
                return [4 /*yield*/, client.query('UPDATE users SET token = $1 WHERE user_id = $2', [token, user.user_id])];
            case 4:
                // Store the token in the database
                _b.sent();
                res.json({ token: token });
                return [3 /*break*/, 6];
            case 5:
                error_2 = _b.sent();
                console.error(error_2);
                res.status(500).json({ error: 'An error occurred' });
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); });
//Signup section
app.post('/signup', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, username, email, password, address, phone_number, country, rows, password_hash, query, values, error_3;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, username = _a.username, email = _a.email, password = _a.password, address = _a.address, phone_number = _a.phone_number, country = _a.country;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 5, , 6]);
                return [4 /*yield*/, client.query('SELECT * FROM users WHERE email = $1', [email])];
            case 2:
                rows = (_b.sent()).rows;
                if (rows.length > 0) {
                    return [2 /*return*/, res.status(400).json({ message: 'Email already in use' })];
                }
                return [4 /*yield*/, bcrypt.hash(password, 10)];
            case 3:
                password_hash = _b.sent();
                query = "\n      INSERT INTO users (username, email, password_hash, address, phone_number, country)\n      VALUES ($1, $2, $3, $4, $5, $6)\n    ";
                values = [username, email, password_hash, address, phone_number, country];
                return [4 /*yield*/, client.query(query, values)];
            case 4:
                _b.sent();
                res.status(201).json({ message: 'User created' });
                return [3 /*break*/, 6];
            case 5:
                error_3 = _b.sent();
                console.error(error_3);
                res.status(500).json({ error: 'An error occurred while creating the user' });
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); });
app.get('/users', authenticate, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var rows, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, client.query('SELECT * FROM users')];
            case 1:
                rows = (_a.sent()).rows;
                if (rows.length === 0) {
                    res.status(404).json({ error: 'No users found' });
                }
                else {
                    res.json(rows);
                }
                return [3 /*break*/, 3];
            case 2:
                error_4 = _a.sent();
                res.status(500).json({ error: 'An error occured' });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
app.get('/products', authenticate, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var rows, error_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, client.query('SELECT * FROM products')];
            case 1:
                rows = (_a.sent()).rows;
                if (rows.length === 0) {
                    res.status(404).json({ error: 'No users found' });
                }
                else {
                    res.json(rows);
                }
                return [3 /*break*/, 3];
            case 2:
                error_5 = _a.sent();
                res.status(500).json({ error: 'An error occured' });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
app.get('/orders', authenticate, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var rows, error_6;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, client.query('SELECT * FROM orders')];
            case 1:
                rows = (_a.sent()).rows;
                if (rows.length === 0) {
                    res.status(404).json({ error: 'No users found' });
                }
                else {
                    res.json(rows);
                }
                return [3 /*break*/, 3];
            case 2:
                error_6 = _a.sent();
                res.status(500).json({ error: 'An error occured' });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
app.get('/order_details', authenticate, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var rows, error_7;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, client.query('SELECT * FROM order_details')];
            case 1:
                rows = (_a.sent()).rows;
                if (rows.length === 0) {
                    res.status(404).json({ error: 'No users found' });
                }
                else {
                    res.json(rows);
                }
                return [3 /*break*/, 3];
            case 2:
                error_7 = _a.sent();
                res.status(500).json({ error: 'An error occured' });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
app.get('/menus', authenticate, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var rows, error_8;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, client.query('SELECT * FROM menus')];
            case 1:
                rows = (_a.sent()).rows;
                if (rows.length === 0) {
                    res.status(404).json({ error: 'No users found' });
                }
                else {
                    res.json(rows);
                }
                return [3 /*break*/, 3];
            case 2:
                error_8 = _a.sent();
                res.status(500).json({ error: 'An error occured' });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
app.listen(3000, function () {
    console.log("Server is running on port localhost:".concat(port));
});
