"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv").config();
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const connect_redis_1 = __importDefault(require("connect-redis"));
const ioredis_1 = __importDefault(require("ioredis"));
const express_session_1 = __importDefault(require("express-session"));
const routes_1 = __importDefault(require("./routes"));
const feedback_1 = __importDefault(require("./routes/feedback"));
const app = express_1.default();
const RedisStore = connect_redis_1.default(express_session_1.default);
const redis = new ioredis_1.default(process.env.REDIS_URL);
app.use(cors_1.default());
app.use(body_parser_1.default.json());
app.use(express_session_1.default({
    name: process.env.SESSION_NAME,
    store: new RedisStore({
        client: redis,
        ttl: 3600,
        disableTouch: true,
    }),
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
}));
app.use("/", routes_1.default);
app.use("/feedback", feedback_1.default);
app.listen(3000, () => {
    console.log("server started at port 3000");
});
exports.default = app;
//# sourceMappingURL=index.js.map