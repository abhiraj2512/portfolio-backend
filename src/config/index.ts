import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

/**
 * Configuration object for the application
 * All environment variables are accessed through this centralized config
 */
const config = {
    // Server configuration
    port: parseInt(process.env.PORT || '5000', 10),
    nodeEnv: process.env.NODE_ENV || 'development',

    // CORS configuration
    frontendUrl: process.env.FRONTEND_URL || 'http://localhost:3000',

    // API configuration
    apiVersion: process.env.API_VERSION || 'v1',

    // Database configuration
    mongoUri: process.env.MONGODB_URI || '',

    // Helper methods
    isDevelopment: () => config.nodeEnv === 'development',
    isProduction: () => config.nodeEnv === 'production',
};

export default config;
