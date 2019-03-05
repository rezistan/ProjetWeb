
var listeoffres = {};
var idOffre=1;
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