<template>
  <div class="login-page">
    <div class="img-login">
      <img src="../assets/img/ConversationOutline.svg" />
    </div>
    <div class="form-login">
      <h1 class="text-4xl md:text-7xl">Fluenter</h1>
      <div class="my-3 md:mt-5">
        <h1 class="text-md md:text-4xl">
          Belajar fasih berbahasa inggris secara bertahap menggunakan bahan
          pembelajaran American English
        </h1>
      </div>
      <div class="relative md:py-10 md:mt-5">
        <div class="absolute inset-0 flex items-center">
          <div class="w-full border-b border-black"></div>
        </div>
        <div class="relative flex justify-center">
          <span class="px-4 md:text-xl font-bold text-black bg-secondary"
            >LANJUTKAN LOGIN</span
          >
        </div>
      </div>
      <button @click="handleGoogle" class="btn-google">
        <img src="../assets/img/google-btn.svg" width="500" />
      </button>
      <!-- <button type="button" @click="handleTwitter">Login with Twitter</button> -->
    </div>
  </div>
</template>

<script setup>
import { async } from "@firebase/util";
import { ref } from "vue";
import { useUserStore } from "../stores/user";
import router from "../router";

const userStore = useUserStore();
const email = ref("");
const password = ref("");

const handleSubmit = async () => {
  if (!email.value || password.value.length < 6) {
    return alert("llena los campos");
  }
  await userStore.loginUser(email.value, password.value);
};
const handleGoogle = async () => {
  await userStore.loginGoogle();
};
const handleTwitter = async () => {
  await userStore.loginTwitter();
};

if (userStore.userData !== null) {
  location.href = "/dashboard";
}
</script>
