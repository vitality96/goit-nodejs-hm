const fs = require('fs').promises;
const path = require('path');
const { v4 } = require('uuid');

const contactsPath = path.join(__dirname, "db/contacts.json");

const listContacts = async () => {
    const data = await fs.readFile(contactsPath);
    const contacts = JSON.parse(data);
    return contacts;
};

const getContactById = async (id) => {
    const contacts = await listContacts();
    const result = contacts.find(contact => contact.id === id);
    if (!result) {
        return null;
    }
    return result;
};

const updateContacts = async (contacts) => {
    await fs.writeFile(contactsPath, JSON.stringify(contacts));
}

const removeContact = async (id) => {
    const contacts = await listContacts();
    const idx = contacts.findIndex(item => item.id === id);
    if (idx === -1) {
        return null;
    }

    const [removeContact] = contacts.splice(idx, 1);
    await updateContacts(contacts);
    return removeContact;
};


const addContact = async (name, email, phone) => {
    const contacts = await listContacts();
    const newContact = { name, email, phone, id: v4() };
    contacts.push(newContact);
    await updateContacts(contacts)
    if (!newContact) {
        return null;
    }
    return newContact;
};

module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact
};

