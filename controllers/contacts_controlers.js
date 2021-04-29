const Contacts = require('../model/contacts_model')

const getAll = async (req, res, next) => {
  try {
    const contacts = await Contacts.getAllContacts()
    res.json({
      status: 'success',
      code: 200,
      data: [
        ...contacts
      ]
    })
  } catch (e) {
    next(e)
  }
}

const getByID = async (req, res, next) => {
  try {
    const contactById = await Contacts.getContactById(req.params.contactId)
    if (contactById.length !== 0) {
      return res.json({
        status: 'success',
        code: 200,
        data: {
          contactById
        }
      })
    } else {
      return res.status(404).json({
        status: 'error',
        code: 404,
        data: { message: 'Not found!!' }
      })
    }
  } catch (e) {
    next(e)
  }
}

const createContact = async (req, res, next) => {
  try {
    const contact = await Contacts.addContact(req.body)
    return res.status(201).json({
      status: 'success',
      code: 201,
      data: {
        contact
      }
    })
  } catch (e) {
    next(e)
  }
}

const deleteContact = async (req, res, next) => {
  try {
    const contactById = await Contacts.removeContact(req.params.contactId)
    if (contactById) {
      return res.json({
        status: 'success',
        code: 200,
        data: { message: 'contact deleted' }
      })
    } else {
      return res.status(404).json({
        status: 'error',
        code: 404,
        data: { message: 'Not found!!' }
      })
    }
  } catch (e) {
    next(e)
  }
}

const updateContact = async (req, res, next) => {
  try {
    const contactById = await Contacts.updateContact(req.params.contactId, req.body)
    if (contactById) {
      return res.json({
        status: 'success',
        code: 200,
        data: { message: 'contact Updated!!!' }
      })
    } else {
      return res.status(404).json({
        status: 'error',
        code: 404,
        data: { message: 'Not found!!' }
      })
    }
  } catch (e) {
    next(e)
  }
}
module.exports = {
  createContact,
  getAll,
  getByID,
  updateContact,
  deleteContact,
}
