<template>
  <q-page class="relative-position">
    <q-scroll-area class="absolute full-height full-width">
      <!-- header cat -->
      <top-cat />

      <!-- input section -->
      <div class=" q-py-none q-px-md row items-end q-col-gutter-sm">
        <div class="col">
          <q-input
            filled
            v-model="newCaterWaulContent"
            class="caterwaul-button"
            label-slot
            maxlength="269"
            bottom-slots
            autogrow
            counter
          >
            <template v-slot:before>
              <q-avatar size="xl">
                <img src="https://i.imgur.com/PqSNKmX.png" />
              </q-avatar>
            </template>

            <template v-slot:label>
              <div class="row items-center all-pointer-events text-secondary">
                <q-icon
                  class="q-mr-xs"
                  color="secondary"
                  size="24px"
                  name="fas fa-cat"
                />
                What pussed you off?
                <q-tooltip
                  content-class="bg-grey-8"
                  anchor="top left"
                  self="bottom left"
                  :offset="[0, 8]"
                  >Give us your hissyful thoughts</q-tooltip
                >
              </div>
            </template>

            <template v-slot:hint>
              Hiss at someone!
            </template>
          </q-input>
        </div>
        <div class="col col-shrink ">
          <q-btn
            @click="addNewCaterwaul"
            :disable="!newCaterWaulContent"
            class="q-mb-md"
            push
            round
            color="primary"
            icon="fas fa-paw"
          />
        </div>
      </div>

      <q-separator size="11px" color="searchback" class="caterwaul-main-sep" />

      <!-- caterwauls section -->
      <q-list separator>
        <single-caterwaul
          v-for="Cwaul in Cwauls"
          :key="Cwaul.id"
          :Cwaul="Cwaul"
          v-on:deleteCwaul="deleteCwaul(Cwaul)"
          v-on:likeCwaul="likeCwaul(Cwaul)"
        />
      </q-list>
    </q-scroll-area>
  </q-page>
</template>

<script>
import db from "src/boot/firebase";
import { formatDistance, subDays } from "date-fns";
import SingleCaterwaul from "../components/SingleCaterwaul";
import TopCat from "../components/TopCat.vue";
export default {
  components: { SingleCaterwaul, TopCat },
  name: "Home",
  data() {
    return {
      newCaterWaulContent: "",
      Cwauls: [
        // {
        //   user: "Salvatore Daily",
        //   handle: "@salvatore_daily",
        //   content:
        //     "I meaow and hiss and furthermore piss in your general direcion. I meaow and hiss and furthermore piss in your general direcion. I meaow and hiss and furthermore piss in your general direcion. I meaow and hiss and furthermore piss in your general direcion.",
        //   date: 1615726244679
        // },
        // {
        //   user: "Salvatore Daily",
        //   handle: "@salvatore_daily",
        //   content: "I hissinate pissinate and meaowinate at you",
        //   date: 1615726304684
        // }
      ]
    };
  },
  methods: {
    addNewCaterwaul() {
      let newCwaul = {
        content: this.newCaterWaulContent,
        date: Date.now(),
        userId: "wgwG0whUJ3Inr0GeYM0D",
        likes: 0
      };

      db.collection("caterwauls")
        .add(newCwaul)
        .then(docRef => {
          console.log("Document written with ID: ", docRef.id);
        })
        .catch(error => {
          console.error("Error adding document: ", error);
        });

      this.newCaterWaulContent = "";
    },
    deleteCwaul(Cwaul) {
      db.collection("caterwauls")
        .doc(Cwaul.id)
        .delete()
        .then(() => {
          console.log("Document successfully deleted!");
        })
        .catch(error => {
          console.error("Error removing document: ", error);
        });
    },
    likeCwaul(Cwaul) {
      console.log(Cwaul);
      var cater = db.collection("caterwauls").doc(Cwaul.id);

      // Set the "capital" field of the city 'DC'
      return cater
        .update({
          likes: Cwaul.likes + 1
        })
        .then(() => {
          console.log("Document successfully updated!");
        })
        .catch(error => {
          // The document probably doesn't exist.
          console.error("Error updating document: ", error);
        });
    }
  },
  mounted() {
    db.collection("caterwauls")
      .orderBy("date")
      .onSnapshot(snapshot => {
        snapshot.docChanges().forEach(change => {
          let cwaulChange = change.doc.data();
          cwaulChange.id = change.doc.id;
          if (change.type === "added") {
            // console.log("New caterwaul: ", cwaulChange);
            this.Cwauls = [cwaulChange, ...this.Cwauls];
          }
          if (change.type === "modified") {
            // console.log("Modified caterwaul: ", cwaulChange);
            let id = cwaulChange.id;
            let index = this.Cwauls.findIndex(cwaul => cwaul.id === id);
            Object.assign(this.Cwauls[index], cwaulChange);
          }
          if (change.type === "removed") {
            // console.log("Removed caterwaul: ", cwaulChange);
            let idToDel = cwaulChange.id;
            let index = this.Cwauls.findIndex(cwaul => cwaul.id === idToDel);
            this.Cwauls.splice(index, 1);
          }
        });
      });
  }
};
</script>

<style lang="sass" scoped>
.caterwaul-button
  font-size: 21px
  textarea
    overflow-y: hidden
    line-height: 150%
.caterwaul-main-sep
  border-top: 2px solid
  border-bottom: 2px solid
  border-color: $grey-3
  margin-top: 2px
.caterwaul_content
  white-space: pre-line
.caterwaul-icons
  margin-left: -5px
</style>
