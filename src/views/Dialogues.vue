<template>
  <div>
    <div class="main-menu">
      <!-- <a href="/dashboard"> -->

      <div class="level-menu cursor-pointer" @click="router.push('/dashboard')">
        <div class="divide-y-2 divide-black uppercase mt-5">
          <h2>Pilih Level</h2>
          <h2>Pick Level</h2>
        </div>
      </div>
      <!-- </a> -->
      <div
        class="level-menu cursor-pointer"
        v-for="item of databaseStore.documents"
        :key="item.id"
        @click="router.push('/dialogue/' + item.id)"
      >
        <h2>{{ item.name }}</h2>
        <div class="divide-y-2 divide-black uppercase mt-5">
          <h3>{{ item.desc_id }}</h3>
          <h3>{{ item.desc_en }}</h3>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// import { useUserStore } from "../stores/user";
// const userStore = useUserStore();
import { useUserStore } from "../stores/user";
import { useDatabaseStore } from "../stores/database";
import { onBeforeMount, onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { async } from "@firebase/util";

const userStore = useUserStore();
const databaseStore = useDatabaseStore();
const router = useRouter();
const route = useRoute();
databaseStore.getDialogues(route.params.level);
// onBeforeMount(async () => {
//   await databaseStore.getDialogues(route.params.level);
// });
</script>
