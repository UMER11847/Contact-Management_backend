const express = require("express");
const router = express.Router()
const { getContacts, postContacts, putContacts, getContact, deleteContacts} = require("../controllers/contactControllers");


router.route( "/" ).get(getContacts);

router.route("/").post(postContacts);

router.route( "/:id" ).put(putContacts);

router.route( "/:id" ).get(getContact);

router.route( "/:id" ).delete(deleteContacts);


module.exports = router