const requiredEnv = [
  "MONGODB_URI",
  "JWT_SECRET",
  "FRONTEND_URL"
];

requiredEnv.forEach((key) => {
  if (!process.env[key]) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
});