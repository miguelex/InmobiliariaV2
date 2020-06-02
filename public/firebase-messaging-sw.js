importScripts("https://www.gstatic.com/firebasejs/7.6.2/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/7.6.2/firebase-messaging.js");

const config = {
    apiKey: "AIzaSyCtewL0TV6HecOkLHbXGVFU_WkTQ2vqeCI",
    authDomain: "templatecurso-6d079.firebaseapp.com",
    databaseURL: "https://templatecurso-6d079.firebaseio.com",
    projectId: "templatecurso-6d079",
    storageBucket: "templatecurso-6d079.appspot.com",
    messagingSenderId: "389004831833",
    appId: "1:389004831833:web:a3d4fe4ab3ff0ee5699548",
    measurementId: "G-1MLJKJ3LEE"
  };

  firebase.initializeApp(config);
  const messaging =firebase.messaging();