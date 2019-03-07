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

app.put('/comptes/:id', function(req,res){
	//A
		
	//body te permet de lire ce quil ya dans le body de la page
	var role =req.body.role; 
	var nom = req.body.nom;
	var prenom=req.body.prenom;
	var adresse = req.body.adresse;
	var mail=req.body.mail;
	var telephone = req.body.telephone;

	if(operation ===1){ 
		banque.ajouterAuCompte(id,somme);
	}
	else if (operation===2){
		banque.retirerDuCompte(id,somme);
		}
		//tu lui dit juste je connais pas avec le res ya pas dinteraction avec la banque justement car cest une mauvaise info
	else res.send("Operation non reconnue chef soit cest 1 =ajouter soit cest 2 =retirer  petit cretin ");	


	res.json(banque.positionDuCompte(req.params.id))
});


//post = creer 
app.post('/comptes/', function(req, res)
{
	console.log(req.body);
	// il cree un formulaire de creation de compte (mais juste un peu )
	var role =req.body.role; 
	var nom = req.body.nom;
	var prenom=req.body.prenom;
	var adresse = req.body.adresse;
	var mail=req.body.mail;
	var telephone = req.body.telephone;

	var id = creerCompte(role,nom,prenom,adresse,mail,telephone);
	console.log(id);
	//envoie la valeur du paramètre id au naviagateur du client ayant fait l'appel
	//res.json(acteur.positionDuCompte(id));
});

app.listen(3000, function () {
console.log('Listening on port 3000!') ;
}) ;

// le id pourquil puisse choper le compte a supprimer
app.delete ('/comptes/:id', function (req,res){
	res.json(banque.supprimerCompte(req.params.id));
});



//creation d'une offre 
app.post('/moffre/',function(req,res)
{
	console(req.body);
	var type =req.body.type;
	var nomSociete=req.body.nomSociete;
	var sujet=req.body.sujet;
	var adresse =req.body.adresse;
	var mail=req.body.mail;
	var tel =req.body.tel;
	offre.proposerOffre(type,nomSociete,sujet,adresse,mail,tel);

});



     



