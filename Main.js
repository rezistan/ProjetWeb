var express = require('express') ; // import module express
var bodyParser = require('body-parser'); // import module body-parser
var acteur=require('./metier/acteur');// import module acteur
var message=require('./metier/message');  // import module message
var offre=require('./metier/offre');   // import module offr

var app=express();   //
app.use(bodyParser.json());  //inclusion du plugin pour parser du jsom

// …/banque/public (physique) = / (url)
app.use(express.static(__dirname + '/public'));
// on choisit maintenant d’exposer un 2eme repertoire
// …/banque/bower_components (physique) = /bower_components (url)
app.use('/bower_components',
express.static(__dirname + '/bower_components'));


/*app.use(function(req, res){
	res.sendFile(__dirname + '/public/index.html');
});*/


/**
*************************Acteur*****************************
*
*/ 

// Lorsqu’un client fait appel à GET pour l’URL /compte/xxx
// où xxx peut être n’importe quoi
/*app.get('/comptes/:id', function(req, res)
{
	// affiche la valeur du paramètre id sur la console de node
	console.log(req.params.id) ;
	//tu va choper le compte dont le lien est passé dans lurl 
	var cpt = acteur.positionDuCompte(req.params.id);
	if(cpt===false){ 
		//res.status(404).send('Compte '+req.params.id+ ' inexistant'); //http status404 // cest objet vide dans position du compte 
		res.status(404).json({ error: "Le compte d'id "+req.params.id+" n'existe pas." });
	}
	else{ 
		res.json(cpt);
	}
}) ;*/


// afficher les differents comptes 

app.get('/comptes/:id',function(req,res)
{
	//console.log(req.query.typecompte);
	if(req.params.id !== undefined){
		var cpt = acteur.positionDuCompte(req.params.id);
		if(cpt===false){ 
			//res.status(404).send('Compte '+req.params.id+ ' inexistant'); //http status404 // cest objet vide dans position du compte 
			//res.status(404).json({ error: "Le compte d'id "+req.params.id+" n'existe pas." });var cpt = acteur.listeDesComptes(req.query.type);
			var list = acteur.listeDesComptes(req.params.id);
			if(list===false){ 
				//res.status(404).send('Compte '+req.params.id+ ' inexistant'); //http status404 // cest objet vide dans position du compte 
				res.status(404).json({ error: "Le type  "+req.params.id+" n'existe pas." });
			}
			else{ 
				console.log(list);
				res.json(list);
			}
		}
		else{ 
			console.log(cpt);
			res.json(cpt);
		}
	}
	
});


/*
app.get('/comptes/',function(req,res)
{
	var cpt = acteur.listeDesComptes(req.query.type);
	if(cpt===false){ 
		//res.status(404).send('Compte '+req.params.id+ ' inexistant'); //http status404 // cest objet vide dans position du compte 
		res.status(404).json({ error: "Le type  "+req.params.id+" n'existe pas." });
	}
	else{ 
		console.log(cpt);
		res.json(cpt);
	}
});
*/

//put pour modifier 
app.put('/comptes/:id', function(req,res){
	var id = parseInt(req.params.id);
	acteur.basculerCompte(id);
	//envoie la valeur du paramètre id au naviagateur du client ayant fait l'appel
	res.json(acteur.positionDuCompte(id));
});


//post = creer 
app.post('/comptes/', function(req, res)
{
	console.log(req.body);
	// il cree un formulaire de creation de compte (mais juste un peu )
	var role = req.body.role; 
	var nom = req.body.nom;
	var prenom = req.body.prenom;
	var adresse = req.body.adresse;
	var mail = req.body.mail;
	var telephone = req.body.telephone;

	var id = acteur.creerCompte(role,nom,prenom,adresse,mail,telephone);
	//envoie la valeur du paramètre id au navigateur du client ayant fait l'appel
	res.json(acteur.positionDuCompte(id));
});

app.listen(3000, function () {
	console.log('Listening on port 3000!') ;
}) ;

// le id pourquil puisse choper le compte a supprimer
app.delete ('/comptes/:id', function (req,res){
	res.json(banque.supprimerCompte(req.params.id));
});



/**
*************************Offre*****************************
*
*/ 

//creation d'une offre 
app.post('/offre/', function(req,res)
{
	console.log(req.body);

	var type =req.body.type;
	var nomSociete=req.body.nomSociete;
	var sujet=req.body.sujet;
	var adresse =req.body.adresse;
	var mail=req.body.mail;
	var tel =req.body.tel;
	var id = offre.proposerOffre(type,nomSociete,sujet,adresse,mail,tel);
	res.json(offre.positionDeLOffre(id));

});

/*
app.get('/offre/:id', function(req, res)
{
	// affiche la valeur du paramètre id sur la console de node
	console.log(req.params.id) ;
	//tu va choper le compte dont le lien est passé dans lurl 
	var cpt = offre.positionDeLOffre(req.params.id);
	if(cpt===false){ 
		//res.status(404).send('cette offre :  '+req.params.id+ ' est inexistant'); //http status404 // cest objet vide dans position du compte 
		res.json(offre.voirOffres());
	}
	else{ 
		res.json(cpt);
	}

});
*/

app.get('/offre/', function(req, res)
{
	// affiche la valeur du paramètre id sur la console de node
	var cpt = offre.voirOffres();
	//affiche la commande demande en reponse (quesquon va afficher dans la partie reponse)
	console.log(cpt);
	if(cpt===false){ 
		res.status(404).send('cette offre :  '+req.params.id+ ' est inexistante'); //http status404 // cest objet vide dans position du compte 
	}
	else{ 
		res.json(cpt);
	}
});


/**
*************************Message*****************************
*
*/ 

app.post('/msg/', function(req,res)
{
	console.log(req.body);

	var auteur =req.body.auteur;
	var contenu=req.body.contenu;
	var msg= message.poserQuestion(auteur,contenu);
	res.json(msg);

});



app.get('/msg/:id', function(req,res)
{
	var id = req.params.id;
	var cpt = message.positionMessage(id);
	if(cpt===false){ 
		res.status(404).send('Ce message : '+req.params.id+ ' est inexistant'); //http status404 // cest objet vide dans position du compte 
	}
	else{ 
		res.json(cpt);
	}
});

app.get('/msg/', function(req,res)
{
	var cpt = message.lireMsg();
	if(cpt===false){ 
		res.status(404).send('Erreur de lecture des messages');
	}
	else{ 
		res.json(cpt);
	}
});

app.put('/msg/:id', function(req,res)
{
	var id = req.params.id;
	var mes = message.positionMessage(id);
	var rep = req.body.reponse;

	message.repondreQuestion(mes, rep);
	//envoie la valeur du paramètre id au navigateur du client ayant fait l'appel
	res.json(message.positionMessage(id));
});
     