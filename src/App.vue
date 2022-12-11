<template>
  <v-app>
    <v-app-bar v-if="isAuthorized">
      <template v-slot:append>
        {{ userFromStore.email }}
        <v-btn icon @click="logOut"><v-icon>mdi-exit-to-app</v-icon></v-btn>
        <!-- <v-menu offset-y>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              color="primary"
              dark
              v-bind="attrs"
              v-on="on"
              icon
            >
              <v-icon>mdi-menu</v-icon>
            </v-btn>
          </template>
          <v-list>
            <v-list-item @click="logOut">
              <v-list-item-title>выход</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu> -->
      </template>
    </v-app-bar>
    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>
import { computed } from 'vue';
import { useStore } from 'vuex';
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import router from './router';

export default {
  name: 'App',

  setup () {
    const store = useStore()
    const userFromStore = computed(() => store.state.user)
    const isAuthorized = computed(() => store.state.isAuthorized)

    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        // const uid = user.uid;
        console.log('sign in', user)
        store.dispatch('SET_VALUE', {key: 'isAuthorized', value: true})
        store.dispatch('SET_VALUE', {key: 'user', value: user})
      } else {
        console.log('sign out')
        router.push('/login')
        // User is signed out
      }
    })

    function logOut () {
      const auth = getAuth();
      signOut(auth).then(() => {
        store.dispatch('SET_VALUE', {key: 'isAuthorized', value: false})
        store.dispatch('SET_VALUE', {key: 'user', value: {}})
        // router.push('/login')
      })
    }

    return {logOut, userFromStore, isAuthorized}
  }
}
</script>
