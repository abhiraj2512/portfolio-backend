import createApp from './app';
import config from './config';

/**
 * Start the Express server
 */
const startServer = (): void => {
    const app = createApp();

    // Start listening on the configured port
    app.listen(config.port, () => {
        console.log('Portfolio API Server Started');
        console.log(`Environment: ${config.nodeEnv}`);
        console.log(`Port: ${config.port}`);
    });
};

// Start the server
startServer();
