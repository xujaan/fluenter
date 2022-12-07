<template>
  <div>
    <h1>Editar id: route.params</h1>
    <form @submit.prevent="handleSubmit">
      <input type="text" placeholder="Ingrese url" v-model="url" />
      <button type="submit">Editar</button>
    </form>
    <textarea cols="30" rows="10"></textarea>
    <div
      v-for="item of databaseStore.documents"
      :key="item.id"
      @click="router.push('/dialogue/' + item.id)"
    >
      <p>{{ item }}</p>
      <div class="level-menu cursor-pointer">
        <h2>{{ item.name }}</h2>
        <div class="divide-y-2 divide-black uppercase mt-5">
          <h3>{{ item.desc_id }}</h3>
          <h3>{{ item.desc_en }}</h3>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { useDatabaseStore } from "../stores/database";
// import datadial from "../../public/data.json";
const route = useRoute();
const databaseStore = useDatabaseStore();
const url = ref("");
databaseStore.getDialogues();
let testarr = JSON.parse(JSON.stringify());
// console.log(testarr);
const handleSubmit = () => {
  // databaseStore.updateDialogue(route.params.id, url.value);
  for (let index = 0; index < testarr.length; index++) {
    // const element = array[index];
    console.log(index);
    databaseStore.addDialogue(testarr[index]);
  }
};

// onMounted(async () => {
//   url.value = await databaseStore.leerUrl(route.params.id);
// });
</script>
