var myApp = angular.module('ficCentral', ['ui.router']);

//Contient tous les chemins vers les differentes pages
myApp.config(function($stateProvider) {
  // An array of state definitions
  var states = [
    { 
      name: 'collabo',
      url: '/collabo',
      // Using component: instead of template:
      templateUrl: '/pages/html/collaborateurs.html'
    },
    
    { 
      name: 'connexion', //ce qu'il faut appeler dans la page 
      url: '/connexion', // ce qui s'affiche dans l'url
      templateUrl: '/pages/html/connexion.html'
    },
    
    { 
      name: 'offre', 
      url: '/offre', 
      templateUrl: '/pages/html/liste.html'
    },
    
    { 
      name: 'question', 
      url: '/question', 
      templateUrl: '/pages/html/question.html'
    },
    
    { 
      name: 'repMessage', 
      url: '/repMessage', 
      templateUrl: '/pages/html/repMessage.html'
    },
    
    { 
      name: 'inscription', 
      url: '/inscription', 
      templateUrl: '/pages/html/inscription.html'
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



