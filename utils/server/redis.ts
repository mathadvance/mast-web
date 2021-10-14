import Redis from "ioredis";

const redis_sessionIDs = new Redis(process.env.REDIS_SESSION_URI);
const redis_emailVerificationIDs = new Redis(process.env.REDIS_EMAILVERIFY_URI);

export { redis_sessionIDs, redis_emailVerificationIDs };
