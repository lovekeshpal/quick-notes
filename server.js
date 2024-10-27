import express from 'express';
import connectDB from './db.js';
import authRoutes from './routes/auth.js';
import authMiddleware from './middleware/auth.js';
import dotenv from 'dotenv'; 

dotenv.config(); // Loading environment variables

const app = express();
app.use(express.json());

connectDB(); 

app.use('/auth', authRoutes);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/protected', authMiddleware, (req, res) => {
  res.send('This is a protected route');
});

app.listen(process.env.PORT || 3000, () => {
  console.log(`Server is running on PORT: ${process.env.port || 3000}`);
});