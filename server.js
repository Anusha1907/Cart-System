var express=require("express");
var bodyParser=require("body-parser");
var multer=require("multer");
var app=express();
var path=require("path");
var items=require("./app/models/items.js");
var users=require("./app/models/users.js");
var cartitems=require("./app/models/cartitems.js");
var mongoose=require("mongoose");
var nodemailer=require("nodemailer");
var session=require("express-session");
var md5=require("md5");
var cookieParser=require("cookie-parser")
mongoose.connect('mongodb://localhost/cart');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(cookieParser());
app.use(session({secret:"your secret key"}));
app.use(express.static(__dirname + '/public'));
// mongoose.connect('mongodb://localhost/items');
var Storage=multer.diskStorage({
	destination:function(req,file,callback){
		callback(null,__dirname + "/public/uploads/images");
	},
	 filename:function(req,file,callback){
		callback(null,file.fieldname+"-"+Date.now()+'.jpg');
	}
})
var upload=multer({storage:Storage}).single('file');

app.post("/register",function(req,res){
	var result={success:false,errors:[],result:[]};
	var data=req.body;
	if(!data.name){
		result.errors.push("invalid name");
	}
	if(!data.email){
		result.errors.push("invalid email");
	}
	if(!data.country){
		result.errors.push("invalid country");
	}
	if(!data.mobileNumber){
		result.errors.push("invalid number");
	}
	if(!data.password){
		result.errors.push("invalid password");
	}else{
	     data.password=md5(data.password);
	}
	if(result.errors.length){
		return res.send(result);
	}else{
		users.create(data,function(err,resp){
			if(err){
				result.errors.push("error in creation");
			}else{
				result.success=true;
				var transporter =nodemailer.createTransport({
					service:'gmail',
					auth:{
						user:"kodavatianusha.19@gmail.com",
						pass:'rqglkloqzfilthml'
					}
				});
				var mailOptions={
					from:'kodavatianusha.19@gmail.com',
					to:data.email,
					subject:"simply",
					text:"Thank you for registering with Cart"
				};
				transporter.sendMail(mailOptions,function(errr,info){
					console.log("sending email");
					if(errr){
						console.log(errr);
					}else{
						console.log('email sent'+info.response);
					}
				});
			result.result=resp;
			return res.send(result);
			}
		})
	}

})
app.post("/login",function(req,res){
	console.log("login");
	var result={success:false,result:[],errors:[]};
	var data=req.body;

	if(!data.email){
		result.errors.push("invalid email");
	}
	if(!data.password){
		result.errors.push("invalid password");
	}else{
		data.password=md5(data.password);
	}
	if(result.errors.length){
		return res.send(result);
	}else{
		users.find({email:data.email,password:data.password},function(err,resp){
			if(err){
				result.errors.push(err.message)
				return res.send(result);
			}else{
				if(resp.length){
					req.session.user=resp[0];
					req.session.save();
					result.result.push(resp[0]);
			      	result.success = true;
				return res.json(result);
				}else{
					result.errors.push("invalid credentials");
					return res.json(result);

				}
			
	}	})
	}

})

app.get("/getsession",function(req,res){
	var result={result:[],errors:[],success:false};
	if (req.session&&req.session.user&&req.session.user._id)
	{
		result.success=true;
		result.result=req.session.user;
		return res.json(result);

	}else{
		result.errors.push("no session exists");
		return res.json(result);
	}
})
app.get("/logout",function(req,res){
	var result={success:false,result:[],errors:[]};
	req.session.destroy();
	result.success=true;
	return res.send(result);
	})
app.post("/upload",function(req,res){
	console.log("upload")
	upload(req,res,function(err){
	if(err){
		res.json({errdesc:err});
		return;
	}else{
		if(req.file){
			req.file.path = 'uploads/images/'+req.file.filename;
			return res.send(req.file)
		}else{
			return res.send(req.file)
		}
		// console.log(req.file);
		// console.log(req.files);
	}
	})
})
app.post("/add",function(req,res){
	
	console.log("server")
	var result={result:[],errors:[],success:false};
	var data=req.body;
	if(!data.name){
		result.errors.push("invalid name");
	}
	if(!data.cost){
		result.errors.push("invalid cost");
	}
	if(!data.number){
		result.errors.push("invalid number");
	}
	if(!data.imagepath){
		result.errors.push("invalid path");
	}
	if(!data.status){
		result.errors.push("invalid status");
	}else{
		if(data.status=="Active"){
			data.status=true;
		}else{
			data.status=false;
		}
	}
    if(result.errors.length){
    	return res.send(result);
    }else{
		items.create(data,function(err,resp){
			if(err){
				result.errors.push(err);
				return res.send(result)
			}else{
				console.log(resp);
				result.result=resp;
				result.success=true;
				return res.send(result);
			}
		})

	}
})
app.post("/addtocart",function(req,res){
	// console.log("heyy");
	// console.log(req.body)
	var data=req.body;
	console.log(data);
	var result={result:[],errors:[],success:false}
	cartitems.findOne({userid:data.userid,itemid:data.itemid},function(errr,respm){
		if(errr){
			result.errors.push(errr);
			return res.send(result);
		}else{
			console.log(respm)
			if(respm){
				// respm[0].quantity=data.quantity;
				// result.result=respm[0];
				// result.success=true;
				// return res.send(result);
				cartitems.update({userid:data.userid,itemid:data.itemid},{$set:{quantity: data.quantity}}, function(err,resUp){
					if(err){
						result.errors.push(err);
						return res.send(result);
					}else{
						result.result=resUp;
						result.success=true;
						return res.send(result);
					}
				})
			}else{
				cartitems.create(data,function(err,resp){
					if(err){
						result.errors.push(err);
						return res.send(result);
					}else{
						console.log(resp);
						result.result=resp;
						result.success=true;
						return res.send(result);
					}
				})
			}
		}
	})
	
})
app.post("/home",function(req,res){
	var result={success:false,errors:[],result:[]};
	items.find({},function(err,resp){
		if (err) {
			result.errors.push(err);
			return res.json(result);
		}else{
			result.success=true;
			result.result=resp;
			return res.send(result);
		}

	})
})
app.post("/removeitems",function(req,res){
	var result={success:false,result:[],errors:[]};
	var data=req.body;
	console.log(data);
	cartitems.remove({userid:data.userid,itemid:data.itemid},function(err,resp){
		if(err){
			result.errors.push(err);
		}else{
			result.result=resp;
			result.success=true;
			return res.json(result);
		}
	})
})
app.post("/mycart",function(req,res){

	console.log(req.body);
	var result={success:false,errors:[],result:[]};
	var data = req.body;
	data.userid = mongoose.Types.ObjectId(data.userid);
	var where=[
	             {$match:{"userid":data.userid}},{$lookup:{from:"items",localField:"itemid",foreignField:"_id",as:"itemid"}},{$unwind:{path:"$itemid"}},{$project:{userid:1,itemscost:{$multiply:["$itemid.cost","$quantity"]},"itemid.quantity":"$quantity", "itemid.name": "$itemid.name","itemid.imagepath":"$itemid.imagepath", "itemid.cost":"$itemid.cost","itemid.id":"$itemid._id","itemid.max":"$itemid.number"}},{$group:{ _id:"$userid",totalquantity:{$sum:"$itemid.quantity"},totalcost:{$sum:"$itemscost"}, items:{$push:"$itemid"}}}
	            ]
	      cartitems.aggregate(where,function(err,resp){
	      	console.log(resp);
	      	if(err){

	      		result.errors.push(err);
	      		return res.json(result);
	      	}else{
	      		console.log(resp);
	      		if(resp.length==0){
	      			result.result=null;
	      			result.success=true;
	      			return res.json(result); 
	      		}else{
	      		result.result=resp;
	      		result.success=true;
	      		return res.json(result);
	      	}
	      	}
	      })
	  });
app.post("/gettotalcost",function(req,res){
	console.log(req.body)
	var result={result:[],errors:[],success:false};
	var errors=[];
	var data=req.body;
	if(!data.userid){
		errors.push("userid required")
	}else{
		data.userid=mongoose.Types.ObjectId(data.userid)
	}
	if(errors.length){
		result.errors=errors;
		return res.json(result);
	}else{
		var where=[
			{$match:{'userid':data.userid}},
			{$lookup:{from:'items',localField:"itemid",foreignField:'_id',as:"item"}},
			{$unwind:{path:'$item'}},
			{$project:{userid:1,itemscost:{$multiply:["$item.cost","$quantity"]}}},
			{$group:{_id:'$userid',totalcost:{$sum:"$itemscost"}}}
		]
		cartitems.aggregate(where,function(err,resp){
			if (err) {
			result.errors.push(err);
			return res.json(result);
		}else{
			result.success=true;
			result.result=resp;
			return res.send(result);
		}
		})
	}
})
app.post("/profile",function(req,res){
	var result={success:false,result:[],errors:[]};
	var data=req.body;
	users.findOne({_id:data.userid},function(err,resp){
		if(err){
			result.errors.push(err);
			return res.json(result);
		}else{
			console.log(resp)
			result.success=true;
			result.result=resp;
			return res.json(result);
		}
	})
})
app.post("/save",function(req,res){
	var result={success:false,result:[],errors:[]};
	var data=req.body;
	users.update({_id:data.userid},{$set:{address:data.address}},function(err,resp){
		if(err){
			result.errors.push(err);
			return res.json(result)
		}else{
			result.result=resp;
			result.success=true;
			return res.json(result);
		}

	})
})
app.get('*',function(req,res){
	res.sendFile(__dirname + "/public/views/index.html")
})
app.listen(3000,function(){
	console.log("server is working on port 3000");
});
