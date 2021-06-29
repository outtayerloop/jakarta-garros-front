<template>
  <div>
    <v-card class="overflow-hidden">
      <v-app-bar
        dark
        shrink-on-scroll
        src="../assets/logo_roland_garros_sur_fond.png"
        fade-img-on-scroll
        scroll-target="#scrolling-techniques-3"
      >
        <v-col class="text-right">
          <v-hover>
            <v-btn class="ma-2" color="#246B20" dark :to="routeLogin"
              >Login</v-btn
            >
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
      <v-container grid-list-lg>
        <v-layout align-center justify-center row fill-height>
          <v-flex xs12 class="text-xs-center display-1 font-weight-black my-5">
            <br />
          </v-flex>
          <v-flex xs12 sm12 md4>
            <v-card color="#246B20" elevation="24">
              <v-img src="../assets/nadal.jpg"> </v-img>
              <v-card-actions>
                <v-hover>
                  <v-btn block color="#246B20" :to="routeResultatsSimpleMessieurs">
                    <p style="color: White" class="ma-2">Resultats Messieurs</p>
                  </v-btn>
                </v-hover>
              </v-card-actions>
            </v-card>
          </v-flex>
          <v-flex xs12 sm12 md4>
            <v-card color="#246B20" elevation="24">
              <v-img src="../assets/fond_carte_resultats_dames.jpeg"> </v-img>
              <v-card-actions>
                <v-hover>
                  <v-btn block color="#246B20" :to="routeResultatsSimpleDames">
                    <p style="color: White" class="ma-2">Resultats Dames</p>
                  </v-btn>
                </v-hover>
              </v-card-actions>
            </v-card>
          </v-flex>
          <v-flex xs12 sm12 md4>
            <v-card color="#246B20" elevation="24">
              <v-img src="../assets/double.jpg"> </v-img>
              <v-card-actions>
                <v-hover>
                  <v-btn block color="#246B20" :to="routeResultatsDoubleMessieurs">
                    <p style="color: White" class="ma-2">Resultats Doubles</p>
                  </v-btn>
                </v-hover>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
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
  </div>
</template>

<script>
import * as constants from "../constants";

export default {
  name: constants.NOM_VUE_HOME,
  data: function () {
    return {
      routeResultatsSimpleMessieurs: constants.ROUTE_VUE_RESULTATS_SIMPLE_MESSIEURS,
      routeResultatsSimpleDames: constants.ROUTE_VUE_RESULTATS_SIMPLE_DAMES,
      routeResultatsDoubleMessieurs: constants.ROUTE_VUE_RESULTATS_DOUBLE_MESSIEURS,
      routeLogin: constants.ROUTE_VUE_LOGIN,
    };
  },
  beforeMount: function () {
    localStorage.clear();
  },
  mounted(){
    console.log(constants.API_BASE_URL) // verif URL API lors de la connexion via le load balancer aws
  }
};
</script>
