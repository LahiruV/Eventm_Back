const router = require('express').Router();
let package_Schema = require('../models/package');

router.route('/addpackage').post((req, res) => {
    const { code, price, items, name, date } = req.body;
    const package = new package_Schema({ code, price, items, name, date });
    package.save()
        .then(() => res.json('package Add!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route("/updatepackage/").put(async (req, res) => {
    const { code, price, items, name, date } = req.body;

    const package = {
        code, price, items, name, date
    }
    const update = await package_Schema.findOneAndUpdate({ code: code }, package).then(() => {
        res.status(200).send({ status: "package Updated" });
    }).catch((err) => {
        console.log(err);
        res.status(500).send({ status: "Error with Updating Data", error: err.message });
    });
});

router.route("/deletepackage/:code").delete(async (req, res) => {
    let code = req.params.code;
    package_Schema.findOneAndDelete({ code: code })
        .then(() => {
            res.status(200).send({ status: "package Deleted" });

        }).catch((err) => {
            console.log(err);
            res.status(500).send({ status: "Error with Deleting Data", error: err.message });
        });
});

router.route("/allpackage").get(async (req, res) => {
    package_Schema.find()
        .then(package => res.json(package))
        .catch(err => res.status(400).json('No Data'))
});




module.exports = router;