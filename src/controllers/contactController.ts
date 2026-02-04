import { Request, Response } from 'express';

/**
 * Contact Form Request Body Type
 */
interface ContactRequest {
    name: string;
    email: string;
    message: string;
    phone: string;
}

/**
 * Name validation helper
 * Validates that name contains only alphabets and spaces
 * Length: 2-50 characters
 */
const isValidName = (name: string): boolean => {
    // Check length
    if (name.length < 2 || name.length > 50) {
        return false;
    }

    // Only alphabets and spaces allowed
    const nameRegex = /^[a-zA-Z\s]+$/;
    return nameRegex.test(name);
};

/**
 * Phone validation helper
 * Validates that phone contains only digits
 * Length: 8-15 digits
 */
const isValidPhone = (phone: string): boolean => {
    // Check length
    if (phone.length < 8 || phone.length > 15) {
        return false;
    }

    // Only digits allowed
    const phoneRegex = /^\d+$/;
    return phoneRegex.test(phone);
};

/**
 * Email validation helper
 * Simple regex pattern for basic email validation
 */
const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

/**
 * Message validation helper
 * Validates that message is not empty and within length limits
 * Allows any characters (symbols, numbers, etc.)
 */
const isValidMessage = (message: string): boolean => {
    // Check if empty or only whitespace
    if (message.trim() === '') {
        return false;
    }

    // Check length (1-1000 characters)
    if (message.length < 1 || message.length > 1000) {
        return false;
    }

    return true;
};

/**
 * Contact Form Controller
 * Handles contact form submissions with validation
 * 
 * POST /api/contact
 * Body: { name, email, message, phone }
 */
export const handleContactForm = (_req: Request, res: Response) => {
    const { name, email, message, phone } = _req.body as ContactRequest;

    // Validation: Check if all fields are provided
    if (!name || !email || !message || !phone) {
        return res.status(400).json({
            success: false,
            error: 'All fields are required: name, email, phone, and message',
        });
    }

    // Validation: Check if fields are strings
    if (typeof name !== 'string' || typeof email !== 'string' || typeof message !== 'string' || typeof phone !== 'string') {
        return res.status(400).json({
            success: false,
            error: 'All fields must be valid strings',
        });
    }

    // Validation: Check if fields are not just whitespace
    if (name.trim() === '' || email.trim() === '' || message.trim() === '' || phone.trim() === '') {
        return res.status(400).json({
            success: false,
            error: 'All fields must contain valid content (not just whitespace)',
        });
    }

    // Validation: Validate name format (alphabets and spaces only, 2-50 chars)
    if (!isValidName(name)) {
        return res.status(400).json({
            success: false,
            error: 'Please provide a valid name (alphabets only)',
        });
    }

    // Validation: Validate email format
    if (!isValidEmail(email)) {
        return res.status(400).json({
            success: false,
            error: 'Please provide a valid email address',
        });
    }

    // Validation: Validate phone format (digits only, 8-15 digits)
    if (!isValidPhone(phone)) {
        return res.status(400).json({
            success: false,
            error: 'Please provide a valid phone number',
        });
    }

    // Validation: Validate message (not empty, 1-1000 chars)
    if (!isValidMessage(message)) {
        return res.status(400).json({
            success: false,
            error: 'Message cannot be empty',
        });
    }

    // Log the contact form submission
    console.log('📧 Contact Form Submission:');
    console.log(`Name: ${name}`);
    console.log(`Email: ${email}`);
    console.log(`Phone: ${phone}`);
    console.log(`Message: ${message}`);
    console.log('---');

    // Success response
    return res.status(200).json({
        success: true,
        message: 'Message sent successfully',
    });
};
