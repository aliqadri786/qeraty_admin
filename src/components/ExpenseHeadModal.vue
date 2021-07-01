<template>
  <div>
    <b-modal
      size="md"
      id="ExpenseHeadModal"
      ref="modal"
      title="Expense Head Detail"
      @hidden="resetModal()"
      hide-footer
      no-close-on-backdrop
    >
      <b-form @submit.stop.prevent="onSubmit">
        <div class="row">
          <!-- Name-->
          <div class="col-sm-12">
            <b-form-group id="name-Group" label="Name*" label-for="name">
              <b-form-input
                id="name"
                name="name"
                autofocus
                v-model="expenseHeadData.name"
                v-validate="{ required: true }"
                :state="validateState('name')"
                aria-describedby="name-live-feedback"
                placeholder="Name"
              ></b-form-input>

              <b-form-invalid-feedback id="name-live-feedback">Name is required.</b-form-invalid-feedback>
            </b-form-group>
          </div>

          <div class="col-sm-12">
            <b-form-group label="Status">
              <b-form-radio-group
                v-model="expenseHeadData.is_active"
                :options="options"
                name="radio-inline"
              ></b-form-radio-group>
            </b-form-group>
          </div>
        </div>
        <div class="text-right border-top pt-3">
          <b-button class="btn btn-danger bleft" @click="$bvModal.hide('ExpenseHeadModal')">Cancel</b-button>
          <b-button class="btn btn-info bleft" type="submit" :disabled="veeErrors.any() || saving">
            <span v-if="saving">
              <b-spinner small type="grow"></b-spinner>Saving...
            </span>
            <span v-else>Save</span>
          </b-button>
        </div>
      </b-form>
    </b-modal>
  </div>
</template>

<script>
export default {
  name: "ExpenseHeadModal",
  //props:['distributor'],
  props: {
    expenseHead: {
      type: Object,
      default: function() {
        return {};
      }
    },
    isEdit: {
      type: Boolean
    }
  },

  watch: {
    expenseHead: function(newVal) {
      this.expenseHeadData = { ...newVal };
    }
  },
  mounted() {
    // this.$store.dispatch('getAllcitys')
    // .then(data=>{
    //   this.cityOptions = data
    // })
  },
  data() {
    return {
      saving: false,
      options: [{ text: "Active", value: 1 }, { text: "Inactive", value: 0 }],
      expenseHeadData: {
        is_active: 1
      }
    };
  },
  methods: {
    resetModal() {
      this.expenseHeadData = {
        is_active: 1
      };
      // this.isEdit = false;
      this.$emit("close");
    },

    validateState(ref) {
      if (
        this.veeFields[ref] &&
        (this.veeFields[ref].dirty || this.veeFields[ref].validated)
      ) {
        return !this.veeErrors.has(ref);
      }
      return null;
    },

    onSubmit() {
      this.$validator.validateAll().then(result => {
        if (!result) {
          return;
        }
        let data = this.expenseHeadData;
        this.saving = true;
        if (this.isEdit) {
          this.$store
            .dispatch("updateExpenseHeadData", { value: data })
            .then(
              setTimeout(() => {
                this.$emit("saved");
                this.saving = false;
                this.$success("Expense Head Updated Successfully");
                this.$nextTick(() => {
                  this.$refs.modal.hide();
                });
              }, 1000)
            )
            .catch(error => {
              alert(error);
            });
        } else {
          this.$store
            .dispatch("addNewExpenseHead", this.expenseHeadData)
            .then(
              this.$success("Expense Head Added Successfully"),
              (this.saving = false),
              this.$nextTick(() => {
                this.$refs.modal.hide();
              })
            )
            .catch(error => {
              alert(error);
            });
        }
      });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@media (min-width: 576px) {
  .modal-dialog {
    max-width: 96% !important;
  }
}
@media (min-width: 600px) {
  .modal-dialog {
    max-width: 87% !important;
  }
}
@media (min-width: 1050px) {
  .modal-dialog {
    max-width: 70% !important;
  }
}
label {
  font-size: 11.79px;
  margin: 0px 9px !important;
  color: #000000f2;
}
.form-control {
  font-size: 14px !important;
}
.btn btn btn-outline-danger {
  height: 30px;
  margin-left: 10px;
}
</style>
