<template>
  <div class="car-list-wrapper">
    <v-container>
      <div class="car-list-top">
        <div class="car-list-top__search">
          <v-tabs
            v-model="searchBy"
            direction="vertical"
            bg-color="gray"
            color="primary"
          >
            <v-tab value="one">Номер</v-tab>
            <v-tab value="two">Регион</v-tab>
          </v-tabs>
          <v-window v-model="searchBy">
            <v-window-item value="one">
              <NumberTemplate @input-number="setSearch" @input-region="test" only-number/>
            </v-window-item>
            
            <v-window-item value="two">
              <NumberTemplate @input-number="setSearch" @input-region="test"/>
            </v-window-item>
          </v-window>
        </div>
        <v-dialog width="500px" v-model="isCreateCar">
          <template v-slot:activator="{ props }">
            <v-btn color="primary" v-bind="props">Добавить авто</v-btn>
          </template>
          <CreateCarVue @close-popup="isCreateCar = false"/>
        </v-dialog>
        <!-- <v-text-field
          v-model="search"
          label="Номер"
          :loading="loadingSearch"
          @input="setSearch"
        /> -->
      </div>
    </v-container>
    <v-container fluid>
      <v-row>
        <v-col
          cols="3"
          class="mb-2"
          v-for="(car, carIndex) in cars" :key="carIndex"
          >
          <v-card
            class="mx-auto"
            max-width="332"
            width="100%"
          >
              <v-img
                :loading="!car.img"
                :src="car.img"
                height="200px"
                cover
              ></v-img>
              <v-card-title>
                <!-- {{ car.Number }}_{{ car.Region }} -->
                <NumberTemplate :display-number="car.Number" :display-region="car.Region"/>
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
let searchBy = vueRef(0);
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

function test (e) {
  console.log(e)
}

// let search = vueRef('')
// let loadingSearch = vueRef(false)
function setSearch (e) {
  e = String(e)
  if (e.length === 0) {
    getCars()
    return
  }
  if (e.length < 3) { // не ввели номер до конца
    return
  }
  const queryRef = query(carRef, orderByChild('Number'), equalTo(e))
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

<style lang="scss">
.car-list-top {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;

  &__search {
    display: flex;
  }
}
</style>