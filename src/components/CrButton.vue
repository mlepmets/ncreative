<template>
  <div :class="type" :style="{ width: btnWidth + 'px' }">{{ label }}</div>
</template>

<script>
export default {
  name: 'CrButton',
  props: {
    type: {
      type: String,
      validator: value => {
        return ['primary', 'inactive', 'cancel'].indexOf(value) !== -1;
      },
      default: 'primary'
    },
    btnWidth: {
      type: String,
      default: '104'
    },
    label: {
      type: String,
      required: true
    }
  }
};
</script>

<style scoped lang="sass">
div
  // width: 104px
  height: 32px
  border-radius: 3px
  cursor: default
  display: flex
  justify-content: center
  align-items: center
  font-size: 14px
.primary
  background-color: #3388ff
  color: #CED4DD
.inactive
  background-color: #9eaab9
  color: #E5E5E5
.cancel
  background-color: none
  color: #fcaf19
</style>
