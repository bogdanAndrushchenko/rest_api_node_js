const fs = require("fs").promises;
const path = require("path");

const contactsPath = path.join(__dirname, "model", "test.json");

console.log(contactsPath, "<= contactsPath");

const listContacts = async () => {
    try {
        const res = await fs.readFile(contactsPath);
        console.table(JSON.parse(res));
    } catch (error) {
        console.log(error);
    }
};

const getContactById = async (contactId) => {
    try {
        const res = await fs.readFile(contactsPath);
        const findContact = JSON.parse(res).find(
            (contact) => contact.id === contactId
        );
        if (findContact === undefined) {
            console.log(`Your id:${contactId} not found!`);
        }
        console.log(findContact);
        // return findContact
    } catch (error) {
        console.log(error);
    }
};

const removeContact = async (contactId) => {
    try {
        const res = await fs.readFile(contactsPath);
        const dataArr = JSON.parse(res);

        const contacts = dataArr.filter((contact) => contact.id !== contactId);

        if (contacts.length !== dataArr.length) {
            fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

            console.log(`Contact with id: ${contactId} removed!`);
        } else {
            console.log(`Id:${contactId} not found!`);
            return;
        }
    } catch (error) {
        console.log(error);
    }
};

const addContact = async (name, email, phone) => {
    try {
        const res = await fs.readFile(contactsPath);
        const contacts = JSON.parse(res);
        const newContact = {id: contacts.length + 1, name, email, phone};
        contacts.push(newContact);

        fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

        console.log("Your contact added!");
    } catch (error) {
        console.log(error);
    }
};

module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact,
};
