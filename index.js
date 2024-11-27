const express = require("express");
const app = express();
port = 8080;
const path = require("path");
const { v4: uuidv4 } = require('uuid');
const methodOverride = require("method-override");


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

let posts = [
    {
        id: uuidv4(),
        username: "justt.dinu",
        content: "i love coding"

    },

    {
        id: uuidv4(),
        username: "muksa_choudhary",
        content: "i am a businessman"
    },

    {
        id: uuidv4(),
        username: "bp_sanchori",
        content: "everything is easy"
    }]
app.get("/posts", (req, res) => {
    res.render("index.ejs", { posts });
});

app.get("/posts/new", (req, res) => {
    res.render("new.ejs")
})

app.post("/posts", (req, res) => {
    let { username, content } = req.body;
    let id= uuidv4(); 
    posts.push({ id, username, content });
    res.redirect("/posts");

})

// app.get("/posts/:id", (req, res) => {
//     let { id } = req.params;
//     console.log(id);
//     let post = posts.find((p) => id === p.id);
//     res.render("show.ejs",{post});
// });
app.get("/posts/:id", (req, res) => {
    const { id } = req.params; // Extract ID from the request
    console.log("Requested ID:", id); // Log the requested ID
    console.log("Available IDs:", posts.map((p) => p.id)); // Log all IDs in posts array

  let post = posts.find((p) => p.id === id); // Find the post by ID

    if (!post) {
        // Log when no post is found
        console.log("Post not found for ID:", id);
        return res.status(404).send("Post not found");
    }

    // Render the post if found
    res.render("show.ejs", { post });
});


app.patch("/posts/:id",(req,res)=>{
    let { id } = req.params;
    console.log(id);
    let newContent = req.body.content;
    console.log(newContent);
    let post = posts.find((p) => p.id === id);
    post.content= newContent;
    console.log(post);
    res.redirect("/posts");
})

app.get("/posts/:id/edit",(req,res)=>{
    let { id } = req.params;
    let post = posts.find((p) => p.id === id);
    res.render("edit.ejs", {post});

    
})

app.delete("/posts/:id", (req, res) => {
    let { id } = req.params;

    // Filter out the post with the matching ID
    posts = posts.filter((p) => p.id !== id);

    // Redirect to the posts page after deletion
    res.redirect("/posts");
});



app.listen(port, () => {
    console.log("listening to port : 8080");
});