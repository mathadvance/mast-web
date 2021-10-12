import Redis from "ioredis";

const redis_sessionIDs = new Redis(process.env.REDIS_URI + "/0");
const redis_emailVerificationIDs = new Redis(process.env.REDIS_URI + "/1");

export { redis_sessionIDs, redis_emailVerificationIDs };
