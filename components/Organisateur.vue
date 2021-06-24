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
          <h9 class="ma-4">Gestion sous tournois</h9>
          <v-col class="text-right">
            <v-hover>
              <v-btn :to="homeRoute" class="ma-2" color="#246B20" dark>
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
        <v-container >
          <v-row justify="center">
              <v-col v-for="sousTournoi in sousTournois" :key="sousTournoi.idSousTournoi" style="max-width: 35% !important; min-width: 30% !important">
                <v-card>
                  <v-toolbar color="#246B20" dark>
                    <v-toolbar-title>{{ getTypeSousTournoiAffiche(sousTournoi) }}</v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-btn icon v-if="!sousTournoi.estSousTournoiValide">
                      <v-icon @click="validerSousTournoi(sousTournoi)">mdi-check</v-icon>
                    </v-btn>
                  </v-toolbar>
                  <v-card-text class="text--primary">
                    <v-col>
                      <v-row justify="space-around" align="center">
                        <v-col>
                          <v-icon>mdi-calendar</v-icon>
                          <span>Date de début : {{ getDateDeDebutAAfficher(sousTournoi) }}</span>
                        </v-col>
                        <v-col>
                          <v-icon>mdi-calendar</v-icon>
                          <span>Date de fin : {{ getDateDeFinAAfficher(sousTournoi) }}</span>
                        </v-col>
                      </v-row>
                    </v-col>
                  </v-card-text>
                  <v-card-actions>
                    <v-row justify="center">
                      <v-btn outline color="orange" :to="getRouteMatchs(sousTournoi)">
                        <p style="color: White" class="ma-2">Gérer</p>
                      </v-btn>
                    </v-row>
                  </v-card-actions>
                </v-card>
              </v-col>
            </v-row>
        </v-container>
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />

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
import * as constants from "../constants";
import axios from "axios"

export default {
  name: constants.NOM_VUE_ORGANISATEUR,
  data: function () {
    return {
      homeRoute: constants.ROUTE_VUE_HOME,
      sousTournois: [],
      typeSousTournoiAffiche: [
        {
          typeInitial: constants.SOUS_TOURNOI_SIMPLE_MESSIEURS,
          typeAffiche: "Simple Messieurs",
          route: constants.ROUTE_VUE_ORGANISATION_MATCH_SIMPLE_MESSIEURS
        },
        {
          typeInitial: constants.SOUS_TOURNOI_SIMPLE_DAMES,
          typeAffiche: "Simple Dames",
          route: constants.ROUTE_VUE_ORGANISATION_MATCH_SIMPLE_DAMES
        },
        {
          typeInitial: constants.SOUS_TOURNOI_DOUBLE_MESSIEURS,
          typeAffiche: "Double Messieurs",
          route: constants.ROUTE_VUE_ORGANISATION_MATCH_DOUBLE_MESSIEURS
        },
        {
          typeInitial: constants.SOUS_TOURNOI_DOUBLE_DAMES,
          typeAffiche: "Double Dames",
          route: constants.ROUTE_VUE_ORGANISATION_MATCH_DOUBLE_DAMES
        },
        {
          typeInitial: constants.SOUS_TOURNOI_DOUBLE_MIXTE,
          typeAffiche: "Double Mixte",
          route: constants.ROUTE_VUE_ORGANISATION_MATCH_DOUBLE_MIXTE
        },
      ]
    };
  },
  beforeMount(){
    if(localStorage.getItem(constants.ROLE_UTILISATEUR) != constants.ROLE_ORGANISATEUR)
      this.$router.push(constants.NOM_ACCES_INTERDIT)
    const that = this
    axios.get(`${constants.API_BASE_URL}/soustournois`)
      .then(res => {
        that.sousTournois = res.data.contenu
      })
      .catch(err => {
        console.log(err)
      })
  },
  methods:{
    getTypeSousTournoiAffiche(sousTournoi){
      return this.typeSousTournoiAffiche.filter(paireType => paireType.typeInitial === sousTournoi.typeSousTournoi)[0].typeAffiche
    },
    getDateDeDebutAAfficher(sousTournoi){
      return sousTournoi.dateDebutSousTournoi === null 
        ? `[Aucun match]`
        : sousTournoi.dateDebutSousTournoi
    },
    getDateDeFinAAfficher(sousTournoi){
      return sousTournoi.dateFinSousTournoi === null 
        ? `En cours`
        : sousTournoi.dateFinSousTournoi
    },
    getRouteMatchs(sousTournoi){
      return this.typeSousTournoiAffiche.filter(paireType => paireType.typeInitial === sousTournoi.typeSousTournoi)[0].route
    },
    validerSousTournoi(sousTournoi){
      const idSousTournoiAValider = sousTournoi.idSousTournoi
      axios.put(`${constants.API_BASE_URL}/soustournois/${idSousTournoiAValider}`)
        .then(res => {
          sousTournoi.estSousTournoiValide = true
        })
        .catch(err =>{
          console.log(err)
        })
    }
  }
};
</script>
