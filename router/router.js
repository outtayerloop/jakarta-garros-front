import Vue from 'vue'
import Router from 'vue-router'
import Home from '../components/Home'
import Test from '../components/Test'
import Resultats from '../components/Resultats'
import Organisateur from '../components/Organisateur'
import Login from '../components/Login'
import Admin from '../components/Admin'
import OrganisationMatch from '../components/OrganisationMatch'
import Interdiction from '../components/Interdiction'


import * as constants from "../constants"

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: "/",
            name: constants.NOM_VUE_HOME,
            component: Home
        },
        {
            path: constants.ROUTE_VUE_HOME,
            name: constants.NOM_VUE_HOME,
            component: Home
        },
        {
            path: constants.ROUTE_VUE_TEST,
            name: constants.NOM_VUE_TEST,
            component: Test
        },
        {
            path: constants.ROUTE_VUE_RESULTATS_SIMPLE_MESSIEURS,
            name: constants.NOM_VUE_RESULTATS,
            component: Resultats
        },
        {
            path: constants.ROUTE_VUE_RESULTATS_SIMPLE_DAMES,
            name: constants.NOM_VUE_RESULTATS,
            component: Resultats
        },
        {
            path: constants.ROUTE_VUE_RESULTATS_DOUBLE_MESSIEURS,
            name: constants.NOM_VUE_RESULTATS,
            component: Resultats
        },
        {
            path: constants.ROUTE_VUE_RESULTATS_DOUBLE_DAMES,
            name: constants.NOM_VUE_RESULTATS,
            component: Resultats
        },
        {
            path: constants.ROUTE_VUE_RESULTATS_DOUBLE_MIXTE,
            name: constants.NOM_VUE_RESULTATS,
            component: Resultats
        },
        {
            path: constants.ROUTE_VUE_ORGANISATEUR,
            name: constants.NOM_VUE_ORGANISATEUR,
            component: Organisateur
        },
        {
            path: constants.ROUTE_VUE_ORGANISATION_MATCH_SIMPLE_MESSIEURS,
            name: constants.NOM_VUE_ORGANISATION_MATCH,
            component: OrganisationMatch
        },
        {
            path: constants.ROUTE_VUE_ORGANISATION_MATCH_SIMPLE_DAMES,
            name: constants.NOM_VUE_ORGANISATION_MATCH,
            component: OrganisationMatch
        },
        {
            path: constants.ROUTE_VUE_ORGANISATION_MATCH_DOUBLE_MESSIEURS,
            name: constants.NOM_VUE_ORGANISATION_MATCH,
            component: OrganisationMatch
        },
        {
            path: constants.ROUTE_VUE_ORGANISATION_MATCH_DOUBLE_DAMES,
            name: constants.NOM_VUE_ORGANISATION_MATCH,
            component: OrganisationMatch
        },
        {
            path: constants.ROUTE_VUE_ORGANISATION_MATCH_DOUBLE_MIXTE,
            name: constants.NOM_VUE_ORGANISATION_MATCH,
            component: OrganisationMatch
        },
        {
            path: constants.ROUTE_VUE_LOGIN,
            name: constants.NOM_VUE_LOGIN,
            component: Login
        },
        {
            path: constants.ROUTE_VUE_ADMIN,
            name: constants.NOM_VUE_ADMIN,
            component: Admin
        },
        {
            path: constants.ROUTE_ACCES_INTERDIT,
            name: constants.NOM_ACCES_INTERDIT,
            component: Interdiction
        }
    ]
})
