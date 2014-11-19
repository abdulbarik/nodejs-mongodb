var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

// Define member schema
var MemberSchema = new Schema({
    id:ObjectId,
    eid : {
    type: String,
    trim: true,
    required: true,
    unique: true
    },
    name : {
         type: String,
    trim: true,
    required: true
    },
    location : {
         type: String,
    trim: true,
    required: true
    },
    edob : 
        {
         type: String,
    trim: true,
    required: true
    },
    edoj :
        {
         type: String,
    trim: true,
    required: true
    }

});

module.exports = mongoose.model('Members', MemberSchema);