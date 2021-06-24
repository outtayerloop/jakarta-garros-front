<template>
  <v-app>
    <v-content>
      <!-- TITRE PAGE GESTION DE SOUS TOURNOIS -->
      <v-card class="overflow-hidden">
        <v-app-bar
          dark
          shrink-on-scroll
          src="../assets/logo_roland_garros_sur_fond.png"
          fade-img-on-scroll
          scroll-target="#scrolling-techniques-3"
        >
          <h9 class="ma-4">Gestion sous-tournois</h9>

          <!-- BOUTONS ACTIONS UTILISATEUR -->
          <v-col class="text-right">
            <v-hover>
              <v-btn class="ma-2" color="#246B20" dark :to="homeRoute">
                Se deconnecter
              </v-btn>
            </v-hover>
            <v-hover>
              <v-btn color="#194F28" :to="orga"> Retour </v-btn>
            </v-hover>
          </v-col>
          <!-- DESIGN PAGE -->
          <template v-slot:img="{ props }">
            <v-img
              v-bind="props"
              gradient="to top right, rgba(255,115,201,.33), rgba(25,32,72,.7)"
            ></v-img>
          </template>
        </v-app-bar>
      </v-card>

      <!-- CONTENU PAGE AVEC IMAGE DE FOND -->
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
            :items="matchsAffiches"
            class="elevation-1"
          >
            <template v-slot:top>
              <v-toolbar flat>
                <v-toolbar-title>Matchs</v-toolbar-title>
                <v-divider class="mx-4" inset vertical></v-divider>
                <v-spacer></v-spacer>

                <!-- VALIDATION DE MATCH -->
                <v-dialog v-model="dialogValidation" max-width="500px">
                  <v-card>
                    <v-card-title class="headline">
                      Voulez vous valider ce match ?
                    </v-card-title>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn
                        color="blue darken-1"
                        text
                        @click="closeValidation"
                      >
                        Annuler
                      </v-btn>
                      <v-btn
                        color="blue darken-1"
                        text
                        @click="validationItemConfirm"
                      >
                        Valider
                      </v-btn>
                      <v-spacer></v-spacer>
                    </v-card-actions>
                  </v-card>
                </v-dialog>

                <!-- CREATION MATCH -->
                <!-- DOUBLE MIXTE   -->
                <v-dialog
                  v-model="dialog"
                  max-width="700px"
                  v-if="typeCompletSousTournoiActuel == 'DOUBLE_MIXTE'"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      color="#246B20"
                      dark
                      class="mb-2"
                      v-bind="attrs"
                      v-on="on"
                      v-if="!sousTournoiActuelDejaValide"
                    >
                      Creer un match
                    </v-btn>
                  </template>
                  <v-card>
                    <v-card-title class="headline">
                      Créer un match
                    </v-card-title>
                    <br />
                    <br />
                    <v-card-text>
                      <v-container>
                        <v-card-subtitle class="soustitre">
                          Constitution des équipes :
                        </v-card-subtitle>
                        <v-row>
                          <v-col cols="12" sm="6" md="6">
                            <v-select
                              v-model="editedItem.equipe1joueur1"
                              :items="filterHomme"
                              label="Equipe 1 Joueur 1 (HOMME)"
                            ></v-select>
                          </v-col>
                          <v-col cols="12" sm="6" md="6">
                            <v-select
                              v-model="editedItem.equipe1joueur2"
                              :items="filterFemme"
                              label="Equipe 1 Joueur 2 (FEMME)"
                            ></v-select>
                          </v-col>
                        </v-row>
                        <v-row>
                          <v-col cols="12" sm="6" md="6">
                            <v-select
                              v-model="editedItem.equipe2joueur1"
                              :items="filterHomme"
                              label="Equipe 2 Joueur 1 (HOMME)"
                            ></v-select>
                          </v-col>
                          <v-col cols="12" sm="6" md="6">
                            <v-select
                              v-model="editedItem.equipe2joueur2"
                              :items="filterFemme"
                              label="Equipe 2 Joueur 2 (FEMME)"
                            ></v-select>
                          </v-col>
                        </v-row>
                        <br />
                        <br />
                        <v-card-subtitle class="soustitre">
                          Date et heure du match :
                        </v-card-subtitle>
                        <br />
                        <v-text-field
                          label="Date (AAAA-MM-JJ HH:MM:SS)"
                          v-model="editedItem.dateDebut"
                          readonly
                        ></v-text-field>
                        <v-row @click="updateDate">
                          <v-col cols="12" sm="6" md="6">
                            <v-date-picker
                              elevation="5"
                              locale="fr-FR"
                              v-model="editedItem.selectedDate"
                              width="290"
                              class="mt-4"
                              color="#246B20"
                              min="2020-12-10"
                              max="2020-12-31"
                            ></v-date-picker>
                          </v-col>
                          <v-col cols="12" sm="6" md="6">
                            <v-time-picker
                              elevation="5"
                              format="24hr"
                              v-model="editedItem.selectedTime"
                              width="290"
                              class="mt-4 maxheight"
                              color="#246B20"
                              min="08:00"
                              max="23:59"
                              use-seconds
                            ></v-time-picker>
                          </v-col>
                        </v-row>
                        <br /><br /><br />
                        <v-card-subtitle class="soustitre">
                          Sélection de l'arbitre et du court :
                        </v-card-subtitle>
                        <br />
                        <v-row>
                          <v-col cols="12" sm="6" md="6">
                            <v-select
                              v-model="editedItem.arbitre"
                              :items="arbitres"
                              label="Arbitre"
                            ></v-select>
                          </v-col>
                          <v-col cols="12" sm="6" md="6">
                            <v-select
                              v-model="editedItem.court"
                              :items="courts"
                              label="Court"
                            ></v-select>
                          </v-col>
                        </v-row>
                      </v-container>
                    </v-card-text>

                    <!-- BOUTONS ACTIONS -->
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

                <!-- DOUBLE MESSIEURS -->
                <v-dialog
                  v-model="dialog"
                  max-width="700px"
                  v-if="typeCompletSousTournoiActuel == 'DOUBLE_MESSIEURS'"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      color="#246B20"
                      dark
                      class="mb-2"
                      v-bind="attrs"
                      v-on="on"
                      v-if="!sousTournoiActuelDejaValide"
                    >
                      Creer un match
                    </v-btn>
                  </template>
                  <v-card>
                    <v-card-title class="headline">
                      Créer un match
                    </v-card-title>
                    <br />
                    <br />
                    <v-card-text>
                      <v-container>
                        <v-card-subtitle class="soustitre">
                          Constitution des équipes :
                        </v-card-subtitle>
                        <v-row>
                          <v-col cols="12" sm="6" md="6">
                            <v-select
                              v-model="editedItem.equipe1joueur1"
                              :items="filterHomme"
                              label="Equipe 1 Joueur 1 (HOMME)"
                            ></v-select>
                          </v-col>
                          <v-col cols="12" sm="6" md="6">
                            <v-select
                              v-model="editedItem.equipe1joueur2"
                              :items="filterHomme"
                              label="Equipe 1 Joueur 2 (HOMME)"
                            ></v-select>
                          </v-col>
                        </v-row>
                        <v-row>
                          <v-col cols="12" sm="6" md="6">
                            <v-select
                              v-model="editedItem.equipe2joueur1"
                              :items="filterHomme"
                              label="Equipe 2 Joueur 1 (HOMME)"
                            ></v-select>
                          </v-col>
                          <v-col cols="12" sm="6" md="6">
                            <v-select
                              v-model="editedItem.equipe2joueur2"
                              :items="filterHomme"
                              label="Equipe 2 Joueur 2 (HOMME)"
                            ></v-select>
                          </v-col>
                        </v-row>
                        <br />
                        <br />
                        <v-card-subtitle class="soustitre">
                          Date et heure du match :
                        </v-card-subtitle>
                        <br />
                        <v-text-field
                          label="Date (AAAA-MM-JJ HH:MM:SS)"
                          v-model="editedItem.dateDebut"
                          readonly
                        ></v-text-field>
                        <v-row @click="updateDate">
                          <v-col cols="12" sm="6" md="6">
                            <v-date-picker
                              elevation="5"
                              locale="fr-FR"
                              v-model="editedItem.selectedDate"
                              class="mt-3"
                              color="#246B20"
                              min="2020-12-10"
                              max="2020-12-31"
                            ></v-date-picker>
                          </v-col>
                          <v-col cols="12" sm="6" md="6">
                            <v-time-picker
                              elevation="5"
                              format="24hr"
                              v-model="editedItem.selectedTime"
                              class="mt-3"
                              color="#246B20"
                              min="08:00:00"
                              max="23:59:00"
                              use-seconds
                            ></v-time-picker>
                          </v-col>
                        </v-row>
                        <br /><br /><br />
                        <v-card-subtitle class="soustitre">
                          Sélection de l'arbitre et du court :
                        </v-card-subtitle>
                        <br />
                        <v-row>
                          <v-col cols="12" sm="6" md="6">
                            <v-select
                              v-model="editedItem.arbitre"
                              :items="arbitres"
                              label="Arbitre"
                            ></v-select>
                          </v-col>
                          <v-col cols="12" sm="6" md="6">
                            <v-select
                              v-model="editedItem.court"
                              :items="courts"
                              label="Court"
                            ></v-select>
                          </v-col>
                        </v-row>
                      </v-container>
                    </v-card-text>

                    <!-- BOUTONS ACTIONS -->
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

                <!-- DOUBLE DAMES -->
                <v-dialog
                  v-model="dialog"
                  max-width="700px"
                  v-if="typeCompletSousTournoiActuel == 'DOUBLE_DAMES'"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      color="#246B20"
                      dark
                      class="mb-2"
                      v-bind="attrs"
                      v-on="on"
                      v-if="!sousTournoiActuelDejaValide"
                    >
                      Creer un match
                    </v-btn>
                  </template>
                  <v-card>
                    <v-card-title class="headline">
                      Créer un match
                    </v-card-title>
                    <br />
                    <br />
                    <v-card-text>
                      <v-container>
                        <v-card-subtitle class="soustitre">
                          Constitution des équipes :
                        </v-card-subtitle>
                        <v-row>
                          <v-col cols="12" sm="6" md="6">
                            <v-select
                              v-model="editedItem.equipe1joueur1"
                              :items="filterFemme"
                              label="Equipe 1 Joueur 1 (FEMME)"
                            ></v-select>
                          </v-col>
                          <v-col cols="12" sm="6" md="6">
                            <v-select
                              v-model="editedItem.equipe1joueur2"
                              :items="filterFemme"
                              label="Equipe 1 Joueur 2 (FEMME)"
                            ></v-select>
                          </v-col>
                        </v-row>
                        <v-row>
                          <v-col cols="12" sm="6" md="6">
                            <v-select
                              v-model="editedItem.equipe2joueur1"
                              :items="filterFemme"
                              label="Equipe 2 Joueur 1 (FEMME)"
                            ></v-select>
                          </v-col>
                          <v-col cols="12" sm="6" md="6">
                            <v-select
                              v-model="editedItem.equipe2joueur2"
                              :items="filterFemme"
                              label="Equipe 2 Joueur 2 (FEMME)"
                            ></v-select>
                          </v-col>
                        </v-row>
                        <br />
                        <br />
                        <v-card-subtitle class="soustitre">
                          Date et heure du match :
                        </v-card-subtitle>
                        <br />
                        <v-text-field
                          label="Date (AAAA-MM-JJ HH:MM:SS)"
                          v-model="editedItem.dateDebut"
                          readonly
                        ></v-text-field>
                        <v-row @click="updateDate">
                          <v-col cols="12" sm="6" md="6">
                            <v-date-picker
                              elevation="5"
                              locale="fr-FR"
                              v-model="editedItem.selectedDate"
                              class="mt-3"
                              color="#246B20"
                              min="2020-12-10"
                              max="2020-12-31"
                            ></v-date-picker>
                          </v-col>
                          <v-col cols="12" sm="6" md="6">
                            <v-time-picker
                              elevation="5"
                              format="24hr"
                              v-model="editedItem.selectedTime"
                              class="mt-3"
                              color="#246B20"
                              min="08:00"
                              max="23:59"
                              use-seconds
                            ></v-time-picker>
                          </v-col>
                        </v-row>
                        <br /><br /><br />
                        <v-card-subtitle class="soustitre">
                          Sélection de l'arbitre et du court :
                        </v-card-subtitle>
                        <br />
                        <v-row>
                          <v-col cols="12" sm="6" md="6">
                            <v-select
                              v-model="editedItem.arbitre"
                              :items="arbitres"
                              label="Arbitre"
                            ></v-select>
                          </v-col>
                          <v-col cols="12" sm="6" md="6">
                            <v-select
                              v-model="editedItem.court"
                              :items="courts"
                              label="Court"
                            ></v-select>
                          </v-col>
                        </v-row>
                      </v-container>
                    </v-card-text>

                    <!-- BOUTONS ACTIONS -->
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

                <!-- SIMPLE MESSIEURS -->
                <v-dialog
                  v-model="dialog"
                  max-width="700px"
                  v-if="typeCompletSousTournoiActuel == 'SIMPLE_MESSIEURS'"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      color="#246B20"
                      dark
                      class="mb-2"
                      v-bind="attrs"
                      v-on="on"
                      v-if="!sousTournoiActuelDejaValide"
                    >
                      Creer un match
                    </v-btn>
                  </template>
                  <v-card>
                    <v-card-title class="headline">
                      Créer un match
                    </v-card-title>
                    <br />
                    <br />
                    <v-card-text>
                      <v-container>
                        <v-card-subtitle class="soustitre">
                          Constitution des équipes :
                        </v-card-subtitle>
                        <v-row>
                          <v-col cols="12" sm="12" md="12">
                            <v-select
                              v-model="editedItem.equipe1joueur1"
                              :items="filterHomme"
                              label="Equipe 1 Joueur 1 (HOMME)"
                            ></v-select>
                          </v-col>
                        </v-row>
                        <v-row>
                          <v-col cols="12" sm="12" md="12">
                            <v-select
                              v-model="editedItem.equipe2joueur1"
                              :items="filterHomme"
                              label="Equipe 2 Joueur 1 (HOMME)"
                            ></v-select>
                          </v-col>
                        </v-row>
                        <br />
                        <br />
                        <v-card-subtitle class="soustitre">
                          Date et heure du match :
                        </v-card-subtitle>
                        <br />
                        <v-text-field
                          label="Date (AAAA-MM-JJ HH:MM:SS)"
                          v-model="editedItem.dateDebut"
                          readonly
                        ></v-text-field>
                        <v-row @click="updateDate">
                          <v-col cols="12" sm="6" md="6">
                            <v-date-picker
                              elevation="5"
                              locale="fr-FR"
                              v-model="editedItem.selectedDate"
                              class="mt-3"
                              color="#246B20"
                              min="2020-12-10"
                              max="2020-12-31"
                            ></v-date-picker>
                          </v-col>
                          <v-col cols="12" sm="6" md="6">
                            <v-time-picker
                              elevation="5"
                              format="24hr"
                              v-model="editedItem.selectedTime"
                              class="mt-3"
                              color="#246B20"
                              min="08:00"
                              max="23:59"
                              use-seconds
                            ></v-time-picker>
                          </v-col>
                        </v-row>
                        <br /><br /><br />
                        <v-card-subtitle class="soustitre">
                          Sélection de l'arbitre et du court :
                        </v-card-subtitle>
                        <br />
                        <v-row>
                          <v-col cols="12" sm="6" md="6">
                            <v-select
                              v-model="editedItem.arbitre"
                              :items="arbitres"
                              label="Arbitre"
                            ></v-select>
                          </v-col>
                          <v-col cols="12" sm="6" md="6">
                            <v-select
                              v-model="editedItem.court"
                              :items="courts"
                              label="Court"
                            ></v-select>
                          </v-col>
                        </v-row>
                      </v-container>
                    </v-card-text>

                    <!-- BOUTONS ACTIONS -->
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

                <!-- SIMPLE DAMES -->
                <v-dialog
                  v-model="dialog"
                  max-width="700px"
                  v-if="typeCompletSousTournoiActuel == 'SIMPLE_DAMES'"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      color="#246B20"
                      dark
                      class="mb-2"
                      v-bind="attrs"
                      v-on="on"
                      v-if="!sousTournoiActuelDejaValide"
                    >
                      Creer un match
                    </v-btn>
                  </template>
                  <v-card>
                    <v-card-title class="headline">
                      Créer un match
                    </v-card-title>
                    <br />
                    <br />
                    <v-card-text>
                      <v-container>
                        <v-card-subtitle class="soustitre">
                          Constitution des équipes :
                        </v-card-subtitle>
                        <v-row>
                          <v-col cols="12" sm="12" md="12">
                            <v-select
                              v-model="editedItem.equipe1joueur1"
                              :items="filterFemme"
                              label="Equipe 1 Joueur 1 (FEMME)"
                            ></v-select>
                          </v-col>
                        </v-row>
                        <v-row>
                          <v-col cols="12" sm="12" md="12">
                            <v-select
                              v-model="editedItem.equipe2joueur1"
                              :items="filterFemme"
                              label="Equipe 2 Joueur 1 (FEMME)"
                            ></v-select>
                          </v-col>
                        </v-row>
                        <br />
                        <br />
                        <v-card-subtitle class="soustitre">
                          Date et heure du match :
                        </v-card-subtitle>
                        <br />
                        <v-text-field
                          label="Date (AAAA-MM-JJ HH:MM:SS)"
                          v-model="editedItem.dateDebut"
                          readonly
                        ></v-text-field>
                        <v-row @click="updateDate">
                          <v-col cols="12" sm="6" md="6">
                            <v-date-picker
                              elevation="5"
                              locale="fr-FR"
                              v-model="editedItem.selectedDate"
                              class="mt-3"
                              color="#246B20"
                              min="2020-12-10"
                              max="2020-12-31"
                            ></v-date-picker>
                          </v-col>
                          <v-col cols="12" sm="6" md="6">
                            <v-time-picker
                              elevation="5"
                              format="24hr"
                              v-model="editedItem.selectedTime"
                              class="mt-3"
                              color="#246B20"
                              min="08:00"
                              max="23:59"
                              use-seconds
                            ></v-time-picker>
                          </v-col>
                        </v-row>
                        <br /><br /><br />
                        <v-card-subtitle class="soustitre">
                          Sélection de l'arbitre et du court :
                        </v-card-subtitle>
                        <br />
                        <v-row>
                          <v-col cols="12" sm="6" md="6">
                            <v-select
                              v-model="editedItem.arbitre"
                              :items="arbitres"
                              label="Arbitre"
                            ></v-select>
                          </v-col>
                          <v-col cols="12" sm="6" md="6">
                            <v-select
                              v-model="editedItem.court"
                              :items="courts"
                              label="Court"
                            ></v-select>
                          </v-col>
                        </v-row>
                      </v-container>
                    </v-card-text>

                    <!-- BOUTONS ACTIONS -->
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

                <!-- MODIFICATION MATCH -->
                <v-dialog v-model="dialogModif" max-width="900px">
                  <v-card>
                    <v-card-title class="headline"
                      >Voulez vous modifier ce match ?</v-card-title
                    >
                    <v-card-text>
                      <v-container>
                        <v-card-subtitle class="soustitre">
                          Constitution des équipes :
                        </v-card-subtitle>
                        <v-row>
                          <v-col cols="12" sm="6" md="6">
                            <v-text-field
                              v-model="equipe1joueur1[0].nomJoueur"
                              label="Equipe 1 Joueur 1"
                              disabled
                            ></v-text-field>
                          </v-col>
                          <v-col
                            cols="12"
                            sm="6"
                            md="6"
                            v-if="matchsLists[0].equipes[0].joueurs.length == 2"
                          >
                            <v-text-field
                              v-model="equipe1joueur2[0].nomJoueur"
                              label="Equipe 1 Joueur 2"
                              disabled
                            ></v-text-field>
                          </v-col>
                        </v-row>
                        <v-row>
                          <v-col cols="12" sm="6" md="6">
                            <v-text-field
                              v-model="equipe2joueur1[0].nomJoueur"
                              label="Equipe 2 Joueur 1"
                              disabled
                            ></v-text-field>
                          </v-col>
                          <v-col
                            cols="12"
                            sm="6"
                            md="6"
                            v-if="matchsLists[0].equipes[1].joueurs.length == 2"
                          >
                            <v-text-field
                              v-model="equipe2joueur2[0].nomJoueur"
                              label="Equipe 2 Joueur 2"
                              disabled
                            ></v-text-field>
                          </v-col>
                        </v-row>
                        <br />
                        <br />
                        <v-card-subtitle class="soustitre">
                          Date et heure du match :
                        </v-card-subtitle>
                        <br />
                        <v-text-field
                          label="Date (AAAA-MM-JJ HH:MM:SS)"
                          v-model="editedItem.dateDebut"
                          readonly
                        ></v-text-field>
                        <v-row>
                          <v-col cols="12" sm="6" md="6">
                            <v-date-picker
                              elevation="5"
                              locale="fr-FR"
                              v-model="editedItem.selectedDate"
                              class="mt-3"
                              color="#246B20"
                              min="2020-12-10"
                              max="2020-12-31"
                            ></v-date-picker>
                          </v-col>
                          <v-col cols="12" sm="6" md="6">
                            <v-time-picker
                              elevation="5"
                              format="24hr"
                              v-model="editedItem.selectedTime"
                              class="mt-3"
                              color="#246B20"
                              min="08:00"
                              max="23:59"
                              use-seconds
                            ></v-time-picker>
                          </v-col>
                          <v-hover>
                            <v-btn
                              center
                              class="ma-2"
                              color="#246B20"
                              dark
                              @click="
                                modifierDate(
                                  editedItem.selectedTime,
                                  editedItem.selectedDate
                                )
                              "
                            >
                              Modifier l'heure du match
                            </v-btn>
                          </v-hover>
                        </v-row>
                        <br /><br /><br />
                        <v-card-subtitle class="soustitre">
                          Sélection de l'arbitre et du court :
                        </v-card-subtitle>
                        <br />
                        <v-row>
                          <v-col cols="12" sm="6" md="6">
                            <v-select
                              v-model="editedItem.arbitre.nomArbitre"
                              :items="arbitres"
                              label="Arbitre"
                            ></v-select>
                          </v-col>
                          <v-col cols="12" sm="6" md="6">
                            <v-select
                              v-model="editedItem.court.nomCourt"
                              :items="courts"
                              label="Court"
                            ></v-select>
                          </v-col>
                        </v-row>
                      </v-container>
                    </v-card-text>

                    <!-- BOUTONS ACTIONS -->
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

                <!-- SUPPRIMER LE MATCH-->
                <v-dialog v-model="dialogDelete" max-width="500px">
                  <v-card>
                    <v-card-title class="headline">
                      Voulez vous supprimer ce match ?
                    </v-card-title>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn color="blue darken-1" text @click="closeDelete">
                        Annuler
                      </v-btn>
                      <v-btn
                        color="blue darken-1"
                        text
                        @click="deleteItemConfirm"
                      >
                        Valider
                      </v-btn>
                      <v-spacer></v-spacer>
                    </v-card-actions>
                  </v-card>
                </v-dialog>

                <!-- AJOUTER UN RESULTAT A UN MATCH -->
                <v-dialog v-model="dialogResultat" max-width="720px">
                  <v-card>
                    <v-card-title class="headline">
                      Voulez vous ajouter un resultat à ce match ?
                    </v-card-title>
                    <v-card-text>
                      <v-container>
                        <v-row>
                          <v-col cols="12" sm="6" md="4">
                            <v-select
                              v-model="editedItem.score1"
                              :items="getJoueur1Sets(editedItem)"
                              label="Sets gagnés par joueur 1"
                            ></v-select>
                          </v-col>
                          <v-col cols="12" sm="6" md="4">
                            <v-select
                              v-model="editedItem.score2"
                              :items="getJoueur2Sets(editedItem)"
                              label="Sets gagnés par joueur 2"
                            ></v-select>
                          </v-col>
                        </v-row>
                        <v-row>
                          <v-col cols="12" sm="6">
                            <label>Durée du match (HH:MM:SS)</label>
                            <v-time-picker
                              elevation="5"
                              format="24hr"
                              v-model="editedItem.duree"
                              width="290"
                              class="mt-4 maxheight"
                              color="#246B20"
                              min="00:30:00"
                              max="04:00:00"
                              use-seconds
                            ></v-time-picker>
                            <!--<v-text-field
                              v-model="editedItem.duree"
                              label="Durée du match (HH:MM:SS)"
                            ></v-text-field>-->
                          </v-col>
                        </v-row>
                      </v-container>
                    </v-card-text>

                    <!-- BOUTONS ACTIONS -->
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn color="blue darken-1" text @click="closeResultat">
                        Annuler
                      </v-btn>
                      <v-btn
                        color="blue darken-1"
                        text
                        @click="validerResultat"
                      >
                        Valider
                      </v-btn>
                      <v-spacer></v-spacer>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </v-toolbar>
            </template>

            <!-- LISTE DES ICONES -->
            <!-- ICONE MODIFIER -->
            <template v-slot:[`item.actions`]="{ item }">
              <v-icon
                small
                class="mr-2"
                @click="editItem(getRealMatchObject(item))"
                v-if="
                  !estMatchValide(getRealMatchObject(item)) &&
                  !estSousTournoiValide
                "
              >
                mdi-pencil
              </v-icon>
              <!-- ICONE SUPPRIMER-->
              <v-icon
                small
                class="mr-2"
                @click="deleteItem(getRealMatchObject(item))"
                v-if="
                  !estMatchValide(getRealMatchObject(item)) &&
                  !estSousTournoiValide
                "
              >
                mdi-delete
              </v-icon>
              <!-- ICONE VALIDE -->
              <v-icon
                small
                class="mr-2"
                @click="validationItem(getRealMatchObject(item))"
                v-if="
                  !estMatchValide(getRealMatchObject(item)) &&
                  !estSousTournoiValide
                "
              >
                mdi-checkbox-marked-outline
              </v-icon>
              <!-- ICONE SCORE -->
              <v-icon
                small
                class="mr-2"
                @click="Resultat(getRealMatchObject(item))"
                v-if="
                  estMatchValide(getRealMatchObject(item)) ||
                  estSousTournoiValide
                "
              >
                mdi-scoreboard-outline
              </v-icon>
            </template>
          </v-data-table>
        </v-container>
        <br /><br /><br /><br /><br /><br /><br /><br /><br /><br />

        <!-- LOGO ROLLAND GARROS FOND -->
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
.soustitre {
  font-size: 17px;
  padding: 0px;
}
.souselement {
  padding: 7px;
}
.v-picker__title {
  max-height: 80px;
}
</style> 
<script >
import axios from "axios";
import * as constantes from "../constants";

export default {
  data: () => ({
    orga: constantes.ROUTE_VUE_ORGANISATEUR,
    homeRoute: constantes.ROUTE_VUE_HOME,
    resultsRoute: constantes.ROUTE_VUE_RESULTATS_SIMPLE_MESSIEURS,

    dialog: false,
    dialogDelete: false,
    dialogValidation: false,
    dialogResultat: false,
    dialogueModif: false,
    headers: [
      { text: "Equipe1", sortable: false, value: "equipes[0].joueurs" },
      { text: "Equipe2", sortable: false, value: "equipes[1].joueurs" },
      { text: "Date", sortable: false, value: "dateDebut" },
      { text: "Durée", sortable: false, value: "duree" },
      { text: "Arbitre", sortable: false, value: "arbitre.nomArbitre" },
      { text: "Court", sortable: false, value: "court.nomCourt" },
      { text: "Actions", sortable: false, value: "actions" },
    ],
    matchs: [],
    editedIndex: -1,
    editedItem: {
      equipes: "",
      dateDebut: "",
      duree: "",
      arbitre: "",
      estMatchValide: "",
      idMatch: "",
      court: "",
      score1: "",
      score2: "",
      equipe1joueur1: "",
      equipe2joueur1: "",
      equipe2joueur2: "",
      equipe1joueur2: "",
      idCourt: "",
      selectedDate: "",
      selectedTime: "",
    },

    defaultItem: {
      equipes: "",
      dateDebut: "",
      duree: "",
      arbitre: "",
      estMatchValide: "",
      idMatch: "",
      court: "",
      score1: "",
      score2: "",
    },
    selectedCourt: [],
    selectedArbitre: [],
    finalCreatedTeam: [],
    joueur: [],
    courts: [],
    courtsBDD: [],
    arbitres: [],
    arbitresBDD: [],
    equipes: [],
    equipe1joueur1: [],
    equipe2joueur1: [],
    equipe1joueur2: [],
    equipe2joueur2: [],
    longueur: [],
    longueur2: [],
    idSousTournoiActuel: null,
    urlSousTournoiCorrespondances: [
      {
        id: 1,
        url: constantes.ROUTE_VUE_ORGANISATEUR_SIMPLE_MESSIEURS,
        typeSousTournoi: constantes.SOUS_TOURNOI_SIMPLE_MESSIEURS,
        type: "simple",
      },
      {
        id: 3,
        url: constantes.ROUTE_VUE_ORGANISATEUR_DOUBLE_MESSIEURS,
        typeSousTournoi: constantes.SOUS_TOURNOI_DOUBLE_MESSIEURS,
        type: "double",
      },
      {
        id: 2,
        url: constantes.ROUTE_VUE_ORGANISATEUR_SIMPLE_DAMES,
        typeSousTournoi: constantes.SOUS_TOURNOI_SIMPLE_DAMES,
        type: "simple",
      },
      {
        id: 4,
        url: constantes.ROUTE_VUE_ORGANISATEUR_DOUBLE_DAMES,
        typeSousTournoi: constantes.SOUS_TOURNOI_DOUBLE_DAMES,
        type: "double",
      },
      {
        id: 5,
        url: constantes.ROUTE_VUE_ORGANISATEUR_DOUBLE_MIXTE,
        typeSousTournoi: constantes.SOUS_TOURNOI_DOUBLE_MIXTE,
        type: "double",
      },
    ],
    matchsLists: [],
    matchsAffiches: [],
    typeSousTournoiActuel: "",
    typeCompletSousTournoiActuel: "",
    setsJoueur: [],
    listeJoueursBDD: [],
    listeJoueurs: [],
    estSousTournoiValide: false,
    filterFemme: [],
    filterHomme: [],
    sousTournoiActuelDejaValide: false,
  }),
  beforeMount() {
    if (localStorage.getItem(constantes.ROLE_UTILISATEUR) != constantes.ROLE_ORGANISATEUR)
      this.$router.push('/interdit');
    const that = this;
    axios
      .get(`${constantes.API_BASE_URL}/joueurs`)
      .then((res) => {
        var i;
        that.listeJoueursBDD = res.data.contenu;
        that.longueur = res.data.contenu;
        for (i = 0; i < that.longueur.length; i++) {
          that.listeJoueurs.push(res.data.contenu[i].nomJoueur);
          that.listeJoueursBDD = res.data.contenu;
        }
        that.listeJoueursBDD.forEach((joueur) => {
          if (joueur.sexe == "FEMME") {
            that.filterFemme.push(joueur.nomJoueur);
          }
          if (joueur.sexe == "HOMME") {
            that.filterHomme.push(joueur.nomJoueur);
          }
        });
      })
      .catch((err) => {});
    axios
      .get(`${constantes.API_BASE_URL}/arbitres`)
      .then((res) => {
        var i;
        that.longueur = res.data.contenu;
        for (i = 0; i < that.longueur.length; i++) {
          that.arbitres.push(res.data.contenu[i].nomArbitre);
          that.arbitresBDD = res.data.contenu;
        }
      })
      .catch((err) => {});
    axios
      .get(`${constantes.API_BASE_URL}/courts`)
      .then((res) => {
        var i;
        that.longueur2 = res.data.contenu;
        for (i = 0; i < that.longueur2.length; i++) {
          that.courts.push(res.data.contenu[i].nomCourt);
        }
      })
      .catch((err) => {});
    axios
      .get(`${constantes.API_BASE_URL}/courts`)
      .then((res) => {
        that.courtsBDD = res.data.contenu;
      })
      .catch((err) => {});
    const windowUrl = window.location.href.split("#")[1];

    that.idSousTournoiActuel = that.urlSousTournoiCorrespondances.filter(
      (corresp) => corresp.url == windowUrl
    )[0].id;

    that.typeSousTournoiActuel = that.urlSousTournoiCorrespondances.filter(
      (corresp) => corresp.url == windowUrl
    )[0].type;

    that.typeCompletSousTournoiActuel = that.urlSousTournoiCorrespondances.filter(
      (corresp) => corresp.url == windowUrl
    )[0].typeSousTournoi;

    if (
      that.typeCompletSousTournoiActuel ===
      constantes.SOUS_TOURNOI_SIMPLE_MESSIEURS
    ) {
      that.setsJoueur = [0, 1, 2, 3, 4, 5];
    } else {
      that.setsJoueur = [0, 1, 2, 3];
    }

    axios
      .get(
        `${constantes.API_BASE_URL}/soustournois/${that.idSousTournoiActuel}`
      )
      .then((res) => {
        that.matchsLists = Array.from(res.data.contenu.listeMatch);
        that.matchsAffiches = JSON.parse(
          JSON.stringify(that.matchsLists.slice()).toString()
        );

        that.sousTournoiActuelDejaValide =
          res.data.contenu.estSousTournoiValide;

        if (that.typeSousTournoiActuel === "double") {
          that.matchsAffiches.forEach((match) => {
            match.equipes.forEach((equipe) => {
              let joueursConcatenes = ``;
              Array.from(equipe.joueurs).forEach((joueur, index) => {
                if (index == 0) joueursConcatenes += `${joueur.nomJoueur} - `;
                else joueursConcatenes += `${joueur.nomJoueur}`;
              });
              equipe.joueurs = joueursConcatenes;
            });
          });

          that.equipe1joueur1.push(that.matchsLists[0].equipes[0].joueurs[0]);

          that.equipe2joueur1.push(that.matchsLists[0].equipes[1].joueurs[0]);

          that.equipe1joueur2.push(that.matchsLists[0].equipes[0].joueurs[1]);

          that.equipe2joueur2.push(that.matchsLists[0].equipes[1].joueurs[1]);
        } else {
          that.matchsAffiches.forEach((match) => {
            match.equipes.forEach((equipe) => {
              equipe.joueurs = equipe.joueurs[0].nomJoueur;
            });
          });
        }
        that.equipe1joueur1.push(that.matchsLists[0].equipes[0].joueurs[0]);

        that.equipe2joueur1.push(that.matchsLists[0].equipes[1].joueurs[0]);
      })
      .catch((err) => {
        console.log(err);
      });

    axios
      .get(`${constants.API_BASE_URL}/soustournois`)
      .then((res) => {
        that.estSousTournoiValide = res.data.contenu.filter(
          (sousTournoi) =>
            sousTournoi.idSousTournoi === that.idSousTournoiActuel
        )[0].estSousTournoiValide;
      })
      .catch((err) => {
        console.log(err);
      });
  },

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Item" : "Edit Item";
    },
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
    dialogValidation(val) {
      val || this.closeValidation();
    },
    dialogResultat(val) {
      val || this.closeResultat();
    },
    dialogModif(val) {
      val || this.closeModif();
    },
  },

  methods: {
    computeTwoMembersTeam(team) {
      return `${team.joueurs[0].nomJoueur - team.joueurs[1].nomJoueur}`;
    },

    editItem(item) {
      this.editedIndex = this.matchs.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogModif = true;
    },

    validationItem(item) {
      this.editedItem = Object.assign({}, item);
      this.editedIndex = this.matchs.indexOf(item);
      this.dialogValidation = true;
    },

    validationItemConfirm() {
      this.editItemConfirm(true);
      this.closeValidation();
    },

    estMatchValide(item) {
      if (item.estMatchValide == true) {
        return true;
      } else {
        return false;
      }
    },

    Resultat(item) {
      this.editedIndex = this.matchs.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogResultat = true;
    },

    validerResultat() {
      if (
        this.editedItem.score1 === null ||
        this.editedItem.score1 === "" ||
        typeof this.editedItem.score1 === typeof undefined ||
        this.editedItem.score1 === false ||
        this.editedItem.score2 === null ||
        this.editedItem.score2 === "" ||
        typeof this.editedItem.score2 === typeof undefined ||
        this.editedItem.score2 === false ||
        this.editedItem.score1 + this.editedItem.score2 !==
          this.setsJoueur.length - 1
      ) {
        alert("Veuillez remplir les scores correctement");
      } else {
        this.editItemConfirm(true);
        this.closeValidation();
      }
    },

    deleteItem(item) {
      this.editedIndex = this.matchs.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      var that = this;
      var idMatch = that.editedItem.idMatch;
      axios
        .delete(`${constantes.API_BASE_URL}/matchs/${idMatch}`)
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

    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    closeValidation() {
      this.dialogValidation = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },
    closeResultat() {
      this.dialogResultat = false;
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
    modifierDate(heure, date) {
      var that = this;
      if (heure == undefined) {
        heure = that.editedItem.dateDebut.split(" ")[1];
      } else {
        heure = that.editedItem.selectedTime;
      }
      console.log(heure);
      if (date == undefined) {
        date = that.editedItem.dateDebut.split(" ")[0];
      } else {
        date = that.editedItem.selectedDate;
      }
      that.editedItem.dateDebut = date + " " + heure;
      that.editedItem.selectedDate = date;
      that.editedItem.selectedTime = heure;
    },

    updateDate() {
      var that = this;
      that.editedItem.dateDebut =
        that.editedItem.selectedDate + " " + that.editedItem.selectedTime;
    },

    editItemConfirm(item) {
      var that = this;
      var isValid = false;
      if (item == true) {
        isValid = true;
      }
      if (
        that.editedItem.equipes != "" &&
        that.editedItem.selectedDate != "" &&
        that.editedItem.selectedTime != "" &&
        that.editedItem.arbitre != "" &&
        that.editedItem.court != ""
      ) {
        that.checkCourtId();
        that.checkArbitreId();
        var donnee = {
          idMatch: that.editedItem.idMatch,
          equipes: that.editedItem.equipes,
          dateDebut: that.editedItem.dateDebut,
          arbitre: that.editedItem.arbitre,
          idCourt: that.editedItem.court.idCourt,
          idSousTournoi: this.idSousTournoiActuel,
          court: that.editedItem.court,
          estMatchValide: isValid,
          score1: that.editedItem.score1,
          score2: that.editedItem.score2,
          duree: that.editedItem.duree,
        };
        var requete = JSON.stringify(donnee);
        axios
          .put(
            `${constantes.API_BASE_URL}/matchs/${that.editedItem.idMatch}`,
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
        alert("Il manque des champs vides");
      }
    },
    checkCourtId() {
      var that = this;
      that.courtsBDD.forEach((court) => {
        if (that.editedItem.court.nomCourt == court.nomCourt) {
          that.editedItem.court.idCourt = court.idCourt;
          that.editedItem.court = court;
        } else if (that.editedItem.court == court.nomCourt) {
          that.selectedCourt = court;
          that.editedItem.idCourt = court.idCourt;
        }
      });
    },

    checkArbitreId() {
      var that = this;
      that.arbitresBDD.forEach((arb) => {
        if (that.editedItem.arbitre.nomArbitre == arb.nomArbitre) {
          that.editedItem.arbitre = arb;
        } else if (that.editedItem.arbitre == arb.nomArbitre) {
          that.selectedArbitre = arb;
        }
      });
    },

    getRealMatchObject(simplifiedMatch) {
      return Array.from(this.matchsLists).filter(
        (match) =>
          match.idMatch.toString() === simplifiedMatch.idMatch.toString()
      )[0];
    },
    getJoueur1Sets: function (match) {
      const that = this;
      const maxSetsNumber = that.setsJoueur.length - 1;
      if (match.score1 === 0 && match.score2 === 0) return that.setsJoueur;
      else {
        let setsArrayToReturn = [];
        if (match.score1 < match.score2) {
          setsArrayToReturn.push(maxSetsNumber - match.score2);
        } else if (match.score1 > match.score2) {
          return that.setsJoueur;
        } else {
          return that.setsJoueur;
        }
        return setsArrayToReturn;
      }
    },
    getJoueur2Sets: function (match) {
      const that = this;
      const maxSetsNumber = that.setsJoueur.length - 1;
      if (match.score1 === 0 && match.score2 === 0) return that.setsJoueur;
      else {
        let setsArrayToReturn = [];
        if (match.score2 < match.score1) {
          setsArrayToReturn.push(maxSetsNumber - match.score1);
        } else if (match.score2 > match.score1) {
          return that.setsJoueur;
        } else {
          return that.setsJoueur;
        }
        return setsArrayToReturn;
      }
    },

    createFinalTeam() {
      var that = this;
      var joueurs = [];
      var equipe1 = { joueurs: "" };
      var equipe11 = {};
      var equipe12 = [];
      var equipe2 = { joueurs: "" };
      var equipe21 = [];
      var equipe22 = [];

      if (
        that.typeCompletSousTournoiActuel == "DOUBLE_MIXTE" ||
        that.typeCompletSousTournoiActuel == "DOUBLE_MESSIEURS" ||
        that.typeCompletSousTournoiActuel == "DOUBLE_DAMES"
      ) {
        var finalT = [
          {
            joueurs: [{}, {}],
          },
          { joueurs: [{}, {}] },
        ];

        that.listeJoueursBDD.forEach((joueur) => {
          if (that.editedItem.equipe1joueur1 == joueur.nomJoueur) {
            //EQUIPE 1 JOUEUR 1
            equipe11 = joueur;
            finalT[0].joueurs[0] = equipe11;
          }
        });

        that.listeJoueursBDD.forEach((joueur) => {
          if (that.editedItem.equipe1joueur2 == joueur.nomJoueur) {
            //EQUIPE 1 JOUEUR 2
            equipe12 = joueur;
            finalT[0].joueurs[1] = equipe12;
          }
        });

        that.listeJoueursBDD.forEach((joueur) => {
          if (that.editedItem.equipe2joueur1 == joueur.nomJoueur) {
            //EQUIPE 2 JOUEUR 1
            equipe21 = joueur;
            finalT[1].joueurs[0] = equipe21;
          }
        });
        that.listeJoueursBDD.forEach((joueur) => {
          if (that.editedItem.equipe2joueur2 == joueur.nomJoueur) {
            //EQUIPE 2 JOUEUR 2
            equipe22 = joueur;
            finalT[1].joueurs[1] = equipe22;
          }
        });

        that.finalCreatedTeam = finalT;
      }

      if (
        that.typeCompletSousTournoiActuel == "SIMPLE_MESSIEURS" ||
        that.typeCompletSousTournoiActuel == "SIMPLE_DAMES"
      ) {
        var finalT = [
          {
            joueurs: [{}],
          },
          { joueurs: [{}] },
        ];

        that.listeJoueursBDD.forEach((joueur) => {
          if (that.editedItem.equipe1joueur1 == joueur.nomJoueur) {
            //EQUIPE 1 JOUEUR 1
            equipe11 = joueur;
            finalT[0].joueurs[0] = equipe11;
          }
        });

        that.listeJoueursBDD.forEach((joueur) => {
          if (that.editedItem.equipe2joueur1 == joueur.nomJoueur) {
            //EQUIPE 2 JOUEUR 1
            equipe21 = joueur;
            finalT[1].joueurs[0] = equipe21;
          }
        });
        that.finalCreatedTeam = finalT;
      }
    },
    checkJoueurUtilise() {
      var that = this;
      if (
        that.typeCompletSousTournoiActuel == "SIMPLE_MESSIEURS" ||
        that.typeCompletSousTournoiActuel == "SIMPLE_DAMES"
      ) {
        if (
          that.editedItem.equipe1joueur1 != "" &&
          that.editedItem.equipe2joueur1 != ""
        ) {
          if (
            that.editedItem.equipe1joueur1 == that.editedItem.equipe2joueur1
          ) {
            that.editedItem.equipe1joueur1 = "";
            that.editedItem.equipe2joueur1 = "";
            alert("Vous avez indiqué deux fois le même joueur.");
          }
        }
      }

      if (
        that.typeCompletSousTournoiActuel == "DOUBLE_MIXTE" ||
        that.typeCompletSousTournoiActuel == "DOUBLE_MESSIEURS" ||
        that.typeCompletSousTournoiActuel == "DOUBLE_DAMES"
      ) {
        if (
          that.editedItem.equipe1joueur1 != "" &&
          that.editedItem.equipe2joueur1 != "" &&
          that.editedItem.equipe2joueur2 != "" &&
          that.editedItem.equipe1joueur2 != ""
        ) {
          if (
            that.editedItem.equipe1joueur1 == that.editedItem.equipe1joueur2
          ) {
            that.editedItem.equipe1joueur1 = "";
            that.editedItem.equipe1joueur2 = "";
            alert("Vous avez indiqué deux fois le même joueur.");
          }
          if (
            that.editedItem.equipe1joueur1 == that.editedItem.equipe2joueur1
          ) {
            that.editedItem.equipe1joueur1 = "";
            that.editedItem.equipe2joueur1 = "";
            alert("Vous avez indiqué deux fois le même joueur.");
          }
          if (
            that.editedItem.equipe1joueur1 == that.editedItem.equipe2joueur2
          ) {
            that.editedItem.equipe1joueur1 = "";
            that.editedItem.equipe2joueur2 = "";
            alert("Vous avez indiqué deux fois le même joueur.");
          }
          if (
            that.editedItem.equipe1joueur2 == that.editedItem.equipe2joueur1
          ) {
            that.editedItem.equipe1joueur2 = "";
            that.editedItem.equipe2joueur1 = "";
            alert("Vous avez indiqué deux fois le même joueur.");
          }
          if (
            that.editedItem.equipe1joueur2 == that.editedItem.equipe2joueur2
          ) {
            that.editedItem.equipe1joueur2 = "";
            that.editedItem.equipe2joueur2 = "";
            alert("Vous avez indiqué deux fois le même joueur.");
          }
          if (
            that.editedItem.equipe2joueur1 == that.editedItem.equipe2joueur2
          ) {
            that.editedItem.equipe2joueur1 = "";
            that.editedItem.equipe2joueur2 = "";
            alert("Vous avez indiqué deux fois le même joueur.");
          }
        }
      }
    },

    save() {
      var that = this;
      var isValid = false;
      that.checkCourtId();
      that.checkArbitreId();
      that.createFinalTeam();
      that.checkJoueurUtilise();
      if (
        that.typeCompletSousTournoiActuel == "DOUBLE_MIXTE" ||
        that.typeCompletSousTournoiActuel == "DOUBLE_MESSIEURS" ||
        that.typeCompletSousTournoiActuel == "DOUBLE_DAMES"
      ) {
        if (
          that.editedItem.equipe1joueur1 != "" &&
          that.editedItem.selectedDate != "" &&
          that.editedItem.selectedTime != "" &&
          that.editedItem.arbitre != "" &&
          that.editedItem.court != "" &&
          that.editedItem.equipe2joueur1 != "" &&
          that.editedItem.equipe2joueur2 != "" &&
          that.editedItem.equipe1joueur2 != ""
        ) {
          var donnee = {
            equipes: that.finalCreatedTeam,
            dateDebut: that.editedItem.dateDebut,
            arbitre: that.selectedArbitre,
            court: that.selectedCourt,
            idSousTournoi: this.idSousTournoiActuel,
            estMatchValide: false,
            duree: null,
            score1: 0,
            score2: 0,
          };
          var requete = JSON.stringify(donnee);
          axios
            .post(`${constantes.API_BASE_URL}/matchs`, requete)
            .then((resultat) => {
              if (resultat.status == constantes.SUCCESS_STATUS_CODE) {
                console.log(resultat);
                that.close();
                location.reload();
              }
            })
            .catch((err) => {
              console.log(err);
            });
        } else {
          alert("Il manque des champs vides");
        }
      }
      if (
        that.typeCompletSousTournoiActuel == "SIMPLE_MESSIEURS" ||
        that.typeCompletSousTournoiActuel == "SIMPLE_DAMES"
      ) {
        if (
          that.editedItem.equipe1joueur1 != "" &&
          that.editedItem.selectedDate != "" &&
          that.editedItem.selectedTime != "" &&
          that.editedItem.arbitre != "" &&
          that.editedItem.court != "" &&
          that.editedItem.equipe2joueur1 != ""
        ) {
          var donnee = {
            equipes: that.finalCreatedTeam,
            dateDebut: that.editedItem.dateDebut,
            arbitre: that.selectedArbitre,
            court: that.selectedCourt,
            idSousTournoi: this.idSousTournoiActuel,
            estMatchValide: false,
            duree: null,
            score1: 0,
            score2: 0,
          };
          var requete = JSON.stringify(donnee);
          axios
            .post(`${constantes.API_BASE_URL}/matchs`, requete)
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
          alert("Il manque des champs vides");
        }
      }
    },
  },
};
</script>