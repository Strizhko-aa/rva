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
          eager
          @update:modelValue="setModelMarks"
        ></v-autocomplete>

        <v-autocomplete
          v-model="carModelSelected"
          :items="modelMarks"
          item-title="name"
          return-object
        >
          <template v-slot:item="{ props, item }">
            <!-- {{ item }}
            
            {{ props }} -->
            <!-- :prepend-avatar="item?.raw?.avatar" -->
            <v-list-item
              v-bind="props"
              :title="item?.title"
              :subtitle="item.value['year-from'] + ' - ' + item.value['year-to']"
            ></v-list-item>
          </template>
        </v-autocomplete>
      </v-form>
    </v-card-text>
    <v-card-actions>
      <v-btn color="promary">Добавить авто</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { ref, onMounted } from 'vue'
import { getDatabase, set } from "firebase/database";

export default {
  name: 'create-car',
  setup () {
    let carNumber = ref('')
    let carMark = ref('')
    let carRegion = ref('')
    let carModelSelected = ref('')
    const database = getDatabase();
    let carRef = ref(database, 'cars')
    let carModels=[
    {
        "name": "AC",
        "id": "AC",
        "country": "Великобритания"
    },
    {
        "name": "Acura",
        "id": "ACURA",
        "country": "Япония"
    },
    {
        "name": "Adler",
        "id": "ADLER",
        "country": "Германия"
    },
    {
        "name": "GAC Aion",
        "id": "AION",
        "country": "Китай"
    },
    {
        "name": "Aito",
        "id": "AITO",
        "country": "Китай"
    },
    {
        "name": "Alfa Romeo",
        "id": "ALFA_ROMEO",
        "country": "Италия"
    },
    {
        "name": "Alpina",
        "id": "ALPINA",
        "country": "Германия"
    },
    {
        "name": "Alpine",
        "id": "ALPINE",
        "country": "Франция"
    },
    {
        "name": "AMC",
        "id": "AMC",
        "country": "Северная Америка"
    },
    {
        "name": "AM General",
        "id": "AM_GENERAL",
        "country": "США"
    },
    {
        "name": "Apal",
        "id": "APAL",
        "country": "Россия"
    },
    {
        "name": "Arcfox",
        "id": "ARCFOX",
        "country": "Китай"
    },
    {
        "name": "Ariel",
        "id": "ARIEL",
        "country": "Великобритания"
    },
    {
        "name": "Aro",
        "id": "ARO",
        "country": "Румыния"
    },
    {
        "name": "Asia",
        "id": "ASIA",
        "country": "Южная Корея"
    },
    {
        "name": "Aston Martin",
        "id": "ASTON_MARTIN",
        "country": "Великобритания"
    },
    {
        "name": "Auburn",
        "id": "AUBURN",
        "country": "США"
    },
    {
        "name": "Audi",
        "id": "AUDI",
        "country": "Германия"
    },
    {
        "name": "Aurus",
        "id": "AURUS",
        "country": "Россия"
    },
    {
        "name": "Austin",
        "id": "AUSTIN",
        "country": "Великобритания"
    },
    {
        "name": "Austin Healey",
        "id": "AUSTIN_HEALEY",
        "country": "Великобритания"
    },
    {
        "name": "Autobianchi",
        "id": "AUTOBIANCHI",
        "country": "Италия"
    },
    {
        "name": "Auto Union",
        "id": "AUTO_UNION",
        "country": "Германия"
    },
    {
        "name": "Автокам",
        "id": "AVTOKAM",
        "country": "Россия"
    },
    {
        "name": "BAIC",
        "id": "BAIC",
        "country": "Китай"
    },
    {
        "name": "Bajaj",
        "id": "BAJAJ",
        "country": "Индия"
    },
    {
        "name": "Baltijas Dzips",
        "id": "BALTIJAS_DZIPS",
        "country": "Латвия"
    },
    {
        "name": "Baojun",
        "id": "BAOJUN",
        "country": "Китай"
    },
    {
        "name": "Batmobile",
        "id": "BATMOBILE",
        "country": "США"
    },
    {
        "name": "Bentley",
        "id": "BENTLEY",
        "country": "Великобритания"
    },
    {
        "name": "Bertone",
        "id": "BERTONE",
        "country": "Италия"
    },
    {
        "name": "Bilenkin",
        "id": "BILENKIN",
        "country": "Россия"
    },
    {
        "name": "Bio auto",
        "id": "BIO_AUTO",
        "country": "Китай"
    },
    {
        "name": "Bitter",
        "id": "BITTER",
        "country": "Германия"
    },
    {
        "name": "Blaval",
        "id": "BLAVAL",
        "country": "Китай"
    },
    {
        "name": "BMW",
        "id": "BMW",
        "country": "Германия"
    },
    {
        "name": "Borgward",
        "id": "BORGWARD",
        "country": "Германия"
    },
    {
        "name": "Brabus",
        "id": "BRABUS",
        "country": "Германия"
    },
    {
        "name": "Brilliance",
        "id": "BRILLIANCE",
        "country": "Китай"
    },
    {
        "name": "Bristol",
        "id": "BRISTOL",
        "country": "Великобритания"
    },
    {
        "name": "Bufori",
        "id": "BUFORI",
        "country": "Малайзия"
    },
    {
        "name": "Bugatti",
        "id": "BUGATTI",
        "country": "Франция"
    },
    {
        "name": "Buick",
        "id": "BUICK",
        "country": "США"
    },
    {
        "name": "BYD",
        "id": "BYD",
        "country": "Китай"
    },
    {
        "name": "Byvin",
        "id": "BYVIN",
        "country": "Китай"
    },
    {
        "name": "Cadillac",
        "id": "CADILLAC",
        "country": "США"
    },
    {
        "name": "Callaway",
        "id": "CALLAWAY",
        "country": "США"
    },
    {
        "name": "Carbodies",
        "id": "CARBODIES",
        "country": "Великобритания"
    },
    {
        "name": "Caterham",
        "id": "CATERHAM",
        "country": "Великобритания"
    },
    {
        "name": "Chana",
        "id": "CHANA",
        "country": "Китай"
    },
    {
        "name": "Changan",
        "id": "CHANGAN",
        "country": "Китай"
    },
    {
        "name": "ChangFeng",
        "id": "CHANGFENG",
        "country": "Китай"
    },
    {
        "name": "Changhe",
        "id": "CHANGHE",
        "country": "Китай"
    },
    {
        "name": "Chery",
        "id": "CHERY",
        "country": "Китай"
    },
    {
        "name": "EXEED",
        "id": "CHERYEXEED",
        "country": "Китай"
    },
    {
        "name": "Chevrolet",
        "id": "CHEVROLET",
        "country": "США"
    },
    {
        "name": "Chrysler",
        "id": "CHRYSLER",
        "country": "США"
    },
    {
        "name": "Ciimo (DongFeng-Honda)",
        "id": "CIIMO",
        "country": "Китай"
    },
    {
        "name": "Citroen",
        "id": "CITROEN",
        "country": "Франция"
    },
    {
        "name": "Cizeta",
        "id": "CIZETA",
        "country": "Италия"
    },
    {
        "name": "Coggiola",
        "id": "COGGIOLA",
        "country": "Италия"
    },
    {
        "name": "Cord",
        "id": "CORD",
        "country": "США"
    },
    {
        "name": "Cupra",
        "id": "CUPRA",
        "country": "Испания"
    },
    {
        "name": "Dacia",
        "id": "DACIA",
        "country": "Румыния"
    },
    {
        "name": "Dadi",
        "id": "DADI",
        "country": "Китай"
    },
    {
        "name": "Daewoo",
        "id": "DAEWOO",
        "country": "Южная Корея"
    },
    {
        "name": "Daihatsu",
        "id": "DAIHATSU",
        "country": "Япония"
    },
    {
        "name": "Daimler",
        "id": "DAIMLER",
        "country": "Великобритания"
    },
    {
        "name": "Dallara",
        "id": "DALLARA",
        "country": "Италия"
    },
    {
        "name": "Datsun",
        "id": "DATSUN",
        "country": "Япония"
    },
    {
        "name": "Deco Rides",
        "id": "DECO_RIDES",
        "country": "США"
    },
    {
        "name": "Delage",
        "id": "DELAGE",
        "country": "Франция"
    },
    {
        "name": "DeLorean",
        "id": "DELOREAN",
        "country": "США"
    },
    {
        "name": "Denza",
        "id": "DENZA",
        "country": "Китай"
    },
    {
        "name": "Derways",
        "id": "DERWAYS",
        "country": "Россия"
    },
    {
        "name": "DeSoto",
        "id": "DESOTO",
        "country": "США"
    },
    {
        "name": "De Tomaso",
        "id": "DE_TOMASO",
        "country": "Италия"
    },
    {
        "name": "DKW",
        "id": "DKW",
        "country": "Германия"
    },
    {
        "name": "Dodge",
        "id": "DODGE",
        "country": "США"
    },
    {
        "name": "DongFeng",
        "id": "DONGFENG",
        "country": "Китай"
    },
    {
        "name": "Doninvest",
        "id": "DONINVEST",
        "country": "Россия"
    },
    {
        "name": "Donkervoort",
        "id": "DONKERVOORT",
        "country": "Нидерланды"
    },
    {
        "name": "DS",
        "id": "DS",
        "country": "Франция"
    },
    {
        "name": "DW Hower",
        "id": "DW_HOWER",
        "country": "Россия"
    },
    {
        "name": "Eagle",
        "id": "EAGLE",
        "country": "США"
    },
    {
        "name": "Eagle Cars",
        "id": "EAGLE_CARS",
        "country": "Великобритания"
    },
    {
        "name": "Everus",
        "id": "EVERUS",
        "country": "Китай"
    },
    {
        "name": "Evolute",
        "id": "EVOLUTE",
        "country": "Россия"
    },
    {
        "name": "Excalibur",
        "id": "EXCALIBUR",
        "country": "США"
    },
    {
        "name": "E-Car",
        "id": "E_CAR",
        "country": "Китай"
    },
    {
        "name": "Ё-мобиль",
        "id": "E_MOBIL",
        "country": "Россия"
    },
    {
        "name": "Facel Vega",
        "id": "FACEL_VEGA",
        "country": "Франция"
    },
    {
        "name": "FAW",
        "id": "FAW",
        "country": "Китай"
    },
    {
        "name": "Ferrari",
        "id": "FERRARI",
        "country": "Италия"
    },
    {
        "name": "Fiat",
        "id": "FIAT",
        "country": "Италия"
    },
    {
        "name": "Fisker",
        "id": "FISKER",
        "country": "США"
    },
    {
        "name": "Flanker",
        "id": "FLANKER",
        "country": "Россия"
    },
    {
        "name": "Ford",
        "id": "FORD",
        "country": "США"
    },
    {
        "name": "Foton",
        "id": "FOTON",
        "country": "Китай"
    },
    {
        "name": "FSO",
        "id": "FSO",
        "country": "Польша"
    },
    {
        "name": "Fuqi",
        "id": "FUQI",
        "country": "Китай"
    },
    {
        "name": "GAC",
        "id": "GAC",
        "country": "Китай"
    },
    {
        "name": "ГАЗ",
        "id": "GAZ",
        "country": "Россия"
    },
    {
        "name": "Geely",
        "id": "GEELY",
        "country": "Китай"
    },
    {
        "name": "Genesis",
        "id": "GENESIS",
        "country": "Южная Корея"
    },
    {
        "name": "Geo",
        "id": "GEO",
        "country": "США"
    },
    {
        "name": "GMC",
        "id": "GMC",
        "country": "США"
    },
    {
        "name": "Goggomobil",
        "id": "GOGGOMOBIL",
        "country": "Германия"
    },
    {
        "name": "Gonow",
        "id": "GONOW",
        "country": "Китай"
    },
    {
        "name": "Gordon",
        "id": "GORDON",
        "country": "Чехия"
    },
    {
        "name": "GP",
        "id": "GP",
        "country": "Великобритания"
    },
    {
        "name": "Great Wall",
        "id": "GREAT_WALL",
        "country": "Китай"
    },
    {
        "name": "Hafei",
        "id": "HAFEI",
        "country": "Китай"
    },
    {
        "name": "Haima",
        "id": "HAIMA",
        "country": "Китай"
    },
    {
        "name": "Hanomag",
        "id": "HANOMAG",
        "country": "Германия"
    },
    {
        "name": "Haval",
        "id": "HAVAL",
        "country": "Китай"
    },
    {
        "name": "Hawtai",
        "id": "HAWTAI",
        "country": "Китай"
    },
    {
        "name": "Heinkel",
        "id": "HEINKEL",
        "country": "Германия"
    },
    {
        "name": "Hennessey",
        "id": "HENNESSEY",
        "country": "США"
    },
    {
        "name": "Hindustan",
        "id": "HINDUSTAN",
        "country": "Индия"
    },
    {
        "name": "HiPhi",
        "id": "HIPHI",
        "country": "Китай"
    },
    {
        "name": "Hispano-Suiza",
        "id": "HISPANO_SUIZA",
        "country": "Испания"
    },
    {
        "name": "Holden",
        "id": "HOLDEN",
        "country": "Австралия"
    },
    {
        "name": "Honda",
        "id": "HONDA",
        "country": "Япония"
    },
    {
        "name": "Hongqi",
        "id": "HONGQI",
        "country": "Китай"
    },
    {
        "name": "Horch",
        "id": "HORCH",
        "country": "Германия"
    },
    {
        "name": "Hozon",
        "id": "HOZON",
        "country": "Китай"
    },
    {
        "name": "HSV",
        "id": "HSV",
        "country": "Австралия"
    },
    {
        "name": "HuangHai",
        "id": "HUANGHAI",
        "country": "Китай"
    },
    {
        "name": "Hudson",
        "id": "HUDSON",
        "country": "США"
    },
    {
        "name": "Hummer",
        "id": "HUMMER",
        "country": "США"
    },
    {
        "name": "Hyundai",
        "id": "HYUNDAI",
        "country": "Южная Корея"
    },
    {
        "name": "ИЖ",
        "id": "IG",
        "country": "Россия"
    },
    {
        "name": "Infiniti",
        "id": "INFINITI",
        "country": "Япония"
    },
    {
        "name": "Innocenti",
        "id": "INNOCENTI",
        "country": "Италия"
    },
    {
        "name": "International",
        "id": "INTERNATIONAL",
        "country": "США"
    },
    {
        "name": "Invicta",
        "id": "INVICTA",
        "country": "Великобритания"
    },
    {
        "name": "Iran Khodro",
        "id": "IRAN_KHODRO",
        "country": "Иран"
    },
    {
        "name": "Isdera",
        "id": "ISDERA",
        "country": "Германия"
    },
    {
        "name": "Isuzu",
        "id": "ISUZU",
        "country": "Япония"
    },
    {
        "name": "IVECO",
        "id": "IVECO",
        "country": "Италия"
    },
    {
        "name": "JAC",
        "id": "JAC",
        "country": "Китай"
    },
    {
        "name": "Jaguar",
        "id": "JAGUAR",
        "country": "Великобритания"
    },
    {
        "name": "Jeep",
        "id": "JEEP",
        "country": "США"
    },
    {
        "name": "Jensen",
        "id": "JENSEN",
        "country": "Великобритания"
    },
    {
        "name": "Jetour",
        "id": "JETOUR",
        "country": "Китай"
    },
    {
        "name": "Jinbei",
        "id": "JINBEI",
        "country": "Китай"
    },
    {
        "name": "JMC",
        "id": "JMC",
        "country": "Китай"
    },
    {
        "name": "Kaiyi",
        "id": "KAIYI",
        "country": "Китай"
    },
    {
        "name": "Канонир",
        "id": "KANONIR",
        "country": "Россия"
    },
    {
        "name": "Kia",
        "id": "KIA",
        "country": "Южная Корея"
    },
    {
        "name": "Koenigsegg",
        "id": "KOENIGSEGG",
        "country": "Швеция"
    },
    {
        "name": "Комбат",
        "id": "KOMBAT",
        "country": "Россия"
    },
    {
        "name": "KTM AG",
        "id": "KTM",
        "country": "Австрия"
    },
    {
        "name": "Lamborghini",
        "id": "LAMBORGHINI",
        "country": "Италия"
    },
    {
        "name": "Lancia",
        "id": "LANCIA",
        "country": "Италия"
    },
    {
        "name": "Landwind",
        "id": "LANDWIND",
        "country": "Китай"
    },
    {
        "name": "Land Rover",
        "id": "LAND_ROVER",
        "country": "Великобритания"
    },
    {
        "name": "Leapmotor",
        "id": "LEAPMOTOR",
        "country": "Китай"
    },
    {
        "name": "Lexus",
        "id": "LEXUS",
        "country": "Япония"
    },
    {
        "name": "Liebao Motor",
        "id": "LIEBAO",
        "country": "Китай"
    },
    {
        "name": "Lifan",
        "id": "LIFAN",
        "country": "Китай"
    },
    {
        "name": "Ligier",
        "id": "LIGIER",
        "country": "Франция"
    },
    {
        "name": "Lincoln",
        "id": "LINCOLN",
        "country": "США"
    },
    {
        "name": "LiXiang",
        "id": "LIXIANG",
        "country": "Китай"
    },
    {
        "name": "Logem",
        "id": "LOGEM",
        "country": "Китай"
    },
    {
        "name": "Lotus",
        "id": "LOTUS",
        "country": "Великобритания"
    },
    {
        "name": "LTI",
        "id": "LTI",
        "country": "Великобритания"
    },
    {
        "name": "ЛуАЗ",
        "id": "LUAZ",
        "country": "Украина"
    },
    {
        "name": "Lucid",
        "id": "LUCID",
        "country": "США"
    },
    {
        "name": "Luxgen",
        "id": "LUXGEN",
        "country": "Тайвань"
    },
    {
        "name": "Mahindra",
        "id": "MAHINDRA",
        "country": "Индия"
    },
    {
        "name": "Marcos",
        "id": "MARCOS",
        "country": "Великобритания"
    },
    {
        "name": "Marlin",
        "id": "MARLIN",
        "country": "Великобритания"
    },
    {
        "name": "Marussia",
        "id": "MARUSSIA",
        "country": "Россия"
    },
    {
        "name": "Maruti",
        "id": "MARUTI",
        "country": "Индия"
    },
    {
        "name": "Maserati",
        "id": "MASERATI",
        "country": "Италия"
    },
    {
        "name": "Matra",
        "id": "MATRA",
        "country": "Франция"
    },
    {
        "name": "Maybach",
        "id": "MAYBACH",
        "country": "Германия"
    },
    {
        "name": "Mazda",
        "id": "MAZDA",
        "country": "Япония"
    },
    {
        "name": "McLaren",
        "id": "MCLAREN",
        "country": "Великобритания"
    },
    {
        "name": "Mega",
        "id": "MEGA",
        "country": "Франция"
    },
    {
        "name": "Mercedes-Benz",
        "id": "MERCEDES",
        "country": "Германия"
    },
    {
        "name": "Mercury",
        "id": "MERCURY",
        "country": "США"
    },
    {
        "name": "Messerschmitt",
        "id": "MESSERSCHMITT",
        "country": "Германия"
    },
    {
        "name": "Metrocab",
        "id": "METROCAB",
        "country": "Великобритания"
    },
    {
        "name": "MG",
        "id": "MG",
        "country": "Великобритания"
    },
    {
        "name": "Microcar",
        "id": "MICROCAR",
        "country": "Франция"
    },
    {
        "name": "Minelli",
        "id": "MINELLI",
        "country": "Швейцария"
    },
    {
        "name": "MINI",
        "id": "MINI",
        "country": "Великобритания"
    },
    {
        "name": "Mitsubishi",
        "id": "MITSUBISHI",
        "country": "Япония"
    },
    {
        "name": "Mitsuoka",
        "id": "MITSUOKA",
        "country": "Япония"
    },
    {
        "name": "Mobilize",
        "id": "MOBILIZE",
        "country": "Франция"
    },
    {
        "name": "Morgan",
        "id": "MORGAN",
        "country": "Великобритания"
    },
    {
        "name": "Morris",
        "id": "MORRIS",
        "country": "Великобритания"
    },
    {
        "name": "Москвич",
        "id": "MOSCVICH",
        "country": "Россия"
    },
    {
        "name": "Nash",
        "id": "NASH",
        "country": "США"
    },
    {
        "name": "Nio",
        "id": "NIO",
        "country": "Китай"
    },
    {
        "name": "Nissan",
        "id": "NISSAN",
        "country": "Япония"
    },
    {
        "name": "Noble",
        "id": "NOBLE",
        "country": "Великобритания"
    },
    {
        "name": "Oldsmobile",
        "id": "OLDSMOBILE",
        "country": "США"
    },
    {
        "name": "OMODA",
        "id": "OMODA",
        "country": "Китай"
    },
    {
        "name": "Opel",
        "id": "OPEL",
        "country": "Германия"
    },
    {
        "name": "Osca",
        "id": "OSCA",
        "country": "Италия"
    },
    {
        "name": "Oshan",
        "id": "OSHAN",
        "country": "Китай"
    },
    {
        "name": "Packard",
        "id": "PACKARD",
        "country": "США"
    },
    {
        "name": "Pagani",
        "id": "PAGANI",
        "country": "Италия"
    },
    {
        "name": "Panoz",
        "id": "PANOZ",
        "country": "США"
    },
    {
        "name": "Perodua",
        "id": "PERODUA",
        "country": "Малайзия"
    },
    {
        "name": "Peugeot",
        "id": "PEUGEOT",
        "country": "Франция"
    },
    {
        "name": "PGO",
        "id": "PGO",
        "country": "Франция"
    },
    {
        "name": "Piaggio",
        "id": "PIAGGIO",
        "country": "Италия"
    },
    {
        "name": "Pierce-Arrow",
        "id": "PIERCE_ARROW",
        "country": "США"
    },
    {
        "name": "Plymouth",
        "id": "PLYMOUTH",
        "country": "США"
    },
    {
        "name": "Polestar",
        "id": "POLESTAR",
        "country": "Швеция"
    },
    {
        "name": "Pontiac",
        "id": "PONTIAC",
        "country": "США"
    },
    {
        "name": "Porsche",
        "id": "PORSCHE",
        "country": "Германия"
    },
    {
        "name": "Premier",
        "id": "PREMIER",
        "country": "Индия"
    },
    {
        "name": "Спортивные авто и Реплики",
        "id": "PROMO_AUTO",
        "country": "Россия"
    },
    {
        "name": "Proton",
        "id": "PROTON",
        "country": "Малайзия"
    },
    {
        "name": "PUCH",
        "id": "PUCH",
        "country": "Германия"
    },
    {
        "name": "Puma",
        "id": "PUMA",
        "country": "Бразилия"
    },
    {
        "name": "Qoros",
        "id": "QOROS",
        "country": "Китай"
    },
    {
        "name": "Qvale",
        "id": "QVALE",
        "country": "Италия"
    },
    {
        "name": "RAM",
        "id": "RAM",
        "country": "США"
    },
    {
        "name": "Ravon",
        "id": "RAVON",
        "country": "Узбекистан"
    },
    {
        "name": "Reliant",
        "id": "RELIANT",
        "country": "Великобритания"
    },
    {
        "name": "Renaissance",
        "id": "RENAISSANCE_CARS",
        "country": "США"
    },
    {
        "name": "Renault",
        "id": "RENAULT",
        "country": "Франция"
    },
    {
        "name": "Rezvani",
        "id": "REZVANI",
        "country": "США"
    },
    {
        "name": "Rimac",
        "id": "RIMAC",
        "country": "Хорватия"
    },
    {
        "name": "Rinspeed",
        "id": "RINSPEED",
        "country": "Швейцария"
    },
    {
        "name": "Rivian",
        "id": "RIVIAN",
        "country": "США"
    },
    {
        "name": "Roewe",
        "id": "ROEWE",
        "country": "Китай"
    },
    {
        "name": "Rolls-Royce",
        "id": "ROLLS_ROYCE",
        "country": "Великобритания"
    },
    {
        "name": "Ronart",
        "id": "RONART",
        "country": "Великобритания"
    },
    {
        "name": "Rover",
        "id": "ROVER",
        "country": "Великобритания"
    },
    {
        "name": "Saab",
        "id": "SAAB",
        "country": "Швеция"
    },
    {
        "name": "Saipa",
        "id": "SAIPA",
        "country": "Иран"
    },
    {
        "name": "Saleen",
        "id": "SALEEN",
        "country": "США"
    },
    {
        "name": "Renault Samsung",
        "id": "SAMSUNG",
        "country": "Южная Корея"
    },
    {
        "name": "Santana",
        "id": "SANTANA",
        "country": "Испания"
    },
    {
        "name": "Saturn",
        "id": "SATURN",
        "country": "США"
    },
    {
        "name": "Scion",
        "id": "SCION",
        "country": "США"
    },
    {
        "name": "Sears",
        "id": "SEARS",
        "country": "США"
    },
    {
        "name": "SEAT",
        "id": "SEAT",
        "country": "Испания"
    },
    {
        "name": "Shanghai Maple",
        "id": "SHANGHAI_MAPLE",
        "country": "Китай"
    },
    {
        "name": "ShuangHuan",
        "id": "SHUANGHUAN",
        "country": "Китай"
    },
    {
        "name": "Simca",
        "id": "SIMCA",
        "country": "Франция"
    },
    {
        "name": "Skoda",
        "id": "SKODA",
        "country": "Чехия"
    },
    {
        "name": "Skywell",
        "id": "SKYWELL",
        "country": "Китай"
    },
    {
        "name": "Smart",
        "id": "SMART",
        "country": "Германия"
    },
    {
        "name": "СМЗ",
        "id": "SMZ",
        "country": "Россия"
    },
    {
        "name": "Soueast",
        "id": "SOUEAST",
        "country": "Китай"
    },
    {
        "name": "Spectre",
        "id": "SPECTRE",
        "country": "Великобритания"
    },
    {
        "name": "Spyker",
        "id": "SPYKER",
        "country": "Дания"
    },
    {
        "name": "SsangYong",
        "id": "SSANG_YONG",
        "country": "Южная Корея"
    },
    {
        "name": "Steyr",
        "id": "STEYR",
        "country": "Австрия"
    },
    {
        "name": "Studebaker",
        "id": "STUDEBAKER",
        "country": "США"
    },
    {
        "name": "Subaru",
        "id": "SUBARU",
        "country": "Япония"
    },
    {
        "name": "Suzuki",
        "id": "SUZUKI",
        "country": "Япония"
    },
    {
        "name": "ТагАЗ",
        "id": "TAGAZ",
        "country": "Россия"
    },
    {
        "name": "Talbot",
        "id": "TALBOT",
        "country": "Великобритания"
    },
    {
        "name": "Tank",
        "id": "TANK",
        "country": "Китай"
    },
    {
        "name": "TATA",
        "id": "TATA",
        "country": "Индия"
    },
    {
        "name": "Tatra",
        "id": "TATRA",
        "country": "Чехия"
    },
    {
        "name": "Tazzari",
        "id": "TAZZARI",
        "country": "Италия"
    },
    {
        "name": "Tesla",
        "id": "TESLA",
        "country": "США"
    },
    {
        "name": "Think",
        "id": "THINK",
        "country": "Норвегия"
    },
    {
        "name": "Tianma",
        "id": "TIANMA",
        "country": "Китай"
    },
    {
        "name": "Tianye",
        "id": "TIANYE",
        "country": "Китай"
    },
    {
        "name": "Tofas",
        "id": "TOFAS",
        "country": "Турция"
    },
    {
        "name": "Toyota",
        "id": "TOYOTA",
        "country": "Япония"
    },
    {
        "name": "Trabant",
        "id": "TRABANT",
        "country": "Германия"
    },
    {
        "name": "Tramontana",
        "id": "TRAMONTANA",
        "country": "Испания"
    },
    {
        "name": "Triumph",
        "id": "TRIUMPH",
        "country": "Великобритания"
    },
    {
        "name": "Trumpchi",
        "id": "TRUMPCHI",
        "country": "Китай"
    },
    {
        "name": "TVR",
        "id": "TVR",
        "country": "Великобритания"
    },
    {
        "name": "УАЗ",
        "id": "UAZ",
        "country": "Россия"
    },
    {
        "name": "Ultima",
        "id": "ULTIMA",
        "country": "Великобритания"
    },
    {
        "name": "Vauxhall",
        "id": "VAUXHALL",
        "country": "Великобритания"
    },
    {
        "name": "LADA (ВАЗ)",
        "id": "VAZ",
        "country": "Россия"
    },
    {
        "name": "Vector",
        "id": "VECTOR",
        "country": "США"
    },
    {
        "name": "Venturi",
        "id": "VENTURI",
        "country": "Франция"
    },
    {
        "name": "Volkswagen",
        "id": "VOLKSWAGEN",
        "country": "Германия"
    },
    {
        "name": "Volvo",
        "id": "VOLVO",
        "country": "Швеция"
    },
    {
        "name": "Vortex",
        "id": "VORTEX",
        "country": "Россия"
    },
    {
        "name": "Voyah",
        "id": "VOYAH",
        "country": "Китай"
    },
    {
        "name": "VUHL",
        "id": "VUHL",
        "country": "Мексика"
    },
    {
        "name": "Wanderer",
        "id": "WANDERER",
        "country": "Германия"
    },
    {
        "name": "Wartburg",
        "id": "WARTBURG",
        "country": "Германия"
    },
    {
        "name": "Weltmeister",
        "id": "WELTMEISTER",
        "country": "Китай"
    },
    {
        "name": "Westfield",
        "id": "WESTFIELD",
        "country": "Великобритания"
    },
    {
        "name": "Wiesmann",
        "id": "WIESMANN",
        "country": "Германия"
    },
    {
        "name": "Willys",
        "id": "WILLIS",
        "country": "США"
    },
    {
        "name": "W Motors",
        "id": "W_MOTORS",
        "country": "Объединённые Арабские Эмираты"
    },
    {
        "name": "Xin Kai",
        "id": "XINKAI",
        "country": "Китай"
    },
    {
        "name": "Xpeng",
        "id": "XPENG",
        "country": "Китай"
    },
    {
        "name": "Yulon",
        "id": "YULON",
        "country": "Тайвань"
    },
    {
        "name": "Zastava",
        "id": "ZASTAVA",
        "country": "Сербия"
    },
    {
        "name": "ЗАЗ",
        "id": "ZAZ",
        "country": "Украина"
    },
    {
        "name": "Zeekr",
        "id": "ZEEKR",
        "country": "Китай"
    },
    {
        "name": "Zenos",
        "id": "ZENOS",
        "country": "Великобритания"
    },
    {
        "name": "Zenvo",
        "id": "ZENVO",
        "country": "Дания"
    },
    {
        "name": "Zibar",
        "id": "ZIBAR",
        "country": "Израиль"
    },
    {
        "name": "ЗИЛ",
        "id": "ZIL",
        "country": "Россия"
    },
    {
        "name": "ЗиС",
        "id": "ZIS",
        "country": "Россия"
    },
    {
        "name": "Zotye",
        "id": "ZOTYE",
        "country": "Китай"
    },
    {
        "name": "ZX",
        "id": "ZX",
        "country": "Китай"
    }
]

    // let carModels = ref([])
    // let allCarModels = require('@/carModels.json')
    onMounted(() => {
      // let lightVersion = allCarModels.map(model => {
      //   return {
      //     name: model.name,
      //     id: model.id,
      //     country: model.country
      //   }
      // })
      // carModels.value = lightVersion
      // console.log('carModels', carModels.value)
    })

    function createCar () {
      set(carRef, {
        Model: carModelSelected.value,
        Mark: carMark.value,
        Number: carNumber.value,
        Region: carRegion.value
      })
    }

    let modelMarks = ref([])
    // modelId
    function setModelMarks () {
      // console.log('e', e)
      // let qq = allCarModels.find(model => modelId === model.id)
      // if (qq) {
      //   modelMarks.value = qq.models
      // }
    }

    return { createCar, setModelMarks, carNumber, carMark, carModels, modelMarks, carRegion, carModelSelected }
  }
}
</script>