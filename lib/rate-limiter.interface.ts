import { ModuleMetadata, Type } from '@nestjs/common/interfaces';

import { IRateLimiterOptions } from 'rate-limiter-flexible';
import { Provider } from '@nestjs/common';

export type RateLimiterType = 'Redis' | 'Memcache' | 'Postgres' | 'MySQL' | 'Memory';

export interface RateLimiterModuleOptions extends Partial<IRateLimiterOptions> {
    type?: RateLimiterType;
    pointsConsumed?: number;
}

export interface RateLimiterOptionsFactory {
    createRateLimiterOptions(): Promise<RateLimiterModuleOptions> | RateLimiterModuleOptions;
}

export interface RateLimiterModuleAsyncOptions extends Pick<ModuleMetadata, 'imports'> {
    useExisting?: Type<RateLimiterOptionsFactory>;
    useClass?: Type<RateLimiterOptionsFactory>;
    useFactory?: (...args: any[]) => Promise<RateLimiterModuleOptions> | RateLimiterModuleOptions;
    inject?: any[];
    extraProviders?: Provider[];
}
