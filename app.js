var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    cookieParser = require('cookie-parser'),
    session = require('express-session'),
    passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy;
    methodOverride = require('method-override'),
    port = process.env.PORT || 3400;

var db = require("./models"),
    User = db.User

// Configure app
app.set("views", __dirname + '/views');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(methodOverride('X-HTTP-Method-Override'));

app.use(cookieParser());
app.use(session({
  secret: 'supersecretkey',
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

//Passport Configure
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Set CORS Headers
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});



// ROUTES
app.get('/', function(req, res) {
 res.render("index", { user: req.user, });
});

app.get('/profile', function(req, res) {
 res.render('profile', { user: req.user, });
});

app.get('/logon', function (req, res) {
 res.render('logon', { user: req.user, });
});

app.post('/partials/login', passport.authenticate('local'), function (req, res) {
  res.redirect('/profile/'+req.user.id);
});
app.get('/map', function (req, res) {
  res.render('map', { user: req.user, });
});


app.post('/partials/signup', function (req, res) {
  User.register(new User({
    username: req.body.username,
    truckname: req.body.truckname,
    address: req.body.address,
    foodtype: req.body.foodtype }),
    req.body.password,
    function (err, newUser) {
      passport.authenticate('local')(req, res, function() {
        console.log(err);
        res.redirect('/profile');

      });
    }
  );
});

app.get('/logout', function (req, res) {
  console.log("BEFORE logout", JSON.stringify(req.user));
  req.logout();
  console.log("AFTER logout", JSON.stringify(req.user));
  res.redirect('/');
});



//Get all users
app.get('/profileAll', function(req, res) {
  User.find({}, function(err, allUsers) {
    if (err) {
      res.status(500).json({ error: err.message, });
    } else {
      res.json({ profile: allUsers, });
    }
  });
});

app.get("/api/profileLocations", function(req, res) {
  User.find({location: { $exists: true }}, function(err, allUsers) {
    if (err) {
      res.status(500).json({ error: err.message, });
    } else {
      res.json({ profile: allUsers, });
    }
  });
});


//Get one User
app.get("/profile/:id", function(req, res) {
  User.findById(req.params.id, function (err, foundUser) {
    if (err) {
      res.status(500).json({ error: err.message, });
    } else {
      res.render("profile", { user: foundUser, });
    }
  });
});


// API ROUTE - update post

app.post("/profile/:id", function (req, res) {
  // get post id from url params (`req.params`)
  var userId = req.params.id;
  // find post in db by id
  User.findOne({ _id: userId, }, function (err, foundUser) {
    if (err) {
      res.status(500).json({ error: err.message, });
    } else {
      // update the posts's attributes
      foundUser.truckname = req.body.truckname || foundUser.title;
      foundUser.location = req.body.location|| foundUser.location;
      foundUser.foodtype = req.body.foodtype || foundUser.foodtype;
      // save updated post in db
      foundUser.save(function (err, savedUser) {
        if (err) {
          res.status(500).json({ error: err.message, });
        } else {
          // res.json(savedUser);
          res.redirect("/profile/" + savedUser._id);
        }
      });
    }
  });
});



app.listen(port, function () {
  console.log('Listening on ' + port);
});
