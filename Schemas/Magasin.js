var mongoose = require("mongoose")
var Schema = mongoose.Schema


var magasinSchema = new Schema ({
//That other Schemas don't have (you select)
magasin:Boolean, //true means magasin(achats), false === espace de beauté et soins
specialite2:String, //For extra details. Here, Vetements... uses this to sort.Sa s'appelle tranche d'age

//****************That other schemas of plans have (all):*************
//Stuff you select:
commune:String,
specialite:String,
prix:String,
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



module.exports = mongoose.model("Magasin",magasinSchema)

