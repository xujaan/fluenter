<template>
  <div class="flex flex-col justify-center items-center">
    <h1 class="bg-black text-primary p-5 rounded-md">Halo, {{ user.name }}</h1>
    <div
      class="divide-y-2 divide border-black border-y-2 divide-black text-center mt-10"
    >
      <h2>Selamat datang di Fluenter</h2>
      <h2>Dalam Fluenter terdapat beberapa level untuk kamu kuasai</h2>
      <h2>Selamat mencoba</h2>
    </div>
    <button
      class="btn-shadow bottom-8 w-52 mt-10"
      @click="router.push('/dashboard')"
    >
      Yuk Mulai Belajar
    </button>
  </div>
</template>

<script setup>
import { useUserStore } from "../stores/user";
import { useDatabaseStore } from "../stores/database";
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
const route = useRoute();
const router = useRouter();
const userStore = useUserStore();
const databaseStore = useDatabaseStore();
databaseStore.getDialogues(route.params.level, route.params.id);
const dial = databaseStore.documents;
let user = userStore.userData;
databaseStore.loadingDoc = true;
</script>
