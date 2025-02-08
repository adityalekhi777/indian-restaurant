import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyD991MAQp9AtvnTNm5reOLRlWn8DWbXhBs",
  authDomain: "desi-taste-8d690.firebaseapp.com",
  projectId: "desi-taste-8d690",
  storageBucket: "desi-taste-8d690.firebasestorage.app",
  messagingSenderId: "964644878699",
  appId: "1:964644878699:web:a5cddc72fda7b6868fb42e"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
