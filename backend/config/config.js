const config = {
  development: {
    port: process.env.PORT || 5000,
    jwtSecret: process.env.JWT_SECRET || 'your-secret-key',
    database: {
      url: process.env.MONGODB_URI || 'mongodb://localhost:27017/fyp_management',
    },
    email: {
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
    cors: {
      origin: process.env.FRONTEND_URL || 'http://localhost:3000',
      credentials: true,
    }
  },
  production: {
    // Add production config here
  }
};

module.exports = config[process.env.NODE_ENV || 'development']; 