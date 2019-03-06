var listeOffres = [];
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
	listeOffres.push(offre);
	return offre;
}

/**
*
* Permet de voir la liste des offres disponibles
*/
var voirOffres = function(){
	return listeOffres;
}

exports.proposerOffre = proposerOffre;
exports.voirOffres = voirOffres;