<template>
  <div class="login-form">
    <v-card variant="tonal" width="100%" max-width="350px">
      <v-card-title>Вход</v-card-title>
      <v-card-text>
        <v-tabs fixed-tabs v-model="loginType">
          <!-- <v-tabs-slider color="yellow"></v-tabs-slider> -->
          <v-tab value="email">email</v-tab>
          <v-tab value="phone">phone</v-tab>
        </v-tabs>

        <v-window class="mt-5" v-model="loginType">
          <v-window-item value="email">
            <v-text-field
              v-model="email"
              label="email"
              placeholder="example@mail.com"
              required
              @keyup.enter="login"
            ></v-text-field>
      
            <v-text-field
              v-model="password"
              label="password"
              type="password"
              required
              @keyup.enter="login"
            ></v-text-field>
          </v-window-item>

          <v-window-item value="phone">
            <v-text-field
              v-model="phone"
              :counter="11"
              label="phone"
              placeholder="+7(999)999-99-99"
              required
              @keyup.enter="login"
            ></v-text-field>
          </v-window-item>

        </v-window>
      </v-card-text>
      <v-card-actions>
        <div class="d-flex flex-column align-center w-100">
          <v-btn width="152px" @click="login" color="primary" class="sign-in-button">Войти</v-btn>
          <v-btn width="152px" @click="loginWithGoogle">войти через<v-icon class="ml-3" size="14" color="red">mdi-google</v-icon></v-btn>
          <v-btn width="152px" variant="plain" to="/registration" flat>регистрация</v-btn>
          <v-alert class="mt-5 w-100" v-if="isFailLogin" color="error">Не удалось залогиниться😭</v-alert>
        </div>
        <!-- <v-btn @click="loginWithEmail" color="primary" class="sign-in-button">Войти</v-btn> -->
      </v-card-actions>
    </v-card>
  </div>
  <v-dialog transition="dialog-bottom-transition" v-model="isEnterCode">
    <v-card>
      <v-card-title>Введите код</v-card-title>
      <v-card-text>
        <v-otp-input
          num-inputs="6"
          @on-complete="handleOnComplete"
        ></v-otp-input>
      </v-card-text>
    </v-card>
  </v-dialog>
  <!-- <div id="firebaseui-auth-container"> </div>-->
</template>

<script>
  import { inject, ref, onMounted } from 'vue'
  import { getAuth, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
  import router from '@/router';
  import VOtpInput from 'vue3-otp-input';

  export default {
    name: 'login-component',
    components: {
      VOtpInput,
    },
    setup () {
      onMounted (() => {
        console.log('sadfsdfd')
      })

      const fbApp = inject('fbApp')
      let isFailLogin = ref(false)

      function login () {
        loginType.value === 'email' ? loginWithEmail() :loginWithPhone()
      } 
      
      const email = ref('admin@mail.ru')
      const password = ref('')
      function loginWithEmail () {
        isFailLogin.value = false
        const auth = getAuth(fbApp)
        signInWithEmailAndPassword(auth, email.value, password.value).then(res => {
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

      const phone = ref('+79042110468')
      let isEnterCode = ref(false)
      function loginWithPhone () {
        const auth = getAuth(fbApp);
        auth.useDeviceLanguage();
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

      const handleOnComplete = (value) => {
        console.log('OTP completed: ', value);
      };

      const loginType = ref('phone')

      return {loginWithGoogle, login, handleOnComplete, email, password, phone, isEnterCode, isFailLogin, loginType}
    }
  }
</script>

<style>
.login-form {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>