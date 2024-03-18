const router = require('express').Router();
let eventReq_Schema = require('../models/eventReq');

router.route('/addEventReq').post((req, res) => {
    const { uniqueId, email, eventDate, eventTime, expectedGuests, eventType, venueDescription, venuePreference, accessibilityRequirements, staffRequired, estimatedBudgetRange, sponsorshipOpportunities, vendorsNeeded, numVendorBooths } = req.body;
    const eventRequest = new eventReq_Schema({
        uniqueId,
        email,
        eventDate,
        eventTime,
        expectedGuests,
        eventType,
        venueDescription,
        venuePreference,
        accessibilityRequirements,
        staffRequired,
        estimatedBudgetRange,
        sponsorshipOpportunities,
        vendorsNeeded,
        numVendorBooths
    });
    eventRequest.save()
        .then(() => res.json('Event Request Added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});


// router.route("/updateAppointment/").put(async (req, res) => {
//     const { username, name, email, phoneNo, nIC, date, paackage, time, userName } = req.body;

//     const appointment = {
//         name, email, phoneNo, nIC, date, paackage, time, userName
//     }
//     const update = await appointment_Schema.findOneAndUpdate({ name: username }, appointment).then(() => {
//         res.status(200).send({ status: "Appointment Updated" });
//     }).catch((err) => {
//         console.log(err);
//         res.status(500).send({ status: "Error with Updating Data", error: err.message });
//     });
// });

// router.route("/deleteAppointment/:name").delete(async (req, res) => {
//     let name = req.params.name;

//     appointment_Schema.findOneAndDelete({ name: name })
//         .then(() => {
//             res.status(200).send({ status: "Appoiment Deleted" });

//         }).catch((err) => {
//             console.log(err);
//             res.status(500).send({ status: "Error with Deleting Data", error: err.message });
//         });
// });

router.route("/allEventReq").get(async (req, res) => {
    eventReq_Schema.find()
        .then(eventRequest => res.json(eventRequest))
        .catch(err => res.status(400).json('No Data'))
});

// router.route("/allappointment/:userName").get(async (req, res) => {
//     const userName = (req.params.userName)
//     appointment_Schema.find({ userName: userName })
//         .then(appointment => res.json(appointment))
//         .catch(err => res.status(400).json('No Data'))
// });


module.exports = router;