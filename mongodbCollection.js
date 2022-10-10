var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://127.0.0.1:27017/";

module.exports = {
    insert: (data) => {
        return new Promise((resolve, reject) => {
            MongoClient.connect(url, function (err, db) {
                if (err) throw err;
                    var dbo = db.db("mydb");
                    var myobj = { name: data.name, address: data.address };
                    dbo.collection("customers").insertOne(myobj, function (err, res) {
                        if (err) {
                            reject(err)
                        } else {
                            resolve(console.log("1 document inserted"))
                        }
                      db.close();
                  });
              })
          })
    },
    find:(data) => {
        return new Promise((resolve, reject) => {
            MongoClient.connect(url, function (err, db) {
                if (err) throw err;
                var dbo = db.db("mydb");
                dbo.collection("customers").find({ name: {$regex: data, $options:'i'}}).toArray(function (err, result) {
                    if (err) {
                        reject(err)
                    } else {
                        resolve(console.log(result))
                    }
                    db.close();
                });
            });
        })
    },
  delete: (data) => {
      
  }
}
