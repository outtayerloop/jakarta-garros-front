<template>
  <div>
    <v-main>
  
       <v-card
    class="mx-auto"
    color="orange"
    dark
    max-width="400"
  ><v-card-actions>
      <v-list-item class="grow"> 
      </v-list-item>
    </v-card-actions>
   

    <v-card-text class="headline font-weight-bold">
        <center><div>403</div><br></center>
        <center><div>Accès interdit</div></center>
    </v-card-text>

     <v-card-actions>
     <v-list-item class="grow"> 
      </v-list-item>
    </v-card-actions>

  <center><router-link :to="{ path: 'home' }">Retour accueil</router-link></center>
  </v-card>
    </v-main>
  </div>
  
</template>

<script>

import * as constants from "../constants";

export default {
  name: constants.NOM_ACCES_INTERDIT,
  data: function(){
    return {
      
    };
  },
  
};
</script>