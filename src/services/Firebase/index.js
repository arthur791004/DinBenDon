import firebase from '@firebase/app';
import '@firebase/messaging';
import '@firebase/firestore';
import {
  CONFIG,
  COLLECTIONS,
  PUBLIC_KEY,
} from './constants';

const { NOTIFICATIONS } = COLLECTIONS;

class Firebase {
  isGranted = false;
  firestoreOptions = {
    // disable deprecated features
    timestampsInSnapshots: true,
  };

  constructor() {
    firebase.initializeApp(CONFIG);

    this.messaging = firebase.messaging();
    this.db = firebase.firestore();

    this.db.settings(this.firestoreOptions);
  }

  /**
   * Public methods
   */
  setUserNotification = (userID) => {
    this.messaging.usePublicVapidKey(PUBLIC_KEY);

    if (!(navigator && navigator.serviceWorker)) {
      throw new Error('Do not support service worker');
    }

    // init service worker
    return navigator.serviceWorker.register('./firebase-messaging-sw.js')
      .then(registration => this.messaging.useServiceWorker(registration))
      .then(() => this.checkPermission())
      .then(() => this.registerEvent())
      .then(() => this.getMsgToken())
      .then(token => this.setMsgToken(userID, token))
  };

  removeUserNotification = (userID) => {
    this.removeMsgToken(userID);
  }

  /**
   * Private methods
   */
  checkPermission = () => this.messaging.requestPermission()
    .then(() => (this.isGranted = true))

  createMsgToken = () => this.messaging.getToken()

  getMsgToken = () => {
    if (!this.isGranted) {
      return Promise.resolve();
    }

    return this.createMsgToken();
  };

  setMsgToken = (userID, token) => {
    this.db.collection(NOTIFICATIONS)
      .doc(userID)
      .set({ token });
  }

  removeMsgToken = (userID) => {
    this.db.collection(NOTIFICATIONS)
      .doc(userID)
      .delete()
  }

  registerEvent = () => {
    this.messaging.onMessage(this.handleMessage);
    this.messaging.onTokenRefresh(this.createMsgToken);
  }

  handleMessage = (payload) => {
    console.log(payload);
  }
}

export default new Firebase();
