const router = require('express').Router();
let nailpedicare_Schema = require('../models/nailpedicare');

router.route('/addnailpedicare').post((req, res) => {
    const { name, price, date, type } = req.body;

    const nailpedicare = new nailpedicare_Schema({ name, price, date, type });
    nailpedicare.save()
        .then(() => res.json('Package Add!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route("/allnailpedicare").get(async (req, res) => {
    nailpedicare_Schema.find()
        .then(nailpedicare => res.json(nailpedicare))
        .catch(err => res.status(400).json('No Data'))
});

router.route("/updatenailpedicare/").put(async (req, res) => {
    const { name, price, date, type, editname } = req.body;

    const nailpedicare = {
        name, price, date, type
    }
    const update = await nailpedicare_Schema.findOneAndUpdate({ name: editname }, nailpedicare).then(() => {
        res.status(200).send({ status: "Package Updated" });
    }).catch((err) => {
        console.log(err);
        res.status(500).send({ status: "Error with Updating Data", error: err.message });
    });
});

router.route("/deletenailpedicare/:name").delete(async (req, res) => {
    let name = req.params.name;

    nailpedicare_Schema.findOneAndDelete({ name: name })
        .then(() => {
            res.status(200).send({ status: "Package Deleted" });

        }).catch((err) => {
            console.log(err);
            res.status(500).send({ status: "Error with Deleting Data", error: err.message });
        });

});

router.route("/allnailpedicare/:searchName").get(async (req, res) => {
    nailpedicare_Schema.find({ type: req.params.searchName })
        .then(nailpedicare => res.json(nailpedicare))
        .catch(err => res.status(400).json('No Data'))
});



module.exports = router;