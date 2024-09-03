// // // // // import fs from 'fs';
// // // // // import express from 'express';
// // // // // import swaggerUi from 'swagger-ui-express';
// // // // // import bodyParser from 'body-parser';
// // // // // import cors from 'cors';
// // // // // import path from 'path';

// // // // // import { InputError, AccessError } from './error';
// // // // // import swaggerDocument from '../swagger.json';
// // // // // import {
// // // // //   getEmailFromAuthorization,
// // // // //   login,
// // // // //   logout,
// // // // //   register,
// // // // //   getStore,
// // // // //   setStore,
// // // // //   save,
// // // // // } from './service';

// // // // // const app = express();

// // // // // app.use(cors());
// // // // // app.use(bodyParser.urlencoded({ extended: true }));
// // // // // app.use(bodyParser.json({ limit: '50mb' }));

// // // // // const catchErrors = (fn) => async (req, res) => {
// // // // //   try {
// // // // //     await fn(req, res);
// // // // //     save();
// // // // //   } catch (err) {
// // // // //     if (err instanceof InputError) {
// // // // //       res.status(400).send({ error: err.message });
// // // // //     } else if (err instanceof AccessError) {
// // // // //       res.status(403).send({ error: err.message });
// // // // //     } else {
// // // // //       console.log(err);
// // // // //       res.status(500).send({ error: 'A system error ocurred' });
// // // // //     }
// // // // //   }
// // // // // };

// // // // // /***************************************************************
// // // // //                        Auth Function
// // // // // ***************************************************************/

// // // // // const authed = (fn) => async (req, res) => {
// // // // //   const email = getEmailFromAuthorization(req.header('Authorization'));
// // // // //   await fn(req, res, email);
// // // // // };

// // // // // app.post(
// // // // //   '/admin/auth/login',
// // // // //   catchErrors(async (req, res) => {
// // // // //     const { email, password } = req.body;
// // // // //     const token = await login(email, password);
// // // // //     return res.json({ token });
// // // // //   })
// // // // // );

// // // // // app.post(
// // // // //   '/admin/auth/register',
// // // // //   catchErrors(async (req, res) => {
// // // // //     const { email, password, name } = req.body;
// // // // //     const token = await register(email, password, name);
// // // // //     return res.json({ token });
// // // // //   })
// // // // // );

// // // // // app.post(
// // // // //   '/admin/auth/logout',
// // // // //   catchErrors(
// // // // //     authed(async (req, res, email) => {
// // // // //       await logout(email);
// // // // //       return res.json({});
// // // // //     })
// // // // //   )
// // // // // );

// // // // // /***************************************************************
// // // // //                        Store Functions
// // // // // ***************************************************************/

// // // // // app.get(
// // // // //   '/store',
// // // // //   catchErrors(
// // // // //     authed(async (req, res, email) => {
// // // // //       return res.json({ store: await getStore(email) });
// // // // //     })
// // // // //   )
// // // // // );

// // // // // app.put(
// // // // //   '/store',
// // // // //   catchErrors(
// // // // //     authed(async (req, res, email) => {
// // // // //       await setStore(email, req.body.store);
// // // // //       return res.json({});
// // // // //     })
// // // // //   )
// // // // // );

// // // // // /***************************************************************
// // // // //                        Running Server
// // // // // ***************************************************************/

// // // // // app.get('/', (req, res) => res.redirect('/docs'));

// // // // // app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// // // // // const configData = JSON.parse(
// // // // //   fs.readFileSync(path.join(__dirname, 'config.json'))
// // // // // );
// // // // // const port = 'BACKEND_PORT' in configData ? configData.BACKEND_PORT : 5000;

// // // // // const server = app.listen(port, () => {
// // // // //   console.log(`Backend is now listening on port ${port}!`);
// // // // //   console.log(`For API docs, navigate to http://localhost:${port}`);
// // // // // });

// // // // // export default server;
// // // // import fs from 'fs';
// // // // import express from 'express';
// // // // import swaggerUi from 'swagger-ui-express';
// // // // import bodyParser from 'body-parser';
// // // // import cors from 'cors';
// // // // import path from 'path';

// // // // import { InputError, AccessError } from './error';
// // // // import swaggerDocument from './swagger.json';
// // // // import {
// // // //   getEmailFromAuthorization,
// // // //   login,
// // // //   logout,
// // // //   register,
// // // //   getStore,
// // // //   setStore,
// // // //   save,
// // // // } from './service';

// // // // const app = express();

// // // // const allowedOrigins = ['https://slides-frontend-sigma.vercel.app'];
// // // // app.use(
// // // //   cors({
// // // //     origin: allowedOrigins,
// // // //     methods: ['GET', 'POST', 'PUT', 'DELETE'],
// // // //     allowedHeaders: ['Content-Type', 'Authorization'],
// // // //   })
// // // // );
// // // // app.use(bodyParser.urlencoded({ extended: true }));
// // // // app.use(bodyParser.json({ limit: '50mb' }));

// // // // const catchErrors = (fn) => async (req, res) => {
// // // //   try {
// // // //     await fn(req, res);
// // // //     save();
// // // //   } catch (err) {
// // // //     if (err instanceof InputError) {
// // // //       res.status(400).send({ error: err.message });
// // // //     } else if (err instanceof AccessError) {
// // // //       res.status(403).send({ error: err.message });
// // // //     } else {
// // // //       console.log(err);
// // // //       res.status(500).send({ error: 'A system error occurred' });
// // // //     }
// // // //   }
// // // // };

// // // // /***************************************************************
// // // //                        Auth Function
// // // // ***************************************************************/

// // // // const authed = (fn) => async (req, res) => {
// // // //   const email = getEmailFromAuthorization(req.header('Authorization'));
// // // //   await fn(req, res, email);
// // // // };

// // // // app.post(
// // // //   '/admin/auth/login',
// // // //   catchErrors(async (req, res) => {
// // // //     const { email, password } = req.body;
// // // //     const token = await login(email, password);
// // // //     return res.json({ token });
// // // //   })
// // // // );

// // // // app.post(
// // // //   '/admin/auth/register',
// // // //   catchErrors(async (req, res) => {
// // // //     const { email, password, name } = req.body;
// // // //     const token = await register(email, password, name);
// // // //     return res.json({ token });
// // // //   })
// // // // );

// // // // app.post(
// // // //   '/admin/auth/logout',
// // // //   catchErrors(
// // // //     authed(async (req, res, email) => {
// // // //       await logout(email);
// // // //       return res.json({});
// // // //     })
// // // //   )
// // // // );

// // // // /***************************************************************
// // // //                        Store Functions
// // // // ***************************************************************/

// // // // app.get(
// // // //   '/store',
// // // //   catchErrors(
// // // //     authed(async (req, res, email) => {
// // // //       return res.json({ store: await getStore(email) });
// // // //     })
// // // //   )
// // // // );

// // // // app.put(
// // // //   '/store',
// // // //   catchErrors(
// // // //     authed(async (req, res, email) => {
// // // //       await setStore(email, req.body.store);
// // // //       return res.json({});
// // // //     })
// // // //   )
// // // // );

// // // // /***************************************************************
// // // //                        Running Server
// // // // ***************************************************************/

// // // // app.get('/', (req, res) => res.redirect('/docs'));

// // // // app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// // // // // No app.listen() here to avoid conflicts in a serverless environment
// // // // // const server = app.listen(port, () => {
// // // // //   console.log(`Backend is now listening on port ${port}!`);
// // // // //   console.log(`For API docs, navigate to http://localhost:${port}`);
// // // // // });

// // // // // Export the Express app so Vercel can handle the request/response lifecycle
// // // // export default app;
// // // import express from 'express';
// // // import swaggerUi from 'swagger-ui-express';
// // // import bodyParser from 'body-parser';
// // // import cors from 'cors';
// // // import path from 'path';

// // // import { InputError, AccessError } from './error';
// // // import swaggerDocument from './swagger.json';
// // // import {
// // //   getEmailFromAuthorization,
// // //   login,
// // //   logout,
// // //   register,
// // //   getStore,
// // //   setStore,
// // //   save,
// // //   setup,
// // // } from './service';

// // // const app = express();

// // // // CORS Configuration
// // // const allowedOrigins = ['https://slides-frontend-sigma.vercel.app'];

// // // const corsOptions = {
// // //   origin: (origin, callback) => {
// // //     if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
// // //       callback(null, true);
// // //     } else {
// // //       callback(new Error('Not allowed by CORS'));
// // //     }
// // //   },
// // //   methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
// // //   allowedHeaders: ['Content-Type', 'Authorization'],
// // //   credentials: true,
// // // };

// // // // Apply CORS to all routes
// // // app.use(cors(corsOptions));
// // // app.options('*', cors(corsOptions));
// // // app.options('/store', cors(corsOptions)); // Handle preflight requests for /store

// // // // Body parser middleware
// // // app.use(bodyParser.urlencoded({ extended: true }));
// // // app.use(bodyParser.json({ limit: '50mb' }));

// // // // Catch and handle errors in async functions
// // // const catchErrors = (fn) => async (req, res) => {
// // //   try {
// // //     await fn(req, res);
// // //     save();
// // //   } catch (err) {
// // //     if (err instanceof InputError) {
// // //       res.status(400).send({ error: err.message });
// // //     } else if (err instanceof AccessError) {
// // //       res.status(403).send({ error: err.message });
// // //     } else {
// // //       console.log(err);
// // //       res.status(500).send({ error: 'A system error occurred' });
// // //     }
// // //   }
// // // };

// // // /***************************************************************
// // //                        Auth Function
// // // ***************************************************************/

// // // const authed = (fn) => async (req, res) => {
// // //   const email = getEmailFromAuthorization(req.header('Authorization'));
// // //   await fn(req, res, email);
// // // };

// // // app.post(
// // //   '/admin/auth/login',
// // //   catchErrors(async (req, res) => {
// // //     const { email, password } = req.body;
// // //     const token = await login(email, password);
// // //     return res.json({ token });
// // //   })
// // // );

// // // app.post(
// // //   '/admin/auth/register',
// // //   catchErrors(async (req, res) => {
// // //     const { email, password, name } = req.body;
// // //     const token = await register(email, password, name);
// // //     return res.json({ token });
// // //   })
// // // );

// // // app.post(
// // //   '/admin/auth/logout',
// // //   catchErrors(
// // //     authed(async (req, res, email) => {
// // //       await logout(email);
// // //       return res.json({});
// // //     })
// // //   )
// // // );

// // // /***************************************************************
// // //                        Store Functions
// // // ***************************************************************/

// // // app.get(
// // //   '/store',
// // //   cors(corsOptions),
// // //   catchErrors(
// // //     authed(async (req, res, email) => {
// // //       return res.json({ store: await getStore(email) });
// // //     })
// // //   )
// // // );

// // // app.put(
// // //   '/store',
// // //   cors(corsOptions),
// // //   catchErrors(
// // //     authed(async (req, res, email) => {
// // //       await setStore(email, req.body.store);
// // //       return res.json({});
// // //     })
// // //   )
// // // );

// // // /***************************************************************
// // //                        Running Server
// // // ***************************************************************/

// // // // Redirect root requests to Swagger docs
// // // app.get('/', (req, res) => res.redirect('/docs'));

// // // app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// // // setup();

// // // // Export the Express app so Vercel can handle the request/response lifecycle
// // // export default app;
// // import express from 'express';
// // import swaggerUi from 'swagger-ui-express';
// // import bodyParser from 'body-parser';
// // import cors from 'cors';
// // import path from 'path';

// // import { InputError, AccessError } from './error';
// // import swaggerDocument from './swagger.json';
// // import {
// //   getEmailFromAuthorization,
// //   login,
// //   logout,
// //   register,
// //   getStore,
// //   setStore,
// //   save,
// //   setup,
// // } from './service';

// // const app = express();

// // // CORS Configuration
// // const allowedOrigins = ['https://slides-frontend-sigma.vercel.app'];

// // const corsOptions = {
// //   origin: (origin, callback) => {
// //     if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
// //       callback(null, true);
// //     } else {
// //       callback(new Error('Not allowed by CORS'));
// //     }
// //   },
// //   methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
// //   allowedHeaders: ['Content-Type', 'Authorization'],
// //   credentials: true,
// // };

// // // Apply CORS to all routes
// // app.use(cors(corsOptions));
// // app.options('*', cors(corsOptions));

// // // Body parser middleware
// // app.use(bodyParser.urlencoded({ extended: true }));
// // app.use(bodyParser.json({ limit: '50mb' }));

// // // Catch and handle errors in async functions
// // const catchErrors = (fn) => async (req, res) => {
// //   try {
// //     await fn(req, res);
// //     save();
// //   } catch (err) {
// //     if (err instanceof InputError) {
// //       res.status(400).send({ error: err.message });
// //     } else if (err instanceof AccessError) {
// //       res.status(403).send({ error: err.message });
// //     } else {
// //       console.log(err);
// //       res.status(500).send({ error: 'A system error occurred' });
// //     }
// //   }
// // };

// // // Auth Function
// // const authed = (fn) => async (req, res) => {
// //   const email = getEmailFromAuthorization(req.header('Authorization'));
// //   await fn(req, res, email);
// // };

// // // Auth Routes
// // app.post(
// //   '/admin/auth/login',
// //   catchErrors(async (req, res) => {
// //     const { email, password } = req.body;
// //     const token = await login(email, password);
// //     return res.json({ token });
// //   })
// // );

// // app.post(
// //   '/admin/auth/register',
// //   catchErrors(async (req, res) => {
// //     const { email, password, name } = req.body;
// //     const token = await register(email, password, name);
// //     return res.json({ token });
// //   })
// // );

// // app.post(
// //   '/admin/auth/logout',
// //   catchErrors(
// //     authed(async (req, res, email) => {
// //       await logout(email);
// //       return res.json({});
// //     })
// //   )
// // );

// // // Store Routes
// // app.get(
// //   '/store',
// //   cors(corsOptions),
// //   catchErrors(
// //     authed(async (req, res, email) => {
// //       return res.json({ store: await getStore(email) });
// //     })
// //   )
// // );

// // app.put(
// //   '/store',
// //   cors(corsOptions),
// //   catchErrors(
// //     authed(async (req, res, email) => {
// //       await setStore(email, req.body.store);
// //       return res.json({});
// //     })
// //   )
// // );

// // // Running Server
// // app.get('/', (req, res) => res.redirect('/docs'));

// // app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// // setup();

// // // Export the Express app so Vercel can handle the request/response lifecycle
// // export default app;
// import express from 'express';
// import swaggerUi from 'swagger-ui-express';
// import bodyParser from 'body-parser';
// import cors from 'cors';
// import path from 'path';

// import { InputError, AccessError } from './error';
// import swaggerDocument from './swagger.json';
// import {
//   getEmailFromAuthorization,
//   login,
//   logout,
//   register,
//   getStore,
//   setStore,
//   save,
//   setup,
// } from './service';

// const app = express();

// // CORS Configuration
// const allowedOrigins = process.env.ALLOWED_ORIGINS?.split(',') || [
//   'https://slides-frontend-sigma.vercel.app',
// ];

// const corsOptions = {
//   origin: (origin, callback) => {
//     if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
//       callback(null, true);
//     } else {
//       callback(new Error('Not allowed by CORS'));
//     }
//   },
//   methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
//   allowedHeaders: ['Content-Type', 'Authorization'],
//   credentials: true,
// };

// // Apply CORS to all routes
// app.use(cors(corsOptions));
// app.options('*', cors(corsOptions));

// // Body parser middleware
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json({ limit: '50mb' }));

// // Catch and handle errors in async functions
// const catchErrors = (fn) => async (req, res) => {
//   try {
//     await fn(req, res);
//     save();
//   } catch (err) {
//     if (err instanceof InputError) {
//       res.status(400).send({ error: err.message });
//     } else if (err instanceof AccessError) {
//       res.status(403).send({ error: err.message });
//     } else {
//       console.log(err);
//       res.status(500).send({ error: 'A system error occurred' });
//     }
//   }
// };

// // Auth Function
// const authed = (fn) => async (req, res) => {
//   const email = getEmailFromAuthorization(req.header('Authorization'));
//   await fn(req, res, email);
// };

// // Auth Routes
// app.post(
//   '/admin/auth/login',
//   catchErrors(async (req, res) => {
//     const { email, password } = req.body;
//     const token = await login(email, password);
//     return res.json({ token });
//   })
// );

// app.post(
//   '/admin/auth/register',
//   catchErrors(async (req, res) => {
//     const { email, password, name } = req.body;
//     const token = await register(email, password, name);
//     return res.json({ token });
//   })
// );

// app.post(
//   '/admin/auth/logout',
//   catchErrors(
//     authed(async (req, res, email) => {
//       await logout(email);
//       return res.json({});
//     })
//   )
// );

// // Store Routes
// app.get(
//   '/store',
//   cors(corsOptions),
//   catchErrors(
//     authed(async (req, res, email) => {
//       return res.json({ store: await getStore(email) });
//     })
//   )
// );

// app.put(
//   '/store',
//   cors(corsOptions),
//   catchErrors(
//     authed(async (req, res, email) => {
//       await setStore(email, req.body.store);
//       return res.json({});
//     })
//   )
// );

// // Running Server
// app.get('/', (req, res) => res.redirect('/docs'));

// app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// setup();

// // Export the Express app so Vercel can handle the request/response lifecycle
// export default app;
import express from 'express';
import swaggerUi from 'swagger-ui-express';
import bodyParser from 'body-parser';
import cors from 'cors';
import path from 'path';
import fs from 'fs';

import { InputError, AccessError } from './error';
import swaggerDocument from './swagger.json';
import {
  getEmailFromAuthorization,
  login,
  logout,
  register,
  getStore,
  setStore,
  save,
  setup,
} from './service';

const app = express();

// CORS Configuration
const allowedOrigins = ['https://slides-frontend-sigma.vercel.app'];

const corsOptions = {
  origin: (origin, callback) => {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
};

// Apply CORS to all routes
app.use(cors(corsOptions));
app.options('*', cors(corsOptions));

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

// Running Server
app.get('/', (req, res) => res.redirect('/docs'));

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

setup();

const configData = JSON.parse(
  fs.readFileSync(path.join(__dirname, 'config.json'))
);
const port = 'BACKEND_PORT' in configData ? configData.BACKEND_PORT : 5000;

const server = app.listen(port, () => {
  console.log(`Backend is now listening on port ${port}!`);
  console.log(`For API docs, navigate to http://localhost:${port}`);
});

export default server;
