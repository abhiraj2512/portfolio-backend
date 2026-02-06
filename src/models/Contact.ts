import mongoose, { Document, Schema } from 'mongoose';

/**
 * Interface for Contact document
 */
export interface IContact extends Document {
    name: string;
    email: string;
    phone: string;
    message: string;
    createdAt: Date;
}

/**
 * Contact Schema
 */
const contactSchema = new Schema<IContact>(
    {
        name: {
            type: String,
            required: [true, 'Name is required'],
            trim: true,
            minlength: [2, 'Name must be at least 2 characters'],
            maxlength: [50, 'Name must not exceed 50 characters'],
        },
        email: {
            type: String,
            required: [true, 'Email is required'],
            trim: true,
            lowercase: true,
            match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email address'],
        },
        phone: {
            type: String,
            required: [true, 'Phone number is required'],
            trim: true,
            minlength: [8, 'Phone number must be at least 8 digits'],
            maxlength: [15, 'Phone number must not exceed 15 digits'],
        },
        message: {
            type: String,
            required: [true, 'Message is required'],
            trim: true,
            minlength: [1, 'Message cannot be empty'],
            maxlength: [1000, 'Message must not exceed 1000 characters'],
        },
    },
    {
        timestamps: true,
    }
);

/**
 * Contact Model
 */
const Contact = mongoose.model<IContact>('Contact', contactSchema);

export default Contact;
