<template>
  <div class>
    <div class="w-100">
      <div class="row mb-2">
        <div class="col-sm-6">
          <h4 class="pt-2 pl-2" style="    color: #232425 !important;">Books</h4>
        </div>
        <div class="col-sm-6 text-right">
           <button
            class="btn btn-outline-danger pt-2 pb-2 pl-3 pr-3 "
            v-b-modal.BookModal
          >Add Book</button>
        </div>
      </div>
      <div class="row">
        <div class="col-sm-6">
          <b-form-group class="mb-2 w-75">
            <b-input-group>
              <b-form-input v-model="filter" placeholder="Type to Search"></b-form-input>
            </b-input-group>
          </b-form-group>
        </div>
        
        <div class="col-sm-6" style="display:flex;justify-content:flex-end">
          <b-pagination
            v-model="currentPage"
            :total-rows="totalPages"
            :per-page="perPage"
            aria-controls="my-table"
            :current-page="currentPage"
          ></b-pagination>
        </div>
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
        :items="bookData"
        :fields="fields"
        :per-page="perPage"        
        small
        :filter="filter"
        @filtered="handleFilter"
        :tbody-tr-class="rowClass"
      >
        <template v-slot:table-busy>
          <div class="text-center text-warning my-2">
            <b-spinner class="align-middle"></b-spinner>
            <strong class="ml-4">Loading...</strong>
          </div>
        </template>
        <template v-slot:cell(index)="row">
          <div><b>{{ row.index + 1+((currentPage-1)*perPage) }}</b></div>
        </template>

        <template v-slot:cell(price)="row">
          <div class="text-right text-success" style="font-size:15px"><b>Rs. {{row.item.price}}</b></div>
        </template>
        <template v-slot:cell(discount_percentage)="row">
          <div class="text-right text-danger" style="font-size:15px"><b>{{row.item.discount_percentage}}%</b></div>
        </template>
         
        <template v-slot:cell(title)="row">
          <div>{{ row.item.title}} </div>
          <div style="font-size:13px">
              <b>No. of pages: {{row.item.no_of_pages}}</b>
          </div>
          
        </template>
        

        <template v-slot:cell(actions)="row">
          <div v-if="row.field.isAdmin" class="text_center">
            <a class="text-info" style="font-size:14px;" @click="handleEdit(row.item)">
              <i class="fa fa-edit"></i>
            </a>

            <!-- 
            <b-dropdown id="dropdown-1" text variant="white" class="p-0">
              <b-dropdown-item @click="handleActive(row.item)" v-b-modal.bookCoinsModal>Coins</b-dropdown-item>
               <b-dropdown-item @click="handleActive(row.item)" v-b-modal.bookCoinsModal>Post Coins</b-dropdown-item>
                <b-dropdown-item @click="handleActive(row.item)" v-b-modal.bookCoinsModal>Withdraw Coins</b-dropdown-item>
            </b-dropdown>-->
          </div>

          <small class="text-muted" style="font-size:10px;" v-else>No Action Available</small>
        </template>
      </b-table>
      <h5 class="text-center w-100 bg-light px-3 py-3"  v-if="!bookData && !isBusy">{{tableMsg}}</h5>
    </div>

    <BookModal :book="book" :isEdit="isEdit" @close="close" ></BookModal>


  </div>
</template>

<script>

import BookModal from "./BookModal";

export default {
  name: "book",
  components: { BookModal },

  mounted() {
    this.getBooks("books?page=1&limit=10");
   
  },
  data() {
    return {
      isBusy: false,
      seen: false,
      book: {},
      perPage: 10,
      filteredData: [],
      currentPage: 1,
      totalPages:0,
      tableMsg:'',

      fields: [
        { key: "index", label: "Sr.#" },

        {
          key: "title",
          label: "Title",
          sortable: false
        },

        {
          key: "isbn",
          label: "ISBN",
          sortable: false
        },
        
        {
          key: "language",
          label: "Language",
          sortable: false
        },

        {
          key: "price",
          label: "Price",
          sortable: false
        },

        {
          key: "discount_percentage",
          label: "Discount",
          sortable: false
        },
        
        { key: "actions", label: "Actions", isAdmin: true }
      ],
      bookData: [],
      roles:[],
      search:1,
      filter: null,
      isEdit: false,
      selectedIndex: -1
    };
  },
  watch: {
    currentPage: function() {
      let link = "books?limit=10&page="+this.currentPage+"&language=english"
      this.getBooks(link);
    }
  },
  methods: {
    
    getBooks(link) {
      this.isBusy = true;
      this.$store
        .dispatch("getBooks",link)
        .then(data => {
          console.log("data->",data)  // eslint-disable-line no-console
          this.tableMsg=data.message
          this.bookData = data.data.data;
          this.filteredData = this.bookData;
          this.perPage=data.data.limit
          this.currentPage=data.data.page ? data.data.page: 1
          this.totalPages=data.data.totalCount
          this.isBusy = false;
        })
        .catch(error => {
          alert(error);
        });
    },

    searchBooks(){
      this.currentPage=1;
      let link = "books?limit=10&page="+this.currentPage+"&search="+this.search
      this.getBooks(link);
    },
   
    rowClass(item) {
      if (!item) return;
      if (item.is_active === 0) return "table-danger";
    },
    handleFilter(list) {
      this.filteredData = list;
    },

    handleEdit(book) {
      this.isEdit = true;
      this.book = { ...book };
      this.$bvModal.show("BookModal");
    },
    close() {
      this.isEdit = false;
    }
  },
  computed: {
   
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
.sendBtn {
  height: 38px;
}
</style>
