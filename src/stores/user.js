import { defineStore } from "pinia";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "../firebaseConfig";
import { providerGoogle } from "../firebaseConfig";
import { providerTwitter } from "../firebaseConfig";
import router from "../router";

export const useUserStore = defineStore("userStore", {
  state: () => ({
    userData: null,
    loadingUser: false,
    loadingSession: false,
  }),
  actions: {
    async loginGoogle() {
      this.loadingUser = true;
      try {
        const { user } = await signInWithPopup(auth, providerGoogle);
        this.userData = {
          email: user.email,
          uid: user.uid,
          photo: user.photoURL,
        };
        router.push("/dashboard");
      } catch (error) {
        console.log(error);
      } finally {
        this.loadingUser = false;
      }
    },
    async loginTwitter() {
      this.loadingUser = true;
      try {
        const { user } = await signInWithPopup(auth, providerTwitter);
        // console.log(user);
        this.userData = { email: user.email, uid: user.uid };
        router.push("/dashboard");
      } catch (error) {
        console.log(error);
      } finally {
        this.loadingUser = false;
      }
    },
    async registerUser(email, password) {
      this.loadingUser = true;
      try {
        const { user } = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        this.userData = { email: user.email, uid: user.uid };
        router.push("/dashboard");
      } catch (error) {
        console.log(error);
      } finally {
        this.loadingUser = false;
      }
    },
    async loginUser(email, password) {
      this.loadingUser = true;
      try {
        const { user } = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );
        this.userData = { email: user.email, uid: user.uid };
        router.push("/dashboard");
      } catch (error) {
        console.log(error);
      } finally {
        this.loadingUser = false;
      }
    },
    async logoutUser() {
      try {
        await signOut(auth);
        this.userData = null;
        router.push("/");
      } catch (error) {
        console.log(error);
      }
    },
    currentUser() {
      return new Promise((resolve, reject) => {
        const unsubscribe = onAuthStateChanged(
          auth,
          (user) => {
            if (user) {
              this.userData = {
                email: user.email,
                uid: user.uid,
                photo: user.photoURL,
              };
            } else {
              this.userData = null;
            }
            resolve(user);
          },
          (e) => reject(e)
        );
        unsubscribe();
      });
    },
  },
});
