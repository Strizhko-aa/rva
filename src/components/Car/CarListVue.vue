<template>
  <div class="car-list-wrapper">
    <NumberTemplate/>
    <NumberTemplate :display-number="333" :display-region="222"/>
    <v-dialog width="500px" v-model="isCreateCar">
      <template v-slot:activator="{ props }">
        <v-btn color="primary" v-bind="props">Добавить авто</v-btn>
      </template>
      <CreateCarVue @close-popup="isCreateCar = false"/>
    </v-dialog>
    <div class="search">
      <v-text-field
        v-model="search"
        label="Номер"
        :loading="loadingSearch"
        @input="setSearch"
      />
    </div>
    <v-container fluid>
      <v-row>
        <v-col
          cols="3"
          class="mb-2"
          v-for="(car, carIndex) in cars" :key="carIndex"
        >
          <v-card
            class="mx-auto"
            max-width="344"
            width="100%"
          >
              <v-img
                :loading="!car.img"
                :src="car.img"
                height="200px"
                cover
              ></v-img>
              <v-card-title>
                {{ car.Number }}_{{ car.Region }}
              </v-card-title>
              <v-card-subtitle>
                {{ car.Mark }}, {{ car?.Model?.name }}
              </v-card-subtitle>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script setup>
import { ref as vueRef, watch, computed } from 'vue'
import { getDatabase, ref, onValue, query, orderByChild, equalTo } from "firebase/database";
import { getStorage, ref as fireStoreRef, getDownloadURL } from "firebase/storage";
import CreateCarVue from './CreateCarVue.vue';
import { useStore } from 'vuex';
import NumberTemplate from '../Utils/NumberTemplate.vue';

let isCreateCar = vueRef(false);
const database = getDatabase();
let carRef = ref(database, "cars");
const store = useStore();

const isAuthorized = computed(() => {
  return store.state.isAuthorized
})

watch(isAuthorized, () => {
  if (isAuthorized.value) {
    getCars()
  }
})

const storage = getStorage();
async function getCarUrl (car) {
  let q = await getDownloadURL(fireStoreRef(storage, car.photos[0]))
  car.img = q
  console.log(q)
  return q
}

let search = vueRef('')
let loadingSearch = vueRef(false)
function setSearch (e) {
  if (e.target.value.length === 0) {
    getCars()
    return
  }
  if (e.target.value.length < 3) {
    return
  }
  const queryRef = query(carRef, orderByChild('Number'), equalTo(e.target.value))
  onValue(queryRef, snap => {
    let snapshotVal = snap.val()
    if (snapshotVal === null) {
      cars.value = []
      return
    }
    cars.value = Object.keys(snapshotVal).map((key) => {
      return snapshotVal[key]
    })
    cars.value.forEach(element => {
      getCarUrl(element)
    });
  })
}

let cars = vueRef([]);
function getCars() {
  console.log('cars', cars)
  onValue(carRef, (snapshot) => {
    let snapshotVal = snapshot.val();
    cars.value = Object.keys(snapshotVal).map((key) => {
      return snapshotVal[key]
    })
    cars.value.forEach(element => {
      getCarUrl(element)
    });
  }, {
    // onlyOnce: true TODO добавить child_added, child_removed
  })
}
</script>

<style>
.search {
  width: 100px;
}
</style>