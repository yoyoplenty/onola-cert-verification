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
const dotenv = require('dotenv')
const path = require('path')
//initialize port
let PORT = process.env.PORT || 8000;

dotenv.config()

//set prototypes for handlebars
const {
    allowInsecurePrototypeAccess,
} = require("@handlebars/allow-prototype-access");

mongoose.connect(process.env.DATABASE_ACCESS, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
}, () => {
    console.log('Database connected')
}
)

/*
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
); */

//view engine
var hbs = exphbs.create({
    handlebars: allowInsecurePrototypeAccess(Handlebars),
});
app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");
app.set('views', path.join(__dirname, '/views'));


//middlewares
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));
app.use(express.static(path.join(__dirname, 'public')));

//initialize session
app.use(
    session({
        secret: "secret",
        resave: true,
        saveUninitialized: true,
    })
);

//initialize passport and flash
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());


//Global variables
app.use((req, res, next) => {
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.err = req.flash("err");
    next();
});



//Routes

app.use('/admin', Adminroutes);
app.use(Homeroutes);

//server port
app.listen(PORT, () => {
    console.log(`server up and running on port ${PORT}`);
});
