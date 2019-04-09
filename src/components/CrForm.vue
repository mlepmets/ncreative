<template>
  <div class="modalform">
    <h1 class="formtitle" v-if="formAction === 'Create'">New Creative</h1>
    <h1 class="formtitle" v-if="formAction === 'Save'">Edit Creative</h1>
    <div class="controls">
      <div class="field">
        <label for>Creative Name:</label>
        <CrInput
          type="text"
          width="224"
          placeholder="Write name here"
          v-model="creativeName"
          @value-change="creativeName = $event"
        />
      </div>
      <div class="field">
        <label for>Device:</label>
        <CrToggler
          labelOne="Mobile"
          labelTwo="Desktop"
          @toggle-change="creativeDevice = $event"
          v-model="creativeDevice"
        />
      </div>
      <div class="field">
        <label for>Placement size:</label>
        <div class="controlsContainer">
          <CrInput
            type="number"
            placeholder="Width"
            @value-change="creativeWidth = $event"
            v-model="creativeWidth"
          />
          <CrInput
            type="number"
            placeholder="Height"
            style="margin-left: 16px"
            @value-change="creativeHeight = $event"
            v-model="creativeHeight"
          />
        </div>
      </div>
    </div>
    <hr>
    <div class="actionsContainer">
      <CrButton type="cancel" label="Cancel" @click.native="$emit('cancel')"/>
      <CrButton type="primary" :label="formAction" btnWidth="74" @click.native="submitCreative"/>
    </div>
  </div>
</template>

<script>
import CrButton from './CrButton.vue';
import CrToggler from './CrToggler.vue';
import CrInput from './CrInput.vue';

export default {
  name: 'CrForm',
  components: {
    CrButton,
    CrToggler,
    CrInput
  },
  data() {
    return {
      creativeName: this.name,
      creativeDevice: this.device,
      creativeWidth: this.width,
      creativeHeight: this.height
    };
  },
  props: {
    name: {
      type: String,
      default: undefined
    },
    device: {
      type: String,
      validator: value => {
        return ['Mobile', 'Desktop'].indexOf(value) !== -1;
      },
      default: undefined
    },
    width: {
      type: Number,
      default: undefined
    },
    height: {
      type: Number,
      default: undefined
    },
    formAction: {
      type: String,
      default: 'Create',
      validator: value => {
        return ['Create', 'Save'].indexOf(value) !== -1;
      }
    }
  },
  methods: {
    submitCreative() {
      if (
        this.creativeName.length > 0 &&
        this.creativeWidth > 0 &&
        this.creativeHeight > 0
      ) {
        const newCreativeObject = {
          name: this.creativeName,
          device: this.creativeDevice,
          width: Number(this.creativeWidth),
          height: Number(this.creativeHeight)
        };
        if (this.formAction === 'Create') {
          this.$emit('new-creative', newCreativeObject);
        } else if (this.formAction === 'Save') {
          this.$emit('update-creative', newCreativeObject);
        }
      }
    }
  }
};
</script>

<style scoped lang="sass">
$crYellow: #fcaf19
$crDarkBlue: #1f2734
$crTextColor: #CED4DD
$crInputField: #3E4A5E
$crPrimary: #3388ff
$crInactive: #9eaab9
$crCancel: $crDarkBlue
$crBorder: #54637C
$crPlaceholder: #9EAAB9
.modalform
  width: 512px
  height: 366px
  border: 1px solid $crBorder
  border-radius: 3px
  cursor: default
  margin-top: 24px
  padding: 32px
  box-sizing: border-box
  
.formtitle
  font-size: 18px
  font-weight: normal
  margin: 0
  color: $crYellow
  text-align: center
.controls
  margin: 32px 40px 0 40px
.field
  display: flex
  justify-content: space-between
  align-items: center
  margin-top: 24px
.controlsContainer
  width: 224px
  display: flex
  justify-content: flex-end
.actionsContainer
  display: flex
  justify-content: flex-end
  margin: 24px 40px 0 40px
</style>
