import { RateLimiterInterceptor } from '../rate-limiter.interceptor';
import { RateLimiterService } from '../rate-limiter.service';
import { Reflector } from '@nestjs/core';

describe('interceptor', () => {
    it('should call next.handle', async () => {
        const rateLimiterService = new RateLimiterService({}, new Reflector());
        rateLimiterService.executeRateLimiter = jest.fn();
        const next = { handle: jest.fn() };
        const rateLimiterInterceptor = new RateLimiterInterceptor(rateLimiterService);
        await rateLimiterInterceptor.intercept({} as any, next);

        expect(rateLimiterService.executeRateLimiter).toHaveBeenCalledWith({});
        expect(next.handle).toHaveBeenCalled();
    });
});
