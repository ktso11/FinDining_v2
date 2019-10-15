var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    cookieParser = require('cookie-parser'),
    session = require('express-session'),
    passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy;
    methodOverride = require('method-override')

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

// app.get('/partials/signup', function(req, res) {
//  res.render("signup");
// });
//
app.get('/profile', function(req, res) {
 res.render('profile', { user: req.user, });
});
//
app.get('/logon', function (req, res) {
 res.render('logon', { user: req.user, });
});

app.post('/partials/login', passport.authenticate('local'), function (req, res) {
  console.log(req.user);
  res.redirect('/profile/');
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
  // res.send('logged out!!!');
});

//Get all users
app.get('/profile', function(req, res) {
  User.find({}, function(err, allUsers) {
    if (err) {
      res.status(500).json({ error: err.message, });
    } else {
      res.json({ posts: allUsers, });
    }
  });
});

//Get one User
app.get("/api/profile/:id", function(req, res) {
  User.findById(req.params.id,function (err, foundUser) {
        if (err) {
          res.status(500).json({ error: err.message, });
        } else {
          // console.log(foundUser);
          // res.render("/profile", { user: foundUser});
          console.log("this is req.params.id "+req.params.id)
          console.log("this is req.user "+req.user.id)
          res.json(foundUser)

        }
      });
});



//ROUTE Update one user
app.put("/profile/:id", function (req, res) {
  // get u id from url params (`req.params`)
  var userId = req.params.id;
  var currentUser = req.user;

  // find user in db by id
  User.findOne({ _id: userId, }, function (err, foundUser) {
    console.log(foundUser.user);
    if (err || foundUser.user != currentUser.id) {
      res.render('index', {error: "Unauthorized, please log in to post a post."});
    } else {
      // update the user attributes
      foundUser.truckname = req.body.truckname

      // save updated user attr in db
      foundUser.save(function (err, savedUser) {
        if (err) {
          res.status(500).json({ error: err.message, });
        } else {
          res.redirect("/profile/" + savedUser._id);
        }
      });
    }
  });
});

// API ROUTE - update post
app.get("/api/profiles", function (req, res) {
  // find all posts in db
  User.find(function (err, allUsers) {
    if (err) {
      res.status(500).json({ error: err.message, });
    } else {
      res.json({ posts: allUsers, });
    }
  });
});


app.put("/api/profiles/:id", function (req, res) {
  // get post id from url params (`req.params`)
  var userId = req.params.id;

  // find post in db by id
  User.findOne({ _id: postId, }, function (err, foundUser) {
    if (err) {
      res.status(500).json({ error: err.message, });
    } else {
      // update the posts's attributes
      foundUser.truckname = req.body.truckname

      // save updated post in db
      foundUser.save(function (err, savedUser) {
        if (err) {
          res.status(500).json({ error: err.message, });
        } else {
          res.json(savedUser);
        }
      });
    }
  });
});






app.listen(process.env.PORT || 3400, function () {
  console.log('Example app listening at http://localhost:3400/');
});
