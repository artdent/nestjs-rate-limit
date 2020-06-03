import * as common from '@nestjs/common';

import { RATE_LIMITER_TOKEN } from '../rate-limiter.constants';
import { RateLimit } from '../rate-limiter.decorator';

describe('decorator', () => {
    it('should call SetMetadata', () => {
        const mockSetMetadata = jest.fn();
        jest.spyOn(common, 'SetMetadata').mockImplementation(mockSetMetadata);
        RateLimit({ duration: 60 });

        expect(mockSetMetadata).toHaveBeenCalledWith(RATE_LIMITER_TOKEN, { duration: 60 });
    });
});
