var mongoose = require("mongoose")
var Schema = mongoose.Schema


var restaurantSchema = new Schema ({
	//That other schemas don't have: (you selct espace)
topmenu:String,
espace:Boolean,//If true means open, false means closed
	
//****************That other schemas of plans have (all):*************
//Stuff you select:

commune:String,
specialite:String,
prix:{bas:Number,haut:Number},//To put as Moyenne de prix: Object two options: .bas and .haut
rating:Object,//Fixthis oh!
//Stuff you don't select
nom:String,
adresse:String,
heures:String,
telephone:Number,
siteweb:String,
photoPrincipale:String,
autresPhotos:Array,
hashTag:String,
position:Array,//Lat and Long
description:String,
description2:String,
commodities:Array//Load icons based on stuff in array! :)) for them to select: make sure some items repeat(wifi...)
})


module.exports = mongoose.model("Restaurant",restaurantSchema)

