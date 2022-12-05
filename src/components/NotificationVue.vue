<template>
  <div class="notification" :class="showClass">
    <div class="close" @click="close">+</div>
    <h1>{{ title }}</h1>
    <p>
      <slot></slot>
    </p>
  </div>
</template>

<script>
  export default {
    props: {
      title: String,
      show: Boolean
    },
    computed: {
      showClass () {
        return this.show ? 'show' : 'hide'
      }
    },
    methods: {
      close () {
        this.$emit('update:show')
      }
    }
  }

</script>

<style>
.notification {
  position: absolute;
  top: 10px;
  right: 10px;
  border-radius: 10px;
  background-color: rgb(153, 35, 168);
  color: rgb(175, 175, 175);
  transition: all 0.2s;
  padding: 11px;
}
.notification h1 {
  font-size: 18px;
}
.notification p {
  font-size: 16px;
}
.show {
  display: block;
  opacity: 1;
}
.hide {
  display: none;
  opacity: 0;
}
.close {
  transform: rotate(45deg);
  position: absolute;
  top: 3px;
  right: 10px;
  color: white;
  cursor: pointer;
  font-size: 25px;
}
</style>