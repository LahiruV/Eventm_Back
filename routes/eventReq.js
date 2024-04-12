const router = require('express').Router();
let eventReq_Schema = require('../models/eventReq');

router.route('/addEventReq').post((req, res) => {
    const { uniqueId, email, eventDate, eventTime, expectedGuests, eventType, venueDescription, venuePreference, accessibilityRequirements, staffRequired, estimatedBudgetRange, status } = req.body;
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
        status
    });
    eventRequest.save()
        .then(() => res.json('Event Request Added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route("/updateEventReq/").put(async (req, res) => {
    const { uniqueId, email, eventDate, eventTime, expectedGuests, eventType, venueDescription, venuePreference, accessibilityRequirements, staffRequired, estimatedBudgetRange, status } = req.body;
    const eventRequest = {
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
        status
    }
    const update = await eventReq_Schema.findOneAndUpdate({ uniqueId: uniqueId }, eventRequest).then(() => {
        res.status(200).send({ status: "Event Request Updated" });
    }).catch((err) => {
        console.log(err);
        res.status(500).send({ status: "Error with Updating Data", error: err.message });
    });
});

router.route("/deleteEventReq/:id").delete(async (req, res) => {
    const id = req.params.id;
    await eventReq_Schema.findOneAndDelete({ uniqueId: id }).then(() => {
        res.status(200).send({ status: "Event Request Deleted" });
    }).catch((err) => {
        console.log(err);
        res.status(500).send({ status: "Error with Deleting Data", error: err.message });
    });
});

router.route("/allEventReq").get(async (req, res) => {
    eventReq_Schema.find()
        .then(eventRequest => res.json(eventRequest))
        .catch(err => res.status(400).json('No Data'))
});

router.route("/availability").get(async (req, res) => {
    const availability = await eventReq_Schema.find({
        staffRequired:req.body.staffName,
        eventDate:req.body.eventDate,
        status:'Accepted'
    })

    if(availability){
        res.status(400).json('Date is Booked Already')
    }
    res.status(400).json('You can book an event for this date')
});


module.exports = router;