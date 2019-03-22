var listeOffres = {};
var idOffre=0;

//Constructeur offre
function Offre(type,nomSociete,sujet,adresse,mail,tel){
	this.id=idOffre;
	idOffre++;
	this.type=type;
	this.nomSociete=nomSociete;
	this.sujet=sujet;
	this.adresse=adresse;
	this.mail=mail;
	this.tel=tel;
}

/**
*
* Permet de rajouter un nouvelle offre à la liste
*/
var proposerOffre = function(type,nomSociete,sujet,adresse,mail,tel){
	var offre = new Offre(type,nomSociete,sujet,adresse,mail,tel);
	listeOffres[Object.keys(listeOffres).length]=offre;
	//si tu met retourne offre simplement il va creer la chose mais il va pas te retourner le loffre creer il faut retourne lid de loffre nouvellemnt créer
	return offre.id;
}
	
	/*if (typeof listeOffres[idOffre] === 'undefined') {
		//on le cree
		var offre=  new Offre(type,nomSociete,sujet,adresse,mail,tel);
		//on l'ajoute a la liste des Comptes
		listeOffres[idOffre-1] = offre;
		//console.log(listeComptes);
		//classerCompte(acteur);
		return offre.id;
    }
    return false;
}*/



/**
*
* Permet de voir la liste des offres disponibles
*/
var voirOffres = function(){
	//return JSON.parse(JSON.stringify(listeOffres));
	return listeOffres;
	//cette fonction ne nous servirais telle a rien car on utilise un get pour lire le compte ha non ici on lis tout les comptes en meme temps
}

// pour connaitre la position d'une offre existante
var positionDeLOffre = function(id) {
	//console.log(listeComptes);
	// s'il n'existe pas
	if (typeof listeOffres[id] === 'undefined')
		return false;
    return JSON.parse(JSON.stringify(listeOffres[id])); //mise en forme du tableau json
}

exports.proposerOffre = proposerOffre;
exports.voirOffres = voirOffres;
exports.positionDeLOffre=positionDeLOffre;
