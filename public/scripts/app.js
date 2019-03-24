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
    'ngResource', 'ngStorage'
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
  function ($scope, $state, $rootScope, MyFactoryCompte) {
    $scope.resultat = '';

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

   /* $scope.position = function() {
      MyFactoryCompte.get({ id: $scope.obj.id }, function(retour) {
        $scope.resultat = retour;
      }, function(error) {
        $scope.resultat = error.data.error;
       });
    };
  */
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
        localStorage.setItem('idSession', retour.id);
        $rootScope.idSession = localStorage.getItem('idSession');
      }, function(error) {
        $scope.resultat = error.data.error;
      });
    };

    $scope.userListe = function() {
            
      MyFactoryCompte.get({id: nonMiagiste,miagiste},function(retour) {
        //alert(JSON.stringify(retour));
        localStorage.setItem('nonMiagistes', JSON.stringify(retour));
        $rootScope.nonMiagistes = JSON.parse(localStorage.getItem('nonMiagistes'));
        $state.go("listeUtilisateur");
      }, function(error) {
        //alert(error);
        $scope.nonMiagistes = error;
       });
      MyFactoryCompte.get({id:miagiste},function(retouri) {
        //alert(JSON.stringify(retouri));
        localStorage.setItem('miagistes', JSON.stringify(retouri));
        $rootScope.miagistes = JSON.parse(localStorage.getItem('miagistes'));
        //$state.go("listeUtilisateur");
      }, function(error) {
        //alert(error);
        $scope.miagistes = error;
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
      $scope.userListe();
    };

  })
  .factory('MyFactoryOffre', function ($resource) {
    // ce qui est important c'est le mot 'id' qui doit être le meme partout car c'est le parametre 
      return $resource('http://localhost:3000/offre/:id', { id: '@_id' }, {
        update: {
          method: 'PUT' // this method issues a PUT request
        }
      });
  })
  .controller('OffreCtrl',
  function ($scope, $state, $rootScope, MyFactoryOffre) {
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
      $scope.notif = 'Offre créée !'
      $state.go("ajoutOffre");
    };

    $scope.position = function() {
      MyFactoryMessage.get({ id: $scope.obj.id }, function(retour) {
        $scope.resultat = retour;
      }, function(error) {
        $scope.resultat = error.data.error;
       });
    };

    $scope.voirOffres = function() {
      MyFactoryOffre.get(function(retour) {
        //alert(JSON.stringify(retour));
        localStorage.setItem('offres', JSON.stringify(retour));
        $rootScope.offres = JSON.parse(localStorage.getItem('offres'));
        $state.go("offre");
      }, function(error) {
        //alert(error);
        $scope.offres = error;
       });
    };

    /*
    $scope.voirOffresId = function({ id: $scope.obj.id }, idSession) {
      MyFactoryOffre.get(function(retour) {
        $rootScope.offres = retour;
        $state.go("offre");
        //alert(JSON.stringify($scope.offres));
      }, function(error) {
        $scope.offres = error;
       });
    };
    */
  })
  .factory('MyFactoryMessage', function ($resource) {
    // ce qui est important c'est le mot 'id' qui doit être le meme partout car c'est le parametre 
     return $resource('http://localhost:3000/msg/:id', { id: '@_id' }, {
        update: {
          method: 'PUT' // this method issues a PUT request
        }
      });
  })
  .controller('MessageCtrl',
  function ($scope, $state, $rootScope, MyFactoryMessage) {
    $scope.resultat = '';
    $scope.creerMsg = function() {
      var objToSave = new MyFactoryMessage();

      objToSave.auteur = JSON.parse(localStorage.getItem('idSession'));
      objToSave.contenu = $scope.obj.contenu;
      
      //enregistrement
      objToSave.$save(function(savedObj) {
        $scope.resultat = savedObj;
       }, function(error) {
        $scope.resultat = error.data.error;
       });
       //$state.go("offre");
    };

    $scope.position = function(idSession) {
      MyFactoryMessage.get({ id: idSession }, function(retour) {
        $scope.resultat = retour;
      }, function(error) {
        $scope.resultat = error.data.error;
       });
    };

    $scope.voirQuestions = function() {
      MyFactoryMessage.get(function(retour) {
        //alert(JSON.stringify(retour));
        localStorage.setItem('questions', JSON.stringify(retour));
        $rootScope.questions = JSON.parse(localStorage.getItem('questions'));
        $state.go("listeQuestion");
      }, function(error) {
        //alert(JSON.stringify(error));
        $scope.questions = error;
       });
    };

    $scope.modifier = function(idMess, reponseMess){
      /*var obj = { id : $scope.obj.id, role : $scope.obj.role, nom :$scope.obj.nom, prenom : $scope.obj.prenom, mail : $scope.obj.mail,
       adresse : $scope.obj.adresse, telephone : $scope.obj.telephone }
      obj.role= obj.role;*/
      var obj = { id : idMess, reponse : reponseMess }

      console.log(obj);
      MyFactoryMessage.update({id:idMess}, obj, function(savedObj){
        $scope.resultat=savedObj;  
      });
      $scope.repMessage();
    };

    $scope.repMessage = function() {
      MyFactoryMessage.get({ id: 'SR' }, function(retour) {
        $rootScope.questionsSR = retour;
        $state.go("listeARepondre");
        //alert(JSON.stringify($scope.questionsSR));
      }, function(error) {
        $scope.questionsSR = error;
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
      controller: 'MessageCtrl'
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
      name: 'listeUtilisateur', 
      url: '/listeUtilisateur', 
      templateUrl: '/pages/html/listeUtilisateur.html',
      controller: 'MainCtrl'
    },
     { 
      name: 'listeQuestion', 
      url: '/listeQuestion', 
      templateUrl: '/pages/html/listeQuestion.html',
      controller: 'MessageCtrl'
    },

     { 
      name: 'listeMesQuestions', 
      url: '/listeMesQuestions', 
      templateUrl: '/pages/html/listeMesQuestions.html',
      controller: 'MessageCtrl'

     { 
      name: 'listeARepondre', 
      url: '/listeARepondre', 
      templateUrl: '/pages/html/listeARepondre.html',
      controller: 'MessageCtrl'
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



