const router = require('express').Router();
let crew_Schema = require('../models/crew');

router.route('/crewsave').post((req, res) => {
    const { name, gender, contact, from, cost, category } = req.body;
    const crew = new crew_Schema({ name, gender, contact, from, cost, category});
    crew.save()
        .then(() => res.json('Crew Add!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route("/updatecrew/").put(async (req, res) => {
    const { name, gender, contact, from, cost, category } = req.body;

    const crew = {
        name, gender, contact, from, cost, category
    }
    const update = await crew_Schema.findOneAndUpdate({ name: name }, crew).then(() => {
        res.status(200).send({ status: "Crew Updated" });
    }).catch((err) => {
        console.log(err);
        res.status(500).send({ status: "Error with Updating Data", error: err.message });
    });
});

router.route("/deletecrew/:name").delete(async (req, res) => {
    let name = req.params.name;
    crew_Schema.findOneAndDelete({ name: name })
        .then(() => {
            res.status(200).send({ status: "Crew Deleted" });

        }).catch((err) => {
            console.log(err);
            res.status(500).send({ status: "Error with Deleting Data", error: err.message });
        });
});

router.route("/allcrew").get(async (req, res) => {
    crew_Schema.find()
        .then(crew => res.json(crew))
        .catch(err => res.status(400).json('No Data'))
});

router.route("/crews/:name").get(async (req, res) => {
    const name = req.params.name;
    crew_Schema.findOne({ name: name })
        .then(crew => {
            if (crew) {
                res.json(crew); // Crew found, send JSON response
            } else {
                res.status(404).json({ error: "Crew not found" }); // Crew not found, send 404 error
            }
        })
        .catch(err => res.status(500).json({ error: "Internal Server Error", message: err.message }));
});


module.exports = router;