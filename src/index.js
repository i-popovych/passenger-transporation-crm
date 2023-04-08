import React, {createContext, useContext} from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {getStorage} from 'firebase/storage'
import { getDatabase } from "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyBflgGTNNnzouhQYaqYjF4jcW60Bh-HpE8",
    authDomain: "crm-passanger-transporat-a0133.firebaseapp.com",
    projectId: "crm-passanger-transporat-a0133",
    storageBucket: "crm-passanger-transporat-a0133.appspot.com",
    messagingSenderId: "106708876536",
    appId: "1:106708876536:web:e2e8a2028b20065dd78f0d",
    databaseURL: "https://crm-passanger-transporat-a0133-default-rtdb.firebaseio.com/"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const firestore = getStorage(app)

export const db = getDatabase(app)

export const Context = createContext(null)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Context.Provider value={{
        auth,
        firestore,
        app
    }}>
        <App />
    </Context.Provider>
);

reportWebVitals();
