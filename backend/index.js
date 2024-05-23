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
var uuidV4 = require("uuid").v4;
var cors = require("cors");
var express = require("express");
var pg_1 = require("pg");
var dotenv = require("dotenv");
var bcrypt = require("bcrypt");
var path = require("path");
dotenv.config();
var pool = new pg_1.Pool({
    connectionString: process.env.PGURI,
});
var port = process.env.PORT || 3000;
pool.connect();
var app = express();
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
// Serve static files from the 'dist' directory
app.use(express.static(path.join(path.resolve(), "dist")));
// Middleware to authenticate the user
function authenticate(req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var token, rows, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    token = req.headers.authorization;
                    if (!token) {
                        console.log("came here. SO wrong in the authentication function");
                    }
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, pool.query("SELECT * FROM users WHERE token = $1", [
                            token,
                        ])];
                case 2:
                    rows = (_a.sent()).rows;
                    if (rows.length === 0) {
                        return [2 /*return*/, res.status(401).json({ error: "Invalid token" })];
                    }
                    req.user = rows[0];
                    next();
                    return [3 /*break*/, 4];
                case 3:
                    error_1 = _a.sent();
                    console.error(error_1);
                    res.status(500).json({ error: "An error occurred" });
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
// Login section
app.post("/login", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, email, password, rows, user, passwordMatch, token, error_2;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, email = _a.email, password = _a.password;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 5, , 6]);
                return [4 /*yield*/, pool.query("SELECT * FROM users WHERE email = $1", [
                        email,
                    ])];
            case 2:
                rows = (_b.sent()).rows;
                user = rows[0];
                if (!user) {
                    return [2 /*return*/, res.status(400).json({ error: "Invalid email or password" })];
                }
                return [4 /*yield*/, bcrypt.compare(password, user.password_hash)];
            case 3:
                passwordMatch = _b.sent();
                if (!passwordMatch) {
                    return [2 /*return*/, res.status(400).json({ error: "Invalid email or password" })];
                }
                token = uuidV4();
                // Store the token in the database
                return [4 /*yield*/, pool.query("UPDATE users SET token = $1 WHERE user_id = $2", [
                        token,
                        user.user_id,
                    ])];
            case 4:
                // Store the token in the database
                _b.sent();
                res.json({ token: token });
                return [3 /*break*/, 6];
            case 5:
                error_2 = _b.sent();
                console.error(error_2);
                res.status(500).json({ error: "An error occurred" });
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); });
//Signup section
app.post("/signup", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, username, email, password, address, phone_number, country, rows, password_hash, query, values, error_3;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, username = _a.username, email = _a.email, password = _a.password, address = _a.address, phone_number = _a.phone_number, country = _a.country;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 5, , 6]);
                return [4 /*yield*/, pool.query("SELECT * FROM users WHERE email = $1", [
                        email,
                    ])];
            case 2:
                rows = (_b.sent()).rows;
                if (rows.length > 0) {
                    return [2 /*return*/, res.status(400).json({ message: "Email already in use" })];
                }
                return [4 /*yield*/, bcrypt.hash(password, 10)];
            case 3:
                password_hash = _b.sent();
                query = "\n      INSERT INTO users (username, email, password_hash, address, phone_number, country)\n      VALUES ($1, $2, $3, $4, $5, $6)\n    ";
                values = [
                    username,
                    email,
                    password_hash,
                    address,
                    phone_number,
                    country,
                ];
                return [4 /*yield*/, pool.query(query, values)];
            case 4:
                _b.sent();
                res.status(201).json({ message: "User created" });
                return [3 /*break*/, 6];
            case 5:
                error_3 = _b.sent();
                console.error(error_3);
                res
                    .status(500)
                    .json({ error: "An error occurred while creating the user" });
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); });
//Get user by user_id
app.get("/user", authenticate, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user, rows, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                user = req.user;
                if (!user) {
                    console.log("came here. SO wrong in the /user route");
                    return [2 /*return*/, res.status(401).json({ error: "Unauthorized" })];
                }
                return [4 /*yield*/, pool.query("SELECT * FROM users WHERE user_id = $1", [user.user_id])];
            case 1:
                rows = (_a.sent()).rows;
                if (rows.length === 0) {
                    res.status(404).json({ error: "User not found" });
                }
                else {
                    res.json(rows[0]);
                }
                return [3 /*break*/, 3];
            case 2:
                error_4 = _a.sent();
                console.error(error_4);
                res
                    .status(500)
                    .json({ error: "An error occurred while fetching the user" });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
//Get order as an user in the orderView
app.get("/orderUser/:userId", authenticate, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userId, result, orders, i, row, existingOrder, j, error_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                userId = req.params.userId;
                return [4 /*yield*/, pool.query("\n    SELECT orders.order_id,\n    orders.delivery_address,\n    orders.order_date,\n    orders.status,\n    users.username,\n    order_details.product_id,\n    order_details.quantity,\n    products.name\n    FROM orders\n    INNER JOIN users ON orders.user_id = users.user_id\n    INNER JOIN order_details ON orders.order_id = order_details.order_id\n    INNER JOIN products ON order_details.product_id = products.product_id\n    WHERE orders.user_id = $1", [userId])];
            case 1:
                result = _a.sent();
                orders = [];
                for (i = 0; i < result.rows.length; i++) {
                    row = result.rows[i];
                    existingOrder = null;
                    for (j = 0; j < orders.length; j++) {
                        if (orders[j].order_id === row.order_id) {
                            existingOrder = orders[j];
                            break;
                        }
                    }
                    if (existingOrder) {
                        existingOrder.items.push({
                            product_id: row.product_id,
                            product_name: row.name,
                            quantity: row.quantity,
                        });
                    }
                    else {
                        orders.push({
                            order_id: row.order_id,
                            delivery_address: row.delivery_address,
                            order_date: row.order_date,
                            status: row.status,
                            username: row.username,
                            items: [
                                {
                                    product_id: row.product_id,
                                    product_name: row.name,
                                    quantity: row.quantity,
                                },
                            ],
                        });
                    }
                }
                res.status(200).json(orders);
                return [3 /*break*/, 3];
            case 2:
                error_5 = _a.sent();
                console.error(error_5);
                res
                    .status(500)
                    .json({ error: "An error occurred while fetching the orders" });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
//Post order as an user in the cartView
app.post("/orderUser", authenticate, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user, cartItems, orderResult, orderId, _i, _a, item, error_6;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 6, , 7]);
                user = req.user;
                cartItems = req.body;
                return [4 /*yield*/, pool.query("INSERT INTO orders (user_id, delivery_address) VALUES ($1, $2) RETURNING order_id", [user.user_id, user.address])];
            case 1:
                orderResult = _b.sent();
                orderId = orderResult.rows[0].order_id;
                _i = 0, _a = cartItems.items;
                _b.label = 2;
            case 2:
                if (!(_i < _a.length)) return [3 /*break*/, 5];
                item = _a[_i];
                return [4 /*yield*/, pool.query("INSERT INTO order_details (order_id, product_id, quantity) VALUES ($1, $2, $3)", [orderId, item.product_id, item.quantity])];
            case 3:
                _b.sent();
                _b.label = 4;
            case 4:
                _i++;
                return [3 /*break*/, 2];
            case 5:
                res.status(200).json({ message: "Order created" });
                return [3 /*break*/, 7];
            case 6:
                error_6 = _b.sent();
                console.error(error_6);
                res
                    .status(500)
                    .json({ error: "An error occurred while creating the order" });
                return [3 /*break*/, 7];
            case 7: return [2 /*return*/];
        }
    });
}); });
//Remove orders from the userId
app.delete("/ordersUser/:userId", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userId, error_7;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                userId = req.params.userId;
                // Delete all orders associated with the user ID
                return [4 /*yield*/, pool.query("DELETE FROM order_details WHERE order_id IN (SELECT order_id FROM orders WHERE user_id = $1)", [userId])];
            case 1:
                // Delete all orders associated with the user ID
                _a.sent();
                return [4 /*yield*/, pool.query("DELETE FROM orders WHERE user_id = $1", [userId])];
            case 2:
                _a.sent();
                res.status(200).json({ message: "Orders deleted" });
                return [3 /*break*/, 4];
            case 3:
                error_7 = _a.sent();
                console.error(error_7);
                res
                    .status(500)
                    .json({ error: "An error occurred while deleting the orders" });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
//Remove orders and user from the database
app.delete("/UserAdmin/:userId", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userId, error_8;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 4, , 5]);
                userId = req.params.userId;
                // Delete all orders associated with the user ID
                return [4 /*yield*/, pool.query("DELETE FROM order_details WHERE order_id IN (SELECT order_id FROM orders WHERE user_id = $1)", [userId])];
            case 1:
                // Delete all orders associated with the user ID
                _a.sent();
                return [4 /*yield*/, pool.query("DELETE FROM orders WHERE user_id = $1", [userId])];
            case 2:
                _a.sent();
                // Delete the user
                return [4 /*yield*/, pool.query("DELETE FROM users WHERE user_id = $1", [userId])];
            case 3:
                // Delete the user
                _a.sent();
                res.status(200).json({ message: "User and associated orders deleted" });
                return [3 /*break*/, 5];
            case 4:
                error_8 = _a.sent();
                console.error(error_8);
                res
                    .status(500)
                    .json({ error: "An error occurred while deleting the user and orders" });
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); });
//Get all users, products, orders, order_details and menus with authentication as admin
app.get("/usersAdmin", authenticate, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var rows, error_9;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, pool.query("SELECT * FROM users")];
            case 1:
                rows = (_a.sent()).rows;
                if (rows.length === 0) {
                    res.status(404).json({ error: "No users found" });
                }
                else {
                    res.json(rows);
                }
                return [3 /*break*/, 3];
            case 2:
                error_9 = _a.sent();
                res.status(500).json({ error: "An error occured" });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
app.get("/productsAdmin", authenticate, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var rows, error_10;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, pool.query("SELECT * FROM products")];
            case 1:
                rows = (_a.sent()).rows;
                console.log("SQL query result:", rows);
                if (rows.length === 0) {
                    res.status(404).json({ error: "No products found" });
                }
                else {
                    res.json(rows);
                }
                return [3 /*break*/, 3];
            case 2:
                error_10 = _a.sent();
                console.error("An error occurred:", error_10);
                res.status(500).json({ error: "An error occurred" });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
app.get("/ordersAdmin", authenticate, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var rows, error_11;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, pool.query("SELECT * FROM orders")];
            case 1:
                rows = (_a.sent()).rows;
                if (rows.length === 0) {
                    res.status(404).json({ error: "No users found" });
                }
                else {
                    res.json(rows);
                }
                return [3 /*break*/, 3];
            case 2:
                error_11 = _a.sent();
                res.status(500).json({ error: "An error occured" });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
app.get("/order_detailsAdmin", authenticate, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var rows, error_12;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, pool.query("SELECT * FROM order_details")];
            case 1:
                rows = (_a.sent()).rows;
                if (rows.length === 0) {
                    res.status(404).json({ error: "No users found" });
                }
                else {
                    res.json(rows);
                }
                return [3 /*break*/, 3];
            case 2:
                error_12 = _a.sent();
                res.status(500).json({ error: "An error occured" });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
app.get("/menusAdmin", authenticate, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var rows, error_13;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, pool.query("SELECT * FROM menus")];
            case 1:
                rows = (_a.sent()).rows;
                if (rows.length === 0) {
                    res.status(404).json({ error: "No users found" });
                }
                else {
                    res.json(rows);
                }
                return [3 /*break*/, 3];
            case 2:
                error_13 = _a.sent();
                res.status(500).json({ error: "An error occured" });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
app.listen(port, function () {
    console.log("Server is running on port localhost:".concat(port));
});
