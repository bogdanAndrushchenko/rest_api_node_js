const express = require('express')
const router = express.Router()

const contactController = require('../../controllers/contacts_controlers')
const { validCreateContact, validUpdateContact, validUpdateStatusContact } = require('./validation')

router.get('/', contactController.getAll)
  .post('/', validCreateContact, contactController.createContact)

router.get('/:contactId', contactController.getByID)
  .delete('/:contactId', contactController.deleteContact)
  .put('/:contactId', validUpdateContact, contactController.updateContact)
  .patch('/:contactId', validUpdateStatusContact, contactController.updateContact)

module.exports = router
