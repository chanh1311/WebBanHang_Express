const ObjectId = require('mongodb').ObjectId;
const { dbs } = require('../dbs');
const CARTS = 'carts'

module.exports.add = async (email, idProduct) => {
    return await dbs.production.collection(CARTS).insertOne({email, idProduct, check:0,soLuongMua: 1});
};

module.exports.list = async (email) => {
    return await dbs.production.collection(CARTS).find({email}).toArray();
};

module.exports.listCheck = async (email) => {
    return await dbs.production.collection(CARTS).find({email,check:0}).toArray();
};

module.exports.listUnCheck = async (email) => {
    return await dbs.production.collection(CARTS).find({email,check:1}).toArray();
};

module.exports.UnCheck = async (email) => {
    return await dbs.production.collection(CARTS).updateMany({email},{$set: {check:1}});
  };

const count = async(email) => {
    return await dbs.production.collection(CARTS).find({email}).count();
}
exports.count=count;

module.exports.delete = async (idProduct) => {
    return await dbs.production.collection(CARTS).deleteOne({idProduct});
};




module.exports.addSl = async (idProduct) => {
    return await dbs.production.collection(CARTS).updateOne({idProduct},{ $inc: { soLuongMua: 1 }});
};
module.exports.subSl = async (idProduct) => {
    return await dbs.production.collection(CARTS).updateOne({idProduct},{ $inc: { soLuongMua: -1 }});
};






const detailCart = async (id) => {
    const results = await dbs.production.collection(CARTS).find({idProduct: id})
      .toArray();
    return results[0];
};
exports.detailCart=detailCart;


