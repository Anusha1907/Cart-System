var mongoose=require("mongoose");
module.exports=mongoose.model('items',{
	name:{type:String},
	cost:{type:Number},
	number:{type:Number},
	status:{type:Boolean},
	numbers:{type:Array},
	imagepath:{type:String}

})