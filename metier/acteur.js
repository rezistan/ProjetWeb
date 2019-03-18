var listeComptes={};
var listeMiagiste={};
var listeNonMiagiste={};
var listeCollaborateur={};
var idActeur=0;

var miagiste = 'Miagiste';
var nonMiagiste = 'Non miagiste';

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


// methode modifier un compte
var modifierCompte = function(id, role,nom,prenom,adresse,mail,numtel) {
	var acteur = listeComptes[id];
	acteur.role = role;
	acteur.nom = nom;
	acteur.prenom = prenom;
	acteur.adresse = adresse;
	acteur.mail = mail;
	acteur.numtelacteur = numtel;
}

//methode classer les comptes 
//premet de classer chaque compte créé selon son rôle
var classerCompte = function(acteur){
	if(acteur !== 'undefined'){
		if(acteur.role === miagiste){
			//copie de tableau
			//listeMiagiste.push(acteur);
			listeMiagiste[Object.keys(listeMiagiste).length] = acteur;
		}
		else if (acteur.role === nonMiagiste)
		{
			//listeNonMiagiste.push(acteur);
			listeNonMiagiste[Object.keys(listeNonMiagiste).length] = acteur;
		}
		else 
		{
			//listeCollaborateur.push(acteur);
			listeCollaborateur[Object.keys(listeCollaborateur).length] = acteur;
		}
		/*
		Object.keys(listeCollaborateur).length permet d'avoir l'indice de
		la case du tableau JSON suivant la derniere case. Cela permet 
		d'ajouter un nouvel élément au tableau JSON (equivalent fonction push
		*/
	}
}

//methode basculer d'un compte a un autre
var basculerCompte = function(id){
	for(var i=0; i<Object.keys(listeNonMiagiste).length; i++){
		if(listeNonMiagiste[i] !== undefined){
			if(listeNonMiagiste[i].id === id){
				listeNonMiagiste[i].role = miagiste; //on change son role
				//listeMiagiste.push(listeNonMiagiste[i]); 
				listeMiagiste[Object.keys(listeMiagiste).length] = listeNonMiagiste[i];//on le met dans la liste des miagistes
				delete listeNonMiagiste[i]; //on l'enlève de la liste des non miagistes
			}
		}
	}
}

//methode acces a la section dedié miagiste 
var accesSection = function(id){
	if(listeComptes[id] !== undefined){
		if(listeComptes[id].role === miagiste){

		}
		else if(listeComptes[id].role === nonMiagiste) {

		}
		else{

		}
	}
	else{
		//Compte inexistant
	}
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
    return JSON.parse(JSON.stringify(listeComptes[id])); //mise en forme du tableau json
}

var listeDesComptes= function(typeDeCompte){
	switch(typeDeCompte){
		case miagiste:
			return listeMiagiste;
		case nonMiagiste:
			return listeNonMiagiste;
		default:
			return listeComptes;
	}
	/*
	if (typeDeCompte === miagiste){
		return listeMiagiste
	}
	else if (typeDeCompte === nonMiagiste)
		return listeNonMiagiste
	else return listeComptes
		*/
}
// les 4 fonctions exportées
exports.creerCompte = creerCompte;
exports.modifierCompte = modifierCompte;
exports.classerCompte = classerCompte;
exports.basculerCompte = basculerCompte;
exports.accesSection = accesSection;
exports.positionDuCompte = positionDuCompte;
exports.listeDesComptes=listeDesComptes;