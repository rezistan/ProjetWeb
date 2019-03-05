
var idMessage=1;
function Message(idAuteur,contenu,reponse){
	this.id=idMessage;
	idMessage++;
	// la date et heure du message
	this.horadatage = new Date();
	this.contenu=contenu;
	this.reponse=reponse;
/* Pour creer un message on fait un truc quuiu recuperer lid de lauteur 
le contenu et la reponse
*/ 

	this.ajouter = function(contenu) {
  	this.position.somme += somme;
  	this.position.date = new Date();
}