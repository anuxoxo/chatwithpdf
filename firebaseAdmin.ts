import { initializeApp, getApps, App, getApp, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

import serviceKey from "@/service_key.json";

let app: App;
if (getApps().length === 0) {
  app = initializeApp({
    credential: cert(JSON.stringify(serviceKey)),
  })
} else {
  app = getApp();
}

const adminDb = getFirestore(app);

export { app as adminApp, adminDb }