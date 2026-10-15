const path = require("path");
const os = require("os");
const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser"); 
const userRoute = require('./routes/user');
const postRoute = require("./routes/post");
const { checkForAuthenticationCookie } = require("./middleware/authentication");
const Post = require("./models/post");
const User = require("./models/user");
const methodOverride = require("method-override");
const dotenv = require('dotenv');
dotenv.config();

const app = express();

app.use(express.static(path.join(__dirname, "public")));
if (process.env.VERCEL) {
    app.use("/uploads", express.static(path.join(os.tmpdir(), "uploads")));
    app.use("/profilePics", express.static(path.join(os.tmpdir(), "ProfilePics")));
} else {
    app.use("/uploads", express.static(path.join(__dirname, "public", "uploads")));
    app.use("/profilePics", express.static(path.join(__dirname, "public", "ProfilePics")));
}

app.use(methodOverride("_method"));

// MongoDB connection
if (process.env.dbPass) {
    mongoose
        .connect(process.env.dbPass)
        .then(() => console.log("DB connected"))
        .catch(err => console.error("DB connection error:", err));
} else {
    console.warn("Warning: dbPass environment variable is not defined!");
}

// Serverless DB reconnect middleware to ensure connection on cold starts
app.use(async (req, res, next) => {
    if (mongoose.connection.readyState === 0 && process.env.dbPass) {
        try {
            await mongoose.connect(process.env.dbPass);
        } catch (err) {
            console.error("DB reconnect error:", err);
        }
    }
    next();
});

app.set('view engine', 'ejs');
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(checkForAuthenticationCookie("token"));



app.get("/",async (req,res)=>{
    
    const selectedCategory = req.query.category;
    let posts;
    console.log(selectedCategory);

    if (selectedCategory && selectedCategory.toLowerCase() !== "all") {
        posts = await Post.find({ category: selectedCategory });
    } else {
        posts = await Post.find({});
    }


    let name = null;
    if (req.user) {
        const userObj = await User.findById(req.user._id).select("fullName");
        name = userObj ? userObj.fullName : null;
    }
    res.render('home',{
        name: name,
        user: req.user || null,
        post: posts,
        selectedCategory: selectedCategory || "",
    });
});


app.get('/profile', async (req,res)=>{
    const user = await User.findById(req.user._id).select("fullName email profileImageURL");
    const userPost = await Post.find({createdBy: req.user._id}); 
     res.render('profile',{
      pic:user.profileImageURL,
      name: user.fullName,
      user: user,
      post:userPost,
    });
  });

app.delete("/profile/:id", async (req, res) => {
    try {
        await Post.findByIdAndDelete(req.params.id);
        res.redirect("/profile");
    } catch (error) {
        res.status(500).json({ success: false, message: "Error deleting post" });
    }
});

app.delete("/profile/user/:id", async (req, res) => {
    console.log("DELETE /profile/user/:id route hit");
    try {
        await User.findByIdAndDelete(req.params.id);
        res.redirect("/user/signup");
    } catch (error) {
        res.status(500).json({ success: false, message: "Error deleting account" });
    }
});

app.get('/profile/editProfile', async (req,res)=>{  
    const Name = await User.findById(req.user._id).select("fullName");
    console.log(Name);
    console.log("hello");

    res.render('editProfile',{
        name:Name.fullName,
    });
})



app.use("/user",userRoute);
app.use("/post",postRoute);


if (require.main === module) {
    const PORT = process.env.PORT || 8000;
    app.listen(PORT, () => {
        console.log(`Server started on port ${PORT}!`);
    });
}

module.exports = app;