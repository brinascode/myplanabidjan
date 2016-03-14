var mongoose = require("mongoose")
var Schema = mongoose.Schema


var avisSchema = new Schema ({
discussionId:String,
posted:Date,
author:String,
text:String
})

module.exports = mongoose.model("Avis",avisSchema)

