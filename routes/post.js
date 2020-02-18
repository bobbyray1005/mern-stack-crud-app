var express = require("express");
var Post = require("../models/Post.js");
var passport = require("passport");
require("../config/passport.js")(passport);

var router = express.Router();

// Get token
function getToken(headers) {
  var splited = headers.authorization.split(" ");
  if (splited.length == 2) {
    // Returns following JWT characters, splited [0] == JWT
    return splited[1];
  } else {
    return null;
  }
}

// Get list of posts
router.get("/", function(req, res, next) {
  Post.find()
    // Descending order (last post up)
    .sort({ write_date: -1 })
    .exec(function(err, list) {
      if (err) return next(err);
      res.json(list);
    });
});

// Import Posting Paging (5 per page)
router.get("/pages/:id", function(req, res, next) {
  Post.find()
    // Descending order (last post up)
    .sort({ write_date: -1 })
    .skip((req.params.id - 1) * 5)
    .limit(5)
    .exec(function(err, list) {
      if (err) return next(err);
      res.json(list);
    });
});

// Get the total number of pages
router.get("/pages", function(req, res, next) {
  Post.find()
    .countDocuments()
    .exec(function(err, list) {
      if (err) return next(err);
      res.json(list);
    });
});

//  Get individual posts
router.get("/:id", function(req, res, next) {
  Post.findById(req.params.id, function(err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

// Save post
router.post("/", passport.authenticate("jwt", { session: false }), function(
  req,
  res,
  next
) {
  //console.log(req.headers);
  var token = getToken(req.headers);
  if (token) {
    Post.create(req.body, function(err, post) {
      if (err) return next(err);
      res.json(post);
    });
  } else {
    return res.status(403).send({ success: false, msg: "Unauthorized." });
  }
});

// Edit post
router.put("/:id", function(req, res, next) {
  Post.findByIdAndUpdate(req.params.id, req.body, function(err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

// Delete post
router.delete("/:id", function(req, res, next) {
  Post.findByIdAndRemove(req.params.id, req.body, function(err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

module.exports = router;
