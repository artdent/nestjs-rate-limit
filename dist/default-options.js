"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultRateLimiterOptions = void 0;
exports.defaultRateLimiterOptions = {
    type: 'Memory',
    points: 4,
    duration: 1,
    pointsConsumed: 1,
    headers: true,
    keyGenerator: (request) => (request.user ? request.user.id : request.ip),
};
