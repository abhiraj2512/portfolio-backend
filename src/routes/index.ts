import { Router } from 'express';
import { healthCheck } from '../controllers/healthController';
import { handleContactForm } from '../controllers/contactController';

const router = Router();

/**
 * Health Check Route
 * GET /api/health
 * Returns the status of the API
 */
router.get('/health', healthCheck);

/**
 * Contact Form Route
 * POST /api/contact
 * Handles contact form submissions with validation
 */
router.post('/contact', handleContactForm);

export default router;

