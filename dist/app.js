"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
require("./container");
const User_1 = __importDefault(require("./presentation/routes/User"));
const cors_1 = __importDefault(require("cors"));
const db_1 = __importDefault(require("./infrastructure/database/db"));
const authRoutes_1 = __importDefault(require("./presentation/routes/authRoutes"));
const serviceProvider_1 = __importDefault(require("./presentation/routes/serviceProvider"));
const admin_1 = __importDefault(require("./presentation/routes/admin"));
dotenv_1.default.config();
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const google_1 = __importDefault(require("./presentation/routes/google"));
const location_1 = __importDefault(require("./presentation/routes/location"));
const service_1 = __importDefault(require("./presentation/routes/service"));
const morgan_1 = __importDefault(require("morgan"));
const payment_1 = __importDefault(require("./presentation/routes/payment"));
const tsyringe_1 = require("tsyringe");
const chat_1 = __importDefault(require("./presentation/routes/chat"));
const http_1 = __importDefault(require("http"));
const socketService_1 = require("./services/socket/socketService");
const app = (0, express_1.default)();
const server = http_1.default.createServer(app);
app.use((0, cookie_parser_1.default)());
app.use((0, morgan_1.default)("dev"));
app.use(express_1.default.json({ limit: "50mb" }));
app.use(express_1.default.urlencoded({ limit: "50mb", extended: true }));
app.use((0, cors_1.default)({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PATCH", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
}));
const socketService = tsyringe_1.container.resolve(socketService_1.SocketService);
socketService.initialize(server);
app.use('/location', location_1.default);
app.use("/", authRoutes_1.default);
app.use("/", User_1.default);
app.use("/service-providers", serviceProvider_1.default);
app.use("/google", google_1.default);
app.use("/admin", admin_1.default);
app.use("/service", service_1.default);
app.use("/payment", payment_1.default);
app.use("/chat", chat_1.default);
(0, db_1.default)().catch((e) => console.log(e));
app.use((err, req, res, next) => {
    console.log(err);
});
const PORT = process.env.PORT || 5001;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
