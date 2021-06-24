<template>
  <div>
    <v-navigation-drawer v-model="drawer" app clipped width="290px">
      <v-card class="overflow-hidden">
        <v-app-bar
          dark
          shrink-on-scroll
          src="../assets/logo_roland_garros_sur_fond.png"
        >
        </v-app-bar>
      </v-card>

      <div class="fond">
        <v-list>
          <v-list-item
            v-for="[icon, text, path, type] in links"
            :key="type"
            link
            :to="path"
            @click="recharger()"
          >
            <v-list-item-icon>
              <v-icon>{{ icon }}</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>{{ text }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
        <br /><br /><br /><br /><br /><br /><br /><br />
        <v-row justify="end">
          <v-col class="text-center">
            <v-btn class="orange black--text" :to="homeRoute"> Accueil </v-btn>
          </v-col>
        </v-row>
        <br /><br />
      </div>
    </v-navigation-drawer>
    <div class="fill-height repeating-gradient">
      <div
        style="
          background-image: url('../assets/balle_tennis.jpg');
          background-size: cover;
        "
      >
        <v-main>
          <v-container class="py-2 px-8" fluid>
            <v-row>
              <v-col v-for="match in resultatsLists" :key="match.idMatch">
                <v-card
                  color="rgb(0, 0, 0, 0.2)"
                  width="500"
                  height="300px"
                  text-color="white"
                  outlined
                >
                  <v-list-item three-line>
                    <v-list-item-content>
                      <div class="overline mb-4" id="some-element">
                        <h1>
                          <!--Match:{{ match.idMatch }}
                          <br />-->
                          <div v-if="match.equipes[0].joueurs.length == 1">
                            {{ match.equipes[0].joueurs[0].nomJoueur }}
                          </div>
                          <div v-if="match.equipes[0].joueurs.length == 2">
                            ( {{ match.equipes[0].joueurs[0].nomJoueur }} -
                            {{ match.equipes[0].joueurs[1].nomJoueur }} )
                          </div>
                          VS
                          <div v-if="match.equipes[1].joueurs.length == 1">
                            {{ match.equipes[1].joueurs[0].nomJoueur }}
                          </div>
                          <div v-if="match.equipes[1].joueurs.length == 2">
                            ( {{ match.equipes[1].joueurs[0].nomJoueur }} -
                            {{ match.equipes[1].joueurs[1].nomJoueur }} )
                          </div>

                          <br />Résultat sets gagnés : {{ match.score1 }} -
                          {{ match.score2 }}<br /> <br />Vainqueur.e.s :
                          {{ getVainqueur(match.idMatch) }}
                        </h1>
                      </div>
                    </v-list-item-content>
                  </v-list-item>
                </v-card>
              </v-col>
            </v-row>
          </v-container>
        </v-main>

        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
      </div>
    </div>
  </div>
</template>

<style scoped>
h1 {
  color: white;
}
.repeating-gradient {
  background-image: repeating-linear-gradient(
    -45deg,
    rgba(228, 180, 180, 0.25),
    rgba(231, 231, 231, 0.25) 5px,
    rgba(173, 173, 196, 0.25) 10px
  );
}

.v-list-item__title {
  white-space: normal !important;
}
.selected-list-item {
  background-color: rgb(140, 140, 140) im !important;
}
</style>

<script>
import axios from "axios";
import * as constants from "../constants";

export default {
  name: constants.NOM_VUE_RESULTATS,
  data: () => ({
    homeRoute: constants.ROUTE_VUE_HOME,
    drawer: null,
    links: [
      [
        "mdi-face",
        "Matchs Simples Messieurs",
        constants.ROUTE_VUE_RESULTATS_SIMPLE_MESSIEURS,
        constants.SOUS_TOURNOI_SIMPLE_MESSIEURS,
      ],
      [
        "mdi-human-male-male",
        "Matchs Doubles Messieurs",
        constants.ROUTE_VUE_RESULTATS_DOUBLE_MESSIEURS,
        constants.SOUS_TOURNOI_DOUBLE_MESSIEURS,
      ],
      [
        "mdi-face-woman",
        "Matchs Simples Dames",
        constants.ROUTE_VUE_RESULTATS_SIMPLE_DAMES,
        constants.SOUS_TOURNOI_SIMPLE_DAMES,
      ],
      [
        "mdi-human-female-female",
        "Matchs Doubles Dames",
        constants.ROUTE_VUE_RESULTATS_DOUBLE_DAMES,
        constants.SOUS_TOURNOI_DOUBLE_DAMES,
      ],
      [
        "mdi-human-male-female",
        "Matchs Doubles Mixtes",
        constants.ROUTE_VUE_RESULTATS_DOUBLE_MIXTE,
        constants.SOUS_TOURNOI_DOUBLE_MIXTE,
      ],
    ],
    resultats: {
      idMatch: "",
      idEquipe: "",
      numeroSet: "",
      scoreEquipe: "",
      idSousTournoi: "",
    },
    resultatsLists: [],
    listJoueursMatch: [],
    playerObject: [],
    sousTournois: [],
    urlSousTournoiCorrespondances: [
      {
        id: 1,
        url: constants.ROUTE_VUE_RESULTATS_SIMPLE_MESSIEURS,
        typeSousTournoi: constants.SOUS_TOURNOI_SIMPLE_MESSIEURS,
      },
      {
        id: 3,
        url: constants.ROUTE_VUE_RESULTATS_DOUBLE_MESSIEURS,
        typeSousTournoi: constants.SOUS_TOURNOI_DOUBLE_MESSIEURS,
      },
      {
        id: 2,
        url: constants.ROUTE_VUE_RESULTATS_SIMPLE_DAMES,
        typeSousTournoi: constants.SOUS_TOURNOI_SIMPLE_DAMES,
      },
      {
        id: 4,
        url: constants.ROUTE_VUE_RESULTATS_DOUBLE_DAMES,
        typeSousTournoi: constants.SOUS_TOURNOI_DOUBLE_DAMES,
      },
      {
        id: 5,
        url: constants.ROUTE_VUE_RESULTATS_DOUBLE_MIXTE,
        typeSousTournoi: constants.SOUS_TOURNOI_DOUBLE_MIXTE,
      },
    ],
    idSousTournoiActuel: null, // ID du sous tournoi actuel
  }),
  mounted() {
    const that = this;

    const windowUrl = window.location.href.split("#")[1];

    that.idSousTournoiActuel = that.urlSousTournoiCorrespondances.filter(
      (corresp) => corresp.url == windowUrl
    )[0].id;

    axios
      .get(`${constants.API_BASE_URL}/soustournois/${that.idSousTournoiActuel}`)
      .then((res) => {
        that.resultatsLists = Array.from(res.data.contenu.listeMatch);
        console.log(that.resultatsLists);
      })
      .catch((err) => {
        console.log(err);
      });
  },
  beforeMount() {},

  methods: {
    recharger() {
      location.reload();
    },

    getVainqueur(currentIdMatch) {
      var _this = this;
      var nbMatchs = _this.resultatsLists.length;
      var gagnant = {};
      for (var i = 0; i < nbMatchs; i++) {
        if (_this.resultatsLists[i].idMatch == currentIdMatch) {
          // meilleur score du set
          if (_this.resultatsLists[i].score1 > _this.resultatsLists[i].score2) {
            if (_this.resultatsLists[i].equipes[0].joueurs.length == 1) {
              gagnant = _this.resultatsLists[i].equipes[0].joueurs[0].nomJoueur;
            } else {
              gagnant =
                _this.resultatsLists[i].equipes[0].joueurs[0].nomJoueur +
                " - " +
                _this.resultatsLists[i].equipes[0].joueurs[1].nomJoueur;
            }
          } else if (
            _this.resultatsLists[i].score1 < _this.resultatsLists[i].score2
          ) {
            if (_this.resultatsLists[i].equipes[1].joueurs.length == 1) {
              gagnant = _this.resultatsLists[i].equipes[1].joueurs[0].nomJoueur;
            } else {
              gagnant =
                _this.resultatsLists[i].equipes[1].joueurs[0].nomJoueur +
                " - " +
                _this.resultatsLists[i].equipes[1].joueurs[1].nomJoueur;
            }
          } else {
            gagnant = "Non défini.";
          }
        }
      }
      console.log(gagnant);
      return gagnant;
    },
  },
};
</script>


