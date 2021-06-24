<template>
  <v-app>
    <v-content>
      <v-card class="overflow-hidden">
        <v-app-bar
          dark
          shrink-on-scroll
          src="../assets/logo_roland_garros_sur_fond.png"
          fade-img-on-scroll
          scroll-target="#scrolling-techniques-3"
        >
         <h9 class="ma-4">Liste des utilisateurs</h9>
          <v-col class="text-right">
            <v-hover>
              <v-btn class="ma-2" color="#246B20" dark :to="homeRoute">
                Se deconnecter
              </v-btn>
            </v-hover>
          </v-col>

          <template v-slot:img="{ props }">
            <v-img
              v-bind="props"
              gradient="to top right, rgba(255,115,201,.33), rgba(25,32,72,.7)"
            ></v-img>
          </template>
        </v-app-bar>
      </v-card>
      <div
        style="
          background-image: url('../assets/fond_raquette_terrain.jpg');
          background-size: cover;
        "
      >
        <br />

       
        <br />
        <v-container>
          <v-data-table
            :headers="headers"
            :items="utilisateurs"
            class="elevation-1"
          >
            <template v-slot:top>
              <v-toolbar flat>
                <v-toolbar-title>Utilisateurs</v-toolbar-title>
                <v-divider class="mx-4" inset vertical></v-divider>

                <v-spacer></v-spacer>

                <v-dialog v-model="dialog" max-width="500px">
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      color="#246B20"
                      dark
                      class="mb-2"
                      v-bind="attrs"
                      v-on="on"
                    >
                      Ajouter un organisateur
                    </v-btn>
                  </template>
                  <v-card>
                    <v-card-title class="headline"
                      >Ajouter un organisateur</v-card-title
                    >

                    <v-card-text>
                      <v-container>
                        <v-row>
                          <v-col cols="12" sm="6" md="4">
                            <v-text-field
                              v-model="editedItem.login"
                              label="Login"
                            ></v-text-field>
                          </v-col>
                          <v-col cols="12" sm="6" md="4">
                            <v-text-field
                              v-model="editedItem.motDePasse"
                              label="Mot de Passe"
                              type="password"
                            ></v-text-field>
                          </v-col>
                        </v-row>
                      </v-container>
                    </v-card-text>

                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn color="blue darken-1" text @click="close">
                        Annuler
                      </v-btn>
                      <v-btn color="blue darken-1" text @click="save">
                        Enregistrer
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
                <v-dialog v-model="dialogModif" max-width="500px">
                  <v-card>
                    <v-card-title class="headline"
                      >Voulez vous modifier cet utilisateur ?</v-card-title
                    >

                    <v-card-text>
                      <v-container>
                        <v-row>
                          <v-col cols="12" sm="6" md="4">
                            <v-text-field
                              v-model="editedItem.login"
                              label="Login"
                            ></v-text-field>
                          </v-col>
                          <v-col cols="12" sm="6" md="4">
                            <v-text-field
                              v-model="editedItem.motDePasse"
                              label="Mot de Passe"
                              type="password"
                            ></v-text-field>
                          </v-col>
                        </v-row>
                      </v-container>
                    </v-card-text>

                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn color="blue darken-1" text @click="closeModif">
                        Annuler
                      </v-btn>
                      <v-btn
                        color="blue darken-1"
                        text
                        @click="editItemConfirm"
                      >
                        Modifier
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
                <v-dialog v-model="dialogDelete" max-width="500px">
                  <v-card>
                    <v-card-title class="headline"
                      >Voulez vous supprimer cet organisateur ?</v-card-title
                    >
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn color="blue darken-1" text @click="closeDelete"
                        >Annuler</v-btn
                      >
                      <v-btn
                        color="blue darken-1"
                        text
                        @click="deleteItemConfirm"
                        >Valider</v-btn
                      >
                      <v-spacer></v-spacer>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </v-toolbar>
            </template>
            <template v-slot:[`item.actions`]="{ item }">
              <v-icon small class="mr-2" @click="editItem(item)">
                mdi-pencil
              </v-icon>
              <v-icon small @click="deleteItem(item)" v-if="isNotAdmin(item)">
                mdi-delete
              </v-icon>
            </template>
          </v-data-table>
        </v-container>
        <br />
<br /><br /><br />
        <v-layout justify-center align-center>
          <v-card color="rgb(255, 0, 0, 0.2)">
            <v-img
              src="../assets/logo_roland_garros_seul.png"
              height="95px"
              width="95px"
            >
            </v-img>
          </v-card>
        </v-layout>
      </div>
    </v-content>
  </v-app>
</template>

<style scoped>
h9 {
  text-align: left;
  font-family: sans-serif;
  font-size: 36px; /* Titres de 40 pixels */
  font-style: bold;
  color: rgb(202, 202, 202);
}
</style>

<script>
import axios from "axios";
import * as constantes from "../constants";

export default {
  name: constantes.NOM_VUE_ADMIN,
  data: () => ({
    dialog: false,
    dialogDelete: false,
    dialogModif: false,
    headers: [
      {
        text: "Login",
        align: "start",
        sortable: false,
        value: "login",
      },
      { text: "Role", value: "role" },
      { text: "Actions", value: "actions", sortable: false },
    ],
    editedIndex: -1,
    editedItem: {
      login: "",
      motDePasse: "",
      role: "",
      idUtilisateur: "",
    },
    defaultItem: {
      login: "",
      motDePasse: "",
      role: "",
      idUtilisateur: "",
    },
    utilisateurs: [],
    homeRoute: constantes.ROUTE_VUE_HOME,
  }),
  
  beforeMount(){
    if(localStorage.getItem(constantes.ROLE_UTILISATEUR) != constantes.ROLE_ADMINISTRATEUR)
      this.$router.push(constantes.NOM_ACCES_INTERDIT);
    const that = this;
    axios
      .get(`${constantes.API_BASE_URL}/utilisateurs`)
      .then((res) => {
        that.utilisateurs = res.data.contenu;
      })
      .catch((err) => {});
       
  },
  computed: {
    formTitle() {
      return this.editedIndex === -1
        ? "Ajouter un organisateur"
        : "Modifier un utilisateur";
    },
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
    dialogModif(val) {
      val || this.closeModif();
    },
  },

  methods: {
    editItemConfirm(item) {
      var that = this;
      if (that.editedItem.login != "" && that.editedItem.motDePasse != "") {
        var donnee = {
          login: that.editedItem.login,
          motDePasse: that.editedItem.motDePasse,
          idUtilisateur: that.editedItem.idUtilisateur,
        };
        var requete = JSON.stringify(donnee);
        axios
          .put(
            `${constantes.API_BASE_URL}/utilisateurs/${donnee.idUtilisateur}`,
            requete
          )
          .then((resultat) => {
            if (resultat.status == constantes.SUCCESS_STATUS_CODE) {
              that.closeModif();
              location.reload();
            }
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        alert("Il manque des champs vide");
      }
    },
    editItem(item) {
      this.editedIndex = this.utilisateurs.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogModif = true;
    },
    deleteItem(item) {
      this.editedIndex = this.utilisateurs.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      var that = this;
      var idUtilisateur = that.editedItem.idUtilisateur;
      axios
        .delete(`${constantes.API_BASE_URL}/utilisateurs/${idUtilisateur}`)
        .then((resultat) => {
          if (resultat.status == constantes.SUCCESS_STATUS_CODE) {
            that.closeDelete();
            location.reload();
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    closeModif() {
      this.dialogModif = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    save() {
      var that = this;
      var donnee = {
        login: that.editedItem.login,
        motDePasse: that.editedItem.motDePasse,
        idUtilisateur: that.editedIndex.idUtilisateur,
      };
      if (that.editedItem.login != "" && that.editedItem.motDePasse != "") {
        var requete = JSON.stringify(donnee);
        axios
          .post(`${constantes.API_BASE_URL}/utilisateurs`, requete)
          .then((resultat) => {
            if (resultat.status == constantes.SUCCESS_STATUS_CODE) {
              that.close();
              location.reload();
            }
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        alert("Il manque des champs vide");
      }
    },
    isNotAdmin(user) {
      return user.role !== constantes.ROLE_ADMINISTRATEUR;
    },
  },
};
</script>
