import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/quick-notes');
    console.log('Connected to MongoDB');
  } catch (err) {
    console.error(`Error connecting to MongoDB: ${err.message}`);
    process.exit(1); // Exit process with failure
  }
};

export default connectDB;