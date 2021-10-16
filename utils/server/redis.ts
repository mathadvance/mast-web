import Redis from "ioredis";

const redis_sessionIDs = new Redis(process.env.REDIS_SESSION_URI);
const redis_emailVerificationIDs = new Redis(process.env.REDIS_EMAILVERIFY_URI);
const redis_passwordResetIDS = new Redis(process.env.REDIS_RESETPASSWORD_URI);
const redis_changeEmailIDS = new Redis(process.env.REDIS_CHANGEEMAIL_URI);

export { redis_sessionIDs, redis_emailVerificationIDs, redis_passwordResetIDS, redis_changeEmailIDS };
