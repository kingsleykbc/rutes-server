// Import the functions you need from the SDKs you need

const { initializeApp } = require('firebase/app');
const { getAuth } = require('firebase/auth');
const { getFirestore } = require('firebase/firestore');
const { getFunctions } = require('firebase/functions');
const { getStorage } = require('firebase/storage');

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: 'AIzaSyDF8NAKkGT9aJeJ6dvZOOpddUSzjdXRyiY',
	authDomain: 'mnwcw2.firebaseapp.com',
	projectId: 'mnwcw2',
	storageBucket: 'mnwcw2.appspot.com',
	messagingSenderId: '243637791844',
	appId: '1:243637791844:web:d16e96ed3b87413c05c371',
	measurementId: 'G-KZRKH3PC8G'
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
module.exports.auth = getAuth(app);
module.exports.db = getFirestore(app);
module.exports.funcs = getFunctions(app);
module.exports.storage = getStorage(app);
