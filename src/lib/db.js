
import mongoose from 'mongoose';

let isConnected = false;

export const connectToDatabase = async () => {
  if (isConnected) {
    console.log('MongoDB is already connected');
    return;
  }

  try {
    // For browser environment, use mock connection
    // In a real app, this would connect to a backend API that connects to MongoDB
    console.log('Setting up mock MongoDB connection for browser environment');
    isConnected = true;
    return;
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
};
