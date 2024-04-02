const router = require('express').Router();
let chat_Schema = require('../models/chat');

router.route('/addchat').post((req, res) => {
    const { message, mail } = req.body;
    const chat = new chat_Schema({ message, mail });
    chat.save()
        .then(() => res.json('Chat Add!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route("/allchat").get(async (req, res) => {
    chat_Schema.find()
        .then(chat => res.json(chat))
        .catch(err => res.status(400).json('No Data'))
});



module.exports = router;