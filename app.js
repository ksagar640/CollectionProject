var app = require("express")();
var bodyParser=require("body-parser");
app.use(bodyParser.urlencoded({extended:true}));

var mongoose=require("mongoose");
mongoose.connect("mongodb://localhost/campcollect");
var campSchema = new mongoose.Schema({
										name : String,
										url  : String
									});
var camp = mongoose.model("camp",campSchema);


app.set("view engine" ,"ejs");
app.get("/",function(req,res){
  camp.find({} , function(err,campdata){
  if (err)
    console.log("error from database");
  else  
    res.render("home",{campdata:campdata});
  })
});

app.post("/plzpost",function(req,res){
  camp.create({
  				name : req.body.namepic,
  				url  : req.body.image
  			 }, function(err,value){
  			 	if (err)
  			 	{
  			 		console.log ("Something Went Wrong"+" "+ err);
  			 	}	
  			 	else
  			 		console.log (value);
  			 });
});
app.listen(4040,function(){
	console.log("serVing U Master");
});