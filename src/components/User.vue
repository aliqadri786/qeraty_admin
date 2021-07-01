<template>
  <div class>
    <div class="w-100">
      <div class="row mb-2">
        <div class="col-sm-6">
          <h4 class="pt-2 pl-2" style="    color: #232425 !important;">Users</h4>
        </div>
        <div class="col-sm-6 text-right">
           <button
            class="btn btn-outline-danger pt-2 pb-2 pl-3 pr-3 "
            v-b-modal.UserModal
          >Add User</button>
        </div>
      </div>
      <div class="row">
        <div class="col-sm-4">
          <b-form-group class="mb-2">
            <b-input-group>
              <b-form-input v-model="filter" placeholder="Type to Search"></b-form-input>
            </b-input-group>
          </b-form-group>
        </div>
        <div class="col-sm-5 d-flex">
          <v-select
            id="search"
            name="search"            
            :options="roles"
            class="w-50"
            v-model="search"
            aria-describedby="size-live-feedback"
            placeholder="Select Role"
            @input="searchUsers"
            label="name"
            :reduce="name=>name.id"
          ></v-select> 
          <a class="btn ml-4  border-top" @click="getusers('users/online')">
            Get Online Users
          </a>
        </div>
        <div class="col-sm-3" style="display:flex;justify-content:flex-end">
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
        :items="userData"
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
         
        <template v-slot:cell(username)="row">
          <div>{{ row.item.username}} </div>
          <div class="d-flex">
            <div style="width:50%">
              <span style="font-size:12px !important" v-if="row.item.isOnline"><i style="font-size:13px !important"  class="fa fa-circle text-success mr-1" ></i> <b>Online</b></span>
              <span style="font-size:12px !important" v-else><i style="font-size:13px !important" class="fa fa-circle text-danger mr-1" ></i> <b>Offline</b> </span>
            </div>
            <div style="width:50%" ><i style="font-size:15px !important" class="fa fa-book mr-1"></i><b>{{row.item.books.length}} <span style="font-size:12px !important">book(s)</span></b></div>
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
      <h5 class="text-center w-100 bg-light px-3 py-3"  v-if="!userData && !isBusy">{{tableMsg}}</h5>
    </div>

    <UserModal :user="user" :isEdit="isEdit" @close="close" ></UserModal>

    <!-- <InviteeModal :userId="user"></InviteeModal> -->
  </div>
</template>

<script>
// import ApiService from "../services/ApiService";
// import ActivityModal from "./ActivityModal";
import UserModal from "./UserModal";

export default {
  name: "user",
  components: { UserModal },

  mounted() {
    this.getusers("users/all?page=1&limit=30&search=1");
    this.getRoles();
  },
  data() {
    return {
      isBusy: false,
      seen: false,
      user: {},
      perPage: 10,
      filteredData: [],
      currentPage: 1,
      totalPages:0,
      tableMsg:'',

      fields: [
        { key: "index", label: "Sr.#" },

        {
          key: "username",
          label: "Username",
          sortable: false
        },

        {
          key: "email",
          label: "Email",
          sortable: false
        },
        
        {
          key: "user_type",
          label: "Role",
          sortable: false
        },
        

        { key: "actions", label: "Actions", isAdmin: true }
      ],
      userData: [],
      roles:[],
      search:1,
      filter: null,
      isEdit: false,
      selectedIndex: -1
    };
  },
  watch: {
    currentPage: function() {
      let link = "users/all?limit=10&page="+this.currentPage+"&search="+this.search
      this.getusers(link);
    }
  },
  methods: {
    
    getusers(link) {
      this.isBusy = true;
      this.$store
        .dispatch("getUsers",link)
        .then(data => {
          console.log("data->",data)  // eslint-disable-line no-console
          this.tableMsg=data.message
          this.userData = data.data.userWithBooks;
          this.filteredData = this.userData;
          this.perPage=data.data.limit
          this.currentPage=data.data.page ? data.data.page: 1
          this.totalPages=data.data.totalCount
          this.isBusy = false;
        })
        .catch(error => {
          alert(error);
        });
    },

    searchUsers(){
      this.currentPage=1;
      let link = "users/all?limit=10&page="+this.currentPage+"&search="+this.search
      this.getusers(link);
    },
    getRoles(){
        this.$store
        .dispatch("getRoles")
        .then(data => {
          this.roles=data.data
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

    handleEdit(user) {
      this.isEdit = true;
      this.user = { ...user };
      this.$bvModal.show("UserModal");
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
