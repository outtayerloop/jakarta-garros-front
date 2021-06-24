<template>
  <div>
    <v-main>
      <v-img src="../assets/fond_raquette_terrain.jpg">
        <v-container class="fill-height" fluid>
          <v-row align="center" justify="center">
            <v-col cols="12" sm="8" md="4">
              <v-card class="elevation-24">
                <v-toolbar color="green" dark flat>
                  <v-spacer></v-spacer>
                  <v-toolbar-title>Veuillez vous connecter</v-toolbar-title>
                  <v-spacer> </v-spacer>
                </v-toolbar>

                <v-card-text>
                  <v-form>
                    <v-text-field
                      color="orange"
                      label="Login"
                      name="login"
                      prepend-icon="mdi-account"
                      type="text"
                      v-model="credentials.login"
                    ></v-text-field>

                    <v-text-field
                      color="orange"
                      id="motDePasse"
                      label="Mot de passe"
                      name="motDePasse"
                      prepend-icon="mdi-lock"
                      type="password"
                      v-model="credentials.motDePasse"
                    ></v-text-field>
                  </v-form>
                </v-card-text>
                <v-card-actions>
                  <v-spacer>
                    <template>
                      <div v-if="messageErreur" v-bind:style="styleObject">
                        Identifiants et/ou mots de passe erronés
                      </div>
                    </template>
                  </v-spacer>
                  <v-btn
                    color="green"
                    class="white--text"
                    @click="envoiFormulaire()"
                  >
                    Login</v-btn
                  >
                </v-card-actions>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </v-img>
    </v-main>
  </div>
</template>

<script>
import axios from "axios";
import * as constants from "../constants";

export default {
  name: constants.NOM_VUE_LOGIN,
  data: function () {
    return {
      messageErreur: false,
      credentials: {
        login: "",
        motDePasse: "",
      },
      styleObject: {
        color: "red",
        fontSize: "13px",
      }
    };
  },
  beforeMount: function () {
    localStorage.clear()
  },
  methods: {
    envoiFormulaire: function () {
      const that = this;
      axios.post(`${constants.API_BASE_URL}/login`, JSON.stringify(that.credentials))
        .then((res) => {
          if (res.status == constants.SUCCESS_STATUS_CODE) {
            this.redirectionUtilisateur(res.data);
          }
        })
        .catch((err) => {
          this.messageErreur = true;
        });
    },
    redirectionUtilisateur(donnees) {
      this.stockageDonneesSession(donnees);
      if (donnees.contenu.role == constants.ROLE_ORGANISATEUR) {
        this.$router.push(constants.NOM_VUE_ORGANISATEUR);
      } 
      else if (donnees.contenu.role == constants.ROLE_ADMINISTRATEUR) {
        this.$router.push(constants.NOM_VUE_ADMIN);
      }
    },
    stockageDonneesSession(donnees) {
      localStorage.setItem(constants.ID_UTILISATEUR, donnees.contenu.idUtilisateur);
      localStorage.setItem(constants.ROLE_UTILISATEUR, donnees.contenu.role);
      localStorage.setItem(constants.LOGIN_UTILISATEUR, donnees.contenu.login);
    },
  },
};
</script>

