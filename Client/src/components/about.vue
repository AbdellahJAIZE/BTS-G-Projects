<template>
<div>
  <navigation title="About"></navigation>
  <v-container>
    <v-layout row wrap>
      <v-flex xs12>
        <h3 class="my-3">About G-PROJECT</h3>
        <p>
          <strong> G-PROJECT </strong> et un site web local, qui a pour but de rendre la gestion et le contrôle des projet une expérience favorable et simple en garantissant une grande flexibilité.
        </p>
        <p>Seul l’administrateur peut voir le contenu du site, il doit se connecter au site par un nom d’indentification et un mot de passe. </p>
        <p>Après la connexion, l’utilisateur/admin est rediriger automatiquement vers la page d’accueil où celle-ci est une Dashboard avec les graphs, charts et les statistiques du site. </p>
        <p>Il peut accéder à plusieurs pages depuis le Dashboard Comme la page A propos où il Ya une description sur les réalisateurs du projet.</p>
        <p>L’utilisateur peut ajouter, modifier, supprimer une session et le plus important le choix de la session ouverte. </p>
        <p>L’utilisateur peut ajouter, modifier, supprimer un groupe et le plus important qui sont les membres de ce groupe. </p>
        <p>Une session peut contenir plusieurs groupes.</p>
        <p>L’utilisateur peut ajouter, modifier, supprimer un projet pour un groupe. </p>
        <p>Un Etudiant peut être un membre dans plusieurs groupes. </p>
        <p>Chaque groupe peut avoir plus qu’un projet, et chaque projet d’un groupe peut contenir certain document come le cahier de charge, conception, … </p>
        <p>L’utilisateur peut ajouter, modifier, supprimer dans la session, groupe, projet une petite note. </p>
      </v-flex>
    </v-layout>
    <v-divider></v-divider>
    <v-layout class="animated pulse mt-4" row wrap>
      <v-flex class="hvr-grow text-xs-center pl-4 pr-4" v-for="(item, index) in items" :key="index" xs12 sm6 md4>
        <img style="border-radius: 50%" class="mb-3" width="150px" height="150px" :src="item.image" :alt="item.fullName" />
        <h5>{{item.fullName}}</h5>
        <small>{{item.email}}</small>
        <p>{{item.description}}</p>
      </v-flex>
    </v-layout>
  </v-container>
</div>
</template>

<script>
import navigation from './navigation-drawer'

export default {
  components: {
    navigation
  },
  data: function() {
    return {
      items: [{
          fullName: "Ayoub Amine",
          image: "/static/images/amine.png",
          email: "programmer010011@gmail.com",
          description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias architecto cum debitis eligendi et eveniet facere fugiat illo incidunt libero, maxime nihil, non nulla omnis quis sint sunt velit voluptates."
        },
        {
          fullName: "Ayoub Africane",
          image: "/static/images/african.png",
          email: "africane96@gmail.com",
          description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias architecto cum debitis eligendi et eveniet facere fugiat illo incidunt libero, maxime nihil, non nulla omnis quis sint sunt velit voluptates."
        },
        {
          fullName: "Abdellah Jaize",
          image: "/static/images/jaize.png",
          email: "abdellah.jaize@gmail.com",
          description: "quote : \"a Computer Scientist is not a programmer, you can google it.\""
        }
      ]
    }
  },
  beforeMount: function() {
    this.$session.has("user") ? console.log("session found") : this.$router.push('/login');
  },
  beforeCreate: function() {
    this.$session.start();

  }
}
</script>
