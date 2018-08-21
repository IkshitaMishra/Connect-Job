var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Job = require('../models/schema.js');

/* GET ALL JOB */
router.get('/', function(req, res, next) {
  Job.find(function (err, products) {
    if (err) return next(err);
    res.json(products);
  });
});

/* GET SINGLE JOB BY ID */
router.get('/:id', function(req, res, next) {
  Job.findById(req.params.id, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* SAVE JOB */
router.post('/', function(req, res, next) {
  Job.create(req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});



/* UPDATE JOB */
router.put('/:id', function(req, res, next) {
  Job.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});


/* DELETE JOB */
router.delete('/:id', function(req, res, next) {
  Job.findByIdAndRemove(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

module.exports = router;
