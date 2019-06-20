const express = require('express')
const router = express.Router();


//@route "GET" api/contacts
//@desc   Get all contacts
//@access Private      
router.get('/', (req, res) => {
    res.send('Call for all contacts')
});

//@route "POST" api/contacts
//@desc   Create a contact
//@access Private      
router.post('/', (req, res) => {
    res.send('create a contact')
});

//@route "Put" api/contacts/:id
//@desc  Update a current contact
//@access Private      
router.put('/:id', (req, res) => {
    res.send('Update a contact')
});

//@route "DELETE" api/contacts/:id
//@desc   Delete a contact
//@access Private      
router.delete('/:id', (req, res) => {
    res.send('Delete a contact')
});

module.exports = router;