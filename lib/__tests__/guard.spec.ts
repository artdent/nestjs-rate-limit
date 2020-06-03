import { RateLimiterGuard } from '../rate-limiter.guard';
import { RateLimiterService } from '../rate-limiter.service';
import { Reflector } from '@nestjs/core';

describe('guard', () => {
    it('should return true', async () => {
        const rateLimiterService = new RateLimiterService({}, new Reflector());
        rateLimiterService.executeRateLimiter = jest.fn();
        const rateLimiterGuard = new RateLimiterGuard(rateLimiterService);
        await rateLimiterGuard.canActivate({} as any);

        expect(rateLimiterService.executeRateLimiter).toHaveBeenCalledWith({});
    });
});
