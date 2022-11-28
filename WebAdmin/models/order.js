const ObjectId = require('mongodb').ObjectId;
const { dbs } = require('../dbs');

const detail = async (id) => {
    const results = await dbs.production.collection('orders').find({_id: ObjectId(id)})
      .toArray();
    return results[0];
};
exports.detail = detail;

module.exports.update_delivered = async (id) => {
   return await dbs.production.collection('orders').updateOne({ _id: ObjectId(id)},{$set: {giaoHang:true}})
};

module.exports.get_delivered = async () => {
    return results = await dbs.production.collection('orders').find({giaoHang:true})
        .toArray();
};

module.exports.delivery = async () => {
    return results = await dbs.production.collection('orders').find({trangThai:false,huy: undefined})
        .toArray();
};

module.exports.get_deliverer = async () => {
    return results = await dbs.production.collection('orders').find({trangThai:true, giaoHang: undefined})
        .toArray();
};

module.exports.update = async (id) => {
    return await dbs.production.collection('orders').updateOne({ _id: ObjectId(id)},{$set: {trangThai:true}});
  };



  module.exports.delete_order = async (id) => {
    return await dbs.production.collection('orders').updateOne({ _id: ObjectId(id)},{$set: {huy: true,date_delete: new Date()}})
 };

 module.exports.get_delete_order = async () => {
    return results = await dbs.production.collection('orders').find({huy: true})
        .toArray();
 };