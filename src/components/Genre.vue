<template>
  <div class>
    <div class="w-100">
      <div class="row mb-2">
        <div class="col-sm-6">
          <h4 class="pt-2 pl-2" style="    color: #232425 !important;">Genres</h4>
        </div>
        <div class="col-sm-6 text-right">
           <button
            class="btn btn-outline-danger pt-2 pb-2 pl-3 pr-3 "
            v-b-modal.genreModal
          >Add Genre</button>
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
        :items="genreData"
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
         
        <template v-slot:cell(approved)="row">
           <b-badge variant="primary" v-if="row.item.__genreApprovalConnection__.is_approved">YES</b-badge>
           <b-badge variant="secondary" v-else>NO</b-badge>
          
        </template>
        

        <template v-slot:cell(actions)="row">
          <div v-if="row.field.isAdmin" class="text_center">
            <a class="text-info" style="font-size:14px;" @click="handleEdit(row.item)">
              <i class="fa fa-edit"></i>
            </a>

             <a class="text-success ml-2" v-if="!row.item.__genreApprovalConnection__.is_approved" style="font-size:14px;" @click="approveGenre(row.item,true)">
              <i class="fa fa-check"></i>
            </a>

            <a class="text-danger ml-2" v-else style="font-size:14px;" @click="approveGenre(row.item,false)">
              <i class="fa fa-close"></i>
            </a>


            <!-- 
            <b-dropdown id="dropdown-1" text variant="white" class="p-0">
              <b-dropdown-item @click="handleActive(row.item)" v-b-modal.genreCoinsModal>Coins</b-dropdown-item>
               <b-dropdown-item @click="handleActive(row.item)" v-b-modal.genreCoinsModal>Post Coins</b-dropdown-item>
                <b-dropdown-item @click="handleActive(row.item)" v-b-modal.genreCoinsModal>Withdraw Coins</b-dropdown-item>
            </b-dropdown>-->
          </div>

          <small class="text-muted" style="font-size:10px;" v-else>No Action Available</small>
        </template>
      </b-table>
      <h5 class="text-center w-100 bg-light px-3 py-3"  v-if="!genreData && !isBusy">{{tableMsg}}</h5>
    </div>

    <!-- <genreModal :genre="genre" :isEdit="isEdit" @close="close" ></genreModal> -->


  </div>
</template>

<script>

// import genreModal from "./genreModal";

export default {
  name: "genre",
//   components: { genreModal },

  mounted() {
    this.getGenres("genres?page=1&limit=10&language=en");
   
  },
  data() {
    return {
      isBusy: false,
      seen: false,
      genre: {},
      perPage: 10,
      filteredData: [],
      currentPage: 1,
      totalPages:0,
      tableMsg:'',

      fields: [
        { key: "index", label: "Sr.#" },

        {
          key: "name",
          label: "Name",
          sortable: false
        },

        {
          key: "language",
          label: "Language",
          sortable: false
        },
        
        {
          key: "description",
          label: "Description",
          sortable: false
        },

        {
          key: "approved",
          label: "Approved",
          sortable: false
        },

        
        { key: "actions", label: "Actions", isAdmin: true }
      ],
      genreData: [],
      roles:[],
      search:1,
      filter: null,
      isEdit: false,
      selectedIndex: -1
    };
  },
  watch: {
    currentPage: function() {
      let link = "genres?limit=10&page="+this.currentPage+"&language=en"
      this.getGenres(link);
    }
  },
  methods: {
    
    getGenres(link) {
      this.isBusy = true;
      this.$store
        .dispatch("getGenres",link)
        .then(data => {
          console.log("data->",data)  // eslint-disable-line no-console
          this.tableMsg=data.message
          this.genreData = data.data.genres;
          this.filteredData = this.genreData;
          this.perPage=data.data.limit
          this.currentPage=data.data.page ? data.data.page: 1
          this.totalPages=data.data.totalCount
          this.isBusy = false;
        })
        .catch(error => {
          alert(error);
        });
    },

    searchgenres(){
      this.currentPage=1;
      let link = "genres?limit=10&page="+this.currentPage+"&search="+this.search
      this.getGenres(link);
    },
    approveGenre(genre,status){
      let data={
        status:status
      }
      this.$store
        .dispatch("approveGenre",{id:genre.id, status:data})
        .then(data => {
          this.$success(data.message)
          
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

    handleEdit(genre) {
      this.isEdit = true;
      this.genre = { ...genre };
      this.$bvModal.show("genreModal");
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
