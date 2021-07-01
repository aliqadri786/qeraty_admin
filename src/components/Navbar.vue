<template>
  <div id="app">
    <div>
      <nav v-if="!hideNav" class="navbar navbar-expand navbar-dark bg-navbar pt-0 pb-0 fixed-top">
        <a id="menu-toggle" class="navbar-brand" @click.prevent="hideSidebar">
          <span>
            <i class="fa fa-bars"></i>
          </span>
          <span id="logo">{{this.$store.state.appName}}</span>
        </a>
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarsExample02"
          aria-controls="navbarsExample02"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarsExample02">
          <ul class="navbar-nav ml-auto">           
            <li class="nav-item" title="Logout">
              <span v-if="checkLogin" @click="logout()" id="logout" squared variant="light">
                <i class="fa fa-power-off"></i>
              </span>
            </li>
          </ul>
        </div>
      </nav>
  

      <div id="wrapper" class="toggled">
        <!-- Sidebar -->

        <div id="sidebar-wrapper" v-if="!hideNav">
          <ul class="sidebar-nav pt-5 ">
           <li>
              <a class="text-center py-4 my-2">
                <img src="../assets/logo.png" style="width:50%;margin-left:-20px" />
              </a>
            </li>

            <router-link
              tag="li"
              to="/"
              active-class="active"
              exact
              class="colorWhite"
              v-if="!hideLink"
            >
              <a class="app-menu__item">
                <i class="fa fa-dashboard"></i>
                <span class="app-menu__label">Dashboard</span>
              </a>
            </router-link>
            <router-link tag="li" to="/roles" active-class="active" class="colorWhite">
              <a class="app-menu__item">
                <i class="fa fa-file-o"></i>
                <span class="app-menu__label">Roles</span>
              </a>
            </router-link>
            <router-link tag="li" to="/users" active-class="active" class="colorWhite">
              <a class="app-menu__item">
                <i class="fa fa-file-o"></i>
                <span class="app-menu__label">Users</span>
              </a>
            </router-link>

            <router-link tag="li" to="/books" active-class="active" class="colorWhite">
              <a class="app-menu__item">
                <i class="fa fa-book"></i>
                <span class="app-menu__label">Books</span>
              </a>
            </router-link>

            <router-link tag="li" to="/genres" active-class="active" class="colorWhite">
              <a class="app-menu__item">
                <i class="fa fa-book"></i>
                <span class="app-menu__label">Genres</span>
              </a>
            </router-link>
            
          </ul>
        </div>

        <!-- /#sidebar-wrapper -->
        <!-- Page Content -->
        <div class="pt-5 mb-0 pb-0" v-if="!hideNav"></div>
        <div id="page-content-wrapper" class="pb-0">
          <slot></slot>
        </div>
        <!-- /#page-content-wrapper -->
      </div>

      <!-- /#wrapper -->
    </div>
  </div>
</template>

<script>
import JQuery from "jquery";
let $ = JQuery;

export default {
  name: "App",
  updated() {
    this.hideInitials();

    // console.log(this.hideNav); // eslint-disable-line no-console
  },

  mounted() {
    //console.log();
    this.hideInitials();
    $(function() {
      $(window).resize(function() {
        if ($(window).width() <= 768) {
          $("#wrapper").removeClass("toggled");
        } else {
          $("#wrapper").addClass("toggled");
        }
      });
    });
    ////console.log(this.$route.path);

    let notif = {
      pic:
        "https://images.unsplash.com/photo-1518806118471-f28b20a1d79d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80",
      body: "I am visiting you next sunday, So dont go anywhere",
      timeStamp: "Oct 25,2019"
    };

    let notif1 = {
      pic:
        "https://images.unsplash.com/photo-1466112928291-0903b80a9466?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80",
      body: "Hy! How are you, Its Monday today",
      timeStamp: "Oct 26,2019"
    };
    let notif2 = {
      pic:
        "https://oldstyledating.co.uk/wp-content/uploads/2019/08/Headshot-photographer-Lincoln-Nottingham-Leicester-Peterborough-Midlands-Andrej-V-captivating-headshots-1080x675.jpg",
      body: "You have new order form Mr. Aslam Lahore",
      timeStamp: "Oct 27,2019"
    };
    this.notifications.push(notif);
    this.notifications.push(notif1);
    this.notifications.push(notif2);
  },
  data() {
    return {
      hideLink: false,
      notificationBar: false,
      notifications: [],
      hideNav: false,
      sideBar: false
    };
  },
  methods: {
    checkLogin() {
      const token = window.localStorage.getItem("token");

      return token;
    },
    hideSidebar() {
      $("#wrapper").toggleClass("toggled");
    },
    hideInitials() {
      const role = window.localStorage.getItem("role");
      if (role === "POS") {
        this.hideLink = true;
      }
      this.hideNav = this.$route.meta.hideNav;
    },
    toggleNav() {
      this.sideBar = !this.sideBar;
    },
    logout: function() {
      var app = this;
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      app.$router.push("/login");
      this.hideNav = true;
      this.hideLink = false;
    },
    toggleNotifications() {
      this.notificationBar = !this.notificationBar;
    },
    deleteNotif(notif) {
      this.notifications.splice(this.notifications.indexOf(notif), 1);
    }
  },
  computed: {}
};
</script>

<style>
body {
  overflow-x: hidden;
}

#wrapper {
  padding-left: 0;
  -webkit-transition: all 0.5s ease;
  -moz-transition: all 0.5s ease;
  -o-transition: all 0.5s ease;
  transition: all 0.5s ease;
}

#wrapper.toggled {
  padding-left: 203px;
}

#sidebar-wrapper {
  z-index: 1000;
  position: fixed;
  left: 0;
  width: 0;
  height: 100%;
  margin-right: -203px;
  overflow-y: auto;
  background:#f1f0eb;

  -webkit-transition: all 0.5s ease;
  -moz-transition: all 0.5s ease;
  -o-transition: all 0.5s ease;
  transition: all 0.5s ease;
}
div#sidebar-wrapper {
  z-index: 999;
}
nav.navbar.navbar-expand.navbar-dark.bg-navbar.pt-1.pb-1.fixed-top {
  z-index: 1000;
}
#wrapper.toggled #sidebar-wrapper {
  width: 203px;
}

#page-content-wrapper {
  width: 100%;
  position: absolute;
  padding: 15px;
}

#wrapper.toggled #page-content-wrapper {
  position: absolute;
  margin-right: 0px;
}

/* Sidebar Styles */

.sidebar-nav {
  position: absolute;
  top: 0;
  width: 203px;
  margin: 0;
  padding: 0;
  list-style: none;
}

.sidebar-nav li {
  text-indent: 10px;
  line-height: 40px;
}

.sidebar-nav li a {
  display: block;
  text-decoration: none;
  color: black;
  font-weight: 600;
  font-size: 14px !important;
  
}

.sidebar-nav li a:hover {
  text-decoration: none;
  color: #C87510;
  background: rgba(58, 58, 58, 0.1);
}

.sidebar-nav li a:active,
.sidebar-nav li a:focus {
  text-decoration: none;
}

.sidebar-nav > .sidebar-brand {
  height: 65px;
  font-size: 18px;
  line-height: 60px;
}

.sidebar-nav > .sidebar-brand a {
  color: #999999;
}

.sidebar-nav > .sidebar-brand a:hover {
  color: #fff;
  background: none;
}

@media (min-width: 768px) {
  #wrapper {
    padding-left: 0;
  }
  #wrapper.toggled {
    padding-left: 203px;
  }
  #sidebar-wrapper {
    width: 0;
  }
  #wrapper.toggled #sidebar-wrapper {
    width: 203px;
  }
  #page-content-wrapper {
    padding: 20px;
    position: relative;
  }
  #wrapper.toggled #page-content-wrapper {
    position: relative;
    margin-right: 0;
  }
}
.app-menu__item {
  overflow: visible;
  border-left-color: #c9992c;
  color: rgba(200, 117, 16, 1);
}

.app-menu__item {
  position: relative;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  padding: 3px 0px;
  font-size: 1.08em;

  -webkit-transition: border-left-color 0.3s ease, background-color 0.3s ease;
  -o-transition: border-left-color 0.3s ease, background-color 0.3s ease;
  transition: border-left-color 0.3s ease, background-color 0.3s ease;
  color: #fff;
}

.app-menu__item.active,
.app-menu__item:hover,
.app-menu__item:focus {
  background: rgb(255, 255, 255, 0.2);
  border-left-color: #c9992c;
  text-decoration: none;
  color: rgba(200, 117, 16, 1);
  
}
div#sidebar-wrapper::-webkit-scrollbar {
  width: 4px;
  height: 4px;
}
div#sidebar-wrapper::-webkit-scrollbar-thumb {
  background: #c9992c;
}
span.app-menu__label {
  font-size: 16px;
  padding-left: 10px;
}
.sidebar-brand img {
  margin-left: -5px;
  margin-top: -4px;
}
.bg-navbar {
  background: #C87510;
  box-shadow: 1px 2px 20px rgb(255, 255, 255, 0.3);
}
#menu-toggle {
  color: white;
  margin-top: 5px;
}

#nav_Logo {
  width: 45px;
  height: 40px;
  margin-bottom: 0px;
  margin-top: -4px;
  margin-left: 20px;
}
.bellWrapper {
  background-color: white;
  width: 35px;
  height: 35px;
  border-radius: 50%;
  line-height: 35px;
  text-align: center;
  box-shadow: 2px 2px 5px grey;
  cursor: pointer;
}
.bell {
  font-size: 20px;
  color: #9f2925;
  transform: rotate(-15deg);
}
.notificationCard {
  position: absolute;
  z-index: 99999999;
  left: 71%;
  top: 7%;
  width: 400px;
  padding: 0px;
  margin: 0;
  transition: 0.4s;
}
@media only screen and (max-width: 768px) {
  /* For mobile phones: */
  .notificationCard {
    left: 1%;
  }
  .notifNumber {
    left: 94% !important;
  }
}
.card {
  padding: 0px;
  max-height: 550px !important;
  overflow: scroll;
  overflow-x: hidden;
}
.card::-webkit-scrollbar {
  width: 3px;
}

/* Track */
.card::-webkit-scrollbar-track {
  background: lavender;
}

/* Handle */
.card::-webkit-scrollbar-thumb {
  background: #c9992c;
}

.innerCard {
  box-shadow: 0;
}
.notifPic {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  box-shadow: 2px 2px 4px silver;
}
.notifRow {
  padding: 10px;
  border-top: 1px solid lavender;
}
.notifRow:hover {
  box-shadow: 3px 3px 5px silver;
  transition: 0.3s;
  cursor: pointer;
}
.crossBtn {
  position: absolute;
  margin-top: -65px;
  margin-left: 92%;
  color: grey;
  font-size: 12px;
}
.crossBtn:hover {
  color: darkred;
}
.notifNumber {
  position: absolute;
  left: 98%;
  border-radius: 50%;
  background-color: red;
  color: white;
}
.noNotif {
  height: 200px;

  text-align: center;
}
.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s ease;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
#logo {
  margin-left: 20px;
  font-family: Cambria, Cochin, Georgia, Times, "Times New Roman", serif;
}
.colorWhite {
  color: white;
}
.smallText {
  font-size: 10px;
}
.left-20 {
  margin-left: 20px;
}
.fa {
  font-size: 22px;
  margin-top: 3px;
}
.text_center {
  text-align: center;
  vertical-align: middle;
}
#logout {
  color: white;
  cursor: pointer;
}
.active {
  background: rgba(200, 117, 16, 0.2);

  border-left: 3px solid #C87510;
  text-decoration: none;
  color: #C87510 !important;
}
</style> 
