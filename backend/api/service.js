// // // import fs from 'fs';
// // // import jwt from 'jsonwebtoken';
// // // import AsyncLock from 'async-lock';
// // // import { InputError, AccessError } from './error';
// // // import path from 'path';

// // // const lock = new AsyncLock();

// // // const JWT_SECRET = 'llamallamaduck';
// // // const DATABASE_FILE = path.join(__dirname, 'database.json');

// // // /***************************************************************
// // //                        State Management
// // // ***************************************************************/

// // // let admins = {};

// // // const sessionTimeouts = {};

// // // const update = (admins) =>
// // //   new Promise((resolve, reject) => {
// // //     lock.acquire('saveData', () => {
// // //       try {
// // //         fs.writeFileSync(
// // //           DATABASE_FILE,
// // //           JSON.stringify(
// // //             {
// // //               admins,
// // //             },
// // //             null,
// // //             2
// // //           )
// // //         );
// // //         resolve();
// // //       } catch {
// // //         reject(new Error('Writing to database failed'));
// // //       }
// // //     });
// // //   });

// // // export const save = () => update(admins);
// // // export const reset = () => {
// // //   update({});
// // //   admins = {};
// // // };

// // // export const setup = () => {
// // //   try {
// // //     const data = JSON.parse(fs.readFileSync(DATABASE_FILE));
// // //     admins = data.admins;
// // //   } catch {
// // //     console.log('WARNING: No database found, create a new one');
// // //     save();
// // //   }
// // // };

// // // // let onlyOnce = false;
// // // // if (!onlyOnce) {
// // // //   setup();
// // // //   onlyOnce = true;
// // // // }.

// // // /***************************************************************
// // //                        Helper Functions
// // // ***************************************************************/

// // // export const userLock = (callback) =>
// // //   new Promise((resolve, reject) => {
// // //     lock.acquire('userAuthLock', callback(resolve, reject));
// // //   });

// // // /***************************************************************
// // //                        Auth Functions
// // // ***************************************************************/

// // // export const getEmailFromAuthorization = (authorization) => {
// // //   try {
// // //     const token = authorization.replace('Bearer ', '');
// // //     const { email } = jwt.verify(token, JWT_SECRET);
// // //     if (!(email in admins)) {
// // //       throw new AccessError('Invalid Token');
// // //     }
// // //     return email;
// // //   } catch {
// // //     throw new AccessError('Invalid token');
// // //   }
// // // };

// // // export const login = (email, password) =>
// // //   userLock((resolve, reject) => {
// // //     if (email in admins) {
// // //       if (admins[email].password === password) {
// // //         resolve(jwt.sign({ email }, JWT_SECRET, { algorithm: 'HS256' }));
// // //       }
// // //     }
// // //     reject(new InputError('Invalid username or password'));
// // //   });

// // // export const logout = (email) =>
// // //   userLock((resolve, reject) => {
// // //     admins[email].sessionActive = false;
// // //     resolve();
// // //   });

// // // export const register = (email, password, name) =>
// // //   userLock((resolve, reject) => {
// // //     if (email in admins) {
// // //       return reject(new InputError('Email address already registered'));
// // //     }
// // //     admins[email] = {
// // //       name,
// // //       password,
// // //       store: {},
// // //     };
// // //     const token = jwt.sign({ email }, JWT_SECRET, { algorithm: 'HS256' });
// // //     resolve(token);
// // //   });

// // // /***************************************************************
// // //                        Store Functions
// // // ***************************************************************/

// // // export const getStore = (email) =>
// // //   userLock((resolve, reject) => {
// // //     resolve({ store: admins[email].store });
// // //   });

// // // export const setStore = (email, store) =>
// // //   userLock((resolve, reject) => {
// // //     admins[email].store = store;
// // //     resolve();
// // //   });
// // import fs from 'fs';
// // import jwt from 'jsonwebtoken';
// // import AsyncLock from 'async-lock';
// // import { InputError, AccessError } from './error';
// // import path from 'path';

// // const lock = new AsyncLock();
// // const JWT_SECRET = 'llamallamaduck';
// // const DATABASE_FILE = path.join(__dirname, 'database.json');

// // // State Management
// // let admins = {};
// // const sessionTimeouts = {};

// // // Function to update the database file
// // const update = (admins) =>
// //   new Promise((resolve, reject) => {
// //     lock.acquire('saveData', () => {
// //       try {
// //         fs.writeFileSync(DATABASE_FILE, JSON.stringify({ admins }, null, 2));
// //         resolve();
// //       } catch {
// //         reject(new Error('Writing to database failed'));
// //       }
// //     });
// //   });

// // export const save = () => update(admins);

// // export const reset = () => {
// //   update({});
// //   admins = {};
// // };

// // // Function to setup initial data
// // export const setup = () => {
// //   try {
// //     const data = JSON.parse(fs.readFileSync(DATABASE_FILE));
// //     admins = data.admins;
// //   } catch {
// //     console.log('WARNING: No database found, create a new one');
// //     save();
// //   }
// // };

// // // User lock helper function
// // export const userLock = (callback) =>
// //   new Promise((resolve, reject) => {
// //     lock.acquire('userAuthLock', callback(resolve, reject));
// //   });

// // // Authentication Functions
// // export const getEmailFromAuthorization = (authorization) => {
// //   try {
// //     const token = authorization.replace('Bearer ', '');
// //     const { email } = jwt.verify(token, JWT_SECRET);
// //     if (!(email in admins)) {
// //       throw new AccessError('Invalid Token');
// //     }
// //     return email;
// //   } catch {
// //     throw new AccessError('Invalid token');
// //   }
// // };

// // export const login = (email, password) =>
// //   userLock((resolve, reject) => {
// //     if (email in admins) {
// //       if (admins[email].password === password) {
// //         resolve(jwt.sign({ email }, JWT_SECRET, { algorithm: 'HS256' }));
// //       }
// //     }
// //     reject(new InputError('Invalid username or password'));
// //   });

// // export const logout = (email) =>
// //   userLock((resolve) => {
// //     admins[email].sessionActive = false;
// //     resolve();
// //   });

// // export const register = (email, password, name) =>
// //   userLock((resolve, reject) => {
// //     if (email in admins) {
// //       return reject(new InputError('Email address already registered'));
// //     }
// //     admins[email] = { name, password, store: {} };
// //     const token = jwt.sign({ email }, JWT_SECRET, { algorithm: 'HS256' });
// //     resolve(token);
// //   });

// // // Store Functions
// // export const getStore = (email) =>
// //   userLock((resolve) => {
// //     resolve({ store: admins[email].store });
// //   });

// // export const setStore = (email, store) =>
// //   userLock((resolve) => {
// //     admins[email].store = store;
// //     resolve();
// //   });
// import fs from 'fs';
// import jwt from 'jsonwebtoken';
// import AsyncLock from 'async-lock';
// import { InputError, AccessError } from './error';
// import path from 'path';

// const lock = new AsyncLock();
// const DATABASE_FILE =
//   process.env.DATABASE_FILE_PATH || path.join('/tmp', 'database.json'); // Updated path for serverless environments
// const JWT_SECRET = process.env.JWT_SECRET || 'llamallamaduck';

// // State Management
// let admins = {};
// const sessionTimeouts = {};

// // Function to update the database file
// const update = (admins) =>
//   new Promise((resolve, reject) => {
//     lock.acquire('saveData', () => {
//       try {
//         fs.writeFileSync(DATABASE_FILE, JSON.stringify({ admins }, null, 2));
//         resolve();
//       } catch (error) {
//         console.error('Failed to write to database:', error); // More descriptive error logging
//         reject(new Error('Writing to database failed'));
//       }
//     });
//   });

// export const save = () => update(admins);

// export const reset = () => {
//   update({});
//   admins = {};
// };

// // Function to setup initial data
// export const setup = () => {
//   try {
//     const data = JSON.parse(fs.readFileSync(DATABASE_FILE));
//     admins = data.admins;
//   } catch (error) {
//     console.log('WARNING: No database found, creating a new one', error);
//     save();
//   }
// };

// // User lock helper function
// export const userLock = (callback) =>
//   new Promise((resolve, reject) => {
//     lock.acquire('userAuthLock', callback(resolve, reject));
//   });

// // Authentication Functions
// export const getEmailFromAuthorization = (authorization) => {
//   try {
//     const token = authorization.replace('Bearer ', '');
//     const { email } = jwt.verify(token, JWT_SECRET);
//     if (!(email in admins)) {
//       throw new AccessError('Invalid Token');
//     }
//     return email;
//   } catch {
//     throw new AccessError('Invalid token');
//   }
// };

// export const login = (email, password) =>
//   userLock((resolve, reject) => {
//     if (email in admins) {
//       if (admins[email].password === password) {
//         resolve(jwt.sign({ email }, JWT_SECRET, { algorithm: 'HS256' }));
//       }
//     }
//     reject(new InputError('Invalid username or password'));
//   });

// export const logout = (email) =>
//   userLock((resolve) => {
//     admins[email].sessionActive = false;
//     resolve();
//   });

// export const register = (email, password, name) =>
//   userLock((resolve, reject) => {
//     if (email in admins) {
//       return reject(new InputError('Email address already registered'));
//     }
//     admins[email] = { name, password, store: {} };
//     const token = jwt.sign({ email }, JWT_SECRET, { algorithm: 'HS256' });
//     resolve(token);
//   });

// // Store Functions
// export const getStore = (email) =>
//   userLock((resolve) => {
//     resolve({ store: admins[email].store });
//   });

// export const setStore = (email, store) =>
//   userLock((resolve) => {
//     admins[email].store = store;
//     resolve();
//   });
import fs from 'fs';
import jwt from 'jsonwebtoken';
import AsyncLock from 'async-lock';
import { InputError, AccessError } from './error';
import path from 'path';

const lock = new AsyncLock();
const JWT_SECRET = process.env.JWT_SECRET || 'llamallamaduck';
const DATABASE_FILE = path.join(__dirname, 'database.json'); // Reverted to standard file path

// State Management
let admins = {};
const sessionTimeouts = {};

// Function to update the database file
const update = (admins) =>
  new Promise((resolve, reject) => {
    lock.acquire('saveData', () => {
      try {
        fs.writeFileSync(DATABASE_FILE, JSON.stringify({ admins }, null, 2));
        resolve();
      } catch (error) {
        console.error('Failed to write to database:', error); // More descriptive error logging
        reject(new Error('Writing to database failed'));
      }
    });
  });

export const save = () => update(admins);

export const reset = () => {
  update({});
  admins = {};
};

// Function to setup initial data
export const setup = () => {
  try {
    const data = JSON.parse(fs.readFileSync(DATABASE_FILE));
    admins = data.admins;
  } catch (error) {
    console.log('WARNING: No database found, creating a new one', error);
    save();
  }
};

// User lock helper function
export const userLock = (callback) =>
  new Promise((resolve, reject) => {
    lock.acquire('userAuthLock', callback(resolve, reject));
  });

// Authentication Functions
export const getEmailFromAuthorization = (authorization) => {
  try {
    const token = authorization.replace('Bearer ', '');
    const { email } = jwt.verify(token, JWT_SECRET);
    if (!(email in admins)) {
      throw new AccessError('Invalid Token');
    }
    return email;
  } catch {
    throw new AccessError('Invalid token');
  }
};

export const login = (email, password) =>
  userLock((resolve, reject) => {
    if (email in admins) {
      if (admins[email].password === password) {
        resolve(jwt.sign({ email }, JWT_SECRET, { algorithm: 'HS256' }));
      }
    }
    reject(new InputError('Invalid username or password'));
  });

export const logout = (email) =>
  userLock((resolve) => {
    admins[email].sessionActive = false;
    resolve();
  });

export const register = (email, password, name) =>
  userLock((resolve, reject) => {
    if (email in admins) {
      return reject(new InputError('Email address already registered'));
    }
    admins[email] = { name, password, store: {} };
    const token = jwt.sign({ email }, JWT_SECRET, { algorithm: 'HS256' });
    resolve(token);
  });

// Store Functions
export const getStore = (email) =>
  userLock((resolve) => {
    resolve({ store: admins[email].store });
  });

export const setStore = (email, store) =>
  userLock((resolve) => {
    admins[email].store = store;
    resolve();
  });
