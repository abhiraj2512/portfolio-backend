import express, { Application } from 'express';
import cors from 'cors';
import config from './config';
import routes from './routes';
import { errorHandler, notFoundHandler } from './middlewares/errorHandler';

/**
 * Create and configure Express application
 */
const createApp = (): Application => {
    const app: Application = express();

    // CORS Configuration
    // Allow requests from the frontend
    app.use(
        cors({
            origin: config.frontendUrl,
            credentials: true,
        })
    );

    // Body Parser Middleware
    // Parse incoming JSON requests
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    // API Routes
    // All routes are prefixed with /api
    app.use('/api', routes);

    // 404 Handler
    // Must be after all other routes
    app.use(notFoundHandler);

    // Error Handler
    // Must be the last middleware
    app.use(errorHandler);

    return app;
};

export default createApp;
