"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
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
var RateLimiterCoreModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.RateLimiterCoreModule = void 0;
const common_1 = require("@nestjs/common");
const rate_limiter_constants_1 = require("./rate-limiter.constants");
const rate_limiter_service_1 = require("./rate-limiter.service");
let RateLimiterCoreModule = RateLimiterCoreModule_1 = class RateLimiterCoreModule {
    static forRoot(options) {
        const RateLimiterOptionsProvider = {
            provide: rate_limiter_constants_1.RATE_LIMITER_OPTIONS,
            useValue: options,
        };
        return {
            module: RateLimiterCoreModule_1,
            providers: [RateLimiterOptionsProvider, rate_limiter_service_1.RateLimiterService],
            exports: [rate_limiter_service_1.RateLimiterService],
        };
    }
    static forRootAsync(options) {
        const providers = this.createAsyncProviders(options);
        return {
            module: RateLimiterCoreModule_1,
            providers: [...providers, rate_limiter_service_1.RateLimiterService],
            imports: options.imports,
            exports: [rate_limiter_service_1.RateLimiterService],
        };
    }
    static createAsyncProviders(options) {
        const providers = [this.createAsyncOptionsProvider(options)];
        if (options.useClass) {
            providers.push({
                provide: options.useClass,
                useClass: options.useClass,
            });
        }
        return providers;
    }
    static createAsyncOptionsProvider(options) {
        if (options.useFactory) {
            return {
                name: rate_limiter_constants_1.RATE_LIMITER_OPTIONS,
                provide: rate_limiter_constants_1.RATE_LIMITER_OPTIONS,
                useFactory: options.useFactory,
                inject: options.inject || [],
            };
        }
        return {
            name: rate_limiter_constants_1.RATE_LIMITER_OPTIONS,
            provide: rate_limiter_constants_1.RATE_LIMITER_OPTIONS,
            useFactory: (optionsFactory) => __awaiter(this, void 0, void 0, function* () {
                return optionsFactory.createRateLimiterOptions();
            }),
            inject: [options.useExisting || options.useClass],
        };
    }
};
RateLimiterCoreModule = RateLimiterCoreModule_1 = __decorate([
    common_1.Global(),
    common_1.Module({})
], RateLimiterCoreModule);
exports.RateLimiterCoreModule = RateLimiterCoreModule;
