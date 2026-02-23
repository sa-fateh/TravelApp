import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import routes from './routes/index.js';
import { errorHandler, notFound } from './middleware/errorMiddleware.js';
import { sequelize } from './models/index.js';
import { seedData } from './seeders/seed.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

app.get('/health', (req, res) => res.json({ status: 'ok' }));
app.use('/api', routes);

app.use(notFound);
app.use(errorHandler);

const start = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    await seedData();
    app.listen(PORT, () => {
      console.log(`Travel Guide API running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

start();
