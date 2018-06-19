<template>
<div>
<div id="container-main">
  <div id="container-login">
    <form @submit.prevent="newUser ? handleSignUp() : handleSignIn()" :key="newUser ? 123 : 456">
      <h1>{{ this.newUser ? 'Sign Up' : 'Sign In' }}</h1><span @click.prevent="handleZoom" id="exit"><b>X</b></span>
      <div id="message"></div>
      Username:
      <input
        required
        @keyup="validate"
        v-model="creds.username"
        pattern=".{3,20}"
      >
      <br>
      Password:
      <input
        required
        @keyup="validate"
        :type="show ? 'text' : 'password'"
        :name="newUser ? 'new-password' : 'current-password'"
        v-model="creds.password"
        pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,20}"
      >
      <br>
      <span v-show="newUser" id="requirements">
        <strong><span id="user-limit">Username must be 3-20 characters</span></strong><br>
        <strong>Password must contain:</strong><br>
        <span id="lower">1 lower case letter</span><br>
        <span id="upper">1 upper case letter</span><br>
        <span id="number">1 number</span><br>
        <span id="symbol">1 symbol</span><br>
        <span id="limit">8-20 characters</span><br>
      </span><br>
      <div id="handlers">
        <a id="link-switch" @click.prevent="toggle">
          {{ newUser ? "Already a member?" : "New user?"}}
        </a>
        <button v-show="!newUser" @click.prevent="show = !show">{{ show ? 'Hide' : 'Show' }}</button><br>
        <button>
          Submit
        </button>
      </div>
    </form>
  </div>
</div>
</div>
</template>

<script>
import {
  signUp,
  signIn } from '../../services/api.js';
// import './main.css';

export default {
  props: {
    toggleZoom: {
      type: Function,
      require: true
    }
  },
  data() {
    return {
      newUser: true,
      creds: { username : '', password : '' },
      label: null,
      show: false,
      valid: false
    };
  },
  methods: {
    toggle() {
      this.newUser = !this.newUser;
      this.valid = !this.newUser;
      this.show = false;
      this.creds.password = '';
      this.validate();
    },
    validate() {
      const userLimit = document.getElementById('user-limit');
      const lower = document.getElementById('lower');
      const upper = document.getElementById('upper');
      const number = document.getElementById('number');
      const limit = document.getElementById('limit');
      const symbol = document.getElementById('symbol');
      // Check user limit
      if(this.creds.username.match(/^.{3,20}$/)) {
        userLimit.style.color = 'green';
      }
      else {
        userLimit.style.color = 'red';
      }
      // Check lower
      if(this.creds.password.match(/[a-z]/g)) {
        lower.style.color = 'green';
      }
      else {
        lower.style.color = 'red';
      }
      // Check upper
      if(this.creds.password.match(/[A-Z]/g)) {
        upper.style.color = 'green';
      }
      else {
        upper.style.color = 'red';
      }
      // Check number
      if(this.creds.password.match(/[\d]/g)) {
        number.style.color = 'green';
      }
      else {
        number.style.color = 'red';
      }
      // Check limit
      if(this.creds.password.match(/^.{8,20}$/)) {
        limit.style.color = 'green';
      }
      else {
        limit.style.color = 'red';
      }
      // Check symbol
      if(this.creds.password.match(/\W/g)) {
        symbol.style.color = 'green';
      }
      else {
        symbol.style.color = 'red';
      }
    },
    handleSignUp() {
      let message = document.getElementById('message');
      let sucess = false;
      this.creds.username = this.creds.username.toLowerCase();
      signUp(this.creds)
        .then(res => {
          this.userid = res.id;
          message.textContent = 'Successful creation!';
          this.creds = {};
          sucess = true;
        });
      if(!sucess) {
        message.textContent = 'Username already exsists!';
      }
    },
    handleSignIn() {
      let message = document.getElementById('message');
      let sucess = false;
      this.creds.username = this.creds.username.toLowerCase();
      signIn(this.creds)
        .then(res => {
          message.textContent = 'Welcome back ' + res.username.charAt(0).toUpperCase() + res.username.slice(1);
          this.creds = {};
          sucess = true;
        });
      if(!sucess) {
        message.textContent = 'Invalid username or password!';
        this.creds.password = '';
      }
    },
    handleZoom() {
      this.toggleZoom();
    }
  }
};
</script>
<style scoped>

form {
  color: white;
  background: steelblue;
  border: 1px solid black;
  border-radius: 13px;
  padding: 13px;
  width: fit-content;
  display: flex;
  flex-direction: column;
  box-shadow: 1px 1px 3px black;
}
#handlers {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
#link-switch {
  float: left;
  cursor: pointer;
  color: blue;
  text-decoration: underline;
  font-size: .75rem;
}
button {
  float: right;
}
h1 {
  display: inline;
  margin: 0 auto;
}
#requirements {
  text-align: center;
  margin: 0 auto;
  color: black;
  font-size: .69em;
  display: inline-block;
}
#message {
  color: black;
}
#container-main {
  position: fixed;
  display: flex;
  top: 0;
  left: 0;
  margin: 0;
  padding: 0;
  height: 100%;
  width: 100%;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, .69);
}
#exit {
  float: right;
  position: absolute;
  cursor: pointer;
  border-top: 1px solid gray;
  border-right: 1px solid black;
  border-bottom: 1px solid black;
  border-left: 1px solid gray;
  padding: 0 3px;
  background-color: slategrey;
}
#container-login {
  z-index: 1;
  width: fit-content;
  margin: auto;
}
</style>
