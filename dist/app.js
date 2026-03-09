"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const morgan_1 = __importDefault(require("morgan"));
const http_1 = __importDefault(require("http"));
const tsyringe_1 = require("tsyringe");
require("./container");
const db_1 = __importDefault(require("./infrastructure/database/db"));
const auth_1 = __importDefault(require("./presentation/routes/auth"));
const user_1 = __importDefault(require("./presentation/routes/user"));
const location_1 = __importDefault(require("./presentation/routes/location"));
const serviceProvider_1 = __importDefault(require("./presentation/routes/serviceProvider"));
const serviceProviderSubscription_1 = __importDefault(require("./presentation/routes/serviceProviderSubscription"));
const admin_1 = __importDefault(require("./presentation/routes/admin"));
const service_1 = __importDefault(require("./presentation/routes/service"));
const payment_1 = __importDefault(require("./presentation/routes/payment"));
const chat_1 = __importDefault(require("./presentation/routes/chat"));
const logger_1 = __importDefault(require("./utils/logger"));
const SocketService_1 = require("./services/socket/SocketService");
const SubscriptionCheckJob_1 = require("./infrastructure/jobs/cron/SubscriptionCheckJob");
const AdsExpireJob_1 = require("./infrastructure/jobs/cron/AdsExpireJob");
const CleanupExpiredSlotsJob_1 = require("./infrastructure/jobs/cron/CleanupExpiredSlotsJob");
const errorMiddleware_1 = require("./presentation/Middlewares/errorMiddleware");
const app = (0, express_1.default)();
const server = http_1.default.createServer(app);
const allowedOrigins = ((_a = process.env.CLIENT_URL) === null || _a === void 0 ? void 0 : _a.split(",").map((url) => url.trim())) || [];
app.use((0, cors_1.default)({
    origin: allowedOrigins,
    credentials: true,
    methods: ["GET", "POST", "PATCH", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
}));
app.use((0, cookie_parser_1.default)());
app.use((0, morgan_1.default)("dev"));
app.use(express_1.default.json({ limit: "50mb" }));
app.use(express_1.default.urlencoded({ limit: "50mb", extended: true }));
app.use(logger_1.default);
tsyringe_1.container.resolve(SocketService_1.SocketService).initialize(server);
tsyringe_1.container.resolve(SubscriptionCheckJob_1.SubscriptionCheckJob).schedule();
tsyringe_1.container.resolve(AdsExpireJob_1.AdsExpireJob).start();
tsyringe_1.container.resolve(CleanupExpiredSlotsJob_1.CleanupExpiredSlotsJob).schedule();
app.use("/", auth_1.default);
app.use("/", user_1.default);
app.use("/location", location_1.default);
app.use("/service-providers", serviceProvider_1.default);
app.use("/service-providers", serviceProviderSubscription_1.default);
app.use("/admin", admin_1.default);
app.use("/service", service_1.default);
app.use("/payment", payment_1.default);
app.use("/chat", chat_1.default);
app.use(errorMiddleware_1.errorMiddleware);
(0, db_1.default)()
    .then(() => {
    const PORT = process.env.PORT || 5001;
    server.listen(PORT, () => {
        console.log(` Server running on port ${PORT}`);
    });
})
    .catch((err) => {
    console.error("DB connection failed", err);
    process.exit(1);
});
