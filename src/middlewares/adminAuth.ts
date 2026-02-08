import { Request, Response, NextFunction } from 'express';
import config from '../config';

/**
 * Admin Authentication Middleware
 * Validates x-admin-key header against ADMIN_SECRET
 * 
 * 401 - Missing header
 * 403 - Invalid key
 */
export const adminAuth = (
    req: Request,
    res: Response,
    next: NextFunction
): void => {
    const adminKey = req.headers['x-admin-key'];

    // Check if header is missing
    if (!adminKey) {
        res.status(401).json({
            status: 'error',
            message: 'Admin authentication required',
        });
        return;
    }

    // Check if key matches
    if (adminKey !== config.adminSecret) {
        res.status(403).json({
            status: 'error',
            message: 'Invalid admin key',
        });
        return;
    }

    // Valid key, proceed
    next();
};
