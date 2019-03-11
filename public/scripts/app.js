'use strict';

/**
 * @ngdoc overview
 * @name tp2App
 * @description
 * # tp2App
 *
 * Main module of the application.
 */
angular
  .module('projetWeb', [
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
  function ($scope, MyFactoryCompte) {
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

    $scope.modifier = function(){
      /*var obj = { id : $scope.obj.id, role : $scope.obj.role, nom :$scope.obj.nom, prenom : $scope.obj.prenom, mail : $scope.obj.mail,
       adresse : $scope.obj.adresse, telephone : $scope.obj.telephone }
      obj.role= obj.role;*/
      console.log($scope.obj);
      MyFactoryCompte.update({id:$scope.obj.id}, $scope.obj, function(savedObj){
        $scope.resultat=savedObj;  
      });
    }


  });

