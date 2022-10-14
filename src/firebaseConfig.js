import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  TwitterAuthProvider,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore/lite";

const firebaseConfig = {
  apiKey: "AIzaSyCQJyZlcqTJfq7FM77XTnSfeHzrrXBaU24",
  authDomain: "fluently-26bdb.firebaseapp.com",
  databaseURL:
    "https://fluently-26bdb-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "fluently-26bdb",
  storageBucket: "fluently-26bdb.appspot.com",
  messagingSenderId: "871644011186",
  appId: "1:871644011186:web:20ea57d239bf844fe047ab",
  measurementId: "G-EZFWVZK5FG",
};

initializeApp(firebaseConfig);

const providerGoogle = new GoogleAuthProvider();
const providerTwitter = new TwitterAuthProvider();
const auth = getAuth();
const db = getFirestore();

export { auth, db, providerGoogle, providerTwitter };

// firebase result google
// {
//     "uid": "dTCK86rRZiVC2nrD6H1IeaHcneG2",
//     "email": "ahmadakhussyuj.an@gmail.com",
//     "emailVerified": true,
//     "displayName": "xujaan",
//     "isAnonymous": false,
//     "photoURL": "https://lh3.googleusercontent.com/a-/AFdZucq3Qexp26Qkkp4s0W1Xy-kSnk01yDPpasfcZ5D1jQ=s96-c",
//     "providerData": [
//         {
//             "providerId": "google.com",
//             "uid": "106688434242863019875",
//             "displayName": "xujaan",
//             "email": "ahmadakhussyuj.an@gmail.com",
//             "phoneNumber": null,
//             "photoURL": "https://lh3.googleusercontent.com/a-/ACNPEu81p0Y52PUEFN1vUEndpJtG9dm0BrqasVHxKOxEFg=s96-c"
//         }
//     ],
//     "stsTokenManager": {
//         "refreshToken": "AOEOula1PO9aPxPFt-R1N7rwXxl9WKnu79hMcBoQEhCDZiTpUL2ryyiHNqffDYrt8ygwA4RznUpWXp5RkDMBCL1W-7mt-AZi53PSq10TNqm7voDy2R74G2BL93VvlJOP32YSLQMr-3eOYGLoVe81hxP0orb80VVCnmoGqUq3nsWOjyBsdvY4afW84bIkrNJa8YkAuX1EkQsCuCHlthjcVkFtkFK2MhF6vHkXicGvBGZAZNtTg6WEz-zrg5mQ1CGslaCu_HutkYCkcdA5efo2oXK9NG5KM4nMlz35ZMrsqeSyau0vwbg98w0qzBT1S-Qdt2JHyopfbWRnXK39LUWAonAi6US67Hz4GJlpe63pnribxI-63cbUfj2TLeNZ2IKrgctjGatQZTsQSO_rWzuvHSjdC8IQVp2cwF44D8dM9sTxMzYtyMtiI_E",
//         "accessToken": "eyJhbGciOiJSUzI1NiIsImtpZCI6IjU4NWI5MGI1OWM2YjM2ZDNjOTBkZjBlOTEwNDQ1M2U2MmY4ODdmNzciLCJ0eXAiOiJKV1QifQ.eyJuYW1lIjoieHVqYWFuIiwicGljdHVyZSI6Imh0dHBzOi8vbGgzLmdvb2dsZXVzZXJjb250ZW50LmNvbS9hLS9BRmRadWNxM1FleHAyNlFra3A0czBXMVh5LWtTbmswMXlEUHBhc2ZjWjVEMWpRPXM5Ni1jIiwiaXNzIjoiaHR0cHM6Ly9zZWN1cmV0b2tlbi5nb29nbGUuY29tL2ZsdWVudGx5LTI2YmRiIiwiYXVkIjoiZmx1ZW50bHktMjZiZGIiLCJhdXRoX3RpbWUiOjE2NjQ4ODYzMDUsInVzZXJfaWQiOiJkVENLODZyUlppVkMybnJENkgxSWVhSGNuZUcyIiwic3ViIjoiZFRDSzg2clJaaVZDMm5yRDZIMUllYUhjbmVHMiIsImlhdCI6MTY2NDg4NjMwNSwiZXhwIjoxNjY0ODg5OTA1LCJlbWFpbCI6ImFobWFkYWtodXNzeXVqLmFuQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJmaXJlYmFzZSI6eyJpZGVudGl0aWVzIjp7Imdvb2dsZS5jb20iOlsiMTA2Njg4NDM0MjQyODYzMDE5ODc1Il0sImVtYWlsIjpbImFobWFkYWtodXNzeXVqLmFuQGdtYWlsLmNvbSJdfSwic2lnbl9pbl9wcm92aWRlciI6Imdvb2dsZS5jb20ifX0.oUJltwO9w7HbgXOHrNWrIykx5BeS4VFiXW0YKHBHnUdoUSm8s_G_6EG-Z6nc8Z6_BL-PSmfwjX4Nb0giIy-Misy00uICqfOs216d2-jvgJR0oh5sTNOnwhnE0SZvVOT-sy6_B2YkJTlqxEYkBgobL4heWmN7O7MTG_gCg-HjYNAO7Gjb4yxFzYFpckaS8wXSIvyMrwpcO8Cw3THss145J8dXdzKGWrxTwz5nEWnNIgpV-ohMwEbDsaRj0isi0HBtjorHhTJASCVKnNU0BLjUA2njXZLnTOplBLyjn4U12wgBSpTrwn9AYRILAKQ4WkADQ7K4PHRSpp5whltsEJUXNw",
//         "expirationTime": 1664889905892
//     },
//     "createdAt": "1662969693828",
//     "lastLoginAt": "1664886252357",
//     "apiKey": "AIzaSyCQJyZlcqTJfq7FM77XTnSfeHzrrXBaU24",
//     "appName": "[DEFAULT]"
// }
