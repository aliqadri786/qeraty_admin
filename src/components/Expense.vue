<template>
  <div class>
    <div class="w-100">
      <h4 class="float-left pt-2 pl-2" style="    color: #232425 !important;">Expense</h4>
      <button
        class="btn btn-outline-danger float-right pt-2 pb-2 pl-3 pr-3 mb-3"
        v-b-modal.ExpenseModal
      >Add Expense</button>
      <div class="clearfix"></div>
      <div class="float-left w-25 mr-3">
        <b-form-group class="mb-2">
          <b-input-group>
            <b-form-input v-model="filter" placeholder="Type to Search"></b-form-input>
          </b-input-group>
        </b-form-group>
      </div>

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
        :items="expenseData"
        :fields="fields"
        :per-page="perPage"
        :current-page="currentPage"
        small
        :filter="filter"
        @filtered="handleFilter"
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

        <template v-slot:cell(actions)="row">
          <div v-if="row.field.isAdmin" class="text_center">
            <a class="text-info" style="font-size:14px;" @click="handleEdit(row.item)">
              <i class="fa fa-edit"></i>
            </a>

            <a
              class="text-danger"
              style="font-size:14px;margin-left:10px;"
              @click="handleDelete(row.item)"
            >  <i class="fa fa-trash-o"></i></a>

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

    <ExpenseModal :expense="expense" :isEdit="isEdit" @close="close"></ExpenseModal>
    <!-- <InviteeModal :userId="user"></InviteeModal> -->
  </div>
</template>

<script>
// import ApiService from "../services/ApiService";
// import ActivityModal from "./ActivityModal";
import ExpenseModal from "./ExpenseModal";

export default {
  name: "expense",
  components: { ExpenseModal },

  mounted() {
    this.isBusy = true;
    this.$store
      .dispatch("getAllExpenses")
      .then(data => {
        this.expenseData = data;
        this.filteredData = this.expenseData;

        this.isBusy = false;
      })
      .catch(error => {
        alert(error);
      });
  },
  data() {
    return {
      isBusy: false,
      seen: false,
      expense: {},
      perPage: 15,
      filteredData: [],
      currentPage: 1,

      fields: [
        { key: "index", label: "Sr.#" },

        {
          key: "expense_head.name",
          label: "Expense Head",
          sortable: true
        },

        {
          key: "amount",
          label: "Amount",
          sortable: true
        },
        {
          key: "date",
          label: "Date",
          sortable: true
        },
        {
          key: "note",
          label: "Note"
        },

        { key: "actions", label: "Actions", isAdmin: true }
      ],
      expenseData: [],
      filter: null,
      isEdit: false,
      selectedIndex: -1
    };
  },
  watch: {
    currentPage: function() {}
  },
  methods: {
    handleFilter(list) {
      this.filteredData = list;
    },

    handleEdit(expense) {
      this.isEdit = true;
      this.expense = { ...expense };
      this.$bvModal.show("ExpenseModal");
    },
    handleDelete(expense) {
      if (confirm("Do you really want to delete?")) {
        this.$store
          .dispatch("deleteExpenseData", expense.id)
          .then(this.$success("Expense Deleted Successfully"))
          .catch(error => {
            alert(error);
          });
      }
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
