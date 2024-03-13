const router = require('express').Router();
let haircare_Schema = require('../models/haircare');

router.route('/addhaircare').post((req, res) => {
    const { name, price, date, type } = req.body;

    const haircare = new haircare_Schema({ name, price, date, type });
    haircare.save()
        .then(() => res.json('Package Add!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route("/allhaircare").get(async (req, res) => {
    haircare_Schema.find()
        .then(haircare => res.json(haircare))
        .catch(err => res.status(400).json('No Data'))
});

router.route("/updatehaircare/").put(async (req, res) => {
    const { name, price, date, type, editname } = req.body;

    const haircare = {
        name, price, date, type
    }
    const update = await haircare_Schema.findOneAndUpdate({ name: editname }, haircare).then(() => {
        res.status(200).send({ status: "Package Updated" });
    }).catch((err) => {
        console.log(err);
        res.status(500).send({ status: "Error with Updating Data", error: err.message });
    });
});

router.route("/deletehaircare/:name").delete(async (req, res) => {
    let name = req.params.name;

            haircare_Schema.findOneAndDelete({ name: name })
                .then(() => {
                    res.status(200).send({ status: "Package Deleted" });

                }).catch((err) => {
                    console.log(err);
                    res.status(500).send({ status: "Error with Deleting Data", error: err.message });
                });
});

router.route("/allhaircare/:searchName").get(async (req, res) => {
    haircare_Schema.find({ type: req.params.searchName })
        .then(haircare => res.json(haircare))
        .catch(err => res.status(400).json('No Data'))
});



module.exports = router;