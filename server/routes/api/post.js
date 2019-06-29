const Hub = require("mongoose").model("Hub");
const Post = require('mongoose').model('Post')
const router = require("express").Router();
const passport = require("passport");

//router.get('/hub/:name/')