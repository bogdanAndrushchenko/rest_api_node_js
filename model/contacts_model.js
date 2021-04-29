const Contacts = require('./schemas/contacts_schemas')

const addContact = async (body) => {
  const result = await Contacts.create(body)
  return result
}
const getAllContacts = async () => {
  const res = await Contacts.find({})
  return res
}

const getContactById = async (contactId) => {
  const res = await Contacts.find({ _id: contactId })
  return res
}

const updateContact = async (contactId, body) => {
  const res = await Contacts.findOneAndUpdate(
    { _id: contactId },
    { ...body },
    { new: true }
  )
  return res
}

const removeContact = async (contactId) => {
  const res = await Contacts.findOneAndDelete({ _id: contactId },)
  return res
}

module.exports = {
  addContact,
  getAllContacts,
  getContactById,
  updateContact,
  removeContact,
}
