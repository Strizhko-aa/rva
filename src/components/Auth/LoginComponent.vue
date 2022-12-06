<template>
  <h3>Вход</h3>
  <v-form>
    <v-container>
      <v-row>
        <v-col
          cols="12"
          md="4"
        >
          <v-text-field
            v-model="phone"
            :counter="10"
            label="phone"
            placeholder="+7(999)999-99-99"
            required
          ></v-text-field>
        </v-col>
      </v-row>

      <v-row>
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
          <!-- <v-btn @click="loginWithEmail" color="primary" class="sign-in-button">Войти</v-btn> -->
          <v-btn @click="loginWithPhone" color="primary" class="sign-in-button">Войти</v-btn>
          <v-btn @click="loginWithGoogle" icon color="red" class="ml-2" size="36"><v-icon>mdi-google</v-icon></v-btn>
        </v-col>
        <v-col>
          <v-btn to="/registration" flat>регистрация</v-btn>
        </v-col>
      </v-row>
      <v-row>
        <v-alert class="mt-5" v-if="isFailLogin" color="error">Не удалось залогиниться😭</v-alert>
      </v-row>
    </v-container>
  </v-form>
  <v-dialog transition="dialog-bottom-transition" v-model="isEnterCode">
    <v-card>
      <v-card-title>Введите код</v-card-title>
      <v-card-text>
        <v-otp-input
          length="6"
          @input="onCodeInput"
        ></v-otp-input>
      </v-card-text>
    </v-card>
  </v-dialog>
  <!-- <div id="firebaseui-auth-container"> </div>-->
</template>

<script>
  import { inject, ref } from 'vue'
  import { getAuth, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
  import router from '@/router';

  export default {
    setup () {
      const phone = ref('+79042110468')
      const password = ref('')
      const fbApp = inject('fbApp')
      let isFailLogin = ref(false)

      function loginWithEmail () {
        isFailLogin.value = false
        const auth = getAuth(fbApp)
        signInWithEmailAndPassword(auth, phone.value, password.value).then(res => {
          console.log(res)
          router.push('/')
        }).catch(err => {
          console.error(err)
          isFailLogin.value = true
        })
      }

      function loginWithGoogle () {
        const provider = new GoogleAuthProvider();
        const auth = getAuth(fbApp)
        signInWithPopup(auth, provider).then(() => {
          // const credential = GoogleAuthProvider.credentialFromResult(res);
          // console.log(credential)
          // console.log(res.user)
          router.push('/')
        }).catch(() => {
          isFailLogin.value = true
          // const errorCode = error.code;
          // const errorMessage = error.message;
        })
      }

      let isEnterCode = ref(false)
      function loginWithPhone () {
        const auth = getAuth();
        // fbApp.auth().useDeviceLanguage();
        window.recaptchaVerifier = new RecaptchaVerifier('.sign-in-button', {
          'size': 'invisible',
          'callback': (response) => {
            console.log('response', response)
            // reCAPTCHA solved, allow signInWithPhoneNumber.
            // onSignInSubmit();
            const appVerifier = window.recaptchaVerifier;
            let phoneNumber = phone.value.replace(/[^+\d]/g, '')
            console.log("🚀 ~ file: LoginComponent.vue:113 ~ loginWithPhone ~ phoneNumber", phoneNumber)
            signInWithPhoneNumber(auth, phoneNumber, appVerifier).then(() => {
              isEnterCode.value = true
            }).catch(err => {
              console.error('fail send sms', err)
              resetCaptcha()
            })
          }
        }, auth);
      }

      function resetCaptcha () {
        // grecaptcha.reset(window.recaptchaWidgetId);

        // // Or, if you haven't stored the widget ID:
        // window.recaptchaVerifier.render().then(function(widgetId) {
        //   grecaptcha.reset(widgetId);
        // });
      }

      function onCodeInput (e) {
        console.log(e)
        // if (e.length > )
      }

      return {loginWithEmail, loginWithGoogle, loginWithPhone, onCodeInput, phone, password, isFailLogin, isEnterCode}
    }
  }
</script>