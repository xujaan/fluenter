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
    <div class="main-menu">
      <div class="level-menu cursor-pointer" @click="router.push('/dashboard')">
        <div class="divide-y-2 divide-black uppercase mt-5">
          <h2>Pilih Level</h2>
          <h2>Pick Level</h2>
        </div>
      </div>
      <div
        class="level-menu cursor-pointer"
        v-for="item of databaseStore.documents"
        :key="item.id"
        @click="router.push('/dialogue/' + item.id)"
      >
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
// import { useUserStore } from "../stores/user";
// const userStore = useUserStore();
import { useUserStore } from "../stores/user";
import { useDatabaseStore } from "../stores/database";
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";

const userStore = useUserStore();
const databaseStore = useDatabaseStore();
const router = useRouter();
const route = useRoute();

databaseStore.getDialogues(route.params.level);

const url = ref("");
const handleSubmit = () => {
  databaseStore.addUrl(url.value);
};
</script>
