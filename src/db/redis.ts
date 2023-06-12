import Redis from "ioredis";

const { host, port, password } = {
  host: process.env.REDIS_HOST || "",
  port: parseInt(process.env.REDIS_PORT || "6379"),
  password: process.env.REDIS_PASSWORD || "",
};

const client = new Redis({
  username: "default",
  host,
  port,
  password,
  tls: "RedisCloudFixed" as any,
  lazyConnect: false,
  connectTimeout: 5000,
});

export default client;
