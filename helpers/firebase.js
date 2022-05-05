const { initializeApp } = require('firebase/app');
const { getFirestore } = require('firebase/firestore');
const { getFunctions } = require('firebase/functions');
require('dotenv').config();

// Setup firebase configuration
const firebaseConfig = {
	apiKey: process.env.FIREBASE_API_KEY,
	authDomain: process.env.FIREBASE_AUTH_DOMAIN,
	projectId: process.env.FIREBASE_PROJECT_ID,
	storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
	messagingSenderId: process.env.FIREBASE_MESSAGE_SENDER_ID,
	appId: process.env.FIREBASE_APP_ID,
	measurementId: process.env.FIREBASE_MEASUREMENT_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
module.exports.db = getFirestore(app);
module.exports.funcs = getFunctions(app);
