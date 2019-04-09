<template>
  <div :value="activeValue">
    <CrButton :type="leftButton" :label="labelOne" @click.native="toggle"/>
    <CrButton :type="rightButton" :label="labelTwo" class="rightbutton" @click.native="toggle"/>
  </div>
</template>

<script>
import CrButton from './CrButton.vue';
export default {
  name: 'CrToggler',
  components: {
    CrButton
  },
  props: {
    labelOne: {
      type: String,
      required: true
    },
    labelTwo: {
      type: String,
      required: true
    },
    value: {
      type: String
    }
  },
  data() {
    return {
      leftButton: 'primary',
      rightButton: 'inactive',
      activeValue: this.value
      // activeSetting: this.labelOne,
      // inactiveSetting: this.labelTwo
    };
  },
  methods: {
    toggle(event) {
      if (
        !event.target.classList.contains('primary') &&
        event.target.classList.contains('inactive')
      ) {
        [this.leftButton, this.rightButton] = [
          this.rightButton,
          this.leftButton
        ];
        if (this.leftButton === 'primary') {
          this.activeValue = this.labelOne;
        } else if (this.rightButton === 'primary') {
          this.activeValue = this.labelTwo;
        }
        this.$emit('toggle-change', this.activeValue);
        // [this.activeSetting, this.inactiveSetting] = [
        //   this.inactiveSetting,
        //   this.activeSetting
        // ];
        // this.$emit("toggle-change", this.activeSetting);
      }
    }
  },
  mounted: function() {
    // this.$emit("toggle-change", this.activeSetting);
    if (this.value === this.labelOne) {
      this.leftButton = 'primary';
      this.rightButton = 'inactive';
    } else if (this.value === this.labelTwo) {
      this.leftButton = 'inactive';
      this.rightButton = 'primary';
    }
  }
};
</script>

<style scoped lang="sass">
div
  display: flex
  flex-direction: row
.rightbutton
  margin-left: 16px
</style>
