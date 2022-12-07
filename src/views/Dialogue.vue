<!-- <script src="https://code.responsivevoice.org/responsivevoice.js?key=wBxJxE8H"></script> -->
<script setup>
// import { useUserStore } from "../stores/user";
// const userStore = useUserStore();
import { useUserStore } from "../stores/user";
import { useDatabaseStore } from "../stores/database";
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
// responsiveVoice.setDefaultVoice("US English Female");
const route = useRoute();
const router = useRouter();
const userStore = useUserStore();
const databaseStore = useDatabaseStore();
databaseStore.getDialogues(route.params.level, route.params.id);
console.log(route.params.level);
async function play() {
  const arr = databaseStore.documents[0].dialog;
  for (const index in arr) {
    console.log(index);
    if (index / 2 != 0) {
      responsiveVoice.speak(arr[index].text, "US English Male");
    } else {
      responsiveVoice.speak(arr[index].text, "US English Female");
    }
  }
}
</script>

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
              <tr
                v-for="(row, id) of item.dialog"
                class="border-b-2 border-black"
              >
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
      @click="router.push('/dialogues/' + route.params.level)"
    >
      Kembali
    </button>
    <div class="absolute right-8 bottom-8">
      <button @click="play" class="btn-shadow mr-5 animate-bounce">
        Putar Dialog
      </button>
      <button
        class="btn-shadow"
        @click="
          router.push('/speak/' + route.params.level + '/' + route.params.id)
        "
      >
        Mulai Tes
      </button>
    </div>
  </div>
</template>
