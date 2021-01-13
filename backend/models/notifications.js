const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator")
const Schema = mongoose.Schema;

const notificationsSchema = new Schema({
    followers:{type: Array,default:[]},
    likes:{type: Array,default:[]},
    bids:{type: Array,default:[]},
    auction:{type: Array,default:[]},
    items:{type: Array,default:[]},
   
   
});

notificationsSchema.plugin(uniqueValidator);
module.exports = mongoose.model('Notifications',notificationsSchema);