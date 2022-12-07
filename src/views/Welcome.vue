<template>
  <div>
    <h1>Selamat Datang</h1>
    <button
      class="btn-shadow absolute right-8 bottom-8 w-52"
      @click="router.push('/dashboard')"
    >
      Pilih Level
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
</script>
