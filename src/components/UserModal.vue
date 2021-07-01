<template>
  <div>
    <b-modal
      size="lg"
      id="UserModal"
      ref="modal"
      title="user Detail"
      @hidden="resetModal()"
      hide-footer
      no-close-on-backdrop
    >
      <b-form @submit.stop.prevent="onSubmit">
        <div class="row">
          <!-- Name-->
          <div class="col-sm-6">
            <b-form-group id="first-Group" label="First Name*" label-for="first">
              <b-form-input
                id="first"
                name="first"
                v-model="userData.first_name"
                v-validate="{ required: true }"
                :state="validateState('first')"
                aria-describedby="first-live-feedback"
                placeholder="First Name"
                  autofocus
              ></b-form-input>

              <b-form-invalid-feedback id="first-live-feedback">First Name is required.</b-form-invalid-feedback>
            </b-form-group>
          </div>

          <!-- Quantity-->
          <div class="col-sm-6">
            <b-form-group id="quantity-Group" label="Last Name*" label-for="quantity">
              <b-form-input
                id="quantity"
                name="quantity"
                v-model="userData.last_name"
                v-validate="{ required: true }"
                :state="validateState('quantity')"
                aria-describedby="quantity-live-feedback"
                placeholder="Last Name"
              ></b-form-input>

              <b-form-invalid-feedback id="quantity-live-feedback">Last Name is required.</b-form-invalid-feedback>
            </b-form-group>
          </div>

          <!-- Retail Price-->
          <div class="col-sm-6">
            <b-form-group id="retail-Group" label="Username*" label-for="retail">
              <b-form-input
                id="retail"
                name="retail"
                v-model="userData.user_name"
                v-validate="{ required: true }"
                :state="validateState('retail')"
                aria-describedby="retail-live-feedback"
                placeholder="Username"
              ></b-form-input>

              <b-form-invalid-feedback id="sale-live-feedback">Username is required.</b-form-invalid-feedback>
            </b-form-group>
          </div>

          <!-- Sale Price-->
          <div class="col-sm-6">
            <b-form-group id="sale-Group" label="Password*" label-for="sale">
              <b-form-input
                id="sale"
                name="sale"
                v-model.number="userData.password"
                v-validate="{ required: true }"
                :state="validateState('sale')"
                aria-describedby="sale-live-feedback"
                placeholder="Password"
              ></b-form-input>

              <b-form-invalid-feedback id="sale-live-feedback">Password is required.</b-form-invalid-feedback>
            </b-form-group>
          </div>

          <!-- City-->
          <!-- <div class="col-sm-12">
            <b-form-group id="city-Group" label="Role*" label-for="city">
              <v-select
                id="city"
                name="city"
                :class="{'borderRed':err_role}"
                :options="roles"
                v-model="userData.role_id"
                v-validate="{ required: true }"
                :state="validateState('city')"
                aria-describedby="city-live-feedback"
                placeholder="Select Role"
                @input="removeError"
                label="name"
                :reduce="name=>name.id"
              ></v-select>

              <p class="customError" v-if="err_role" id="name-live-feedback">Role is required.</p>
            </b-form-group>
          </div> -->
        </div>
        <div class="text-right border-top pt-3">
          <b-button class="btn btn-danger bleft" @click="$bvModal.hide('UserModal')">Cancel</b-button>
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
  name: "UserModal",
  //props:['distributor'],
  props: {
    user: {
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
    user: function(newVal) {
      this.userData = { ...newVal };
    }
  },
  mounted() {
    // this.$store
    //   .dispatch("getRoles")
    //   .then(response => {
    //     console.log(response); // eslint-disable-line no-console

    //     this.roles = response;
    //   })
    //   .catch(error => {
    //     alert(error);
    //   });
  },
  data() {
    return {
      saving: false,
      err_role: false,
      roles: [],
      phonePrefix: "+92",
      options: [{ text: "Active", value: 1 }, { text: "Inactive", value: 0 }],
      userData: {
        is_active: 1
      }
    };
  },
  methods: {
    resetModal() {
      this.userData = {
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
    removeError() {
      this.err_role = false;
    },
    onSubmit() {
      this.$validator.validateAll().then(result => {
        if (!result) {
          return;
        }
        // if (!this.userData.role_id) {
        //   this.err_role = true;
        //   return;
        // }
        //concatenating phone numbers with phone_prefix
        let data = JSON.parse(JSON.stringify(this.userData));

        this.saving = true;
        if (this.isEdit) {
          this.$store
            .dispatch("updateUserData", { value: data })
            .then(
              setTimeout(() => {
                this.$emit("saved");
                this.saving = false;
                this.$success("User Updated Successfully");
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
            .dispatch("addNewUser", data)
            .then(
              (this.saving = false),
              this.$success("User Added Successfully"),
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
.btns {
  height: 30px;
  margin-left: 10px;
}
input {
  height: 40px;
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
