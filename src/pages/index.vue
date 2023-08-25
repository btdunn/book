<template>
  <div class="login-container">
    <div class="login-card">
      <div class="login-header">
        <img class="logo" src="https://cdn.book.io/logos/default.png" />
        <h2>{{ login ? 'Login' : 'Sign Up' }}</h2>
      </div>
        <template v-if="login">
          <form class="login-form">
            <label for="username">Username</label>
            <input id="username" v-model="username" />
            <label for="password">Password</label>
            <input id="password" type="password" v-model="password" />
            <div class="error-box">
              <p v-if="error" class="error">Incorrect&nbsp;Password</p>
            </div>
          </form>
        </template>
        <template v-else>
          <form class="login-form" @submit.prevent="valid && submitForm">
            <label for="username">Username</label>
            <input id="username" v-model="username" />
            <label for="password">Password</label>
            <input id="password" type="password" v-model="password" />
            <div class="error-box">
              <p v-if="error" class="error">Please try again</p>
            </div>
          </form>
        </template>
        <p  @click="toggleLogin" class="switch">{{ login ? 'Not a member? Sign Up' : 'Already a member? Login' }}</p>
        <button 
          @click="submitForm" 
          type="submit"
          :class="{
            'submit': true,
            ['submit--disabled']: !valid,
          }"
        >
          {{ login ? 'Login ►' : 'Sign Up ►' }}
        </button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useApi } from '../store/useApi';


const api = useApi()

const login = ref(false)
const valid = computed(() =>  username.value.length > 1 && password.value.length > 1)
const username = ref('')
const password = ref('')
const error = ref(false)


function toggleLogin() {
  login.value = !login.value
}

function showError() {
  error.value = true
  setTimeout(() => {
    error.value = false
  }, 2000)
}

const submitForm = async () => {
  const user = {username: username.value, password: password.value, favorite: ''}
  
  if (login.value) {
    await api.getFavorite(username.value)
      .then((result) => { user.favorite = result.book })
      .catch((error) => console.error(error))
    await api.login(user)
    .then((result) => {
      navigateTo('/books')
    })
    .catch((error) => {
      showError()
      console.error(error)
    })
  } else {
    await api.createUser(user)
      .then((result) => {
        navigateTo('/books')
      })
      .catch((error) => {
        showError()
        console.error(error)
      })
  }
}

</script>

<style lang="scss">
@use "~/assets/globals.scss";

html {
  overflow-y: hidden !important;
}

.login-container {
  display: flex;
  width: 100%;
  justify-content: center;
  padding: 8rem 0;
  height: fit-content;

  .login-card {
    display: grid;
    width: 25%;
    background-color:#EAEEF1;
    border-radius: 1rem;
    overflow: hidden;
    row-gap: 1rem;

    .login-header {
      display: grid;
      padding-top: 1rem;

      .logo {
        width: 50%;
        justify-self: center;
      }
  
      h2 {
        font-family: sans-serif;
        font-weight: 300;
        justify-self: center;
      }
    }

    p {
      font-family: sans-serif;
      justify-self: center;
      cursor: pointer;

      &:hover {
        color: #205BF8
      }
    }


    .login-form {
      width: 100%;
      justify-content: center;
      display: grid;
      row-gap: 0.5rem;

      label {
        font-family: sans-serif;
        font-weight: 100;
      }

      input {
        // appearance: none;
        outline: none;
        box-sizing: border-box;
        background-color: #FFFFFF;
        border: 1px solid #C6C2C7;
        border-radius: 0.5rem;
        padding: 0.75rem 1rem;
        width: 100%;
        height: 2.5rem;

        &:focus {
          border-color: #718FEF;
        }
      }

      .error-box {
        position: relative;
        width: 0;
        height: 0;

        .error {
          position: absolute;
          bottom: -2.5rem;
          left: 1rem;
          width: fit-content;
          color: red;
          font-family: sans-serif;
        }
      }

    }

    .submit {
      background: none;
      color: inherit;
      border: none;
      padding: 0.25rem 0;
      cursor: pointer;
      outline: inherit;
      height: 4rem;
      width: 100%;
      background-color: #718FEF;
      font-family: sans-serif;
      font-size: 18px;
      color: #FFFFFF;

      &.submit--disabled {
        background-color: #A3A9B8;
        cursor: not-allowed;

        &:hover {
          background-color: #A3A9B8;;
        }
      }

      &:hover {
        background-color: #7471EF;
      }
    }
  }
}
</style>