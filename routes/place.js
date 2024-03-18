const router = require('express').Router();
let place_Schema = require('../models/place');

router.route('/placesave').post((req, res) => {
    const { name, address, contact, description, category } = req.body;
    const place = new place_Schema({ name, address, contact, description, category});
    place.save()
        .then(() => res.json('Place Add!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route("/updateplace/").put(async (req, res) => {
    const { name, address, contact, description, category } = req.body;

    const place = {
        name, address, contact, description, category
    }
    const update = await place_Schema.findOneAndUpdate({ name: name }, place).then(() => {
        res.status(200).send({ status: "Place Updated" });
    }).catch((err) => {
        console.log(err);
        res.status(500).send({ status: "Error with Updating Data", error: err.message });
    });
});

router.route("/deleteplace/:name").delete(async (req, res) => {
    let name = req.params.name;
    place_Schema.findOneAndDelete({ name: name })
        .then(() => {
            res.status(200).send({ status: "place Deleted" });

        }).catch((err) => {
            console.log(err);
            res.status(500).send({ status: "Error with Deleting Data", error: err.message });
        });
});

router.route("/allplaces").get(async (req, res) => {
    place_Schema.find()
        .then(place => res.json(place))
        .catch(err => res.status(400).json('No Data'))
});

router.route("/places/:name").get(async (req, res) => {
    const name = req.params.name;
    place_Schema.findOne({ name: name })
        .then(place => {
            if (place) {
                res.json(place); // Crew found, send JSON response
            } else {
                res.status(404).json({ error: "Crew not found" }); // Crew not found, send 404 error
            }
        })
        .catch(err => res.status(500).json({ error: "Internal Server Error", message: err.message }));
});


module.exports = router;