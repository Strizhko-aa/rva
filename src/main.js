import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'
import store from './store'

loadFonts()

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAGy5Ysi2AbW1Mz5yJD1cIMrdDBMk3q2mc",
  authDomain: "rva-project-5d10c.firebaseapp.com",
  projectId: "rva-project-5d10c",
  storageBucket: "rva-project-5d10c.appspot.com",
  messagingSenderId: "825605662301",
  appId: "1:825605662301:web:7c12ce82c3ae5903418fb4"
};

// Initialize Firebase
const fireBaseApp = initializeApp(firebaseConfig);

const app = createApp(App)
app.provide('fbApp', fireBaseApp)
// console.log(router)
app.use(router)
app.use(vuetify)
app.use(store)
app.mount('#app')
