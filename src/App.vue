<template>
  <div>
    <div class="flexrow">
      <h1 class="pagetitle">My Creatives</h1>
      <CrButton type="primary" label="Add" @click.native="openNewCreativeForm"/>
    </div>
    <hr>
    <div class="filterContainer">
      <CrToggler
        labelOne="Name A-Z"
        labelTwo="Name Z-A"
        @toggle-change="sortingOrder = $event"
        v-model="sortingOrder"
      />
    </div>
    <hr>
    <div v-if="!creativesFormVisible">
      <p v-if="creatives.length === 0">No creatives found</p>
      <div v-else class="creativeslist">
        <div v-for="creative in creatives" :key="creative.name" class="creative">
          <p class="name">{{ creative.name }}:&nbsp;</p>
          <p class="typesize">
            {{ creative.device }} - {{ creative.width }} x
            {{ creative.height }}
          </p>
          <p class="edit" @click="openEditCreativeForm(creative)">edit</p>
          <p class="duplicate" @click="duplicateCreative(creative.name)">duplicate</p>
          <p class="delete" @click="deleteCreative(creative.name)">delete</p>
        </div>
      </div>
    </div>
    <CrForm
      v-if="creativesFormVisible"
      @cancel="cancelForm"
      @new-creative="addCreative"
      @update-creative="updateEditedCreative"
      :name="editContent.name"
      :device="editContent.device"
      :width="editContent.width"
      :height="editContent.height"
      :formAction="formAction"
    />
  </div>
</template>

<script>
import CrButton from './components/CrButton.vue';
import CrForm from './components/CrForm.vue';
import CrToggler from './components/CrToggler.vue';

export default {
  name: 'app',
  components: {
    CrButton,
    CrForm,
    CrToggler
  },
  data() {
    return {
      creatives: [],
      editContent: {
        name: '',
        device: 'Mobile',
        width: null,
        height: null
      },
      formAction: 'Create',
      creativesFormVisible: false,
      sortingOrder: 'Name A-Z'
    };
  },
  methods: {
    // changes this.creativesFormVisible which makes CrForm become visible and hide the creatives list
    toggleCreativesForm() {
      if (this.creativesFormVisible) {
        this.creativesFormVisible = false;
      } else {
        this.creativesFormVisible = true;
      }
    },

    // this function is run when you click add at the top
    openNewCreativeForm() {
      if (!this.creativesFormVisible) {
        this.formAction = 'Create';
        this.toggleCreativesForm();
      }
    },
    // pushes new object into this.creatives array (after it's been created using the form)
    addCreative(obj) {
      // push to array
      this.creatives.push(obj);

      // apply sorting
      this.sortArray(this.sortingOrder);

      // toggle CrForm visibility
      this.toggleCreativesForm();
    },

    // helper method to get array position of an object
    getObjPositionInArray(obj, name) {
      const arrayPosition = obj
        .map(e => {
          return e.name;
        })
        .indexOf(name);
      return arrayPosition;
    },

    // when you click edit, this function is run
    openEditCreativeForm(obj) {
      //this.editContent will contain the unedited object
      //this.editContent is v-binded to CrForm
      this.editContent = Object.assign({}, obj);

      // change form action mode. changes title, button text and event emitted
      this.formAction = 'Save';

      // toggle form visilibity
      this.toggleCreativesForm();
    },

    // update creative after editing
    updateEditedCreative(obj) {
      // get array position using this.editedcontent (which is the unedited object)
      const pos = this.getObjPositionInArray(
        this.creatives,
        this.editContent.name
      );

      // change object in this.creatives
      this.creatives[pos]['name'] = obj.name;
      this.creatives[pos]['device'] = obj.device;
      this.creatives[pos]['width'] = obj.width;
      this.creatives[pos]['height'] = obj.height;

      // apply sorting
      this.sortArray(this.sortingOrder);

      this.clearForm();
      // toggle CrForm visibility
      this.toggleCreativesForm();
    },

    clearForm() {
      this.editContent = {
        name: '',
        device: '',
        width: null,
        height: null
      };
    },
    // this is run when you hit cancel on the form
    cancelForm() {
      // toggle form
      this.toggleCreativesForm();

      // clear editContent
      this.clearForm();
    },

    // this run when you hit delete
    deleteCreative(name) {
      // it filters out the object to delete it
      this.creatives = this.creatives.filter(creative => {
        return creative.name !== name;
      });
    },

    // duplication function
    duplicateCreative(name) {
      // find array position of object
      const pos = this.getObjPositionInArray(this.creatives, name);
      // copy object
      const duplicateCreative = Object.assign({}, this.creatives[pos]);

      // change new object's name
      duplicateCreative.name += ' Copy';

      // check if copy already exists and change name again if needed
      this.creatives.filter(element => {
        if (element.name === duplicateCreative.name) {
          duplicateCreative.name += ' Copy';
        }
      });

      // push to array
      this.creatives.push(duplicateCreative);
    },

    // sorting function
    sortArray(direction) {
      this.creatives.sort(function(a, b) {
        let nameA = a.name.toUpperCase();
        let nameB = b.name.toUpperCase();
        if (direction === 'Name Z-A') {
          let placeholder = nameA;
          nameA = nameB;
          nameB = placeholder;
        }
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }
        return 0;
      });
    }
  },
  watch: {
    sortingOrder: {
      handler: function() {
        this.sortArray(this.sortingOrder);
      }
    }
  }
};
</script>

<style lang="sass">
@import url('https://fonts.googleapis.com/css?family=Roboto')
$crYellow: #fcaf19
$crDarkBlue: #1f2734
$crTextColor: #CED4DD
$crInputField: #3E4A5E
$crPrimary: #3388ff
$crInactive: #9eaab9
$crCancel: $crDarkBlue
$crBorder: #54637C

.flexrow
  display: flex
  flex-direction: row
  align-items: center
body
  margin: 0
  padding: 52px 40px 52px 40px
  background-color: $crDarkBlue
  font-family: 'Roboto'
  color: $crTextColor

.pagetitle
  font-size: 18px
  font-weight: normal
  margin: 0 17px 0 0
  padding: 0
  color: $crYellow
hr
  border: none
  // margin: 20px 0 27px 0
  margin: 24px 0 0 0
  height: 1px
  background-color: $crBorder
.creative p
  display: inline-block
  margin: 24px 0 0 0
p.edit
  margin-left: 16px
p.typesize
  color: $crTextColor
p.duplicate, p.delete
  margin-left: 8px
p.edit, p.duplicate, p.delete
  cursor: pointer
  color: $crPrimary
p.name
  color: $crYellow
.filterContainer
  display: flex
  margin-top: 24px
  
</style>
