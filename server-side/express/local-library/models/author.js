const mongoose = require("mongoose");
const moment = require("moment");

const Schema = mongoose.Schema;

const AuthorSchema = new Schema({
  first_name: { type: String, required: true, max: 100 },
  family_name: { type: String, required: true, max: 100 },
  date_of_birth: { type: Date },
  date_of_death: { type: Date },
});

AuthorSchema.virtual("name").get(function () {
  let fullname = "";
  if (this.first_name && this.family_name) {
    fullname = this.first_name + ", " + this.family_name;
  }
  return fullname;
});

AuthorSchema.virtual("lifespan").get(function () {
  const date_of_birth = this.date_of_birth
    ? moment(this.date_of_birth).format("MMMM Do, YYYY")
    : "Unknown";
  const date_of_death = this.date_of_death
    ? moment(this.date_of_death).format("MMMM Do, YYYY")
    : "Today";
  return `${date_of_birth} - ${date_of_death}`;
});

AuthorSchema.virtual("url").get(function () {
  return "/catalog/author/" + this._id;
});

module.exports = mongoose.model("Author", AuthorSchema);
