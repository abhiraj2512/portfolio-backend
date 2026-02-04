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
    // CORS Configuration
    // Allow requests from local dev and production domain
    const allowedOrigins = [
        'http://localhost:5173', // Vite local dev
        'http://localhost:3000', // React local dev
        config.frontendUrl,      // Production URL from env
    ];

    app.use(
        cors({
            origin: (origin, callback) => {
                // Allow requests with no origin (like mobile apps or curl requests)
                if (!origin) return callback(null, true);

                // Check if origin is in the allowed list
                if (allowedOrigins.indexOf(origin) !== -1) {
                    return callback(null, true);
                }

                // Allow dynamic Vercel preview URLs (ending with .vercel.app)
                if (origin.endsWith('.vercel.app')) {
                    return callback(null, true);
                }

                console.log('Blocked by CORS:', origin);
                callback(new Error('Not allowed by CORS'));
            },
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
