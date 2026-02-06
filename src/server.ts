import createApp from './app';
import config from './config';
import { connectDatabase } from './config/database';

/**
 * Validate production environment
 * Fails fast if required variables are missing
 */
const validateProductionEnv = (): void => {
    if (config.isProduction()) {
        if (!config.mongoUri) {
            console.error('FATAL: MONGODB_URI is required in production');
            process.exit(1);
        }
        if (!config.frontendUrl || config.frontendUrl === 'http://localhost:3000') {
            console.warn('WARNING: FRONTEND_URL should be set to production domain');
        }
    }
};

/**
 * Start the Express server
 */
const startServer = async (): Promise<void> => {
    try {
        // Validate production environment first
        validateProductionEnv();

        // Connect to MongoDB first
        await connectDatabase();

        const app = createApp();

        // Start listening on the configured port
        // Use 0.0.0.0 to accept connections from any interface (required for Render)
        const host = '0.0.0.0';
        app.listen(config.port, host, () => {
            console.log('Portfolio API Server Started');
            console.log(`Environment: ${config.nodeEnv}`);
            console.log(`Port: ${config.port}`);
            console.log(`Host: ${host}`);
        });
    } catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1);
    }
};

// Start the server
startServer();

