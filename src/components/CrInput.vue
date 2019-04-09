<template>
  <input
    :type="type"
    :style="{ width: width + 'px' }"
    :placeholder="placeholder"
    @input="$emit('value-change', $event.target.value)"
  >
</template>

<script>
export default {
  name: 'CrInput',
  props: {
    type: {
      type: String,
      validator: value => {
        return ['text', 'number'].indexOf(value) !== -1;
      },
      required: true
    },
    width: {
      type: String,
      default: '104'
    },
    placeholder: {
      type: String,
      required: true
    }
  }
};
</script>

<style scoped lang="sass">
input
  display: block
  box-sizing: border-box
  height: 32px
  border-radius: 3px
  padding: 8px
  border: 0
  background-color: #3E4A5E
  color: #CED4DD
  opacity: 0.5
input:focus
  opacity: 1
input::-webkit-input-placeholder
  color: #9EAAB9;

input:-moz-placeholder 
  color: #9EAAB9;
</style>
