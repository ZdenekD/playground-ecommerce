import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import authRoutes from './routes/auth';
import userRoutes from './routes/user';
import categoryRoutes from './routes/category';
import productRoutes from './routes/product';

dotenv.config();

// Server
const port = process.env.PORT || 8000;
const server = express();

// Middlewares
server.use(morgan('dev'));
server.use(bodyParser.json());
server.use(cookieParser());
server.use(cors());

// Routes
server.use('/api', authRoutes);
server.use('/api', userRoutes);
server.use('/api', categoryRoutes);
server.use('/api', productRoutes);

server.listen(port, error => {
    if (error) {
        throw error;
    }

    mongoose
        .connect(process.env.DB_HOST, {
            useNewUrlParser: true,
            useFindAndModify: false,
            useUnifiedTopology: true,
            useCreateIndex: true,
        })
        .then(() => console.log('|> DB ready'))
        .catch(err => console.log(`DB connection failed: ${err}`));

    console.log(`|> Ready on http://localhost:${port}`);
});
