var mongoose=require("mongoose");
module.exports=mongoose.model('cartitems',{
	userid:{type:mongoose.Schema.Types.ObjectId},
	itemid:{type:mongoose.Schema.Types.ObjectId},
	quantity:{type:Number}
})