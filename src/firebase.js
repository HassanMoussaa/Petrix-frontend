import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

var firebaseConfig = {
  apiKey: "AIzaSyAcLpqWetspcSaRRvw_NXiVrvbLK4OA1KA",
  authDomain: "petrix-notification.firebaseapp.com",
  projectId: "petrix-notification",
  storageBucket: "petrix-notification.appspot.com",
  messagingSenderId: "16808562782",
  appId: "1:16808562782:web:2cc5067a129f3bc3cb24cf",
};

const firebaseApp = initializeApp(firebaseConfig);
const messaging = getMessaging(firebaseApp);

export const fetchToken = (saveNotificationToken) => {
  return getToken(messaging, {
    vapidKey:
      "BE7yMvtv0DRx4oTDdxHLwY0YJ64kwdUQWEkY02k3z8a4Ttv3yxG2OIjcfyiNnf6lolPBFu5pX0tCG-iPz5jbu8E",
  })
    .then((currentToken) => {
      if (currentToken) {
        saveNotificationToken(currentToken);
      } else {
        console.log("no token found");
      }
    })
    .catch((err) => {
      console.log("error occured", err);
    });
};

export const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      resolve(payload);
    });
  });
