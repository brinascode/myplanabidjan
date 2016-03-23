var express = require('express');
var router = express.Router();
//My database modules
var mongodb = require("mongodb")
var mongoose = require("mongoose")
var db = mongoose.connect("mongodb://sabrinakoumoin:Abidjan24@ds035633.mlab.com:35633/myplan")
var MongoClient = mongodb.MongoClient
var ObjectId = mongodb.ObjectId
var assert = require("assert")


//Getting our different mongoose models 
var Restaurant = require("../Schemas/Restaurants-Schema")
var Magasin = require("../Schemas/Magasin")
var Avis = require("../Schemas/Avis")

//******************************************** Restaurants *****************************************

//Sending back the restaurant list
router.post("/findRestaurant",function(req,res){
console.log("hey bae")
//In the find method of the Restaurant model, the second param is to limit the num of properties we get for 
//each object
Restaurant.find(req.body,"nom commune cuisine photoPrincipale prix",function(err,data){
	if(err) throw err
		res.json(data)
	 
})
})


//This is to get the remaining propertiies of the clicked object
router.post("/findClickedRestaurant",function(req,res){

Restaurant.find(req.body,function(err,data){
	if (err) throw err
		res.json(data)
})

})


//************************************************************ Magasins *************************


router.post("/findmagasin",function(req,res){
Magasin.find(req.body,function(err,data){
	if (err) throw err
		res.json(data)
})
})
//************************************************************ For all of them :)))


//Getting the clicked place from its id in the Main Controller
//We first search the restau. collection, if the id isnt from there, we search the magasin collection
router.post("/clickedPlan",function(req,res){
Restaurant.find(req.body,function(err,data){
	if (err) throw err
		if(data.length == 0 ){
		Magasin.find(req.body,function(err,data2){
	  if(err) throw err
		res.json(data2)
})                    }else{res.json(data)}

})
})

// Pour soumettre un avis
router.post("/submitAvis",function(req,res){

var newAvis = new Avis(req.body)
newAvis.save(function(err,data){
	if(err) throw err
		Avis.find({discussionId:req.body.discussionId},function(err,data){
	if(err) throw err
		res.json(data)
})
})
})

//Pour prendre la liste des avis
router.post("/takeAvis",function(req,res){
	Avis.find(req.body,function(err,data){
		if(err) throw err
			res.json(data)
	})
})




router.get('/plan/:_id', function(req, res, next) {
 res.sendFile("plan.html",{root:"public/views"})

})




/* GET home page. */
router.get('*', function(req, res, next) {

  res.sendFile("index.html",{root:"views"});

})







module.exports = router;
