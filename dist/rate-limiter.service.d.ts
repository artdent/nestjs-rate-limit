import { RateLimiterMemory } from 'rate-limiter-flexible';
import { ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { RateLimiterModuleOptions } from './rate-limiter.interface';
export declare class RateLimiterService {
    private readonly options;
    private readonly reflector;
    private rateLimiters;
    constructor(options: RateLimiterModuleOptions, reflector: Reflector);
    getRateLimiter(keyPrefix: string, options?: RateLimiterModuleOptions): Promise<RateLimiterMemory>;
    executeRateLimiter(context: ExecutionContext): Promise<void>;
}
