<template>
  <div>
    <div class="main-menu">
      <div v-for="item of databaseStore.dialogue" :key="item.id">
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
            @click="router.push('/conversation/' + item.level + '/' + item.id)"
          >
            <h2>{{ item.name }}</h2>
            <div class="divide-y-2 divide-black uppercase mt-5">
              <h3>{{ item.desc_id }}</h3>
              <h3>{{ item.desc_en }}</h3>
            </div>
          </div>
        </div>
      </div>
      <div
        class="bg-primary btn-shadow border-2 border-black px-8 md:pt-10 rounded-lg text-center m-4 cursor-pointer w-full h-30 md:w-80 md:h-52"
        @click="router.push('/dashboard')"
      >
        <div class="divide-y-2 divide-black uppercase md:mt-5">
          <h2>Pilih Level</h2>
          <h2>Pick Level</h2>
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
databaseStore.getDialogue(route.params.level);
databaseStore.getUser();
let user = databaseStore.users;
function getValue(object, string, defaultValue = "") {
  return _.get(object, string, defaultValue);
}
// onBeforeMount(async () => {
//   await databaseStore.getDialogues(route.params.level);
// });
</script>
