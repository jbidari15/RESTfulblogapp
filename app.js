var    bodyParser        =   require("body-parser"),
        methodOverride =  require("method-override"),
         mongoose          =  require("mongoose"),
         express               =  require("express"),
              app                =  express(),
              ejsLint = require("ejs-lint");

      app.set("view engine","ejs");
      app.use(bodyParser.urlencoded({extended:true}));
      app.use(express.static("public"));
      app.use(methodOverride("_method"));

mongoose.connect("mongodb://localhost/blog_app");

//Schema and Model Config and data created
var blogSchema = new mongoose.Schema ({
        title : String,
        image :String,
        body:String,
        created : {type:Date,default:Date.now}

});
var Blog = mongoose.model("Blog",blogSchema);
// Blog.create({
//     title:"The big hill",
//     image:"http://d27k8xmh3cuzik.cloudfront.net/wp-content/uploads/2015/01/Kullu-Manali-Hill-Station.jpg",
//     body:"Hello , this is a blog post"
//
// },function(err,blog){
//     if(err){
//         console.log(err);
//     }else{
//         console.log("you inserted a data");
//         console.log(blog);
//     }
// });
//Restful Routes
app.get("/",function(req,res){
    res.redirect("/blogs");
});
//INDEX ROUTE
app.get("/blogs",function(req,res){
    Blog.find({},function(err,blogs){
        if(err){
            console.log(err);
        }else{
            res.render("index",{blogs: blogs});
        }
    });

});
//NEW ROUTE
app.get("/blogs/new",function(req,res){
    res.render("new");
});
//CREATE ROUTE
app.post("/blogs",function(req,res){
    //creating blog
    Blog.create(req.body.blog,function(err,newblog){
        if(err){
        res.render("new");
        }else{
            //then, redirect to the index.
            res.redirect("/blogs");
        }
    });
});
//  SHOW ROUTE.
app.get("/blogs/:id",function(req,res){
    Blog.findById(req.params.id,function(err,foundBlog){
        if(err){
            res.redirect("/blogs");
        }else{
            res.render("show",{blog:foundBlog});
        }
    });
});
//EDIT ROUTE
app.get("/blogs/:id/edit",function(req,res){
    Blog.findById(req.params.id,function(err,foundBlog){
        if(err){
            res.redirect("/blogs");
        }else{
            res.render("edit",{blog:foundBlog});
        }
    });
});
//UPDATE ROUTE
app.put("/blogs/:id",function(req,res){
    Blog.findByIdAndUpdate(req.params.id,req.body.blog,function(err,updatedBlog){
        if(err){
            res.redirect("/blogs");
        }else{
            res.redirect("/blogs/"+req.params.id);
        }
    });
});
//DELETE ROUTE
app.delete("/blogs/:id",function(req,res){
    Blog.findByIdAndRemove(req.params.id,function(err){
        if(err){
            res.redirect("/blogs");
        }else{
            res.redirect("/blogs");
        }
    });
});
app.listen(8080,function(){
    console.log("The server has started");
});
var score=[1,2,3,4,5];
score.splice(2,1);
console.log(score);
