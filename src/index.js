import {React, createContext} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import firebase from 'firebase'
import 'firebase/firestore'
import 'firebase/auth'

// Initialize Firebase
firebase.initializeApp({
  apiKey: "AIzaSyCfnZ0e0sssx6qobcKs3tOacgXKXSV34lM",
  authDomain: "chat-demo-7d0d0.firebaseapp.com",
  projectId: "chat-demo-7d0d0",
  storageBucket: "chat-demo-7d0d0.appspot.com",
  messagingSenderId: "880441717464",
  appId: "1:880441717464:web:ad74354cff6c83a6685dad",
  measurementId: "G-NXSJGP9WH3"
});
firebase.analytics();

export const Context = createContext(null)

const auth = firebase.auth()
const firestore = firebase.firestore()

ReactDOM.render(
  <Context.Provider value={{
    firebase,
    auth,
    firestore
  }}>
    <App />
    {/* <React.StrictMode>
    </React.StrictMode> */}
  </Context.Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
