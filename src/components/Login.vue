<template>
  <div class="login row text-center mt-5">
    <div class="col-lg-4 col-md-5 col-sm-7 m-auto pt-1">
      <div class=" shadow bg-white px-4 py-4">
        <div class="">
          <img
            src="../assets/logo.png"
            class="mt-3"
            style="width:60%;margin-bottom:100px"
            alt
            
          />
          <b-form @submit.stop.prevent="onSubmit">
            <div class="phoneBlock" id="main-heading" v-if="display">
              <div class="row">
                <!-- Name-->
                <div class="col-sm-12">
                  <b-form-group id="name-Group" label-for="name">
                    <b-form-input
                      id="name"
                      name="name"
                      v-model="login.email"
                      v-validate="{ required: true }"
                      :state="validateState('name')"
                      autocomplete="off"
                      aria-describedby="name-live-feedback"
                      placeholder="Email"
                    ></b-form-input>
                  </b-form-group>
                </div>
                <!-- Password-->
                <div class="col-sm-12">
                  <b-form-group id="password-Group" label-for="password">
                    <b-form-input
                      id="password"
                      name="password"
                      type="password"
                      autocomplete="off"
                      v-model="login.password"
                      v-validate="{ required: true }"
                      :state="validateState('password')"
                      aria-describedby="password-live-feedback"
                      placeholder="Password"
                      @keypress.enter="onSubmit"
                    ></b-form-input>
                  </b-form-group>
                </div>
              </div>
              <button class="btn btn-primary btn-block mt-3 mb-1 pb-2" :disabled="loging">
                <span v-if="loging">
                  <b-spinner small type="grow"></b-spinner>Authenticating...
                </span>
                <span v-else>Login</span>
              </button>
            </div>
          </b-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ApiService from "../services/ApiService";


export default {
  name: "login",
  data() {
    return {
      loging: false,
      display: true,
      display2: false,
      login: { email: "osama111@gmail.com", password: "@Fli321" }
    };
  },
  methods: {
    
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

        this.loging = true;
        ApiService.save("auth/login", this.login)
          .then(response => {
            setTimeout(() => {
              // console.log(response.data.data); // eslint-disable-line no-console
              localStorage.setItem("token",response.data.data.access_token)
              this.$success(response.data.message);
              this.$router.push("/");
              
              this.loging = false;
            }, 1000);
          })
          .catch(e => {
            this.$error(e.response.data.error); 
            this.loging = false;
          });
      });
    },
   
    created: function() {
      //   this.loginAuth();
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.btn-primary {
  height: 37px;
  background-color:#C87510;
  border: 0;
  border-radius: 0;
  font-weight: 600;
}
.btn-primary:hover {
  background-color: #925408;
  box-shadow: 2px 2px 5px black;
}

.login {
  left: 0;
  top: -12%;
  width: 100%;
  height: 110%;
  margin: 0;
  padding: 0;
  position: fixed;
  background-color:#f1f0eb
  
}
#main-heading {
  margin-top: -60px;
}
#logo {
  margin-top: -70px;
  margin-left: -10px;
}
.logo {
  font-weight: 900;
}
input.insideInput {
  width: 76%;
  border: none;
  height: 100%;
}
input.insideInput:focus {
  border: none;
  outline: none;
}
html {
  background: #eee;
  margin: 5% 0 0 35%;
  font-family: "arial", sans-serif;
}
@-webkit-keyframes autofill {
  to {
    color: #fff;
    background: transparent;
  }
}
input:-webkit-autofill,
input:-webkit-autofill:hover,
input:-webkit-autofill:focus,
textarea:-webkit-autofill,
textarea:-webkit-autofill:hover,
textarea:-webkit-autofill:focus,
select:-webkit-autofill,
select:-webkit-autofill:hover,
select:-webkit-autofill:focus {
  -webkit-animation-name: autofill;
  -webkit-animation-fill-mode: both;
}
/*For Chrome*/
input:focus,
select:focus,
textarea:focus,
button:focus {
  outline: none;
}

</style>
