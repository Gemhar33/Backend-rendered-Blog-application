const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const articleSchema = new Schema({
   title: {
       type: String,
       maxlength: 50,
       required: true
   },
   description: {
    type: String,
    required: true
   },
   tags: {
       type: [String]
   },
   comments: [{
    type: Schema.Types.ObjectId,
    href: 'Comment'
   }],
   userId: {
       type: Schema.Types.ObjectId,
       href: 'User'
   },
   likes: [{
    type: Schema.Types.ObjectId,
    href: 'User'
   }],
   author: String
});

module.exports = mongoose.model('Article', articleSchema);