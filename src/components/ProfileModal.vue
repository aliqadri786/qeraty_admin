<template>
  <div>
    <b-modal
      size="sm"
      id="ProfileModal"
      ref="modal"
      title="Change Password"
      @hidden="resetModal()"
      hide-footer
      no-close-on-backdrop
    >
      <b-form @submit.stop.prevent="onSubmit">
        <div class="row">
          <!-- old_password-->
          <div class="col-sm-12">
            <b-form-group id="old-Group" label="Old Password*" label-for="profile">
              <b-form-input
                id="old"
                name="old"
                autofocus
                :type="type"
                v-model="profileData.old_password"
                v-validate="{ required: true }"
                :state="validateState('old')"
                aria-describedby="old-live-feedback"
                placeholder="Old Password"
              ></b-form-input>
              <label id="old_password" v-if="incorrecPass">Incorrect Old Password.</label>
            </b-form-group>
          </div>

          <!-- new-->
          <div class="col-sm-12">
            <b-form-group id="new-Group" label="New Password *" label-for="new">
              <b-form-input
                id="new"
                name="new"
                :type="type"
                v-model="profileData.new_password"
                v-validate="{ required: true }"
                :state="validateState('new')"
                aria-describedby="new-live-feedback"
                placeholder="New Password "
              ></b-form-input>

              <b-form-checkbox
                id="checkbox-1"
                v-model="type"
                name="checkbox-1"
                value="text"
                unchecked-value="password"
              >
                <small>Show Password</small>
              </b-form-checkbox>
            </b-form-group>
          </div>
        </div>
        <div class="text-right border-top pt-3">
          <b-button class="btn btn-danger bleft" @click="$bvModal.hide('ProfileModal')">Cancel</b-button>
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
  name: "ProfileModal",
  //props:['distributor'],
  props: {
    profile: {
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
    profile: function(newVal) {
      this.profileData = { ...newVal };
    }
  },
  mounted() {},
  data() {
    return {
      saving: false,
      incorrecPass: false,
      type: "password",
      err_city: false,
      profileData: {}
    };
  },
  methods: {
    resetModal() {
      this.profileData = {};
      this.saving = false;
      this.incorrecPass = false;
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
        let data = {};
        data.old_password = this.profileData.old_password;
        data.new_password = this.profileData.new_password;
        this.saving = true;
        this.$store
          .dispatch("updatePassword", data)
          .then(r => {
            if (r === "incorrect") {
              this.incorrecPass = true;
              this.saving = false;
            } else {
              setTimeout(() => {
                this.$emit("saved");
                this.saving = false;
                this.$success("Password Updated Successfully");
                this.$nextTick(() => {
                  this.$refs.modal.hide();
                });
              }, 1000);
            }
          })
          .catch(error => {
            this.$error(error);
          });
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
#profile {
  height: 35px;
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
#old_password {
  color: crimson;
}
</style>
