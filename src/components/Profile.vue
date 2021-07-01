<template>
  <div>
    <h3>Profile</h3>
    <div id="editDiv">
      <img
        src="https://cdn3.iconfinder.com/data/icons/social-messaging-ui-color-line/254000/79-512.png"
        id="editPic"
        @click="handleEdit"
      />
    </div>
    <div id="profileDiv">
      <div id="left">
        <img src="https://zero1.sg/img/accountlogin-icon.png" id="profilePic" alt="profile" />
      </div>
      <table id="right">
        <tr>
          <th>Name</th>
          <td style="width:50px"></td>
          <td>{{profileData.first_name}} {{profileData.last_name}}</td>
        </tr>
        <tr>
          <th>Username</th>
          <td style="width:50px"></td>
          <td>{{profileData.user_name}}</td>
        </tr>
        <tr>
          <th>Password</th>
          <td style="width:50px"></td>
          <td>{{profileData.password}}</td>
        </tr>
      </table>
    </div>
    <ProfileModal :profile="profile" :isEdit="isEdit" @close="close" @saved="getprofile"></ProfileModal>
  </div>
</template>

<script>
import ProfileModal from "./ProfileModal";

export default {
  name: "Profile",
  components: { ProfileModal },

  mounted() {
    this.getprofile();
  },
  data() {
    return {
      isBusy: false,
      seen: false,
      profile: {},
      profileData: {},

      isEdit: false
    };
  },
  watch: {
    currentPage: function() {}
  },
  methods: {
    getprofile() {
      this.profileData = {};
      this.isBusy = true;
      this.$store
        .dispatch("getProfile")
        .then(data => {
          this.profileData = data;
          console.log("logged in user-> ", data); // eslint-disable-line no-console

          this.isBusy = true;
        })
        .catch(error => {
          alert(error);
        });
    },

    handleEdit() {
      this.isEdit = true;

      this.profile = JSON.parse(JSON.stringify(this.profileData));
      this.$bvModal.show("ProfileModal");
    },
    close() {
      this.isEdit = false;
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
#profileDiv {
  box-shadow: 2px 2px 10px silver;
  position: absolute;
  left: 20%;
  width: 570px;
  height: 300px;
  margin-top: 50px;
  padding: 50px;
}
#left {
  float: left;
}
#right {
  float: right;
  margin-top: 60px;
  font-weight: 600;
  margin-left: 20px;
}
#profilePic {
  width: 200px;
  height: 200px;
}
#editPic {
  width: 40px;
  position: absolute;
  left: 54%;
  top: 590%;
  z-index: 9;
}
#editPic:hover {
  cursor: pointer;
  top: 595%;
  transition: all 0.3s;
}
</style>
