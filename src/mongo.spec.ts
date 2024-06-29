import mongoose from 'mongoose';
import * as dotenv from 'dotenv';

dotenv.config();
describe('MongoDB Connection', () => {
    beforeAll(async () => {
        const uri = process.env.MONGODB_URI;

        if (!uri) {
            throw new Error('MONGODB_URI not found in .env file');
        }

        await mongoose.connect(uri);
    });

    afterAll(async () => {
        await mongoose.connection.close();
    });

    it('should connect to MongoDB successfully', () => {
        expect(mongoose.connection.readyState).toBe(1);
    });
});