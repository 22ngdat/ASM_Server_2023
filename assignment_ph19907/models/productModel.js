const { default: mongoose } = require('mongoose');
var db = require('./db');
const productSchema = new db.mongoose.Schema(
    // doi tuong cau truc model
    {
        // _id: mongoose.Schema.Types.ObjectId,
        name: { type: String, required: true },
        price: { type: Number, required: true },
        desc: { type: String, required: true },
        imageProduct: { type: String, require: true },
        category: { type: db.mongoose.Schema.Types.ObjectId, require: true, ref: 'categoryModel' }
    },
    {
        collection: 'products'
    }
)
const categorySchema = new db.mongoose.Schema({
    name: { type: String, required: true },
    des: { type: String, required: true }
}, { collection: 'category' })

// định nghĩa model
let productModel = db.mongoose.model('productModel', productSchema);
let categoryModel = db.mongoose.model('categoryModel', categorySchema);

module.exports = { productModel, categoryModel };
