<template>
  <v-card>
    <v-card-text>
      <v-form>
        <v-text-field label="Номер авто" v-model="carNumber" type="number"></v-text-field>
        <v-text-field label="Регион" v-model="carRegion" type="number"></v-text-field>

        <v-autocomplete
          v-model="carMark"
          :items="carModels"
          item-title="name"
          item-value="id"
          label="Марка"
          no-filter
          @update:modelValue="setModelMarks"
          @update:search="searchMark"
        >
          <template v-slot:item="{ props, item }">
            <v-list-item
              v-bind="props"
              :title="item?.title"
              :subtitle="item.raw.country"
            ></v-list-item>
          </template>
        </v-autocomplete>

        <v-autocomplete
          v-model="carModelSelected"
          :items="modelMarks"
          item-title="name"
          return-object
        >
          <template v-slot:item="{ props, item }">
            <v-list-item
              v-bind="props"
              :title="item?.title"
              :subtitle="item.value['year-from'] + ' - ' + item.value['year-to']"
            ></v-list-item>
          </template>
        </v-autocomplete>

        <UploadFileVue @select-file="carPhoto = $event"/>
				<v-img :src="previewPhoto" v-if="previewPhoto"></v-img>
      </v-form>
    </v-card-text>
    <v-card-actions>
      <v-btn color="promary" @click="createCar">Добавить авто</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script setup>
import { ref, onMounted, computed, defineEmits } from 'vue'
import { getDatabase, ref as fireDbRef, set, push as fireDbPush } from "firebase/database";
import { getStorage, ref as fireStoreRef, uploadBytes } from "firebase/storage";
import { useStore } from 'vuex';
import UploadFileVue from '../Utils/UploadFileVue.vue';

const emit = defineEmits('close-popup')

const store = useStore();
let carNumber = ref("");
let carMark = ref("");
let carRegion = ref("");
let carModelSelected = ref("");
let carModels = ref([]);
let allCarModels = require("@/carModels.json");

const previewPhoto = computed(() => (carPhoto.value instanceof File) ? URL.createObjectURL(carPhoto.value) : null)

onMounted(() => {
  let lightVersion = allCarModels.map(model => {
    return {
      name: model.name,
      id: model.id,
      country: model.country
    };
  });
  carModels.value = lightVersion;
});

function searchMark(e) {
	if (e.length < 2)
		return;
	carModels.value = allCarModels.filter(mark => mark.name.toLowerCase().includes(e));
}

function makeid(length) {
	var result           = '';
	var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	var charactersLength = characters.length;
	for ( var i = 0; i < length; i++ ) {
		result += characters.charAt(Math.floor(Math.random() * charactersLength));
	}
	return result;
}

const storage = getStorage();
const database = getDatabase();
let carPhoto = ref({})
async function createCar() {
  // let carUrl = `cars/${carNumber.value}_${carRegion.value}`;
  let carUrl = `cars`;

	const photoExtension = carPhoto.value.name.split(".").splice(-1,1)[0]
	let photoUrl = `${carUrl}/${carNumber.value}_${carRegion.value}/${carNumber.value}_${carRegion.value}__${makeid(5)}-${makeid(5)}.${photoExtension}`
	let resPhoto = await uploadBytes(fireStoreRef(storage, photoUrl), carPhoto.value)
  let carRef = fireDbRef(database, carUrl)
  let randomCarRef = fireDbPush(carRef)

	let data = {
		userUid: store.state.user.uid,
		Model: carModelSelected.value,
		Mark: carMark.value,
		Number: carNumber.value,
		Region: carRegion.value,
		photos: [resPhoto.metadata.fullPath]
	};


  try {
		// let resData = await set(fireDbRef(database, carUrl), data);
		let resData = await set(randomCarRef, data);
		console.log(resData);
  }
  catch (error) {
    console.error("fail set", error);
  }
	emit('close-popup')
}


let modelMarks = ref([]);
function setModelMarks(modelId) {
  let currentMark = allCarModels.find(model => modelId === model.id);
  if (currentMark) {
    modelMarks.value = currentMark.models;
  }
}
</script>