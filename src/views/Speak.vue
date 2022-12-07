<template>
  <div>
    <div class="w-full bg-black rounded-full h-3.5 p-0.5">
      <div class="bg-primary h-2.5 rounded-full" style="width: 70%"></div>
    </div>
    <div class="main-dialogue">
      <div v-for="item of databaseStore.documents" :key="item.id">
        <div class="uppercase mb-3">
          <h1>{{ item.name }}</h1>
          <h1>{{ item.title }}</h1>
        </div>
        <div class="dialogue-record">
          <h3>
            {{
              item.dialog[Math.floor(Math.random() * dial[0].dialog.length)]
                .text
            }}
          </h3>
        </div>
        <div class="dialogue-result">
          <h3>{{}}</h3>
        </div>
      </div>
    </div>
    <button
      class="btn-shadow absolute bottom-8"
      @click="
        router.push('/dialogue/' + route.params.level + '/' + route.params.id)
      "
    >
      Kembali
    </button>
    <button class="btn-shadow absolute right-8 bottom-8 w-52" @click="">
      Rekam
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
