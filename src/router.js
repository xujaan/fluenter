import { createRouter, createWebHistory } from "vue-router";
import { useUserStore } from "./stores/user";

import Home from "./views/Home.vue";
import Login from "./views/Login.vue";
import Register from "./views/Register.vue";
import Editor from "./views/Editor.vue";
import Dialogues from "./views/Dialogues.vue";
import Dialogue from "./views/Dialogue.vue";
import Speak from "./views/Speak.vue";
import Welcome from "./views/Welcome.vue";

const requireAuth = async (to, from, next) => {
  const userStore = useUserStore();
  userStore.loadingSession = true;
  const user = await userStore.currentUser();
  if (user) {
    next();
  } else {
    next("/");
  }
  userStore.loadingSession = false;
};

const routes = [
  { path: "/dashboard", component: Home, beforeEnter: requireAuth },
  { path: "/dialogues/:level", component: Dialogues, beforeEnter: requireAuth },
  {
    path: "/dialogue/:level/:id",
    component: Dialogue,
    beforeEnter: requireAuth,
  },
  { path: "/speak/:level/:id", component: Speak, beforeEnter: requireAuth },
  { path: "/", component: Login },
  { path: "/register", component: Register },
  { path: "/editor", component: Editor, beforeEnter: requireAuth },
  { path: "/welcome", component: Welcome, beforeEnter: requireAuth },
];

const router = createRouter({
  history: createWebHistory(),
  routes: routes,
});

export default router;
