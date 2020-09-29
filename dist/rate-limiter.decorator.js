"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RateLimit = void 0;
const rate_limiter_constants_1 = require("./rate-limiter.constants");
const common_1 = require("@nestjs/common");
exports.RateLimit = (options) => common_1.SetMetadata(rate_limiter_constants_1.RATE_LIMITER_TOKEN, options);
