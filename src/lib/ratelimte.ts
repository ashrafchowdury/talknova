import redis from "./redis";
import { headers } from "next/headers";
import { NextRequest } from "next/server";

export const ratelimit = {
  auth: async function (request: NextRequest) {
    const userIP = headers().get("x-forwarded-for");
    const key = `ratelmit:${userIP}`;

    const isIpExist = (await redis.hget(key, "requests")) as number;

    if (!isIpExist) {
      const newUserRequest = await redis.hset(key, {
        user: userIP,
        requests: 1,
      });

      await redis.expire(key, 300);

      return newUserRequest;
    }

    if (isIpExist >= 5) {
      throw new Error("429 too many requests");
    }

    const updatedRequest = await redis.hincrby(key, "requests", 1);

    return updatedRequest;
  },
};
