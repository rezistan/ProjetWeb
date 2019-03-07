var idMessage=0;
listeMessages = {};

//Constructeur Message
function Message(idAuteur,contenu,reponse){
	this.id=idMessage;
	idMessage++;
	// la date et heure du message
	this.idAuteur = idAuteur;
	this.horodatage = new Date();
	this.contenu=contenu;
	this.reponse=reponse;
	/* Pour creer un message on fait un truc quuiu recuperer lid de lauteur 
	le contenu et la reponse
	*/ 	
}

/**
*
* Permet de poser un question aux collaborateurs
*/
var poserQuestion= function(idAuteur, contenu){
	var question = new Message (idAuteur,contenu, null);
	//console.log('ici'); console.log(JSON.stringify(listeMessages));
	listeMessages[Object.keys(listeMessages).length] = question;
	//listeMessages.push(question);
	return question;
}


/**
*
* Permet à un collaborateur de répondre à une question
*/
var repondreQuestion = function(question, newReponse){
	question.reponse = newReponse;
}


/**
*
* Permet voir la liste des messages
*/
var lireMsg= function(){
	return listeMessages;
}

/**
*
* Permet voir la liste des messages sans réponse
*/
var lireMsgFiltre= function(){
	listeMsgFiltre  = {};
	for(var i=0; i<listeMessages.length; i++){
		if(listeMessages[i].reponse === null){
			listeMsgFiltre[Object.keys(listeMsgFiltre).length] = listeMessages[i];
			//listeMsgFiltre.push(listeMessages[i]);
		}
	}
	return listeMsgFiltre;
}
/*
poserQuestion(1, "Ouais ouais ouais");
var q2 = poserQuestion(2, "Ouais ouais ouais");
poserQuestion(3, "Ouais ouais ouais");
repondreQuestion(q2, "Non mec");
console.log(lireMsg());
*/

exports.poserQuestion = poserQuestion;
exports.repondreQuestion = repondreQuestion;
exports.lireMsg = lireMsg;
exports.lireMsgFiltre = lireMsgFiltre;