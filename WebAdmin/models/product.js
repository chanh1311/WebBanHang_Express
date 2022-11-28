const ObjectId = require('mongodb').ObjectId;
const { dbs } = require('../dbs');

const detail = async (id) => {
  const results = await dbs.production.collection('products').find({_id: ObjectId(id)})
    .toArray();
  return results[0];
};

module.exports.list = async () => {
  return await dbs.production.collection('products').find({})
    .toArray();
};

module.exports.listSortSl = async () => {
  return await dbs.production.collection('products').find({}).sort({soLuongBan: -1})
    .toArray();
};



module.exports.add = async (product) => {
  return await dbs.production.collection('products').insertOne(product);
};

module.exports.delete = async (id) => {
  return await dbs.production.collection('products').deleteOne({ _id: ObjectId(id)});
};

module.exports.update = async (id,product) => {
  return await dbs.production.collection('products').updateOne({ _id: ObjectId(id)},{$set: product});
};

exports.detail = detail;



// update so luong kho khi huy don 
module.exports.updateSoLuongHuy = async (id,soluongmua) => {
  await dbs.production.collection('products').updateOne({_id: ObjectId(id)},{ $inc: { soLuong: +soluongmua }});
};

// so luong ban tang 1
module.exports.updateSoLuongBan = async (id,soluongmua) => {
  await dbs.production.collection('products').updateOne({_id: ObjectId(id)},{ $inc: { soLuongBan: +soluongmua }});
};