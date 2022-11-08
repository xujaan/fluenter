<template>
  <div class="container">
    <div class="nav-parent">
      <!-- <nav v-if="!userStore.loadingSession"> -->
      <!-- <router-link to="/dashboard" v-if="userStore.userData"
          >Home</router-link
        >
        | <router-link to="/" v-if="!userStore.userData">Login</router-link> |
        <router-link to="/register" v-if="!userStore.userData"
          >Register</router-link
        >
        |
        <button @click="userStore.logoutUser" v-if="userStore.userData">
          Logout
        </button> -->
      <!-- </nav> -->
      <!-- <div v-else>loading user...</div> -->
      <a href="#" @click="userStore.logoutUser" v-if="userStore.userData">
        <div
          class="img-user"
          :style="{
            backgroundImage: 'url(\'' + userStore.userData['photo'] + '\')',
            backgroundPosition: 'center center',
            backgroundSize: 'cover',
          }"
          referrerpolicy="no-referrer"
        >
          >
        </div>
      </a>
      <h1>Fluenter</h1>
    </div>
    <div class="container-parent">
      <router-view
        class="container-base"
        v-if="userStore.userData"
      ></router-view>
      <router-view class="container-login" v-else></router-view>
    </div>
  </div>
</template>

<script setup>
import { useUserStore } from "./stores/user";
const userStore = useUserStore();
// const photo_profile = userStore.userData["photo"];
// console.log(userStore.userData["photo"]);
</script>
