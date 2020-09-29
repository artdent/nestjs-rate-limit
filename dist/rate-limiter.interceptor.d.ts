import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { RateLimiterService } from './rate-limiter.service';
export declare class RateLimiterInterceptor implements NestInterceptor {
    private readonly rateLimiterService;
    constructor(rateLimiterService: RateLimiterService);
    intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<any>>;
}
