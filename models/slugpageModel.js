const mongoose = require('mongoose');

const pageSchema = new mongoose.Schema({
  slug: { type: String, required: true },
  content: { type: String, required: true },
});

const Page = mongoose.model('Page', pageSchema);

module.exports = Page;
