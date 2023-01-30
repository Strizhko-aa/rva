<template>
  <div class="number">
    <div class="number__left">
      Р<input type="number" class="number__number" :value="props.displayNumber || number" :readonly="readonly" @input="setNumber" placeholder="999">ВА
    </div>
    <div class="number__right" v-if="!props.onlyNumber">
      <div class="number__region">
        <input type="number" :value="props.displayRegion || region" :readonly="readonly" @input="setRegion" placeholder="136">
      </div>
      <div class="number__flag">
        <img :src="require('../../assets/Flag_of_Russia.png')" alt=""> RUS
      </div>
    </div>
  </div>
</template>

<script setup>
  import { ref, defineEmits, defineProps, computed } from 'vue'
  let number = ref('')
  let region = ref('')
  const emit = defineEmits(['input-number', 'input-region'])
  const props = defineProps({
    displayNumber: {
      type: String
    },
    displayRegion: String,
    onlyNumber: {
      type: Boolean,
      default: false
    }
  })

  let readonly = computed(() => {
    return props.displayNumber || props.displayRegion
  })

  function clearValue (val) {
    let parced = parseInt(val)
    let finalValue = ''
    if (isNaN(parced)) {
      return finalValue
    }
    if (parced > 999) {
      finalValue = 999
    } else {
      finalValue = parced
    }
    return finalValue
  }

  function setNumber (e) {
    let val = e.target.value
    number.value = clearValue(val)
    emit('input-number', number.value)
  }

  function setRegion (e) {
    let val = e.target.value
    region.value = clearValue(val)
    emit('input-region', region.value)
  }
</script>

<style lang="scss">
.number {
  background-color: rgb(223, 223, 223);
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid black;
  width: 300px;

  &__left {
    width: 200px;
    flex: none;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 40px;

    input {
      outline: none;
      // width: 120px;
      text-align: center;
      width: 100px;
      flex: none;
    }
  }

  &__right {
    display: flex;
    align-items: center;
    justify-content: start;
    flex-direction: column;
    border-left: 2px solid black;
    width: 100px;
    flex: none;
    height: 100%;
  }

  &__region {
    height: 20px;
    input {
      outline: none;
      text-align: center;
      width: 100px;
      font-size: 14px;
    }
  }
  &__flag {
    display: flex;
    align-items: center;
    justify-content: center;
    // width: 100px;
    height: 20px;
    margin-top: 5px;
    img {
      height: 13px;
      margin-right: 10px;
      margin-bottom: 4px;
    }
  }
}
</style>
