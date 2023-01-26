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
          <h1 class="text-7xl">
            {{ totalscore }}
          </h1>
          <div class="mt-3 border-t-2 border-black pt-3">
            <h3>
              Akurasi: {{ getValue(score, "data.NBest.0.AccuracyScore") }}
            </h3>
            <h3>
              Kefasihan: {{ getValue(score, "data.NBest.0.FluencyScore") }}
            </h3>
            <h3>
              Ketuntasan:
              {{ getValue(score, "data.NBest.0.CompletenessScore") }}
            </h3>
            <h3>Pengucapan: {{ getValue(score, "data.NBest.0.PronScore") }}</h3>
          </div>
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
let score = databaseStore.resultscore;
console.log(score);
let accuracy = getValue(score, "data.NBest.0.AccuracyScore");
let fluency = getValue(score, "data.NBest.0.FluencyScore");
let completeness = getValue(score, "data.NBest.0.CompletenessScore");
let pronunciation = getValue(score, "data.NBest.0.PronScore");

let totalscore = parseInt(
  (accuracy + fluency + completeness + pronunciation) / 4
);
console.log(totalscore);

const user = databaseStore.users;
const dial = databaseStore.conversation;

function getValue(object, string, defaultValue = "") {
  return _.get(object, string, defaultValue);
}
</script>
