const router = require('express').Router();
let dress_Schema = require('../models/dress');

router.route('/adddress').post((req, res) => {
    const { code, price, category, size, color, picture, status } = req.body;
    const dress = new dress_Schema({ code, price, category, size, color, picture, status });
    dress.save()
        .then(() => res.json('Dress Add!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route("/updatedress/").put(async (req, res) => {
    const { code, price, category, size, color, picture } = req.body;
    const status = req.body.estatus;

    const dress = {
        code, price, category, size, color, picture, status
    }
    const update = await dress_Schema.findOneAndUpdate({ code: code }, dress).then(() => {
        res.status(200).send({ status: "Dress Updated" });
    }).catch((err) => {
        console.log(err);
        res.status(500).send({ status: "Error with Updating Data", error: err.message });
    });
});

router.route("/deletedress/:code").delete(async (req, res) => {
    let code = req.params.code;
    dress_Schema.findOneAndDelete({ code: code })
        .then(() => {
            res.status(200).send({ status: "Dress Deleted" });

        }).catch((err) => {
            console.log(err);
            res.status(500).send({ status: "Error with Deleting Data", error: err.message });
        });
});

router.route("/alldress").get(async (req, res) => {
    dress_Schema.find()
        .then(dress => res.json(dress))
        .catch(err => res.status(400).json('No Data'))
});



module.exports = router;