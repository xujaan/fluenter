<template>
  <div>
    <div class="w-full bg-black rounded-full h-3.5 p-0.5">
      <div class="bg-primary h-2.5 rounded-full" style="width: 35%"></div>
    </div>
    <div class="main-dialogue">
      <div v-for="item of databaseStore.documents" :key="item.id">
        <div class="uppercase mb-3">
          <h1>{{ item.name }}</h1>
          <h1>{{ item.title }}</h1>
        </div>
        <div class="dialogue-table">
          <table class="table-auto [border-spacing:0.75rem]">
            <tbody>
              <tr v-for="(row, id) of item.dialog">
                <!-- <td>
                  <h3 class="mr-2 cursor-pointer">🔊</h3>
                </td> -->
                <td>
                  <h3>
                    <span class="text-red-800 uppercase">{{ row.name }}</span>
                  </h3>
                </td>
                <td>
                  <h3 class="mx-2">:</h3>
                </td>
                <td>
                  <h3>
                    {{ row.text }}
                  </h3>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <button
      class="btn-shadow absolute bottom-8"
      @click="router.push('/dialogues/' + route.params.id)"
    >
      Kembali
    </button>
    <div class="absolute right-8 bottom-8">
      <button class="btn-shadow mr-5 animate-bounce">Putar Dialog</button>
      <button
        class="btn-shadow"
        @click="router.push('/speak/' + route.params.id)"
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
databaseStore.getDialogues(route.params.id);
</script>
