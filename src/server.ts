import createApp from './app';
import config from './config';

/**
 * Start the Express server
 */
const startServer = (): void => {
    const app = createApp();

    // Start listening on the configured port
    app.listen(config.port, () => {
        console.log('=================================');
        console.log(`🚀 Portfolio API Server Started`);
        console.log(`=================================`);
        console.log(`Environment: ${config.nodeEnv}`);
        console.log(`Port: ${config.port}`);
        console.log(`Health Check: http://localhost:${config.port}/api/health`);
        console.log('=================================');
    });
};

// Start the server
startServer();
