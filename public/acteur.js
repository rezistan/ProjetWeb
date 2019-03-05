var listeComptes={};
var listeMiagiste={};
var listeNonMiagiste={};
var idActeur=1;


// Constructeur pour les Acteurs
function Acteur(role,nom,prenom,adresse,mail,numtel) {
  // l'id du compte
  this.id = idActeur;
  idActeur++;
  this.role = role;
  
  this.nom = nom;
  this.prenom=prenom;
  this.adresse=adresse;
  this.mail=mail;
  this.numtelacteur=numtel;


}


// methode créer un nouveau compte
var creerCompte = function(role,nom,prenom,adresse,mail,numtel) {
	// s'il n'existe pas
	if (typeof listeComptes[id] === 'undefined') {
		// on le cree
		listeComptes[this.id] = new Acteur(role,nom,prenom,adresse,mail,numtel);
		//console.log(listeComptes);
		return 1;
    }
    return 0;
}


//methode classer les comptes 
var classerCompte = function(){
	for (var i=0;i<listeComptes.length;i++){
		if( listeComptes.role[i]=== miagiste){
			//copie de tableau
			listeMiagiste[i]=listeComptes[i];
		}
				else if ( listeComptes.role[i]=== nonmiagiste)
					{
					listeNonMiagiste[i]=listeComptes[i];
					}
		else 
		{
			listeCollaborateur[i]=listeComptes[i];
		}
	}
}
//methode basculer d'un compte a un autre
var basculerCompte = function(){

	//non ici il sagit de modifier le role juste et ensuite de faire un 
	//this.classerCompte();



}
//methode acces a la section dedié miagiste 
var accesSection =function(){

	for (var i=0;i<listeMiagiste.length;i++)
		if (yourId===listeMiagiste.id[i] ){
			return 1;
		}
		return 0;

}