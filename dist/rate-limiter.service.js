"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RateLimiterService = void 0;
const rate_limiter_flexible_1 = require("rate-limiter-flexible");
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const rate_limiter_constants_1 = require("./rate-limiter.constants");
let RateLimiterService = class RateLimiterService {
    constructor(options, reflector) {
        this.options = options;
        this.reflector = reflector;
        this.rateLimiters = new Map();
    }
    getRateLimiter(keyPrefix, options) {
        return __awaiter(this, void 0, void 0, function* () {
            let rateLimiter = this.rateLimiters.get(keyPrefix);
            const limiterOptions = Object.assign(Object.assign(Object.assign({}, this.options), options), { keyPrefix });
            const { type, pointsConsumed } = limiterOptions, libraryArguments = __rest(limiterOptions, ["type", "pointsConsumed"]);
            if (!rateLimiter) {
                if (limiterOptions.type === 'Redis') {
                    rateLimiter = new rate_limiter_flexible_1.RateLimiterRedis(libraryArguments);
                }
                else if (limiterOptions.type === 'Memcache') {
                    rateLimiter = new rate_limiter_flexible_1.RateLimiterMemcache(libraryArguments);
                }
                else if (limiterOptions.type === 'Postgres') {
                    rateLimiter = yield new Promise((resolve, reject) => {
                        const limiter = new rate_limiter_flexible_1.RateLimiterPostgres(libraryArguments, (err) => {
                            if (err) {
                                reject(err);
                            }
                            else {
                                resolve(limiter);
                            }
                        });
                    });
                }
                else if (limiterOptions.type === 'MySQL') {
                    rateLimiter = yield new Promise((resolve, reject) => {
                        const limiter = new rate_limiter_flexible_1.RateLimiterMySQL(libraryArguments, (err) => {
                            if (err) {
                                reject(err);
                            }
                            else {
                                resolve(limiter);
                            }
                        });
                    });
                }
                else {
                    rateLimiter = new rate_limiter_flexible_1.RateLimiterMemory(libraryArguments);
                }
                this.rateLimiters.set(keyPrefix, rateLimiter);
            }
            return rateLimiter;
        });
    }
    executeRateLimiter(context) {
        var _a, _b, _c, _d, _e;
        return __awaiter(this, void 0, void 0, function* () {
            const reflectedOptions = (_a = this.reflector.get(rate_limiter_constants_1.RATE_LIMITER_TOKEN, context.getHandler())) !== null && _a !== void 0 ? _a : {};
            const points = (_b = reflectedOptions.points) !== null && _b !== void 0 ? _b : this.options.points;
            const pointsConsumed = (_c = reflectedOptions.pointsConsumed) !== null && _c !== void 0 ? _c : this.options.pointsConsumed;
            const sendHeaders = (_d = reflectedOptions.headers) !== null && _d !== void 0 ? _d : this.options.headers;
            const keyGenerator = (_e = reflectedOptions.keyGenerator) !== null && _e !== void 0 ? _e : this.options.keyGenerator;
            let keyPrefix;
            if (reflectedOptions.keyPrefix) {
                keyPrefix = reflectedOptions.keyPrefix;
            }
            else {
                keyPrefix = context.getClass().name;
                if (context.getHandler()) {
                    keyPrefix += `-${context.getHandler().name}`;
                }
            }
            const rateLimiter = yield this.getRateLimiter(keyPrefix, reflectedOptions);
            const request = context.switchToHttp().getRequest();
            const response = context.switchToHttp().getResponse();
            let setHeader;
            if (response.set) {
                setHeader = response.set.bind(response);
            }
            else if (response.header) {
                setHeader = response.header.bind(response);
            }
            else {
                throw new Error('Cannot determine method to set response headers');
            }
            const key = keyGenerator(request);
            try {
                const rateLimiterResponse = yield rateLimiter.consume(key, pointsConsumed);
                if (sendHeaders) {
                    setHeader('Retry-After', Math.ceil(rateLimiterResponse.msBeforeNext / 1000));
                    setHeader('X-RateLimit-Limit', points);
                    setHeader('X-Retry-Remaining', rateLimiterResponse.remainingPoints);
                    setHeader('X-Retry-Reset', new Date(Date.now() + rateLimiterResponse.msBeforeNext).toUTCString());
                }
            }
            catch (rateLimiterResponse) {
                if (rateLimiterResponse instanceof Error) {
                    throw rateLimiterResponse;
                }
                setHeader('Retry-After', Math.ceil(rateLimiterResponse.msBeforeNext / 1000));
                throw new common_1.HttpException('Rate limit exceeded', common_1.HttpStatus.TOO_MANY_REQUESTS);
            }
        });
    }
};
RateLimiterService = __decorate([
    common_1.Injectable(),
    __param(0, common_1.Inject(rate_limiter_constants_1.RATE_LIMITER_OPTIONS)),
    __param(1, common_1.Inject(rate_limiter_constants_1.REFLECTOR)),
    __metadata("design:paramtypes", [Object, core_1.Reflector])
], RateLimiterService);
exports.RateLimiterService = RateLimiterService;
