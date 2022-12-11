<template>
  <div>
    <div class="w-full bg-black rounded-full h-3.5 p-0.5">
      <div class="bg-primary h-2.5 rounded-full" style="width: 70%"></div>
    </div>
    <div class="main-dialogue">
      <div v-for="item of databaseStore.conversation" :key="item.id">
        <div class="uppercase mb-3">
          <h1>{{ item.name }}</h1>
          <h1>{{ item.title }}</h1>
        </div>
        <div class="dialogue-record">
          <h3>
            {{ item.dialog[randomint].text }}
          </h3>
        </div>
        <div class="dialogue-result">
          <h3>{{}}</h3>
        </div>
      </div>
      <div class="flex justify-center mt-12">
        <div
          class="bg-primary rounded-full p-3 border-black border-4 cursor-pointer"
          @click="selesai = !selesai"
        >
          <img src="../assets/img/mic.svg" alt="" class="w-14" />
        </div>
      </div>
    </div>
    <button class="btn-shadow absolute bottom-8" @click="router.go(-1)">
      Kembali
    </button>
    <button
      class="btn-shadow absolute right-8 bottom-8 md:w-52"
      @click="
        router.push('/score/' + route.params.level + '/' + route.params.id)
      "
      v-show="selesai"
    >
      Selesai
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
if (databaseStore.conversation.length == 0) {
  databaseStore.getConversation(route.params.id);
}
const dial = databaseStore.conversation;
const selesai = ref(false);
let randomint = Math.floor(Math.random() * getValue(dial, "0.dialog").length);
function randint() {
  randomint = Math.floor(Math.random() * getValue(dial, "0.dialog").length);
}
function getValue(object, string, defaultValue = "") {
  return _.get(object, string, defaultValue);
}
</script>
