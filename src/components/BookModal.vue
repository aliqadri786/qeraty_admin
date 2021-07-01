<template>
  <div>
    <b-modal
      size="lg"
      id="BookModal"
      ref="modal"
      title="Book Detail"
      @hidden="resetModal()"
      hide-footer
      no-close-on-backdrop
    >
      <b-form @submit.stop.prevent="onSubmit">
        <div class="row">
          <div class="col-sm-6">
            <b-form-group id="title-Group" label="Title*" label-for="title">
              <b-form-input
                id="title"
                name="title"
                v-model="bookData.title"
                v-validate="{ required: true }"
                :state="validateState('title')"
                aria-describedby="title-live-feedback"
                placeholder="Book Title"
                autofocus
              ></b-form-input>
              <b-form-invalid-feedback id="title-live-feedback">Title is required.</b-form-invalid-feedback>
            </b-form-group>
          </div>

          <div class="col-sm-6">
            <b-form-group id="isbn-Group" label="ISBN*" label-for="isbn">
              <b-form-input
                id="isbn"
                name="isbn"
                v-model="bookData.isbn"
                v-validate="{ required: true }"
                :state="validateState('isbn')"
                aria-describedby="isbn-live-feedback"
                placeholder="ISBN"
                
                type="number"
              ></b-form-input>
              <b-form-invalid-feedback id="isbn-live-feedback">ISBN is required.</b-form-invalid-feedback>
            </b-form-group>
          </div>

          <div class="col-sm-6">
            <b-form-group id="no_of_pages-Group" label="No. of pages*" label-for="no_of_pages">
              <b-form-input
                id="no_of_pages"
                name="no_of_pages"
                v-model="bookData.no_of_pages"
                v-validate="{ required: true }"
                :state="validateState('no_of_pages')"
                aria-describedby="no_of_pages-live-feedback"
                placeholder="No of pages"
                
                type="number"
              ></b-form-input>
              <b-form-invalid-feedback id="no_of_pages-live-feedback">No. of pages is required.</b-form-invalid-feedback>
            </b-form-group>
          </div>

          <div class="col-sm-6">
            <b-form-group id="price-Group" label="Price*" label-for="price">
              <b-form-input
                id="price"
                name="price"
                v-model="bookData.price"
                v-validate="{ required: true }"
                :state="validateState('price')"
                aria-describedby="price-live-feedback"
                placeholder="Price"
                
                type="number"
              ></b-form-input>
              <b-form-invalid-feedback id="price-live-feedback">Price is required.</b-form-invalid-feedback>
            </b-form-group>
          </div>

          <div class="col-sm-6">
            <b-form-group id="disount_percentage-Group" label="Disount Percentage*" label-for="disount_percentage">
              <b-form-input
                id="disount_percentage"
                name="disount_percentage"
                v-model="bookData.disount_percentage"
                v-validate="{ required: true }"
                :state="validateState('disount_percentage')"
                aria-describedby="disount_percentage-live-feedback"
                placeholder="Disount Percentage"                
                type="number"
              ></b-form-input>
              <b-form-invalid-feedback id="disount_percentage-live-feedback">Disount Percentage is required.</b-form-invalid-feedback>
            </b-form-group>
          </div>

          <!-- date-->
          <div class="col-sm-6">
            <b-form-group
              id="publish_date-Group"
              label="Publish Date*"
              label-for="publish_date"
              description="Date Format: MM/DD/YYYY"
            >
              <b-form-input
                id="publish_date"
                name="publish_date"
                type="date"
                :max="bookData.publish_date"
                v-model="bookData.publish_date"
                v-validate="{ required: true }"
                :state="validateState('publish_date')"
                aria-describedby="publish_date-live-feedback"
                placeholder="Publish Date"
              ></b-form-input>

              <b-form-invalid-feedback id="publish_date-live-feedback">Publish Date is required.</b-form-invalid-feedback>
            </b-form-group>
          </div>

          <div class="col-sm-6">
            <b-form-group id="language-Group" label="Language*" label-for="language">
              <b-form-input
                id="language"
                name="language"
                v-model="bookData.language"
                v-validate="{ required: true }"
                :state="validateState('language')"
                aria-describedby="language-live-feedback"
                placeholder="Language"              
               
              ></b-form-input>
              <b-form-invalid-feedback id="Language-live-feedback">Language is required.</b-form-invalid-feedback>
            </b-form-group>
          </div>

          <div class="col-sm-6">
            <b-form-group id="format-Group" label="Format*" label-for="format">
              <b-form-input
                id="format"
                name="format"
                v-model="bookData.format"
                v-validate="{ required: true }"
                :state="validateState('format')"
                aria-describedby="format-live-feedback"
                placeholder="Format"              
               
              ></b-form-input>
              <b-form-invalid-feedback id="format-live-feedback">Format is required.</b-form-invalid-feedback>
            </b-form-group>
          </div>

         

          <!-- Note-->
          <div class="col-sm-12">
            <b-form-group id="description-Group" label="Description" label-for="description">
              <b-form-textarea
                id="description"
                name="description"
                v-model="bookData.description"
                aria-describedby="description-live-feedback"
                placeholder="Description"
              ></b-form-textarea>
            </b-form-group>
          </div>
        </div>
        <div class="text-right border-top pt-3">
          <b-button class="btn btn-danger bleft" @click="$bvModal.hide('BookModal')">Cancel</b-button>
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
  name: "BookModal",
  //props:['distributor'],
  props: {
    book: {
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
    book: function(newVal) {
      this.bookData = { ...newVal };
    }
  },
 
  data() {
    return {
      e_head: false,
      saving: false,
      bookData: {
        publish_date: new Date().toISOString().slice(0, 10)
      },
      bookHead: []
    };
  },
  methods: {
    resetModal() {
      this.bookData = {
        publish_date: new Date().toISOString().slice(0, 10)
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
        let data = this.bookData;
        data.group_id=5;
        this.saving = true;
        if (this.isEdit) {
          this.$store
            .dispatch("updateBookData", { value: data })
            .then(
              setTimeout(() => {
                this.saving = false;
                this.$success("book Updated Successfully");
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
            .dispatch("addNewBook", data)
            .then(
              (this.saving = false),
              this.$success("book Added Successfully"),
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
