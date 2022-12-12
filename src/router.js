import { createRouter, createWebHistory } from "vue-router";
import { useUserStore } from "./stores/user";

import Home from "./views/Home.vue";
import Login from "./views/Login.vue";
import Editor from "./views/Editor.vue";
import Dialogue from "./views/Dialogue.vue";
import Conversation from "./views/Conversation.vue";
import Speak from "./views/Speak.vue";
import Welcome from "./views/Welcome.vue";
import Score from "./views/Score.vue";
import Account from "./views/Account.vue";
import Rank from "./views/Rank.vue";

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
  {
    path: "/dialogue/:level",
    component: Dialogue,
    beforeEnter: requireAuth,
  },
  {
    path: "/conversation/:level/:id",
    component: Conversation,
    beforeEnter: requireAuth,
  },
  { path: "/speak/:level/:id", component: Speak, beforeEnter: requireAuth },
  { path: "/score/:level/:id", component: Score, beforeEnter: requireAuth },
  { path: "/", component: Login },
  { path: "/editor", component: Editor, beforeEnter: requireAuth },
  { path: "/welcome", component: Welcome, beforeEnter: requireAuth },
  { path: "/account", component: Account, beforeEnter: requireAuth },
  { path: "/rank", component: Rank, beforeEnter: requireAuth },
];

const router = createRouter({
  history: createWebHistory(),
  routes: routes,
});

export default router;
