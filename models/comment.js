let mongoose = require('mongoose'); 
let Schema = mongoose.Schema;

let commentSchema = new Schema({
    description: {
        type: String,
        required: true,
    },
    articleId: {type: Schema.Types.ObjectId, ref:'Article'},
    userId: {type: Schema.Types.ObjectId, ref:'User'},
    likes: [{
        type: Schema.Types.ObjectId,
        href: 'User'
    }],
    author: String
},{timestamps: true});

module.exports = mongoose.model('Comment',commentSchema);




