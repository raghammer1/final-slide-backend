// // import axios from 'axios';
// // import jwt from 'jsonwebtoken';
// // import AsyncLock from 'async-lock';
// // import { InputError, AccessError } from './error.js';

// // const lock = new AsyncLock();
// // const JWT_SECRET = process.env.JWT_SECRET || 'llamallamaduck';

// // const JSONBIN_BASE_URL = 'https://api.jsonbin.io/v3/b';
// // const BIN_ID = '66d68180ad19ca34f89f3173'; // Your Bin ID
// // const API_KEY = '$2a$10$rdjk2HFOBVOKEbQ1d9IUqui6FITEun2x8QDT5S4ZDyS1715iptTrK'; // Your API Key

// // // State Management
// // let admins = {};
// // const sessionTimeouts = {};

// // // Function to update the JSONBin with current admin data
// // const update = (admins) =>
// //   new Promise((resolve, reject) => {
// //     lock.acquire('saveData', async () => {
// //       try {
// //         await axios.put(
// //           `${JSONBIN_BASE_URL}/${BIN_ID}`,
// //           { admins },
// //           {
// //             headers: {
// //               'Content-Type': 'application/json',
// //               'X-Master-Key': API_KEY,
// //             },
// //           }
// //         );
// //         resolve();
// //       } catch (error) {
// //         console.error('Failed to update JSONBin:', error);
// //         reject(new Error('Writing to JSONBin failed'));
// //       }
// //     });
// //   });

// // export const save = () => update(admins);

// // export const reset = () => {
// //   update({});
// //   admins = {};
// // };

// // // Function to setup initial data from JSONBin.io
// // export const setup = async () => {
// //   try {
// //     const response = await axios.get(`${JSONBIN_BASE_URL}/${BIN_ID}/latest`, {
// //       headers: {
// //         'X-Master-Key': API_KEY,
// //       },
// //     });
// //     const data = response.data.record;
// //     admins = data.admins;
// //   } catch (error) {
// //     console.log(
// //       'WARNING: No data found in JSONBin, initializing new data',
// //       error
// //     );
// //     await save();
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
// import axios from 'axios';
// import jwt from 'jsonwebtoken';
// import AsyncLock from 'async-lock';
// import { InputError, AccessError } from './error.js';

// const lock = new AsyncLock();
// const JWT_SECRET = process.env.JWT_SECRET || 'llamallamaduck';

// const JSONBIN_BASE_URL = 'https://api.jsonbin.io/v3/b';
// const BIN_ID = '66d68180ad19ca34f89f3173'; // Your Bin ID
// const API_KEY = '$2a$10$rdjk2HFOBVOKEbQ1d9IUqui6FITEun2x8QDT5S4ZDyS1715iptTrK'; // Your API Key
// console.log('JWT_SECRET:', JWT_SECRET);
// console.log('BIN_ID:', BIN_ID);
// console.log('API_KEY:', API_KEY);

// // State Management
// let admins = {};
// console.log(admins);
// const sessionTimeouts = {};

// // Function to update the JSONBin with current admin data
// const update = (admins) =>
//   new Promise((resolve, reject) => {
//     lock.acquire('saveData', async () => {
//       try {
//         await axios.put(
//           `${JSONBIN_BASE_URL}/${BIN_ID}`,
//           { admins },
//           {
//             headers: {
//               'Content-Type': 'application/json',
//               'X-Master-Key': API_KEY,
//             },
//           }
//         );
//         resolve();
//       } catch (error) {
//         console.error('Failed to update JSONBin:', error);
//         reject(new Error('Writing to JSONBin failed'));
//       }
//     });
//   });

// export const save = () => update(admins);

// export const reset = () => {
//   update({});
//   admins = {};
// };

// // Function to setup initial data from JSONBin.io
// export const setup = async () => {
//   try {
//     const response = await axios.get(`${JSONBIN_BASE_URL}/${BIN_ID}/latest`, {
//       headers: {
//         'X-Master-Key': API_KEY,
//       },
//     });
//     const data = response.data.record;
//     admins = data.admins;
//     console.log(admins);
//   } catch (error) {
//     console.log(
//       'WARNING: No data found in JSONBin, initializing new data',
//       error
//     );
//     await save();
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
//     console.log(admins);
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
//       console.log(admins);
//     }
//     reject(new InputError('Invalid username or password'));
//   });

// export const logout = (email) =>
//   userLock((resolve) => {
//     admins[email].sessionActive = false;
//     resolve();
//     console.log(admins);
//   });

// export const register = (email, password, name) =>
//   userLock((resolve, reject) => {
//     if (email in admins) {
//       return reject(new InputError('Email address already registered'));
//     }
//     admins[email] = { name, password, store: {} };
//     const token = jwt.sign({ email }, JWT_SECRET, { algorithm: 'HS256' });
//     resolve(token);
//     console.log(admins);
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
import axios from 'axios';
import jwt from 'jsonwebtoken';
import AsyncLock from 'async-lock';
import { InputError, AccessError } from './error.js';

const lock = new AsyncLock();
const JWT_SECRET = process.env.JWT_SECRET || 'llamallamaduck';

const JSONBIN_BASE_URL = 'https://api.jsonbin.io/v3/b';
const BIN_ID = '66d68180ad19ca34f89f3173'; // Your Bin ID
const API_KEY = '$2a$10$rdjk2HFOBVOKEbQ1d9IUqui6FITEun2x8QDT5S4ZDyS1715iptTrK'; // Your API Key
console.log('JWT_SECRET:', JWT_SECRET);
console.log('BIN_ID:', BIN_ID);
console.log('API_KEY:', API_KEY);

// State Management
let admins = {};
console.log(admins);
const sessionTimeouts = {};

// Function to update the JSONBin with current admin data
const update = (admins) =>
  new Promise((resolve, reject) => {
    lock.acquire('saveData', async () => {
      try {
        await axios.put(
          `${JSONBIN_BASE_URL}/${BIN_ID}`,
          { admins },
          {
            headers: {
              'Content-Type': 'application/json',
              'X-Master-Key': API_KEY,
            },
          }
        );
        resolve();
      } catch (error) {
        console.error('Failed to update JSONBin:', error);
        reject(new Error('Writing to JSONBin failed'));
      }
    });
  });

export const save = () => update(admins);

export const reset = () => {
  update({});
  admins = {};
};

// Function to setup initial data from JSONBin.io
export const setup = async () => {
  try {
    const response = await axios.get(`${JSONBIN_BASE_URL}/${BIN_ID}/latest`, {
      headers: {
        'X-Master-Key': API_KEY,
      },
    });
    const data = response.data.record;
    admins = data.admins;
    console.log(admins);
  } catch (error) {
    console.log(
      'WARNING: No data found in JSONBin, initializing new data',
      error
    );
    await save();
  }
};

// User lock helper function
export const userLock = (callback) =>
  new Promise((resolve, reject) => {
    lock.acquire('userAuthLock', async () => {
      try {
        await callback(resolve, reject);
      } catch (error) {
        reject(error);
      }
    });
  });

// Authentication Functions
export const getEmailFromAuthorization = (authorization) => {
  try {
    const token = authorization.replace('Bearer ', '');
    const { email } = jwt.verify(token, JWT_SECRET);
    if (!(email in admins)) {
      throw new AccessError('Invalid Token');
    }
    console.log(admins);
    return email;
  } catch {
    throw new AccessError('Invalid token');
  }
};

export const login = (email, password) =>
  userLock(async (resolve, reject) => {
    if (email in admins) {
      if (admins[email].password === password) {
        const token = jwt.sign({ email }, JWT_SECRET, { algorithm: 'HS256' });
        await save(); // Save after successful login
        resolve(token);
        return;
      }
      console.log(admins);
    }
    reject(new InputError('Invalid username or password'));
  });

export const logout = (email) =>
  userLock(async (resolve) => {
    admins[email].sessionActive = false;
    await save(); // Save after logout
    resolve();
    console.log(admins);
  });

export const register = (email, password, name) =>
  userLock(async (resolve, reject) => {
    if (email in admins) {
      return reject(new InputError('Email address already registered'));
    }
    admins[email] = { name, password, store: {} };
    await save(); // Save after registration
    const token = jwt.sign({ email }, JWT_SECRET, { algorithm: 'HS256' });
    resolve(token);
    console.log(admins);
  });

// Store Functions
export const getStore = (email) =>
  userLock((resolve) => {
    resolve({ store: admins[email].store });
  });

export const setStore = (email, store) =>
  userLock(async (resolve) => {
    admins[email].store = store;
    await save(); // Save after store update
    resolve();
  });
