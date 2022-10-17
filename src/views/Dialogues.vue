<template>
  <div>
    <div class="main-dialogue">
      <div v-for="item of databaseStore.documents" :key="item.id">
        <div class="uppercase mb-3">
          <h1>{{ item.name }}</h1>
          <h1>{{ item.title }}</h1>
        </div>
        <div v-for="(row, id) of item.dialog">
          <h3>
            <span class="text-red-800 uppercase">{{ row.name }}</span> :
            {{ row.text }}
          </h3>
        </div>
      </div>
    </div>
    <div class="absolute right-8 bottom-8">
      <button
        class="btn-shadow"
        @click="router.push('/speak/' + route.params.level)"
      >
        Mulai Dialog
      </button>
    </div>
  </div>
</template>

<script setup>
// import { useUserStore } from "../stores/user";
// const userStore = useUserStore();
import { useUserStore } from "../stores/user";
import { useDatabaseStore } from "../stores/database";
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
const route = useRoute();
const router = useRouter();

const userStore = useUserStore();

const databaseStore = useDatabaseStore();
databaseStore.getDialogues(route.params.level);

const url = ref("");
const handleSubmit = () => {
  databaseStore.addUrl(url.value);
};
</script>
