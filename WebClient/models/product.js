const ObjectId = require('mongodb').ObjectId;
const { dbs } = require('../dbs');

const detail = async (id) => {
  const results = await dbs.production.collection('products').find({_id: ObjectId(id)})
    .toArray();
  return results[0];
};
exports.detail = detail;




//
const count = async() => {
  return await dbs.production.collection('products').find().count();
}
exports.count=count;

// count1 theo loai
const count1 = async(loai) => {
  return await dbs.production.collection('products').find({loai}).count();
}
exports.count1=count1;


// product all
module.exports.list = async () => {
  return await dbs.production.collection('products').find().toArray();
};

module.exports.list1 = async (productInPage,n) => {
  return await dbs.production.collection('products').find().limit(productInPage).skip(productInPage*n).toArray();
};


// sort all
module.exports.list1Asc = async (productInPage,n) => {
  return await dbs.production.collection('products').find().sort({gia: 1}).limit(productInPage).skip(productInPage*n).toArray();
};
module.exports.list1Desc = async (productInPage,n) => {
  return await dbs.production.collection('products').find().sort({gia: -1}).limit(productInPage).skip(productInPage*n).toArray();
};
module.exports.list1Date = async (productInPage,n) => {
  return await dbs.production.collection('products').find().sort({_id:-1}).limit(productInPage).skip(productInPage*n).toArray();
};




// product theo loai
module.exports.category = async (loai,productInPage,n) => {
  return await dbs.production.collection('products').find({loai}).limit(productInPage).skip(productInPage*n).toArray();
};

module.exports.categoryAsc = async (loai,productInPage,n) => {
  return await dbs.production.collection('products').find({loai}).sort({gia: 1}).limit(productInPage).skip(productInPage*n).toArray();
};
module.exports.categoryDesc = async (loai,productInPage,n) => {
  return await dbs.production.collection('products').find({loai}).sort({gia: -1}).limit(productInPage).skip(productInPage*n).toArray();
};
module.exports.categoryDate = async (loai,productInPage,n) => {
  return await dbs.production.collection('products').find({loai}).sort({_id:-1}).limit(productInPage).skip(productInPage*n).toArray();
};



//

module.exports.category1 = async (loai) => {
  return await dbs.production.collection('products').find({loai}).toArray();
};





// search
module.exports.search = async (key,productInPage,n) => {
  await dbs.production.collection('products').createIndex( { ten: "text", loai: "text", gia: "text", manHinh: "text", rom: "text" } );
  return await dbs.production.collection('products').find({$text:{$search:key}}).limit(productInPage).skip(productInPage*n).toArray();
};

const countSearch = async (key) => {
  await dbs.production.collection('products').createIndex( { ten: "text", loai: "text", gia: "text", manHinh: "text", rom: "text" } );
  return await dbs.production.collection('products').find({$text:{$search:key}}).count();
};
exports.countSearch=countSearch;
// search test

// module.exports.searchTest = async (key,productInPage,n) => {
//   await dbs.production.collection('products').createIndex( {ten: 1 } );
//   return await dbs.production.collection('products').find({ ten : key },{title: 1}).limit(productInPage).skip(productInPage*n).toArray();
// };

// const countSearchTest = async (key) => {
//   await dbs.production.collection('products').createIndex( {ten: 1 } );
//   return await dbs.production.collection('products').find({ ten : key },{title: 1}).count();
// };
// exports.countSearchTest=countSearchTest;


// search









// search new date
module.exports.searchDate = async (key,productInPage,n) => {
  await dbs.production.collection('products').createIndex( { ten: "text", loai: "text", gia: "text", manHinh: "text", rom: "text" } );
  return await dbs.production.collection('products').find({$text:{$search:key}}).sort({_id:-1}).limit(productInPage).skip(productInPage*n).toArray();
};

const countSearchDate = async (key) => {
  await dbs.production.collection('products').createIndex( { ten: "text", loai: "text", gia: "text", manHinh: "text", rom: "text" } );
  return await dbs.production.collection('products').find({$text:{$search:key}}).count();
};
exports.countSearchDate=countSearchDate;


// search asc
module.exports.searchAsc = async (key,productInPage,n) => {
  await dbs.production.collection('products').createIndex( { ten: "text", loai: "text", gia: "text", manHinh: "text", rom: "text" } );
  return await dbs.production.collection('products').find({$text:{$search:key}}).sort({gia: 1}).limit(productInPage).skip(productInPage*n).toArray();
};

const countSearchAsc = async (key) => {
  await dbs.production.collection('products').createIndex( { ten: "text", loai: "text", gia: "text", manHinh: "text", rom: "text" } );
  return await dbs.production.collection('products').find({$text:{$search:key}}).count();
};
exports.countSearchAsc=countSearchAsc;



// search desc
module.exports.searchDesc = async (key,productInPage,n) => {
  await dbs.production.collection('products').createIndex( { ten: "text", loai: "text", gia: "text", manHinh: "text", rom: "text" } );
  return await dbs.production.collection('products').find({$text:{$search:key}}).sort({gia: -1}).limit(productInPage).skip(productInPage*n).toArray();
};

const countSearchDesc = async (key) => {
  await dbs.production.collection('products').createIndex( { ten: "text", loai: "text", gia: "text", manHinh: "text", rom: "text" } );
  return await dbs.production.collection('products').find({$text:{$search:key}}).count();
};
exports.countSearchDesc=countSearchDesc;




// update so luong kho khi dat hang
module.exports.updateSoLuong = async (id,soluongmua) => {
  await dbs.production.collection('products').updateOne({_id: ObjectId(id)},{ $inc: { soLuong: -soluongmua }});
};
// update so luong kho khi huy don 
module.exports.updateSoLuongHuy = async (id,soluongmua) => {
  await dbs.production.collection('products').updateOne({_id: ObjectId(id)},{ $inc: { soLuong: +soluongmua }});
};