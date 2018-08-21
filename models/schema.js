var mongoose = require('mongoose');
var jobSchema = new mongoose.Schema({
  jobid: Number,
  companyname: String,
  designation: String,
  description: String,
  website: String,
  address: String,
  vacancy:Number,
  salary:Number,
  startdate: { type: Date },
  updated_date: { type: Date, default: Date.now },
});
module.exports = mongoose.model('Job', jobSchema);
