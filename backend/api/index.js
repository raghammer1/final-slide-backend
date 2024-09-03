import express from 'express';
import swaggerUi from 'swagger-ui-express';
import bodyParser from 'body-parser';
import cors from 'cors';
import path from 'path';
import fs from 'fs';

import { InputError, AccessError } from './error.js';
import swaggerDocument from './swagger.json' assert { type: 'json' };
import {
  getEmailFromAuthorization,
  login,
  logout,
  register,
  getStore,
  setStore,
  save,
  setup,
} from './service.js';

const app = express();

// CORS Configuration
const allowedOrigins = [
  'https://slides-frontend-sigma.vercel.app',
  'http://localhost:3001',
];

const corsOptions = {
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
};

// Apply CORS to all routes
app.use(cors(corsOptions));
app.options('*', cors(corsOptions));
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
    return res.status(200).json({});
  }
  next();
});

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ limit: '50mb' }));

// Catch and handle errors in async functions
const catchErrors = (fn) => async (req, res) => {
  try {
    await fn(req, res);
    save();
  } catch (err) {
    if (err instanceof InputError) {
      res.status(400).send({ error: err.message });
    } else if (err instanceof AccessError) {
      res.status(403).send({ error: err.message });
    } else {
      console.log(err);
      res.status(500).send({ error: 'A system error occurred' });
    }
  }
};

// Auth Function
const authed = (fn) => async (req, res) => {
  const email = getEmailFromAuthorization(req.header('Authorization'));
  await fn(req, res, email);
};

// Auth Routes
app.post(
  '/admin/auth/login',
  catchErrors(async (req, res) => {
    const { email, password } = req.body;
    const token = await login(email, password);
    return res.json({ token });
  })
);

app.post(
  '/admin/auth/register',
  catchErrors(async (req, res) => {
    const { email, password, name } = req.body;
    const token = await register(email, password, name);
    return res.json({ token });
  })
);

app.post(
  '/admin/auth/logout',
  catchErrors(
    authed(async (req, res, email) => {
      await logout(email);
      return res.json({});
    })
  )
);

// Store Routes
app.get(
  '/store',
  cors(corsOptions),
  catchErrors(
    authed(async (req, res, email) => {
      return res.json({ store: await getStore(email) });
    })
  )
);

app.put(
  '/store',
  cors(corsOptions),
  catchErrors(
    authed(async (req, res, email) => {
      await setStore(email, req.body.store);
      return res.json({});
    })
  )
);

// Running Servers
app.get('/', (req, res) => res.redirect('/docs'));

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

await setup();

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// const configData = JSON.parse(
//   fs.readFileSync(path.join(__dirname, 'config.json'))
// );
const port = 5002;

// const server = app.listen(port, () => {
//   console.log(`Backend is now listening on port ${port}!`);
//   console.log(`For API docs, navigate to http://localhost:${port}`);
// });

export default app;
