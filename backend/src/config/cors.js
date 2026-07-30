import cors from "cors";

const allowedOrigins = process.env.FRONTEND_URL
  .split(",")
  .map(origin => origin.trim().replace(/\/$/, ""));

const corsOptions = {

  origin(origin, callback) {

    // Postman / Mobile / Server-to-Server
    if (!origin) {
      return callback(null, true);
    }

    const cleanOrigin = origin.replace(/\/$/, "");

    // Local Development
    if (
      process.env.NODE_ENV !== "production" &&
      (
        cleanOrigin.startsWith("http://localhost:") ||
        cleanOrigin.startsWith("http://127.0.0.1:")
      )
    ) {
      return callback(null, true);
    }

    // Production Frontends
    if (allowedOrigins.includes(cleanOrigin)) {
      return callback(null, true);
    }

    return callback(new Error("Origin not allowed by CORS"));
  },

  credentials: true,

  methods: [
    "GET",
    "POST",
    "PUT",
    "PATCH",
    "DELETE",
    "OPTIONS"
  ],

  allowedHeaders: [
    "Content-Type",
    "Authorization"
  ]

};

export default cors(corsOptions);