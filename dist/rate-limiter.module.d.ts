import { DynamicModule } from '@nestjs/common';
import { RateLimiterModuleAsyncOptions, RateLimiterModuleOptions } from './rate-limiter.interface';
export declare class RateLimiterModule {
    static forRoot(options?: RateLimiterModuleOptions): DynamicModule;
    static forRootAsync(options: RateLimiterModuleAsyncOptions): DynamicModule;
}
