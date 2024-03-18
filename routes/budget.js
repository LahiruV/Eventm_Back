const router = require('express').Router();
let budget_Schema = require('../models/budget');

router.route('/addbudget').post((req, res) => {
    const { bid, placeAbudget, placePbudget, crewAbudget, crewPbudget, promoAbudget, promoPbudget, fullBudget, name, status, mail } = req.body;
    const budget = new budget_Schema({ bid, placeAbudget, placePbudget, crewAbudget, crewPbudget, promoAbudget, promoPbudget, fullBudget, name, status, mail });
    budget.save()
        .then(() => res.json('Budget Added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route("/updatebudget/").put(async (req, res) => {
    const { bid, placeAbudget, placePbudget, crewAbudget, crewPbudget, promoAbudget, promoPbudget, fullBudget, name, mail,status } = req.body;    
    const budget = {
        bid, placeAbudget, placePbudget, crewAbudget, crewPbudget, promoAbudget, promoPbudget, fullBudget, name, status, mail
    }
    const update = await budget_Schema.findOneAndUpdate({ bid: bid }, budget).then(() => {
        res.status(200).send({ status: "Budget Updated" });
    }).catch((err) => {
        console.log(err);
        res.status(500).send({ status: "Error with Updating Data", error: err.message });
    });
});

router.route("/deletebudget/:bid").delete(async (req, res) => {
    let bid = req.params.bid;
    budget_Schema.findOneAndDelete({ bid: bid })
        .then(() => {
            res.status(200).send({ status: "Budget Deleted" });

        }).catch((err) => {
            console.log(err);
            res.status(500).send({ status: "Error with Deleting Data", error: err.message });
        });
});

router.route("/allbudgets").get(async (req, res) => {
    budget_Schema.find()
        .then(budgets => res.json(budgets))
        .catch(err => res.status(400).json('No Data'))
});


module.exports = router;
