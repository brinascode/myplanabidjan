var express = require('express');
var router = express.Router();
//My database modules
var mongodb = require("mongodb")
var mongoose = require("mongoose")
var db = mongoose.connect("mongodb://127.0.0.1/27017/mydb") //Change before deploy
var MongoClient = mongodb.MongoClient
var ObjectId = mongodb.ObjectId
var assert = require("assert")


//Getting our different mongoose models 
var Restaurant = require("../models/Restaurants-Schema")
var Magasin = require("../models/Magasin")
var Avis = require("../models/Avis")

//For passport
var passport = require("passport");
require('../config/passport')(passport); // pass passport for configuration

//******************************************** Restaurants *****************************************



//Sending back the restaurant list
router.post("/findRestaurant",function(req,res){

//In the find method of the Restaurant model, the second param is to limit the num of properties we get for 
//each object== here i took it off though
Restaurant.find(req.body,function(err,found){
	if (err) throw err
		console.log(found)
	res.json(found)
	 
})
})


//************************************* Magasins *************************

router.post("/findmagasin",function(req,res){
Magasin.find(req.body,function(err,data){
	if (err) throw err
		res.json(data)
})
})
//************************************ For when you click on a place

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

router.get('/plan/:_id', function(req, res, next) {
 res.sendFile("plan.html",{root:"public/views"})

})


//**********************************Comments**********************
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


//****************************************************************************************
 
    // LOGIN ===============================
    // =====================================
    // show the login form
    router.get('/login', function(req, res) {

        // render the page and pass in any flash data if it exists
        res.render('login.ejs', { message: req.flash('loginMessage') }); 
    });

    // process the login form
 // process the login form
    router.post('/login', passport.authenticate('local-login', {
        successRedirect : '/profile', // redirect to the secure profile section
        failureRedirect : '/login', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));


    // =====================================
    // SIGNUP ==============================
    // =====================================
    // show the signup form
    router.get('/signup', function(req, res) {

        // render the page and pass in any flash data if it exists
        res.render('signup.ejs', { message: req.flash('signupMessage') });
    });

    // process the signup form
    // // process the signup form (all passport stuff)
    router.post('/signup', passport.authenticate('local-signup', {
        successRedirect : '/profile', // redirect to the secure profile section
        failureRedirect : '/signup', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));





// =====================================
    // FACEBOOK ROUTES =====================
    // =====================================
    // route for facebook authentication and login
    router.get('/auth/facebook', passport.authenticate('facebook', { scope : ['email'] }));

    // handle the callback after facebook has authenticated the user
    router.get('/auth/facebook/callback',
        passport.authenticate('facebook', {
            successRedirect : '/profile',
            failureRedirect : '/'
        }));
    
    // =====================================
    // PROFILE SECTION =====================
    // =====================================
    // we will want this protected so you have to be logged in to visit
    // we will use route middleware to verify this (the isLoggedIn function)
    router.get('/profile', isLoggedIn, function(req, res) {
        res.render('profile.ejs', {
            user : req.user // get the user out of session and pass to template
        });
    });

    // =====================================
    // LOGOUT ==============================
    // =====================================
    router.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });


//*******************************************************
/* GET home page. */
router.get('*', function(req, res, next) {

  res.sendFile("index.html",{root:"views"});

})


//********************************************************************************





module.exports = router;

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on 
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}