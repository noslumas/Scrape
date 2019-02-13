var mongoose = require("mongoose");

module.exports = {
    Article: require("./Article"),
    Note: require("./Note"),
  };
// Save a reference to the Schema constructor
var Schema = mongoose.Schema;

var SaveSchema = new Schema({
    // `title` is of type String
    Note: String,
    // `body` is of type String
    Article: String
  });

  var SaveSchema = mongoose.model("")