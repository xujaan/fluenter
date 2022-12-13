<template>
  <div class="flex flex-col justify-center items-center">
    <div class="bg-black rounded-md flex flex-wrap">
      <div
        class="text-center bg-primary px-20 py-5 border-black border-2 rounded-md"
      >
        <div
          class="grid gap-4"
          v-for="(item, n, i) of databaseStore.alluser"
          :key="item.id"
        >
          <div>
            <h2>{{ n + 1 + ". " + item.name }}</h2>
          </div>
        </div>
      </div>
      <div
        class="text-center bg-primary px-20 py-5 border-black border-2 rounded-md"
      >
        <h2>PERINGKAT KAMU</h2>
        <h1 class="text-9xl">{{ getValue(users, "0.rank") }}</h1>
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
databaseStore.getAlluser();
const users = databaseStore.users;
let user = userStore.userData;
// let alluser = databaseStore.alluser;
// const key = Object.keys(alluser).find((key) => alluser[key] === "xujaan");
console.log(key);
function getValue(object, string, defaultValue = "") {
  return _.get(object, string, defaultValue);
}
</script>
