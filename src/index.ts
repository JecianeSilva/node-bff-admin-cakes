import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';

import config from './config/config';
import authRoutes from './routes/authRoutes';

const app = express();

app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());

app.use('/bff/auth', authRoutes);

app.listen(config.port, () => {
  console.log(`🚀 BFF rodando na porta ${config.port}`);
});
