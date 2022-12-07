<template>
  <div>
    <div class="main-menu">
      <div class="level-menu cursor-pointer" @click="router.push('/dashboard')">
        <div class="divide-y-2 divide-black uppercase mt-5">
          <h2>Pilih Level</h2>
          <h2>Pick Level</h2>
        </div>
      </div>
      <div v-for="item of databaseStore.documents" :key="item.id">
        <div
          v-if="item.id > parseInt(getValue(user, '0.dialog'))"
          class="grayscale"
        >
          <div class="level-menu">
            <h2>{{ item.name }}</h2>
            <div class="divide-y-2 divide-black uppercase mt-5">
              <h3>{{ item.desc_id }}</h3>
              <h3>{{ item.desc_en }}</h3>
            </div>
          </div>
        </div>
        <div v-else>
          <div
            class="level-menu cursor-pointer"
            @click="router.push('/dialogue/' + item.level + '/' + item.id)"
          >
            <h2>{{ item.name }}</h2>
            <div class="divide-y-2 divide-black uppercase mt-5">
              <h3>{{ item.desc_id }}</h3>
              <h3>{{ item.desc_en }}</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import _ from "lodash";
import { useUserStore } from "../stores/user";
import { useDatabaseStore } from "../stores/database";
import { onBeforeMount, onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { async } from "@firebase/util";
import { orderBy } from "firebase/firestore/lite";

const router = useRouter();
const route = useRoute();
const userStore = useUserStore();
const databaseStore = useDatabaseStore();
databaseStore.getDialogues(route.params.level);
databaseStore.getUser();
let user = databaseStore.users;
function getValue(object, string, defaultValue = "") {
  return _.get(object, string, defaultValue);
}
// onBeforeMount(async () => {
//   await databaseStore.getDialogues(route.params.level);
// });
</script>
