import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { config } from 'dotenv';
import router from './routes/index.js';

config();
const port = process.env.PORT || 3000;
const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());


app.use('/', router);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
