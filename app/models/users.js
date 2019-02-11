var mongoose=require("mongoose");
module.exports=mongoose.model('users',{
	name:{type:String},
	email:{type:String},
	password:{type:String},
	country:{type:String},
	mobileNumber:{type:String},
	address:{type:String}
})