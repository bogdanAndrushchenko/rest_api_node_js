const express = require('express')
const router = express.Router()

const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require('../../model/index')
// const { validCreateContact, validUpdateContact } = require('./validation')

router.get('/', async (req, res, next) => {
  try {
    const contacts = await listContacts()
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
})

router.get('/:contactId', async (req, res, next) => {
  try {
    const contactById = await getContactById(req.params.contactId)
    if (contactById) {
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
})

router.post('/', async (req, res, next) => {
  try {
    const contact = await addContact(req.body)
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
})

router.delete('/:contactId', async (req, res, next) => {
  try {
    const contactById = await removeContact(req.params.contactId)
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
})

router.patch('/:contactId', async (req, res, next) => {
  try {
    const contactById = await updateContact(req.params.contactId, req.body)
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
})

// res.json({ message: 'template message' })
module.exports = router
