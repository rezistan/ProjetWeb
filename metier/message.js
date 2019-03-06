var idMessage=0;
listeMessages = [];
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
	poserQuestion= function(idAuteur, contenu){
		var question = new Message (idAuteur,contenu, null);
		listeMessages.push(question);
		return question;
	}


	repondreQuestion = function(question, newReponse){
		question.reponse = newReponse;
	}

	lireMsg= function(){
		return listeMessages;	
	}

	lireMsgFiltre= function(){
		listeMsgFiltre  = [];
		for(var i=0; i<listeMessages.length; i++){
			if(listeMessages[i].reponse === null){
				listeMsgFiltre.push(listeMessages[i]);
			}
		}
		return listeMsgFiltre;
	}

	/*
	poserQuestion(1, "Ouais ouais ouais");
	var q2 = poserQuestion(2, "Ouais ouais ouais");
	poserQuestion(3, "Ouais ouais ouais");
	repondreQuestion(q2, "Non mec");
	console.log(lireMsgFiltre());
	*/