var db = require("./mongodbCollection")

const insert = async () => {
  data={name:"patrick", address:"bulacan"}
  await db.insert(data)
}
const find = async () => {
    await db.find("c")
}
const check = async () => {
    await find()
    console.log("check")
}


check()