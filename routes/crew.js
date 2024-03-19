const router = require('express').Router();
let crew_Schema = require('../models/crew');

router.route('/addcrew').post((req, res) => {
    const { crewID, name, gender, contact, from, cost, category } = req.body;
    const crew = new crew_Schema({ crewID, name, gender, contact, from, cost, category});
    crew.save()
        .then(() => res.json('Crew Added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route("/updatecrew").put(async (req, res) => {
    const { crewID, name, gender, contact, from, cost, category } = req.body;    
    const crew = {
        crewID, name, gender, contact, from, cost, category
    }
    const update = await crew_Schema.findOneAndUpdate({ crewID: crewID }, crew).then(() => {
        res.status(200).send({ status: "Crew Updated" });
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
