const systemReg = require('../models/systemReg');
const customerProfile = require('../models/customerProfile');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const express = require('express');
const router = express.Router();


router.post('/register', async (req, res) => {
    try {
        const { firstName, lastName, email, password, userType } = req.body;
        const hashedPass = await bcrypt.hash(password, 10);

        const existingUser = await customerProfile.findOne({ email });
        if (existingUser) {
            return res.json({
                message: 'Email is Already Used'
            })
        }

        const cProfile = new customerProfile({
            firstName,
            lastName,
            email,
            password: hashedPass,
            userType,
        });

        await cProfile.save();
        return res.json({ message: 'Customer Added' });

    } catch (error) {
        console.log(error);
        res.status(500).send('Error registering user');
    }
});


router.post('/login', async (req, res) => {

    const { email, password } = req.body;

    try {
        const user = await customerProfile.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: false });
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password);

        if (!isPasswordMatch) {
            return res.status(400).json({ message: false });
        }

        const userTypeSearch = await customerProfile.find({ email, status: 'Approved' });

        if (!userTypeSearch) {
            return res.status(400).json({ message: false });
        }

        return res.status(200).json({ message: true });

    } catch (error) {
        console.log(error);
        res.status(500).send('Error logging in');
    }
});


router.route("/viewUserProfie/:username").get(async (req, res) => {
    const username = req.params.username;
    customerProfile.find({ email: username })
        .then(user => res.json(user))
        .catch(err => res.status(400).json('No Data'))
});

router.route("/deleteuser/:username").delete(async (req, res) => {
    const username = req.params.username;
    customerProfile.findOneAndDelete({ email: username })
        .then(() => {
            res.status(200).send({ status: "User Deleted" });

        }).catch((err) => {
            console.log(err);
            res.status(500).send({ status: "Error with Deleting Data", error: err.message });
        });
});



router.route('/registerAdmin').post(async (req, res, next) => {
    try {
        const existingUser = await systemReg.findOne({ email: req.body.email });
        if (existingUser) {
            return res.json({
                message: 'Email is Already Used'
            })
        }
        const hashedPass = await bcrypt.hash(req.body.password, 10);
        let systemreg = new systemReg({
            userName: req.body.userName,
            email: req.body.email,
            password: hashedPass,
            phone: req.body.phone,
            userType: req.body.userType,
        })
        await systemreg.save();
        res.json({
            message: 'Staff Member Added'
        })
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});




router.route('/loginAdmin').post((req, res, next) => {
    var email = req.body.email;
    var password = req.body.password;

    systemReg.findOne({ $or: [{ email: email }] })
        .then(systemreg => {
            if (systemreg) {
                bcrypt.compare(password, systemreg.password, function (err, result) {
                    if (err) {
                        res.json({
                            error: err
                        })
                    }
                    if (result) {
                        systemReg.find({ email: email })
                            .then(userTypeSearch => {
                                systemReg.find({ status: 'Approved' })
                                    .then(userAdmin => res.json({
                                        message: true,
                                    }))
                                    .catch(err => res.status(400).res.json({
                                        message: false,
                                    }))
                            })
                            .catch(err => res.status(400).res.json({
                                message: false,
                            }))
                    } else {
                        res.json({ message: false })
                    }
                })
            } else {
                res.json({
                    message: false
                })
            }
        })
});

router.route('/viewAllSystemReg').get(async (req, res) => {
    try {
        const systemRegs = await systemReg.find();
        res.json(systemRegs);
    } catch (error) {
        console.log(error);
        res.status(500).send('Error retrieving system registrations');
    }
});

router.route("/viewSystemReg/:search").get(async (req, res) => {
    systemReg.find({ userName: req.params.search })
        .then(systemRegs => res.json(systemRegs))
        .catch(err => res.status(400).json('No Data'))
});

router.route("/updateadmin/").put(async (req, res) => {
    const { userName, phone, email, userType, password } = req.body;

    const admin = {
        userName, phone, email, userType, password
    }
    const update = await systemReg.findOneAndUpdate({ email: email }, admin).then(() => {
        res.status(200).send({ status: "Updated" });
    }).catch((err) => {
        console.log(err);
        res.status(500).send({ status: "Error with Updating Data", error: err.message });
    });
});

router.route("/deleteadmin/:email").delete(async (req, res) => {
    let email = req.params.email;
    systemReg.findOneAndDelete({ email: email })
        .then(() => {
            res.status(200).send({ status: "Deleted" });

        }).catch((err) => {
            console.log(err);
            res.status(500).send({ status: "Error with Deleting Data", error: err.message });
        });
});

module.exports = router;