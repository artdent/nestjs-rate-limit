"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var RateLimiterModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.RateLimiterModule = void 0;
const common_1 = require("@nestjs/common");
const rate_limiter_core_module_1 = require("./rate-limiter-core.module");
const default_options_1 = require("./default-options");
let RateLimiterModule = RateLimiterModule_1 = class RateLimiterModule {
    static forRoot(options = default_options_1.defaultRateLimiterOptions) {
        return {
            module: RateLimiterModule_1,
            imports: [rate_limiter_core_module_1.RateLimiterCoreModule.forRoot(options)],
        };
    }
    static forRootAsync(options) {
        return {
            module: RateLimiterModule_1,
            imports: [rate_limiter_core_module_1.RateLimiterCoreModule.forRootAsync(options)],
        };
    }
};
RateLimiterModule = RateLimiterModule_1 = __decorate([
    common_1.Module({})
], RateLimiterModule);
exports.RateLimiterModule = RateLimiterModule;
