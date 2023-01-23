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
    dialogue: [],
    conversation: [],
    levels: [],
    users: [],
    alluser: [],
    resultscore: [],
    randomdialog: 0,
    score: 0,
    loadingDoc: false,
  }),
  actions: {
    async getUser() {
      this.users = [];
      this.loadingDoc = true;
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
        return;
      } else {
        try {
          let newuser = [
            {
              status: 1,
              rank: 0,
              dialog: 1,
              dialog_name: "Dialog 1-1",
              score_total: 0,
              score: [
                {
                  dialog_id: 1,
                  dialog_score: 0,
                },
                {
                  dialog_id: 2,
                  dialog_score: 0,
                },
                {
                  dialog_id: 3,
                  dialog_score: 0,
                },
                {
                  dialog_id: 4,
                  dialog_score: 0,
                },
                {
                  dialog_id: 5,
                  dialog_score: 0,
                },
                {
                  dialog_id: 6,
                  dialog_score: 0,
                },
                {
                  dialog_id: 7,
                  dialog_score: 0,
                },
                {
                  dialog_id: 8,
                  dialog_score: 0,
                },
                {
                  dialog_id: 9,
                  dialog_score: 0,
                },
                {
                  dialog_id: 10,
                  dialog_score: 0,
                },
                {
                  dialog_id: 11,
                  dialog_score: 0,
                },
                {
                  dialog_id: 12,
                  dialog_score: 0,
                },
                {
                  dialog_id: 13,
                  dialog_score: 0,
                },
                {
                  dialog_id: 14,
                  dialog_score: 0,
                },
                {
                  dialog_id: 15,
                  dialog_score: 0,
                },
                {
                  dialog_id: 16,
                  dialog_score: 0,
                },
                {
                  dialog_id: 17,
                  dialog_score: 0,
                },
                {
                  dialog_id: 18,
                  dialog_score: 0,
                },
                {
                  dialog_id: 19,
                  dialog_score: 0,
                },
                {
                  dialog_id: 20,
                  dialog_score: 0,
                },
                {
                  dialog_id: 21,
                  dialog_score: 0,
                },
                {
                  dialog_id: 22,
                  dialog_score: 0,
                },
                {
                  dialog_id: 23,
                  dialog_score: 0,
                },
                {
                  dialog_id: 24,
                  dialog_score: 0,
                },
                {
                  dialog_id: 25,
                  dialog_score: 0,
                },
                {
                  dialog_id: 26,
                  dialog_score: 0,
                },
                {
                  dialog_id: 27,
                  dialog_score: 0,
                },
                {
                  dialog_id: 28,
                  dialog_score: 0,
                },
                {
                  dialog_id: 29,
                  dialog_score: 0,
                },
                {
                  dialog_id: 30,
                  dialog_score: 0,
                },
              ],
              level: 1,
              name: auth.currentUser.displayName,
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
          router.push("/welcome");
        }
      }
    },
    async getAlluser(id) {
      this.alluser = [];
      this.loadingDoc = true;
      try {
        var q = "";
        q = query(collection(db, "pengguna"), orderBy("score_total", "desc"));

        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          this.alluser.push({
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
    async getConversation(id) {
      this.conversation = [];
      this.loadingDoc = true;
      try {
        var q = "";
        q = query(collection(db, "dialog"), where("id", "==", parseInt(id)));

        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          this.conversation.push({
            id: doc.id,
            ...doc.data(),
          });
          this.randomdialog = getValue(this.conversation, "0.dialog").length;
        });
      } catch (error) {
        console.log(error);
      } finally {
        this.loadingDoc = false;
      }
    },
    async getDialogue(level) {
      this.dialogue = [];
      this.loadingDoc = true;
      try {
        var q = "";
        if (level) {
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
          this.dialogue.push({
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

    async getDialogues(level, id) {
      // this.documents = [];

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
      if (this.levels.length !== 0) {
        this.levels = [];

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
          this.levels.push({
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
    async updateUser(id, level, dialog, dialog_name, score_total, score, rank) {
      try {
        const docRef = doc(db, "pengguna", id);
        const docSnap = await getDoc(docRef);
        if (!docSnap.exists()) {
          throw new Error("No existe el doc");
        }

        if (docSnap.data().uid !== auth.currentUser.uid) {
          throw new Error("No le pertenece ese documento");
        }
        await updateDoc(docRef, {
          level: level,
          dialog: dialog,
          dialog_name: dialog_name,
          score_total: score_total,
          score: score,
          rank: rank,
        });
        this.users = this.documents.map((item) =>
          item.id === id
            ? {
                ...item,
                level: level,
                dialog: dialog,
                dialog_name: dialog_name,
                score_total: score_total,
                score: score,
                rank: rank,
              }
            : item
        );
      } catch (error) {
        console.log(error);
      } finally {
      }
    },
  },
});
