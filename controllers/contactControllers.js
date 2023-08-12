const Contact = require("../model/contactModel")
const asyncHandler = require("express-async-handler")
//@desc Get all contact
//@route GET/api/contacts
//@access public
const getContacts = asyncHandler(async(req, res) => {
    const contacts = await Contact.find()
    res.json(contacts)
});


//@desc create contact
//@route POST/api/contacts/:id
//@access public
const postContacts =asyncHandler(async(req, res) => {
    console.log("The request body is :", req.body);
    const {name,email, phone,} = req.body
    if (!name || !email || !phone ){
        res.status(400)
        throw new Error ("all fields are mendatory")
    }
    const contact = Contact.create({
        name,
        email,
        phone, 
    })
    res.status(201).json(contact)
});

//@desc get particular contact by id
//@route GET/api/contacts/:id
//@access public
const getContact = asyncHandler(async (req, res) => {
    const contact =await Contact.findById(req.params.id)
    if(!contact){
        res.status(404);
        throw new Error  ("contact not found");
    }
    res.status(200).json(contact)
});

//@desc uptade contacts
//@route PUT/api/contacts/:id
//@access public
const putContacts = asyncHandler(async(req, res) => {
    const contact =await Contact.findById(req.params.id)
    if(!contact){
        res.status(404);
        throw new Error  ("contact not found");
    }
    const uptadeContact = await contact.findByIdAndUptade(
        req.params.id,
        req.body,
        {new: true}
    )
    res.status(201).json(uptadeContact)
});

//@desc delete contact
//@route DELETE/api/contacts/:id
//@access public
const deleteContacts =asyncHandler(async(req, res) => {
    const contact =await Contact.findById(req.params.id)
    if(!contact){
        res.status(404);
        throw new Error  ("contact not found");
    }
    await Contact.remove();
    res.status(201).json(contact)
});



module.exports = {getContacts, postContacts, putContacts, deleteContacts,getContact };