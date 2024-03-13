const router = require('express').Router();
let appointment_Schema = require('../models/appointment');

router.route('/addAppointment').post((req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const phoneNo = req.body.phoneNo;
    const nIC = req.body.nIC;
    const date = req.body.date;
    const paackage = req.body.paackage;
    const time = req.body.time;
    const userName = req.body.userName;

    const appointment = new appointment_Schema({ name, email, phoneNo, nIC, date, paackage, time, userName });
    appointment.save()
        .then(() => res.json('Appointment Add!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route("/updateAppointment/").put(async (req, res) => {
    const { username, name, email, phoneNo, nIC, date, paackage, time, userName } = req.body;

    const appointment = {
        name, email, phoneNo, nIC, date, paackage, time, userName
    }
    const update = await appointment_Schema.findOneAndUpdate({ name: username }, appointment).then(() => {
        res.status(200).send({ status: "Appointment Updated" });
    }).catch((err) => {
        console.log(err);
        res.status(500).send({ status: "Error with Updating Data", error: err.message });
    });
});

router.route("/deleteAppointment/:name").delete(async (req, res) => {
    let name = req.params.name;

    appointment_Schema.findOneAndDelete({ name: name })
        .then(() => {
            res.status(200).send({ status: "Appoiment Deleted" });

        }).catch((err) => {
            console.log(err);
            res.status(500).send({ status: "Error with Deleting Data", error: err.message });
        });
});

router.route("/allappointment").get(async (req, res) => {
    appointment_Schema.find()
        .then(appointment => res.json(appointment))
        .catch(err => res.status(400).json('No Data'))
});

router.route("/allappointment/:userName").get(async (req, res) => {
    const userName = (req.params.userName)
    appointment_Schema.find({ userName: userName })
        .then(appointment => res.json(appointment))
        .catch(err => res.status(400).json('No Data'))
});


module.exports = router;