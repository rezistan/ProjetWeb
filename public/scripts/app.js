'use strict';

var miagiste = 'Miagiste';
var nonMiagiste = 'Non miagiste';
var collabo = 'Collaborateur';

/**
 * @ngdoc overview
 * @name tp2App
 * @description
 * # tp2App
 *
 * Main module of the application.
 */
angular.module('projetWeb', [
    'ngResource'
  ])
  .factory('MyFactoryCompte', function ($resource) {
    // ce qui est important c'est le mot 'id' qui doit être le meme partout car c'est le parametre 
     return $resource('http://localhost:3000/comptes/:id', { id: '@_id' }, {
        update: {
          method: 'PUT' // this method issues a PUT request
        }
      });
  })
  .controller('MainCtrl',
  function ($scope, $state, MyFactoryCompte) {
    $scope.resultat = '';

    $scope.voirOffres = function(){
      alert("tu t'es gouré madafuck");
    };

    $scope.creerCompte = function() {
      // les o
      var objToSave = new MyFactoryCompte();

      objToSave.role = $scope.obj.role;
      objToSave.nom = $scope.obj.nom;
      objToSave.prenom = $scope.obj.prenom;
      objToSave.adresse = $scope.obj.adresse;
      objToSave.mail = $scope.obj.mail;
      objToSave.telephone = $scope.obj.telephone;
      //enregistrement
      objToSave.$save(function(savedObj) {
        $scope.resultat = savedObj;
       }, function(error) {
        $scope.resultat = error.data.error;
       });
    };

    $scope.position = function() {
      MyFactoryCompte.get({ id: $scope.obj.id }, function(retour) {
        $scope.resultat = retour;
      }, function(error) {
        $scope.resultat = error.data.error;
       });
    };

    $scope.connexion = function() {
      MyFactoryCompte.get({ id: $scope.obj.id }, function(retour) {
        //var type;
        switch(retour.role){
          case miagiste:
            $state.go("miagiste");
            break;
          case nonMiagiste:
            $state.go("nonMiagiste");
            break;
          case collabo:
            $state.go("collabo");
            break;
          default:
            $scope.resultat = "Identifiant inexistant !";
            $state.go("connexion");  
            break;
        }

      }, function(error) {
        $scope.resultat = error.data.error;
       });
    };

    $scope.modifier = function(){
      /*var obj = { id : $scope.obj.id, role : $scope.obj.role, nom :$scope.obj.nom, prenom : $scope.obj.prenom, mail : $scope.obj.mail,
       adresse : $scope.obj.adresse, telephone : $scope.obj.telephone }
      obj.role= obj.role;*/
      console.log($scope.obj);
      MyFactoryCompte.update({id:$scope.obj.id}, $scope.obj, function(savedObj){
        $scope.resultat=savedObj;  
      });
    }


  })
  .factory('MyFactoryOffre', function ($resource) {
    // ce qui est important c'est le mot 'id' qui doit être le meme partout car c'est le parametre 
     return $resource('http://localhost:3000/offre/', {
        update: {
          method: 'PUT' // this method issues a PUT request
        }
      });
  })
  .controller('OffreCtrl',
  function ($scope, $state, MyFactoryOffre) {
    $scope.resultat = '';
    $scope.creerOffre = function() {
      var objToSave = new MyFactoryOffre();

      objToSave.type = $scope.obj.type;
      objToSave.nomSociete = $scope.obj.nomSociete;
      objToSave.sujet = $scope.obj.sujet;
      objToSave.adresse = $scope.obj.adresse;
      objToSave.mail = $scope.obj.mail;
      objToSave.tel = $scope.obj.tel;
      //enregistrement
      objToSave.$save(function(savedObj) {
        $scope.resultat = savedObj;
       }, function(error) {
        $scope.resultat = error.data.error;
       });
       $state.go("offre");
    };

    $scope.position = function() {
      MyFactoryOffre.get({ id: $scope.obj.id }, function(retour) {
        $scope.resultat = retour;
      }, function(error) {
        $scope.resultat = error.data.error;
       });
    };

    $scope.voirOffres = function() {
      MyFactoryOffre.get(function(retour) {
        alert(retour);
        $state.go("offre");
        $scope.offres = retour;
      }, function(error) {
        $scope.offres = error.data.error;
       });
    };

  });

var myApp = angular.module('ficCentral', ['ui.router']);

//Contient tous les chemins vers les differentes pages
myApp.config(function($stateProvider) {
  // An array of state definitions
  var states = [
    { 
      name: 'collabo',
      url: '/collabo',
      // Using component: instead of template:
      templateUrl: '/pages/html/collaborateurs.html',
      controller: 'MainCtrl'
    },
    
    { 
      name: 'connexion', //ce qu'il faut appeler dans la page 
      url: '/connexion', // ce qui s'affiche dans l'url
      templateUrl: '/pages/html/connexion.html',
      controller: 'MainCtrl'
    },
    
    { 
      name: 'offre', 
      url: '/offre', 
      templateUrl: '/pages/html/liste.html',
      controller: 'OffreCtrl'
    },
    
    { 
      name: 'question', 
      url: '/question', 
      templateUrl: '/pages/html/question.html',
      controller: 'MainCtrl'
    },
    
    { 
      name: 'repMessage', 
      url: '/repMessage', 
      templateUrl: '/pages/html/repMessage.html',
      controller: 'MainCtrl'
    },
    
    { 
      name: 'inscription', 
      url: '/inscription', 
      templateUrl: '/pages/html/inscription.html',
      controller: 'MainCtrl'
    },
    
    { 
      name: 'miagiste', 
      url: '/miagiste', 
      templateUrl: '/pages/html/miagiste.html',
      controller: 'MainCtrl'
    },
    
    { 
      name: 'nonMiagiste', 
      url: '/nonMiagiste', 
      templateUrl: '/pages/html/nonMiagiste.html',
      controller: 'MainCtrl'
    },
    
    { 
      name: 'ajoutOffre', 
      url: '/ajoutOffre', 
      templateUrl: '/pages/html/ajoutOffre.html',
      controller: 'OffreCtrl'
    },
    
    { 
      name: 'index', 
      url: '/index', 
    }
  ]
  
  // Loop over the state definitions and register them
  states.forEach(function(state) {
    $stateProvider.state(state);
  });
});



