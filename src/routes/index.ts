import { Router } from 'express';
import { healthCheck } from '../controllers/healthController';
import { handleContactForm } from '../controllers/contactController';
import { getContacts } from '../controllers/adminController';
import { adminAuth } from '../middlewares/adminAuth';

const router = Router();

/**
 * Health Check Route
 * GET /api/v1/health
 * Returns the status of the API
 */
router.get('/health', healthCheck);

/**
 * Contact Form Route
 * POST /api/v1/contact
 * Handles contact form submissions with validation
 */
router.post('/contact', handleContactForm);

/**
 * Admin Routes
 * Protected by admin key authentication
 */

/**
 * Get All Contacts (Admin)
 * GET /api/v1/admin/contacts
 * Returns paginated list of contact submissions
 */
router.get('/admin/contacts', adminAuth, getContacts);

export default router;

