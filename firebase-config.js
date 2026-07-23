/**
 * firebase-config.js
 * Firebase SDK v12.x (ES Modules)
 */

import { initializeApp, getApps } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";

import {
  getAuth,
  connectAuthEmulator,
  browserLocalPersistence,
  setPersistence
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";

import {
  getFirestore,
  initializeFirestore,
  persistentLocalCache,
  persistentMultipleTabManager,
  CACHE_SIZE_UNLIMITED,
  enableNetwork,
  disableNetwork,
  connectFirestoreEmulator,
  serverTimestamp,
  Timestamp,
  FieldValue,
  GeoPoint,
  Bytes,
  documentId
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

import {
  getStorage,
  connectStorageEmulator
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-storage.js";

/* -------------------------------------------------------------------------- */
/* Firebase Configuration                                                     */
/* Fill ONLY these values                                                     */
/* -------------------------------------------------------------------------- */

const firebaseConfig = Object.freeze({
  apiKey: "",
  authDomain: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: "",
  measurementId: ""
});

/* -------------------------------------------------------------------------- */
/* Environment                                                                */
/* -------------------------------------------------------------------------- */

const HOST =
  location.hostname === "localhost" ||
  location.hostname === "127.0.0.1";

const app =
  getApps().length
    ? getApps()[0]
    : initializeApp(firebaseConfig);

/* -------------------------------------------------------------------------- */
/* Firestore                                                                  */
/* -------------------------------------------------------------------------- */

const db = initializeFirestore(app, {
  cacheSizeBytes: CACHE_SIZE_UNLIMITED,
  localCache: persistentLocalCache({
    tabManager: persistentMultipleTabManager()
  }),
  ignoreUndefinedProperties: true
});

/* -------------------------------------------------------------------------- */
/* Authentication                                                             */
/* -------------------------------------------------------------------------- */

const auth = getAuth(app);

await setPersistence(auth, browserLocalPersistence);

/* -------------------------------------------------------------------------- */
/* Storage                                                                     */
/* -------------------------------------------------------------------------- */

const storage = getStorage(app);

/* -------------------------------------------------------------------------- */
/* Optional Emulator Support                                                  */
/* -------------------------------------------------------------------------- */

const USE_EMULATORS = false;

if (HOST && USE_EMULATORS) {
  connectAuthEmulator(auth, "http://127.0.0.1:9099", {
    disableWarnings: true
  });

  connectFirestoreEmulator(db, "127.0.0.1", 8080);

  connectStorageEmulator(storage, "127.0.0.1", 9199);
}

/* -------------------------------------------------------------------------- */
/* Connectivity Helpers                                                       */
/* -------------------------------------------------------------------------- */

async function goOffline() {
  try {
    await disableNetwork(db);
    return true;
  } catch {
    return false;
  }
}

async function goOnline() {
  try {
    await enableNetwork(db);
    return true;
  } catch {
    return false;
  }
}

/* -------------------------------------------------------------------------- */
/* Validation                                                                 */
/* -------------------------------------------------------------------------- */

function firebaseReady() {
  return (
    firebaseConfig.apiKey.trim() !== "" &&
    firebaseConfig.projectId.trim() !== "" &&
    firebaseConfig.appId.trim() !== ""
  );
}

/* -------------------------------------------------------------------------- */
/* Exports                                                                    */
/* -------------------------------------------------------------------------- */

export {
  app,
  auth,
  db,
  storage,
  firebaseConfig,
  firebaseReady,
  goOffline,
  goOnline,
  serverTimestamp,
  Timestamp,
  FieldValue,
  GeoPoint,
  Bytes,
  documentId
};

