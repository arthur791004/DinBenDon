importScripts('https://www.gstatic.com/firebasejs/5.4.2/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/5.4.2/firebase-messaging.js');

firebase.initializeApp({
  messagingSenderId: '114693277110',
});

const messaging = firebase.messaging();

messaging.setBackgroundMessageHandler((payload) => {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);

  const title = 'Background Message Title';
  const options = {
    body: 'Background Message body.',
  };

  return self.registration.showNotification(title, options);
});