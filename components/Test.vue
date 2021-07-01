<template>
<div>
    <p>Test front/back connection</p>
</div>
</template>

<script>
import * as constants from "../constants";
export default {
  name: constants.NOM_VUE_TEST,
  mounted: function () {
    console.log(`Url de base de l'API : ${constants.API_BASE_URL}`)
    axios.get(`${constants.API_BASE_URL}/`)
        .then(res => {
            console.log(res)
        })
        .catch(err => {
            console.log(err)
        });
  }
};
</script>