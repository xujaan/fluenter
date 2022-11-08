<template>
  <div>
    <h1>Editar id: route.params</h1>
    <form @submit.prevent="handleSubmit">
      <input type="text" placeholder="Ingrese url" v-model="url" />
      <button type="submit">Editar</button>
    </form>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { useDatabaseStore } from "../stores/database";
const route = useRoute();
const databaseStore = useDatabaseStore();

const url = ref("");

const handleSubmit = () => {
  databaseStore.updateDialogue(route.params.id, url.value);
};

onMounted(async () => {
  url.value = await databaseStore.leerUrl(route.params.id);
});
</script>
