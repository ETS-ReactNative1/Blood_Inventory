const mongoose = require('mongoose');
const { stringify } = require('querystring');

const StockSchema = new mongoose.Schema({
    city_name: {type: String, required: true},
    blood_stock:[{category_name:String,stock:Number,sub_category:[{name:String,stock:Number}] }] 
    
})

const Stock = mongoose.model('Stock',StockSchema);

module.exports = Stock;