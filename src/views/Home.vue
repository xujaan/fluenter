<template>
  <div>
    <div class="main-menu">
      <div v-for="item of databaseStore.documents" :key="item.id">
        <div
          v-if="item.id > parseInt(getValue(user, '0.level'))"
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
            @click="router.push('/dialogues/' + item.id)"
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
import { useRouter } from "vue-router";
import { async } from "@firebase/util";

let user;
const userStore = useUserStore();
const databaseStore = useDatabaseStore();

const router = useRouter();
databaseStore.getLevels();
databaseStore.getUser();

function getValue(object, string, defaultValue = "") {
  return _.get(object, string, defaultValue);
}

user = databaseStore.users;
</script>
