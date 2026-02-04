import { Request, Response } from 'express';

/**
 * Health Check Controller
 * Provides a simple endpoint to verify the API is running
 */
export const healthCheck = (req: Request, res: Response) => {
    res.status(200).json({
        status: 'ok',
        message: 'Portfolio API is running',
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV || 'development',
    });
};
