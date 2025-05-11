
import mongoose from 'mongoose';

let isConnected = false;

export const connectToDatabase = async () => {
  if (isConnected) {
    console.log('MongoDB is already connected');
    return;
  }

  try {
    const uri = import.meta.env.VITE_MONGO_URI || process.env.MONGO_URI;
    
    if (!uri) {
      throw new Error('MongoDB URI not found in environment variables');
    }

    await mongoose.connect(uri);
    
    isConnected = true;
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
};
