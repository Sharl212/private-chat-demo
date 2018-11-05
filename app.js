// ! required modules
const path = require("path"),
    logger = require("morgan"),
    cookieParser = require("cookie-parser"),
    bodyParser = require("body-parser"),
    port = process.env.PORT || 4000;

require("./public/Database");
// ? API functions
const userSchema = require("./public/models/users");

// ! DEMO PURPOSE
const fetchUsers = require("./public/api/users/fetchUsers");

// ? api route functions
const room = require("./public/routes/room");
const roomContent = require("./public/routes/roomContent");

// ? listen and emit on connection
const {
    server,
    app,
    express
} = require("./public/socketConnection");

app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "./client/build")));


// ? for creating a room between 2 users
app.post("/api/room", room)

// ? fetch room content (e.g : messages/attachments) given its ID
app.post("/api/roomContent/", roomContent)


// ! DEMO PURPOSE
// ? basic authentication
app.post("/api/login", (req, res) => {
    const Name = req.body.name;
    userSchema.findByCredentials(Name).then(async user => {
        return res.cookie("auth", user._id.toString()).status(200).send(user);
    }).catch(err => {
        console.log(err)
        const user = new userSchema();
        const Name = req.body.name;

        user.Name = Name;

        user.save(function (err) {
            if (!err) {
                console.log("Name added!")
                return res.cookie("auth", user._id.toString()).status(200).send();
            }
            console.log(err)
            return res.status(400).send();
        });
    });
})

// ! DEMO PURPOSE
// ? fetch a list of users to chat with
app.get("/api/users", async (req, res) => {
    await fetchUsers().then((users)=>{
        return res.status(200).send(users);
    })
})

server.listen(port, () => console.log(`server is up on ${port}`));

module.exports = app;