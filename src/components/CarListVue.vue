<template>
  <div class="car-list-wrapper">
    <div>
      <p v-for="(car, carIndex) in cars" :key="carIndex">{{ car }}</p>
    </div>
    <v-dialog width="500px" v-model="isCreateCar">
      <template v-slot:activator="{ props }">
        <v-btn color="primary" v-bind="props">Добавить авто</v-btn>
      </template>
      <CreateCarVue/>
    </v-dialog>
    <!-- <v-btn @click="getCars">get data</v-btn> -->
    <v-btn @click="addTestData">add data</v-btn>
  </div>
</template>

<script>
import { onMounted, ref as vueRef } from 'vue'
import { getDatabase, ref, onValue, set } from "firebase/database";
import CreateCarVue from './CreateCarVue.vue';

export default {
    name: "car-list",
    components: { CreateCarVue },
    setup () {
        let isCreateCar = vueRef(false);
        const database = getDatabase();
        let carRef = ref(database, "cars");

        onMounted(() => {
            getCars();
        });


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
            console.log(snapshotVal);
            if (Array.isArray(snapshotVal)) {
              cars.value = snapshotVal;
            }
            else {
              cars.value.push(snapshotVal);
            }
          })
        }
        return { addTestData, getCars, cars, isCreateCar }
    }
}
</script>