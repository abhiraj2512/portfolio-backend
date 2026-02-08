import { Request, Response } from 'express';
import Contact from '../models/Contact';

/**
 * Pagination Query Parameters
 */
interface PaginationQuery {
    page?: string;
    limit?: string;
}

/**
 * Get All Contacts (Admin Only)
 * GET /api/v1/admin/contacts
 * 
 * Query params:
 * - page: number (default: 1)
 * - limit: number (default: 10)
 * 
 * Returns paginated list of contact submissions
 */
export const getContacts = async (req: Request, res: Response) => {
    try {
        const { page = '1', limit = '10' } = req.query as PaginationQuery;

        // Parse and validate pagination params
        const pageNum = Math.max(1, parseInt(page, 10) || 1);
        const limitNum = Math.min(100, Math.max(1, parseInt(limit, 10) || 10));
        const skip = (pageNum - 1) * limitNum;

        // Fetch contacts with pagination
        const [contacts, total] = await Promise.all([
            Contact.find()
                .sort({ createdAt: -1 })
                .skip(skip)
                .limit(limitNum)
                .lean(),
            Contact.countDocuments(),
        ]);

        // Calculate total pages
        const totalPages = Math.ceil(total / limitNum);

        return res.status(200).json({
            data: contacts,
            meta: {
                page: pageNum,
                limit: limitNum,
                total,
                totalPages,
            },
        });
    } catch (error) {
        console.error('Error fetching contacts:', error);
        return res.status(500).json({
            status: 'error',
            message: 'Failed to fetch contacts',
        });
    }
};
