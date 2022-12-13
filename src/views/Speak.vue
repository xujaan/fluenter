<template>
  <div>
    <div class="w-full bg-black rounded-full h-3.5 p-0.5">
      <div class="bg-primary h-2.5 rounded-full" style="width: 70%"></div>
    </div>
    <div class="main-dialogue">
      <div>
        <div class="uppercase mb-3">
          <h1>{{ getValue(dial, "0.name") }}</h1>
          <h1>{{ getValue(dial, "0.title") }}</h1>
        </div>
        <div class="dialogue-record">
          <h3>
            <!-- {{ item.dialog[randomint].text }} -->
            {{ getValue(dial, "0.dialog." + randomint + ".text") }}
          </h3>
        </div>
        <div class="dialogue-result">
          <h3>{{}}</h3>
        </div>
      </div>
      <div class="flex justify-center mt-12">
        <div
          class="bg-primary rounded-full p-3 border-black border-4 cursor-pointer"
          @click="
            endDialog();
            selesai = !selesai;
          "
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
databaseStore.getUser();
databaseStore.getConversation(route.params.id);
// if (databaseStore.conversation.length == 0) {
// }
const user = databaseStore.users;
const dial = databaseStore.conversation;
const selesai = ref(false);
let randomint = Math.floor(Math.random() * getValue(dial, "0.dialog").length);
function randint() {
  randomint = Math.floor(Math.random() * getValue(dial, "0.dialog").length);
}
function getValue(object, string, defaultValue = "") {
  return _.get(object, string, defaultValue);
}

function endDialog() {
  let currentdial = getValue(dial, "0.id");
  let scoreresult = Math.floor(Math.random() * 100);
  databaseStore.score = scoreresult;

  let id = getValue(user, "0.id");
  let level = getValue(user, "0.level");
  let dialog = getValue(user, "0.dialog");
  let dialog_name = "Dialog " + level + "-" + dialog;
  let score = getValue(user, "0.score");
  let rank = 0;
  if (dialog == 30) {
    dialog = 30;
  } else if (currentdial < dialog) {
    dialog = dialog;
  } else {
    dialog = dialog + 1;
  }
  score[dialog - 1]["dialog_score"] = parseInt(scoreresult);

  if (getValue(user, "0.dialog") == 9 || getValue(user, "0.dialog") == 19) {
    level = level + 1;
    // } else if (getValue(user, "0.dialog") == 30) {
    //   level = level;
  } else {
    level = level;
  }
  let score_total = score.reduce((accumulator, object) => {
    return accumulator + object.dialog_score;
  }, 0);

  databaseStore.updateUser(
    id,
    level,
    dialog,
    dialog_name,
    score_total,
    score,
    rank
  );
}
</script>
