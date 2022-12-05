<template>
  <div class="registration">
    
  </div>
  <div id="firebaseui-auth-container">
    
  </div>
</template>

<script>
  import { inject, ref } from 'vue'
  import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

  export default {
    setup () {
      const email = ref('')
      const password = ref('')
      const fbApp = inject('fbApp')

      const firebase = {}
      const firebaseui = require('firebaseui')
      var ui = new firebaseui.auth.AuthUI(firebase.auth());
      ui.start('#firebaseui-auth-container', {
        signInOptions: {
          provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
          signInMethod: firebase.auth.EmailAuthProvider.EMAIL_LINK_SIGN_IN_METHOD
        }
        // Other config options...
      });

      function registerUser () {
        const auth = getAuth(fbApp)
        createUserWithEmailAndPassword(auth, email, password).then()
      }

      return {registerUser, email, password}
    }
  }
</script>