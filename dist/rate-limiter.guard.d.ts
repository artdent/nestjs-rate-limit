import { CanActivate, ExecutionContext } from '@nestjs/common';
import { RateLimiterService } from './rate-limiter.service';
export declare class RateLimiterGuard implements CanActivate {
    private readonly rateLimiterService;
    constructor(rateLimiterService: RateLimiterService);
    canActivate(context: ExecutionContext): Promise<boolean>;
}
