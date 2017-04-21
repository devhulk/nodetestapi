var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var truckModel = new Schema({
    Name : {
        type : String
    },
    TowingCapacity : {
        type : String
    },
    MPG : {
        type : String
    },
    CurbWeight : {
        type : String
    },
    Dimensions : {
        type : String
    }


});

module.exports= mongoose.model('Truck', truckModel);