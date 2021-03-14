const fs = require('fs').promises
const { v4: uuid } = require('uuid')
const path = require('path')

const contactsPath = path.join(__dirname, 'contacts.json')

console.log(contactsPath, '<= contactsPath')

const listContacts = async () => {
  try {
    const res = await fs.readFile(contactsPath)
    return JSON.parse(res)
  } catch (error) {
    console.log(error)
  }
}

const getContactById = async (contactId) => {
  try {
    const res = await fs.readFile(contactsPath)
    // if(contactId !== typeof String)
    const findContact = JSON.parse(res).find(
      (contact) => String(contact.id) === contactId
    )
    if (findContact === undefined) {
      console.log(`Your id:${contactId} not found!`)
    }
    // console.log(findContact)
    return findContact
  } catch (error) {
    console.log(error)
  }
}

const removeContact = async (contactId) => {
  try {
    const res = await fs.readFile(contactsPath)
    const dataArr = JSON.parse(res)
    const contact = dataArr.find((el) => String(el.id) === contactId)
    const contacts = dataArr.filter((contact) => String(contact.id) !== contactId)

    if (contacts.length !== dataArr.length) {
      fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2))
      return contact
      // console.log(`Contact with id: ${contactId} removed!`)
    } else {
      console.log(`Id:${contactId} not found!`)
      return null
    }
  } catch (error) {
    console.log(error)
  }
}

const addContact = async (body) => {
  try {
    const res = await fs.readFile(contactsPath)
    const contacts = JSON.parse(res)
    const id = uuid()
    const newContact = {
      id,
      ...body,
    }
    contacts.push(newContact)

    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2))
    return newContact
  } catch (error) {
    console.log(error)
  }
}

const updateContact = async (contactId, body) => {
  try {
    const res = await fs.readFile(contactsPath)
    const contacts = JSON.parse(res)
    const findContact = contacts.find((contact) => String(contact.id) === contactId)
    const update = { ...findContact, ...body }
    console.log(findContact, update)
    contacts.push(update)

    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2))
    return update
  } catch (error) {
    console.log(error)
  }
}
// updateContact(3, { name: 'Yura Yretc' })
module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
