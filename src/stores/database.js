import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore/lite";
import { nanoid } from "nanoid";
import { defineStore } from "pinia";
import { auth, db } from "../firebaseConfig";
import router from "../router";

export const useDatabaseStore = defineStore("database", {
  state: () => ({
    documents: [],
    loadingDoc: false,
  }),
  actions: {
    async getDialogues(level) {
      if (this.documents.length !== 0) {
        this.documents = [];
        // return;
      }
      this.loadingDoc = true;
      try {
        const q = level
          ? query(collection(db, "dialog"), where("level", "==", level))
          : query(collection(db, "dialog"));

        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          this.documents.push({
            id: doc.id,
            ...doc.data(),
          });
        });
      } catch (error) {
        console.log(error);
      } finally {
        this.loadingDoc = false;
      }
    },

    async getLevels() {
      if (this.documents.length !== 0) {
        this.documents = [];

        // return;
      }
      this.loadingDoc = true;
      try {
        const q = query(
          collection(db, "level")
          // where("user", "==", auth.currentUser.uid)
        );
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          this.documents.push({
            id: doc.id,
            ...doc.data(),
          });
        });
      } catch (error) {
        console.log(error);
      } finally {
        this.loadingDoc = false;
      }
    },

    async addDialogue(name) {
      try {
        const objetoDoc = {
          name: name,
          short: nanoid(6),
          user: auth.currentUser.uid,
        };
        const docRef = await addDoc(collection(db, "urls"), objetoDoc);
        this.documents.push({
          ...objetoDoc,
          id: docRef.id,
        });
      } catch (error) {
        console.log(error);
      } finally {
      }
    },
    async readDialogue(id) {
      try {
        const docRef = doc(db, "urls", id);
        const docSnap = await getDoc(docRef);
        if (!docSnap.exists()) {
          throw new Error("No existe el doc");
        }

        if (docSnap.data().user !== auth.currentUser.uid) {
          throw new Error("No le pertenece ese documento");
        }
        return docSnap.data().name;
      } catch (error) {
        console.log(error.message);
      } finally {
      }
    },
    async deleteDialogue(id) {
      try {
        const docRef = doc(db, "urls", id);
        const docSnap = await getDoc(docRef);

        if (!docSnap.exists()) {
          throw new Error("No existe el doc");
        }

        if (docSnap.data().user !== auth.currentUser.uid) {
          throw new Error("No le pertenece ese documento");
        }
        await deleteDoc(docRef);
        this.documents = this.documents.filter((item) => item.id !== id);
      } catch (error) {
        console.log(error.message);
      } finally {
      }
    },
    async updateDialogue(id, name) {
      try {
        const docRef = doc(db, "urls", id);
        const docSnap = await getDoc(docRef);
        if (!docSnap.exists()) {
          throw new Error("No existe el doc");
        }

        if (docSnap.data().user !== auth.currentUser.uid) {
          throw new Error("No le pertenece ese documento");
        }
        await updateDoc(docRef, {
          name: name,
        });
        this.documents = this.documents.map((item) =>
          item.id === id ? { ...item, name: name } : item
        );
        router.push("/");
      } catch (error) {
        console.log(error);
      } finally {
      }
    },
  },
});
