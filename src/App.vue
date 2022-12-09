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
      <div
        class="dropdown inline-block relative z-10"
        @click="toggledrop = !toggledrop"
      >
        <a href="#" @click="" v-if="userStore.userData" class="dropdown-user">
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
        <ul
          class="dropdown-toggle divide-black divide-y-4 dropdown-menu absolute font-semibold border-2 mt-2 border-black rounded-md"
          v-show="toggledrop"
        >
          <li>
            <div
              class="rounded-t bg-primary hover:bg-yellow-400 py-2 px-4 block whitespace-no-wrap cursor-pointer"
              @click="router.push('/account')"
            >
              Akun
            </div>
          </li>
          <li class="">
            <div
              class="bg-primary hover:bg-yellow-400 py-2 px-4 block whitespace-no-wrap cursor-pointer"
              @click="router.push('/rank')"
            >
              Peringkat
            </div>
          </li>
          <li @click="userStore.logoutUser">
            <div
              class="rounded-b bg-primary hover:bg-yellow-400 py-2 px-4 block whitespace-no-wrap cursor-pointer"
            >
              Keluar
            </div>
          </li>
        </ul>
      </div>
      <h1>Fluenter</h1>
    </div>

    <div class="container-parent">
      <div v-if="!userStore.loadingSession">
        <router-view class="container-base" v-if="userStore.userData">
        </router-view>
        <router-view class="container-login" v-else></router-view>
      </div>
      <div class="w-full h-full flex justify-center mb-52" v-else>
        <img src="../src/assets/img/loading.svg" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useUserStore } from "./stores/user";
const router = useRouter();

const userStore = useUserStore();
const toggledrop = ref(false);
</script>
