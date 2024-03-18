const router = require('express').Router();
let sponsor_Schema = require('../models/sponsor');

router.route('/sponsorsave').post((req, res) => {
    const { name, address, contact, description, category } = req.body;
    const sponsor = new sponsor_Schema({ name, address, contact, description, category});
    sponsor.save()
        .then(() => res.json('Sponsor Add!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route("/updatesponsor/:id").put(async (req, res) => {
    const sponsorId = req.params.id;
    const { name, address, contact, description, category } = req.body;

    const updatedFields = {
        name, address, contact, description, category
    };

    try {
        const updatedSponsor = await sponsor_Schema.findByIdAndUpdate(sponsorId, updatedFields, { new: true });

        if (!updatedSponsor) {
            return res.status(404).send({ status: "Sponsor not found" });
        }

        res.status(200).send({ status: "Sponsor Updated", data: updatedSponsor });
    } catch (err) {
        console.error(err);
        res.status(500).send({ status: "Error with Updating Data", error: err.message });
    }
});


router.route("/deletesponsor/:id").delete(async (req, res) => {
    const sponsorId = req.params.id;

    try {
        const deletedSponsor = await sponsor_Schema.findByIdAndDelete(sponsorId);

        if (!deletedSponsor) {
            return res.status(404).send({ status: "Sponsor not found" });
        }

        res.status(200).send({ status: "Sponsor Deleted" });
    } catch (err) {
        console.error(err);
        res.status(500).send({ status: "Error with Deleting Data", error: err.message });
    }
});


router.route("/allsponsors").get(async (req, res) => {
    sponsor_Schema.find()
        .then(place => res.json(place))
        .catch(err => res.status(400).json('No Data'))
});

router.route("/sponsors/:id").get(async (req, res) => {
    const sponsorId = req.params.id;

    try {
        const sponsor = await sponsor_Schema.findById(sponsorId);

        if (sponsor) {
            res.json(sponsor); // Sponsor found, send JSON response
        } else {
            res.status(404).json({ error: "Sponsor not found" }); // Sponsor not found, send 404 error
        }
    } catch (err) {
        res.status(500).json({ error: "Internal Server Error", message: err.message }); // Internal server error
    }
});



module.exports = router;