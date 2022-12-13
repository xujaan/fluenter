<template>
  <div>
    <div class="w-full bg-black rounded-full h-3.5 p-0.5">
      <div class="bg-primary h-2.5 rounded-full" style="width: 100%"></div>
    </div>
    <div class="main-dialogue">
      <div>
        <div class="uppercase mb-3">
          <h1>{{ getValue(dial, "0.name") }}</h1>
          <h1>{{ getValue(dial, "0.title") }}</h1>
        </div>
      </div>
      <div class="main-score">
        <div
          class="border-black border-2 rounded-lg py-8 px-24 bg-primary text-center"
        >
          <p class="font-bold text-lg">SKOR KAMU</p>
          <h1 class="text-7xl">{{ score }}</h1>
        </div>
      </div>
    </div>
    <button
      class="btn-shadow md:absolute bottom-8 w-40 mt-20 md:mt-0"
      @click="router.go(-1)"
    >
      Ulangi Tes
    </button>
    <button
      class="btn-shadow md:absolute right-8 bottom-8 w-64"
      @click="router.push('/dialogue/' + route.params.level)"
    >
      Dialog Selanjutnya
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
// if (databaseStore.conversation.length == 0) {
// }
databaseStore.getUser();

databaseStore.getConversation(route.params.id);
let score = databaseStore.score;

const user = databaseStore.users;
const dial = databaseStore.conversation;

function getValue(object, string, defaultValue = "") {
  return _.get(object, string, defaultValue);
}
</script>
