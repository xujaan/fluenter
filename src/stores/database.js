import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  QuerySnapshot,
  updateDoc,
  where,
} from "firebase/firestore/lite";
import _ from "lodash";
import { nanoid } from "nanoid";
import { defineStore } from "pinia";
import { auth, db } from "../firebaseConfig";
import router from "../router";
function getValue(object, string, defaultValue = "") {
  return _.get(object, string, defaultValue);
}
export const useDatabaseStore = defineStore("database", {
  state: () => ({
    documents: [],
    users: [],
    // pengguna: null,
    loadingDoc: false,
  }),
  actions: {
    async getUser() {
      this.users = [];
      try {
        const q = query(
          collection(db, "pengguna"),
          where("uid", "==", auth.currentUser.uid)
        );
        const querySnapshot = await getDocs(q);

        querySnapshot.forEach((doc) => {
          this.users.push({
            id: doc.id,
            ...doc.data(),
          });
        });
      } catch (error) {
        console.log(error);
      } finally {
        this.loadingDoc = false;
        // router.push("/dashboard");
      }
      if (getValue(this.users, "0.uid") == auth.currentUser.uid) {
        // this.users = [];
        console.log("yes");
        // return;
      } else {
        console.log("no");
        this.users = [
          {
            status: "1",
            rank: "0",
            dialog: "1",
            level: "1",
          },
        ];
        try {
          let newuser = [
            {
              status: "1",
              rank: "0",
              dialog: "1",
              level: "1",
              uid: auth.currentUser.uid,
            },
          ];
          let parseuser = JSON.parse(JSON.stringify(newuser));
          const quser = await addDoc(collection(db, "pengguna"), parseuser[0]);
          this.users.push({
            ...newuser,
            id: quser.id,
          });
        } catch (error) {
          console.log(error);
        } finally {
          router.push("/dashboard");
        }
      }
    },

    async getDialogues(level, id) {
      if (this.documents.length !== 0) {
        this.documents = [];

        // return;
      }
      this.loadingDoc = true;
      try {
        var q = "";
        if (id) {
          q = query(collection(db, "dialog"), where("id", "==", parseInt(id)));
        } else if (level) {
          q = query(
            collection(db, "dialog"),
            where("id", ">", 0),
            where("level", "==", parseInt(level)),
            orderBy("id", "asc")
          );
        } else {
          q = query(collection(db, "dialog"), orderBy("id", "asc"));
        }

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
      console.log(name);
      try {
        // const objetoDoc = {
        //   name: name,
        //   short: nanoid(6),
        //   user: auth.currentUser.uid,
        // };
        const objetoDoc = name;
        const docRef = await addDoc(collection(db, "dialog"), objetoDoc);
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
