<template>
  <div>
    <b-modal
      size="lg"
      id="ExpenseModal"
      ref="modal"
      title="Expense Detail"
      @hidden="resetModal()"
      hide-footer
      no-close-on-backdrop
    >
      <b-form @submit.stop.prevent="onSubmit">
        <div class="row">
          <!-- Name-->
          <div class="col-sm-12">
            <b-form-group id="name-Group" label="Expense Head*" label-for="name">
              <v-select
                id="name"
                name="name"
                autofocus
                :class="{'borderRed':e_head}"
                :options="expenseHead"
                v-model="expenseData.expense_head_id"
                v-validate="{ required: true }"
                :state="validateState('name')"
                aria-describedby="name-live-feedback"
                placeholder="Select Expense Head"
                @input="removeError"
                label="name"
                :reduce="name=>name.id"
              ></v-select>

              <p class="customError" v-if="e_head" id="name-live-feedback">Expense Head is required.</p>
            </b-form-group>
          </div>

          <!-- date-->
          <div class="col-sm-6">
            <b-form-group
              id="date-Group"
              label="Date*"
              label-for="date"
              description="Date Format: MM/DD/YYYY"
            >
              <b-form-input
                id="date"
                name="date"
                type="date"
                :max="expenseData.date"
                v-model="expenseData.date"
                v-validate="{ required: true }"
                :state="validateState('date')"
                aria-describedby="date-live-feedback"
                placeholder="date"
              ></b-form-input>

              <b-form-invalid-feedback id="date-live-feedback">Date is required.</b-form-invalid-feedback>
            </b-form-group>
          </div>

          <!-- Amount-->
          <div class="col-sm-6">
            <b-form-group id="amount-Group" label="Amount*" label-for="amount">
              <b-form-input
                id="amount"
                name="amount"
                type="number"
                min="1"
                v-model.number="expenseData.amount"
                v-validate="{ required: true,}"
                :state="validateState('amount')"
                aria-describedby="amount-live-feedback"
                placeholder="Amount"
              ></b-form-input>

              <b-form-invalid-feedback id="date-live-feedback">Invalid Amount.</b-form-invalid-feedback>
            </b-form-group>
          </div>

          <!-- Note-->
          <div class="col-sm-12">
            <b-form-group id="note-Group" label="Note" label-for="note">
              <b-form-textarea
                id="note"
                name="note"
                v-model="expenseData.note"
                aria-describedby="amount-live-feedback"
                placeholder="Note"
              ></b-form-textarea>
            </b-form-group>
          </div>
        </div>
        <div class="text-right border-top pt-3">
          <b-button class="btn btn-danger bleft" @click="$bvModal.hide('ExpenseModal')">Cancel</b-button>
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
  name: "ExpenseModal",
  //props:['distributor'],
  props: {
    expense: {
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
    expense: function(newVal) {
      this.expenseData = { ...newVal };
    }
  },
  mounted() {
    this.$store.dispatch("getAllExpenseHeads").then(data => {
      for (var i = 0; i < data.length; i++) {
        // console.log(data[i]); // eslint-disable-line no-console

        this.expenseHead.push(data[i]);
      }
    });
  },
  data() {
    return {
      e_head: false,
      saving: false,
      expenseData: {
        date: new Date().toISOString().slice(0, 10)
      },
      expenseHead: []
    };
  },
  methods: {
    resetModal() {
      this.expenseData = {
        date: new Date().toISOString().slice(0, 10)
      };
      this.e_head = false;
      // this.isEdit = false;
      this.$emit("close");
    },
    removeError() {
      this.e_head = false;
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
      if (!this.expenseData.expense_head_id) {
        this.e_head = true;
        return;
      }
      this.$validator.validateAll().then(result => {
        if (!result) {
          return;
        }
        let data = this.expenseData;
        this.saving = true;
        if (this.isEdit) {
          this.$store
            .dispatch("updateExpenseData", { value: data })
            .then(
              setTimeout(() => {
                this.saving = false;
                this.$success("Expense Updated Successfully");
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
            .dispatch("addNewExpense", data)
            .then(
              (this.saving = false),
              this.$success("Expense Added Successfully"),
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
.customError {
  font-size: 13px;
  color: crimson;
  margin-top: 2px;
}
.borderRed {
  border: 1px solid red;
  border-radius: 5px;
}
</style>
