const db = require('./db')
const { ObjectID } = require('mongodb')

const getCollection = async (db, name) => {
  const client = await db
  const collection = await client.db().collection(name)
  return collection
}

const addContact = async (body) => {
  const record = {
    ...body,
    ...(body.favorite ? {} : { favorite: false })
  }
  const collection = await getCollection(db, 'contacts')
  const { ops: [result] } = await collection.insertOne(record)
  return result
}
const listContacts = async () => {
  const collection = await getCollection(db, 'contacts')
  const res = await collection.find({}).toArray()
  return res // db.get('contacts').value()// JSON.parse(res)
}

const getContactById = async (contactId) => {
  const collection = await getCollection(db, 'contacts')
  const objId = new ObjectID(contactId)
  console.log(objId.getTimestamp())
  const [res] = await collection.find({ _id: objId }).toArray()
  return res
}

const updateContact = async (contactId, body) => {
  const collection = await getCollection(db, 'contacts')
  const objId = new ObjectID(contactId)
  const { value: res } = await collection.findOneAndUpdate(
    { _id: objId },
    { $set: body },
    { returnOriginal: false }
  )
  return res
}

const removeContact = async (contactId) => {
  const collection = await getCollection(db, 'contacts')
  const objId = new ObjectID(contactId)
  const res = await collection.findOneAndDelete({ _id: objId },)
  return res
}

module.exports = {
  addContact,
  listContacts,
  getContactById,
  updateContact,
  removeContact,
}
