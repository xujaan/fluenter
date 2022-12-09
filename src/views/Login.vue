<template>
  <div class="login-page">
    <div class="img-login">
      <img src="../assets/img/ConversationOutline.svg" />
    </div>
    <div class="form-login">
      <div class="relative py-4">
        <div class="absolute inset-0 flex items-center">
          <div class="w-full border-b border-black"></div>
        </div>
        <div class="relative flex justify-center">
          <span class="px-4 text-sm font-bold text-black bg-secondary"
            >Pilihan lain</span
          >
        </div>
      </div>
      <button @click="handleGoogle" class="btn-google">
        <img src="../assets/img/google-btn.svg" width="300" />
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

const user = userStore.currentUser();
if (user) {
  router.resolve("/dashboard");
}
</script>
