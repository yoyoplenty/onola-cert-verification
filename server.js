const express = require("express");
const app = express();
const exphbs = require("express-handlebars");
const Handlebars = require("handlebars");
const Homeroutes = require('./routes/home');
const Adminroutes = require('./routes/admin');
const mongoose = require("mongoose");
const flash = require("connect-flash");
const passport = require("passport");
const session = require("express-session");

//set prototypes for handlebars
const {
    allowInsecurePrototypeAccess,
} = require("@handlebars/allow-prototype-access");

//set Database
mongoose.connect(
    "mongodb://localhost:27017/Cetificateverification",
    {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useCreateIndex: true,
    },
    () => {
        console.log("Database connected");
    }
);


//middlewares
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));

app.use(
    session({
        secret: "secret",
        resave: true,
        saveUninitialized: true,
    })
);




//view engine
var hbs = exphbs.create({
    handlebars: allowInsecurePrototypeAccess(Handlebars),
});
app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

//initialize port
let PORT = process.env.PORT || 8000;


//Routes
app.use(Homeroutes);
app.use('/admin', Adminroutes);

//server port
app.listen(PORT, () => {
    console.log(`server up and running on port ${PORT}`);
});
