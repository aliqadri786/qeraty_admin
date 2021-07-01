<template>
  <div class>
    <div class="w-100">
      <h4 class="float-left pt-2 pl-2" style="    color: #232425 !important;">Expense Head</h4>
      <button
        class="btn btn-outline-danger float-right pt-2 pb-2 pl-3 pr-3 mb-3"
        v-b-modal.ExpenseHeadModal
      >Add Expense Head</button>
      <div class="clearfix"></div>
      <div class="float-left w-25 mr-3">
        <b-form-group class="mb-2">
          <b-input-group>
            <b-form-input v-model="filter" placeholder="Type to Search"></b-form-input>
          </b-input-group>
        </b-form-group>
      </div>
      <button
        @click="getActive"
        class="btn btn-outline-danger pt-2 pb-2 pl-3 pr-3 mb-3 left-20"
      >Active</button>
      <button
        @click="getInActive"
        class="btn btn-outline-danger pt-2 pb-2 pl-3 pr-3 mb-3 left-20"
      >Inactive</button>
      <div class="float-right pl-3">
        <b-pagination
          v-model="currentPage"
          :total-rows="rows"
          :per-page="perPage"
          aria-controls="my-table"
        ></b-pagination>
      </div>
    </div>
    <div class="clearfix"></div>
    <div class="overflow-auto">
      <b-table
        striped
        hover
        bordered
        responsive
        :busy="isBusy"
        id="my-table"
        :items="expenseHeadData"
        :fields="fields"
        :per-page="perPage"
        :current-page="currentPage"
        small
        :filter="filter"
        @filtered="handleFilter"
        :tbody-tr-class="rowClass"
      >
        <template v-slot:table-busy>
          <div class="text-center text-success my-2">
            <b-spinner class="align-middle"></b-spinner>
            <strong>Loading...</strong>
          </div>
        </template>
        <template v-slot:cell(index)="row">
          <div>{{ row.index + 1+((currentPage-1)*perPage) }}</div>
        </template>
        <template v-slot:cell(is_active)="row">
          <div>
            <span v-if="row.item.is_active==1" style="color:green">Active</span>
            <span v-else style="color:red">Inactive</span>
          </div>
        </template>

        <template v-slot:cell(actions)="row">
          <div v-if="row.field.isAdmin" class="text_center">
            <a class="text-info" style="font-size:14px;" @click="handleEdit(row.item)">
              <i class="fa fa-edit"></i>
            </a>

            <!-- 
            <b-dropdown id="dropdown-1" text variant="white" class="p-0">
              <b-dropdown-item @click="handleActive(row.item)" v-b-modal.UserCoinsModal>Coins</b-dropdown-item>
               <b-dropdown-item @click="handleActive(row.item)" v-b-modal.UserCoinsModal>Post Coins</b-dropdown-item>
                <b-dropdown-item @click="handleActive(row.item)" v-b-modal.UserCoinsModal>Withdraw Coins</b-dropdown-item>
            </b-dropdown>-->
          </div>

          <small class="text-muted" style="font-size:10px;" v-else>No Action Available</small>
        </template>
      </b-table>
    </div>

    <ExpenseHeadModal :expenseHead="expenseHead" :isEdit="isEdit" @close="close" @saved="getActive"></ExpenseHeadModal>
    <!-- <InviteeModal :userId="user"></InviteeModal> -->
  </div>
</template>

<script>
// import ApiService from "../services/ApiService";
// import ActivityModal from "./ActivityModal";
import ExpenseHeadModal from "./ExpenseHeadModal";

export default {
  name: "ExpenseHead",
  components: { ExpenseHeadModal },

  mounted() {
    this.getActive();
    //console.log(this.expenseHeadData); // eslint-disable-line no-console
  },
  data() {
    return {
      isBusy: false,
      seen: false,
      expenseHead: {},
      perPage: 15,
      filteredData: [],
      currentPage: 1,

      fields: [
        { key: "index", label: "Sr.#" },

        {
          key: "name",
          label: "Name",
          sortable: true
        },
        {
          key: "is_active",
          sortable: true,
          label: "Status"
        },

        { key: "actions", label: "Actions", isAdmin: true }
      ],
      expenseHeadData: [],
      filter: null,
      isEdit: false,
      selectedIndex: -1
    };
  },
  watch: {
    currentPage: function() {}
  },
  methods: {
    getActive() {
      this.getHeads("getAllExpenseHeads");
    },
    getInActive() {
      this.getHeads("getAllInactiveExpenseHeads");
    },
    getHeads(link) {
      this.isBusy = true;
      this.$store
        .dispatch(link)
        .then(data => {
          this.expenseHeadData = data;
          this.filteredData = this.expenseHeadData;

          this.isBusy = false;
        })
        .catch(error => {
          alert(error);
        });
    },
    rowClass(item) {
      if (!item) return;
      if (item.is_active === 0) return "table-danger";
    },
    handleFilter(list) {
      this.filteredData = list;
    },

    handleEdit(expenseHead) {
      this.isEdit = true;
      this.expenseHead = { ...expenseHead };
      this.$bvModal.show("ExpenseHeadModal");
    },
    close() {
      this.isEdit = false;
    }
  },
  computed: {
    rows() {
      return this.filteredData.length;
    },
    computedIndex: {
      get: function() {
        return this.selectedIndex + (this.currentPage - 1) * this.perPage;
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.Main-heading {
  text-shadow: 0px 2px 2px rgba(0, 0, 0, 0.4), 0px 8px 13px rgba(0, 0, 0, 0.1),
    0px 18px 5px rgba(0, 0, 0, 0.1);
  color: darkcyan;
}
</style>
