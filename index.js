// Todo Usual init
import express from "express";
import bodyParser  from "body-parser";
const app = express();
const port = 3000;

// Data Center
let posts = [];


// Post Constructor
function Post(title, content) {
    this.title = title;
    this.content = content;
    this.rawDate = new Date();
    this.date = this.rawDate.toLocaleString();
}

// Add Post
function addPost(title, content) {
    let post = new Post(title, content);
    posts.push(post);
}

// Delete Post
function deletePost(index) {
    posts.splice(index, 1);
}
// Edit Post
function editPost(index, title, content) {
    posts[index] = new Post(title, content);
}

// Midleware
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: false}));


// Todo All paths

// Home
app.get("/", (req, res) => {
    res.render("home.ejs", {posts: posts});
});

// View Post
app.get("/view/:id", (req, res) => {
    let index = req.params.id;
    let post = posts[index];
    res.render("view.ejs", {postId: index, title: post.title, content: post.content});
});

// Delete Post
app.post("/delete", (req, res) => {
    let index = req.body["postId"];
    deletePost(index);
    res.redirect("/");
});

// Edit Post Page
app.get("/edit/:id", (req, res) => {
    let index = req.params.id;
    let post = posts[index];
    res.render("create.ejs", {postId: index, title: post.title, content: post.content});
});

// Update
app.post("/update", (req, res) => {
    let title = req.body["title"];
    let content = req.body["content"];
    let index = req.body["index"];
    editPost(index, title, content);
    res.redirect("/");
});

// Create Post Page
app.get("/create", (req, res) => {
    res.render("create.ejs");
});

// Save Post
app.post("/save", (req, res) => {
    let title = req.body["title"];
    let content = req.body["content"];
    
    addPost(title, content);
    res.redirect("/");
});


// Todo Listen thing
app.listen(port, () => {
    addPost("I Tried to Impress my Date with my Culinary Skills, and I Burned Water", "Hey fellow foodies, gather 'round for a tale of culinary calamity that would make Gordon Ramsay shed a tear.\nSo, picture this: a romantic dinner date with my crush, a beautifully set table, candles, and soft music playing in the background. I decided to take charge of the kitchen and show off my alleged culinary skills, thinking I'd impress my date with a homemade meal. What could go wrong, right?\nAs we embarked on this culinary adventure, I decided to start with something easy - boiling water for pasta. Sounds foolproof, doesn't it?\nBut it turns out, I have a knack for defying the odds.")
    addPost("I Pretended to Be a Penguin on a Job Interview - Now I'm the New Zoo Attraction", "Hello, my adoring fans! Allow me to regale you with the audacious tale of how my penguin impersonation turned me into the zoo's most celebrated attraction.\nOne day, in a moment of pure genius, I transformed into the charismatic Penguin Pretender. I walked into the zoo, flaunting my exceptional penguin moves, honks, and all. The interview panel was dumbstruck, offering me a job right then and there.\nFast forward to today, I'm the star of the show! My skills as the dazzling Penguin Pretender are unrivaled, drawing crowds from all over. I have a VIP enclosure, a daily 'Penguin Spectacle,' and a fervent fan following.\nMy message to you? Dare to be extraordinary, and let your talents shine.")
    console.log(`Breaking News: Our app is all ears at Port ${port}, ready to boogie to the sweet sounds of data! 🎵🕺😄`)
})



