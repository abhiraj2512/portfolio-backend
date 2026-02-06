import mongoose from 'mongoose';
import dns from 'dns';
import config from './index';

// Force IPv4 first - helps with some network configurations
dns.setDefaultResultOrder('ipv4first');

/**
 * Connect to MongoDB database
 * In production: exits process if connection fails
 * In development: allows server to run without database
 */
export const connectDatabase = async (): Promise<void> => {
    try {
        if (!config.mongoUri) {
            if (config.isProduction()) {
                console.error('FATAL: MONGODB_URI is required in production');
                process.exit(1);
            }
            console.warn('⚠️  MONGODB_URI is not defined - running without database');
            return;
        }

        console.log('📡 Connecting to MongoDB...');

        await mongoose.connect(config.mongoUri, {
            family: 4,
            serverSelectionTimeoutMS: 10000,
            socketTimeoutMS: 45000,
        });

        console.log('✅ MongoDB Connected Successfully');

        mongoose.connection.on('error', (err) => {
            console.error('❌ MongoDB connection error:', err.message);
        });

        mongoose.connection.on('disconnected', () => {
            console.log('⚠️  MongoDB disconnected');
        });

    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        console.error('❌ Failed to connect to MongoDB:', errorMessage);

        // In production, fail hard
        if (config.isProduction()) {
            console.error('FATAL: Cannot start server without database in production');
            process.exit(1);
        }

        // In development, allow server to start without DB
        console.warn('⚠️  Running in development mode without MongoDB');
    }
};
