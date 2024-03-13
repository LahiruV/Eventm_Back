const router = require('express').Router();
let leaves_Schema = require('../models/leaves');

router.route('/addleave').post((req, res) => {
    const { uniqueId, userName, fromDate, toDate } = req.body;
    const leaves = new leaves_Schema({ uniqueId, userName, fromDate, toDate });
    leaves.save()
        .then(() => res.json('Staff Leave Add!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route("/updateleave/").put(async (req, res) => {
    const { editID, userName, fromDate, toDate } = req.body;
    const uniqueId = editID
    const leaves = {
        uniqueId, userName, fromDate, toDate
    }
    const update = await leaves_Schema.findOneAndUpdate({ uniqueId: uniqueId }, leaves).then(() => {
        res.status(200).send({ status: "Staff Leave Updated" });
    }).catch((err) => {
        console.log(err);
        res.status(500).send({ status: "Error with Updating Data", error: err.message });
    });
});

router.route("/deleteleave/:code").delete(async (req, res) => {
    let uniqueId = req.params.code;
    leaves_Schema.findOneAndDelete({ uniqueId: uniqueId })
        .then(() => {
            res.status(200).send({ status: "Deleted" });

        }).catch((err) => {
            console.log(err);
            res.status(500).send({ status: "Error with Deleting Data", error: err.message });
        });
});

router.route("/allleave").get(async (req, res) => {
    leaves_Schema.find()
        .then(leaves => res.json(leaves))
        .catch(err => res.status(400).json('No Data'))
});

router.route("/allleave/:userName").get(async (req, res) => {
    const userName = (req.params.userName)
    leaves_Schema.find({ userName: userName })
        .then(leaves => res.json(leaves))
        .catch(err => res.status(400).json('No Data'))
});


module.exports = router;