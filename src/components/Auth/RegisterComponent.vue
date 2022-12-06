<template>
  <h3>Регистрация</h3>
  <v-form>
    <v-container>
      <v-row>
        <v-col
          cols="12"
          md="4"
        >
          <v-text-field
            v-model="email"
            :counter="10"
            label="email"
            required
          ></v-text-field>
        </v-col>

        <v-col
          cols="12"
          md="4"
        >
          <v-text-field
            v-model="password"
            label="password"
            type="password"
            required
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-btn @click="registerUser" color="primary">Регистрация</v-btn>
        </v-col>
        <v-col>
          <v-btn to="/login" flat>Вход</v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
  <!-- <div id="firebaseui-auth-container"> </div>-->
</template>

<script>
  import { inject, ref } from 'vue'
  import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

  export default {
    setup () {
      const email = ref('')
      const password = ref('')
      const fbApp = inject('fbApp')

      // const firebase = {}
      // const firebaseui = require('firebaseui')
      // var ui = new firebaseui.auth.AuthUI(firebase.auth());
      // ui.start('#firebaseui-auth-container', {
      //   signInOptions: {
      //     provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
      //     signInMethod: firebase.auth.EmailAuthProvider.EMAIL_LINK_SIGN_IN_METHOD
      //   }
      //   // Other config options...
      // });

      function registerUser () {
        const auth = getAuth(fbApp)
        createUserWithEmailAndPassword(auth, email.value, password.value).then(res => {
          console.log(res)
          alert('success')
        })
      }

      return {registerUser, email, password}
    }
  }
</script>