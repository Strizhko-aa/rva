<template>
  <div class="car-list-wrapper">
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
    <v-dialog width="500px" v-model="isCreateCar">
      <template v-slot:activator="{ props }">
        <v-btn color="primary" v-bind="props">Добавить авто</v-btn>
      </template>
      <CreateCarVue @close-popup="isCreateCar = false"/>
    </v-dialog>
    <!-- <v-btn @click="getCars">get data</v-btn> -->
    <v-btn @click="addTestData">add data</v-btn>
  </div>
</template>

<script>
import { onMounted, ref as vueRef } from 'vue'
import { getDatabase, ref, onValue, set } from "firebase/database";
import { getStorage, ref as fireStoreRef, getDownloadURL } from "firebase/storage";
import CreateCarVue from './CreateCarVue.vue';

export default {
    name: "car-list",
    components: { CreateCarVue },
    setup () {
        let isCreateCar = vueRef(false);
        const database = getDatabase();
        console.log(database, 'carListVue')
        let carRef = ref(database, "cars");

        onMounted(() => {
          getCars();
        });

        const storage = getStorage();
        async function getCarUrl (car) {
          let q = await getDownloadURL(fireStoreRef(storage, car.photos[0]))
          car.img = q
          console.log(q)
          return q
        }


        function addTestData() {
          set(carRef, {
              Model: "XX999",
              Mark: "BMW",
              Number: 999,
              Region: 888
          });
        }

        let cars = vueRef([]);
        function getCars() {
          onValue(carRef, (snapshot) => {
            let snapshotVal = snapshot.val();
            console.log('snapshotVal', snapshotVal);
            cars.value = Object.keys(snapshotVal).map((key) => {
              return snapshotVal[key]
            })
            cars.value.forEach(element => {
              getCarUrl(element)
            });
            // if (Array.isArray(snapshotVal)) {
            //   cars.value = snapshotVal;
            // }
            // else {
            //   cars.value.push(snapshotVal);
            // }
          })
        }
        return { addTestData, getCars, getCarUrl, cars, isCreateCar }
    }
}
</script>