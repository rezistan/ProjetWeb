var listeComptes=[];
var listeMiagiste=[];
var listeNonMiagiste=[];
var listeCollaborateur=[];
var idActeur=0;

var miagiste = 'miagiste';
var nonMiagiste = 'non miagiste';

// Constructeur pour les Acteurs
function Acteur(role,nom,prenom,adresse,mail,numtel) {
  this.id = idActeur; // l'id du compte
  idActeur++;
  this.role = role;
  this.nom = nom;
  this.prenom = prenom;
  this.adresse = adresse;
  this.mail = mail;
  this.numtelacteur = numtel;
}


// methode créer un nouveau compte
var creerCompte = function(role,nom,prenom,adresse,mail,numtel) {
	// s'il n'existe pas
	if (typeof listeComptes[idActeur] === 'undefined') {
		//on le cree
		var acteur = new Acteur(role,nom,prenom,adresse,mail,numtel);
		//on l'ajoute a la liste des Comptes
		listeComptes[idActeur-1] = acteur;
			console.log(listeComptes);
		classerCompte(acteur);
		return acteur.id;
    }
    return false;
}


//methode classer les comptes 
//premet de classer chaque compte créé selon son rôle
var classerCompte = function(acteur){
	if(acteur !== 'undefined'){
		if(acteur.role === miagiste){
			//copie de tableau
			listeMiagiste.push(acteur);
		}
		else if (acteur.role === nonMiagiste)
		{
			listeNonMiagiste.push(acteur);
		}
		else 
		{
			listeCollaborateur.push(acteur);
		}
	}
}

//methode basculer d'un compte a un autre
var basculerCompte = function(id){
	for(var i=0; i<listeNonMiagiste.length; i++){
		if(listeNonMiagiste[i].id === id){
			listeNonMiagiste[i].role = miagiste; //on change son role
			listeMiagiste.push(listeNonMiagiste[i]); //on le met dans la liste des miagistes
			listeNonMiagiste.splice(i, 1); //on l'enlève de la liste des non miagistes
		}
	}
}

//methode acces a la section dedié miagiste 
var accesSection = function(id){
	for(var i=0; i<listeMiagiste.length; i++){ // pour chaque element de la liste des miagistes
		if(listeMiagiste[i].id === id){ //on compare son id à celui passé en paramètre
			return true; //il est miagiste
		}
	}
	return false; //il n'est pas miagiste
}
/*
creerCompte('non miagiste', 'nom1', 'prenom1', 'adresse', 'yfyjvh@cdc.com', '5678987654');
creerCompte('non miagiste', 'nom2', 'prenom2', 'adresse', 'yfyjvh@cdc.com', '5678987654');
creerCompte('miagiste', 'nom3', 'prenom1', 'adresse', 'yfyjvh@cdc.com', '5678987654');

console.log(listeMiagiste);
console.log(listeNonMiagiste);
console.log(listeCollaborateur);
*/

// pour connaitre la position d'un compte existant
var positionDuCompte = function(id) {
	//console.log(listeComptes);
	// s'il n'existe pas
	if (typeof listeComptes[id] === 'undefined')
		return false;
    return listeComptes[id];
}


listeComptes = JSON.stringify(listeComptes);
// les 4 fonctions exportées
exports.creerCompte = creerCompte;
exports.classerCompte = classerCompte;
exports.basculerCompte = basculerCompte;
exports.accesSection = accesSection;
exports.positionDuCompte = positionDuCompte;