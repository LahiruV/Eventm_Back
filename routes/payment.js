const router = require('express').Router();
let payment_Schema = require('../models/payment');

router.route('/addpayment').post((req, res) => {
        const { paymentID, budID, cost, email, status, date } = req.body;
        const payment = new payment_Schema({ paymentID, budID, cost, email, status, date });
        payment.save()
                .then(() => res.json('Payment Add!'))
                .catch(err => res.status(400).json('Error: ' + err));
});

router.route("/updatepayment/").put(async (req, res) => {
        const { paymentID, budID, cost, email, status, date } = req.body;

        const payment = {
                paymentID, budID, cost, email, status, date
        }
        const update = await payment_Schema.findOneAndUpdate({ paymentID: paymentID }, payment).then(() => {
                res.status(200).send({ status: "Payment Updated" });
        }).catch((err) => {
                console.log(err);
                res.status(500).send({ status: "Error with Updating Data", error: err.message });
        });
});

router.route("/deletepayment/:code").delete(async (req, res) => {
        let code = req.params.code;
        payment_Schema.findOneAndDelete({ paymentID: code })
                .then(() => {
                        res.status(200).send({ status: "Payment Deleted" });

                }).catch((err) => {
                        console.log(err);
                        res.status(500).send({ status: "Error with Deleting Data", error: err.message });
                });
});

router.route("/allpayment").get(async (req, res) => {
        payment_Schema.find()
                .then(payment => res.json(payment))
                .catch(err => res.status(400).json('No Data'))
});

router.route("/allpayment/:type").get(async (req, res) => {
        const type = (req.params.type)
        payment_Schema.find({ type: type })
                .then(payment => res.json(payment))
                .catch(err => res.status(400).json('No Data'))
});

module.exports = router;