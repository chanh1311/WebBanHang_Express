const ObjectId = require('mongodb').ObjectId;
const { dbs } = require('../dbs');
const ORDERS = 'orders'

const detail = async (id) => {
    const results = await dbs.production.collection(ORDERS).find({_id: ObjectId(id)})
      .toArray();
    return results[0];
};

module.exports.add = async (order) => {
    return await dbs.production.collection(ORDERS).insertOne(order);
};



module.exports.list = async (email) => {
    return await dbs.production.collection(ORDERS).find({email}).sort({time: -1}).toArray();
};
module.exports.listChuaXacNhan = async (email) => {
    return await dbs.production.collection(ORDERS).find({$and: [{email},{trangThai: false},{huy: undefined}]}).sort({time: -1}).toArray();
};
module.exports.listDaXacNhan = async (email) => {
    return await dbs.production.collection(ORDERS).find({$and: [{email},{trangThai: true},{giaoHang: undefined}]}).sort({time: -1}).toArray();
};
module.exports.listDaGiaoHang = async (email) => {
    return await dbs.production.collection(ORDERS).find({$and:[{email},{giaoHang: true}]}).sort({time: -1}).toArray();
};
module.exports.listHuy = async (email) => {
    return await dbs.production.collection(ORDERS).find({$and: [{email},{huy: true}]}).sort({time: -1}).toArray();
};







module.exports.delete = async (id) => {
    return await dbs.production.collection(ORDERS).updateOne({ _id: ObjectId(id)},{$set:{huy: true}});
};

module.exports.updateAddress = async (id,nguoiNhan,sdtNguoiNhan,diaChiNhan) => {
    return await dbs.production.collection(ORDERS).updateOne({ _id: ObjectId(id)},{$set: {nguoiNhan,sdtNguoiNhan,diaChiNhan}});
};

// module.exports.delete = async (id) => {
//     return await dbs.production.collection(ORDERS).Update({ _id: ObjectId(id)});
// };







exports.detail = detail;