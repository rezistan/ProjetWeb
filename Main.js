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

// Lorsqu’un client fait appel à GET pour l’URL /compte/xxx
// où xxx peut être n’importe quoi
app.get('/comptes/:id', function(req, res)
{
// affiche la valeur du paramètre id sur la console de node
console.log(req.params.id) ;
//tu va choper le compte dont le lien est passé dans lurl 
var cpt = acteur.positionDuCompte(req.params.id);
if(cpt===false){ 
	res.status(404).send('Compte '+req.params.id+ ' inexistant'); //http status404 // cest objet vide dans position du compte 
}
else{ 
	res.json(cpt);
}


//res.json(banque.positionDuCompte(req.params.id)) ;
// envoie la valeur du parametre id au navigateur du client ayant fait 

}) ;
//put pour modifier 
app.put('/comptes/:id', function(req,res){
	//A
	var id = req.params.id;	
	//body te permet de lire ce quil ya dans le body de la page
	var role =req.body.role; 
	var nom = req.body.nom;
	var prenom=req.body.prenom;
	var adresse = req.body.adresse;
	var mail=req.body.mail;
	var telephone = req.body.telephone;


	acteur.modifierCompte(id,role,nom,prenom,adresse,mail,telephone);
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



//creation d'une offre 
app.post('/moffre/', function(req,res)
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
app.get('/moffre/:id', function(req, res)
{
// affiche la valeur du paramètre id sur la console de node
console.log(req.params.id) ;
//tu va choper le compte dont le lien est passé dans lurl 
var cpt = offre.positionDeLOffre(req.params.id);
if(cpt===false){ 
	res.status(404).send('cette offre :  '+req.params.id+ ' est inexistant'); //http status404 // cest objet vide dans position du compte 
}
else{ 
	res.json(cpt);
}

});

app.get('/moffre/', function(req, res)
{
// affiche la valeur du paramètre id sur la console de node
//console.log(req.params.id) ;
//tu va choper le compte dont le lien est passé dans lurl 
var cpt = offre.voirOffres();
//affiche la commande demande en reponse (quesquon va afficher dans la partie reponse)
console.log(cpt);
res.json(cpt);
/*if(cpt===false){ 
	res.status(404).send('cette offre :  '+req.params.id+ ' est inexistant'); //http status404 // cest objet vide dans position du compte 
}
else{ 
	res.json(cpt);
}*/

});

app.post('/msg/', function(req,res)
{
	console.log(req.body);

	var auteur =req.body.auteur;
	var contenu=req.body.contenu;
	var msg= message.poserQuestion(auteur,contenu);
	res.json(msg);



});



app.get('/msg/', function(req,res)
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
app.put('/msg/:id', function(req,res)
{
	//A
	var id = req.params.id;	
	//body te permet de lire ce quil ya dans le body de la page
	var role =req.body.role; 
	var nom = req.body.nom;
	var prenom=req.body.prenom;
	var adresse = req.body.adresse;
	var mail=req.body.mail;
	var telephone = req.body.telephone;


	acteur.modifierCompte(id,role,nom,prenom,adresse,mail,telephone);
	//envoie la valeur du paramètre id au naviagateur du client ayant fait l'appel
	res.json(acteur.positionDuCompte(id));
	



});


     



