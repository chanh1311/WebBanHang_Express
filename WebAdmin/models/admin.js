const ObjectId = require('mongodb').ObjectId;
const { dbs } = require('../dbs');
const bcrypt = require('bcrypt');
const SALT_ROUNDS = 10;

module.exports.add = async (admin) => {
    return await dbs.production.collection('admins').insertOne(admin);
  };

  module.exports.list = async () => {
    return results = await dbs.production.collection('admins').find()
      .toArray();
};



const get = async(username) => {
  return await dbs.production.collection('admins').findOne({ username});
};
exports.get = get;



exports.validPassword = async(username, password) => {
  const hash = await bcrypt.hash(password, SALT_ROUNDS);
  const user = await get(username);
  if (!user)
      return false;
  return await bcrypt.compare(password, user.password);
};


module.exports.remove= async (id) => {
  return await dbs.production.collection('admins').deleteOne( {"_id": ObjectId(id)});
};



module.exports.update = async(username, user) => {
  return await dbs.production.collection('admins').updateOne({ username }, { $set: user });
};




