const Hub = require("mongoose").model("Hub");
const Post = require('mongoose').model('Post')
const User = require('mongoose').model("User");
const hubAuthentication = require('../../helpers/authHelper').hubAuthentication
const router = require("express").Router();
const passport = require("passport");


// GET / gets list of all hubs
// GET /:hub gets single hub by name
// POST / creates a new hub
// PUT / modifies existing hub
// DELETE /:hub deletes existing hub


//GET /:hub/subscribe
// /:hub/unsubscribe

// GET /:hub/posts/ list of all posts
// GET /:hub/posts/:post fetch single post by ID
// POST /:hub/posts/ create a new post
// PUT /:hub/posts/:post modify existing post
// DELETE /:hub/posts/:post delete existing post

//middleware for hubs

const hubMiddleware = async (req,res,next) => {
  const hubName = req.params.hub;
  console.log(hubName)
  const currentHub = await Hub.findOne({name: hubName}).populate('subscribers').populate('admin')
  if(!currentHub)
    return res.status(409).send('Cannot find specified Hub');
  req.hub = currentHub;
  next()
}


// =====
// ROUTES
// =====

// get list of all hubs
router.get("/", async (req, res, next) => {
  const hubs = await Hub.find({});
  if (hubs) res.send(hubs);
  res.sendStatus(500);
});


// create a new hub
router.post("/", passport.authenticate("jwt"), async (req, res, next) => {
  const { name, description, privacy } = req.body;

  //validate name, desc

  const existingHub = await Hub.findOne({ name });
  if (existingHub) res.status(409).send("Existing Hub");
  else {
    const newHub = new Hub({
      admin: req.user._id,
      dateCreated: Date.now(),
      name,
      description,
      privacy,
      moderators: [],
      posts: [],
      subscribers: []
    });
    newHub.save((err, hub) => {
      if (err) res.status(500).send(err);
      res.send(hub);
    });
  }
});

// get specific hub by name
router.get("/:hub",hubMiddleware, async (req, res, next) => {
  return res.send(req.hub)
});



// subscribe to hub
router.get('/:hub/subscribe',passport.authenticate('jwt'), hubMiddleware,  (req,res,next) => {
  const hub = req.hub;
  const user = req.user;
  User.findByIdAndUpdate(user._id, {$push: {subscription: hub._id}}, err => err && res.sendStatus(500))
  Hub.findByIdAndUpdate(hub._id, {$push: {subscribers: user._id}}, err => err && res.sendStatus(500))
  res.sendStatus(200)
})
router.get('/:hub/unsubscribe',passport.authenticate('jwt'), hubMiddleware,  (req,res,next) => {
  const hub = req.hub;
  const user = req.user;
  User.findByIdAndUpdate(user._id, {$pull: {subscription: hub._id}}, (err) => err && res.sendStatus(500))
  Hub.findByIdAndUpdate(hub._id, {$pull: {subscribers: user._id}}, (err) => err && res.sendStatus(500))
  res.sendStatus(200)
})
module.exports = router;
