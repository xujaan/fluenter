<template>
  <div>
    <div class="main-dialogue">
      <div class="uppercase mb-3">
        <h1>{{ item.name }}</h1>
        <h1>{{ item.title }}</h1>
      </div>
      <table class="table-auto">
        <tbody>
          <tr v-for="(row, id) of item.dialog">
            <td>{{ row.name }}</td>
            <td>:</td>
            <td>{{ row.text }}</td>
          </tr>
        </tbody>
      </table>
      <div v-for="(row, id) of item.dialog">
        <h3>
          <span class="text-red-800 uppercase">{{ row.name }}</span> :
          {{ row.text }}
        </h3>
      </div>
    </div>
    <div class="absolute right-8 bottom-8">
      <button
        class="btn-shadow"
        @click="router.push('/speak/' + route.params.id)"
      >
        Rekam
      </button>
    </div>
  </div>
</template>

<script setup>
// import { useUserStore } from "../stores/user";
// const userStore = useUserStore();
import { useUserStore } from "../stores/user";
import { useDatabaseStore } from "../stores/database";
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";
const route = useRoute();
const router = useRouter();

const userStore = useUserStore();
const databaseStore = useDatabaseStore();
databaseStore.getDialogues(route.params.id);

const item = databaseStore.documents[0];

const url = ref("");
const handleSubmit = () => {
  databaseStore.addUrl(url.value);
};
</script>
