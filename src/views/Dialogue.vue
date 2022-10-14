<template>
  <div>
    <!-- <form @submit.prevent="handleSubmit">
          <input type="text" placeholder="Ingrese url" v-model="url" />
          <button type="submit">Agregar</button>
        </form>
        <p v-if="databaseStore.loadingDoc">loading docs</p>
        <ul v-else>
          <li v-for="item of databaseStore.documents" :key="item.id">
            {{ item.desc_en }} - {{ item.name }}
            <br />
            {{ item.desc_id }}
            <br />
            <button @click="databaseStore.deleteUrl(item.id)">Eliminar</button>
            <button @click="router.push(`/editar/${item.id}`)">Editar</button>
          </li>
        </ul> -->
    <!-- <h1>Home</h1>
        <p>{{ userStore.userData?.email }}</p> -->
    <a href="/dashboard">
      <button>Back</button>
    </a>
    <div class="main-menu">
      <a href="#" v-for="item of databaseStore.documents" :key="item.id">
        <div class="level-menu">
          <h2>{{ item.name }}</h2>
          <div class="divide-y-2 divide-black uppercase mt-5">
            <h3>{{ item.desc_id }}</h3>
            <h3>{{ item.desc_en }}</h3>
          </div>
        </div>
      </a>
    </div>
  </div>
</template>

<script setup>
// import { useUserStore } from "../stores/user";
// const userStore = useUserStore();
import { useUserStore } from "../stores/user";
import { useDatabaseStore } from "../stores/database";
import { ref } from "vue";
import { useRoute } from "vue-router";
const route = useRoute();

const userStore = useUserStore();
const databaseStore = useDatabaseStore();
databaseStore.getDialogues(route.params.id);

const url = ref("");
const handleSubmit = () => {
  databaseStore.addUrl(url.value);
};
</script>
