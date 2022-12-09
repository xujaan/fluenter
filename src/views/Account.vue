<template>
  <div class="flex flex-col justify-center items-center">
    <div class="bg-black rounded-md">
      <h1 class="text-primary p-5 text-center">
        {{ user.name }}
      </h1>
      <div
        class="text-center bg-primary px-20 py-5 border-black border-2 rounded-md"
      >
        <h3>Level</h3>
        <h1 class="text-5xl border-b-2 border-black">
          {{ getValue(users, "0.level") }}
        </h1>
        <h3>Dialog</h3>
        <h1 class="text-5xl border-b-2 border-black">
          {{ getValue(users, "0.dialog") }}
        </h1>
        <h3>Peringkat</h3>
        <h1 class="text-5xl border-b-2 border-black">
          {{ getValue(users, "0.rank") }}
        </h1>
      </div>
    </div>

    <button class="btn-shadow bottom-8 w-32 mt-10" @click="router.go(-1)">
      Kembali
    </button>
  </div>
</template>

<script setup>
import _ from "lodash";
import { useUserStore } from "../stores/user";
import { useDatabaseStore } from "../stores/database";
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
const route = useRoute();
const router = useRouter();
const userStore = useUserStore();
const databaseStore = useDatabaseStore();
databaseStore.getUser();
const users = databaseStore.users;
let user = userStore.userData;
function getValue(object, string, defaultValue = "") {
  return _.get(object, string, defaultValue);
}
</script>
