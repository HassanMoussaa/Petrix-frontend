importScripts(
  "https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js"
);

firebase.initializeApp({
  apiKey: "AIzaSyAcLpqWetspcSaRRvw_NXiVrvbLK4OA1KA",
  authDomain: "petrix-notification.firebaseapp.com",
  projectId: "petrix-notification",
  storageBucket: "petrix-notification.appspot.com",
  messagingSenderId: "16808562782",
  appId: "1:16808562782:web:2cc5067a129f3bc3cb24cf",
});

const messaging = firebase.messaging();
messaging.onBackgroundMessage(function (payload) {
  console.log("Received background message", payload);
  const notificationTitle = payload.notificationTitle;
  const notificationOptions = {
    body: payload.notification.body,
  };
  self.ServiceWorkerRegistration.showNotification(
    notificationTitle,
    notificationOptions
  );
});
