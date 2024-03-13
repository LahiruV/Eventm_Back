const router = require('express').Router();
let employee_Schema = require('../models/employee');

router.route('/addemployee').post((req, res) => {
    const { code, name, phoneNo, email, type, salary, date } = req.body;
    const employee = new employee_Schema({ code, name, phoneNo, email, type, salary, date });
    employee.save()
        .then(() => res.json('Employee Add!'))
        .catch(err => res.status(400).json('Error: ' + err));
});
router.route("/allemployee/:search").get(async (req, res) => {
    employee_Schema.find({ type: req.params.search })
        .then(employee => res.json(employee))
        .catch(err => res.status(400).json('No Data'))
});
router.route("/updateemployee/").put(async (req, res) => {
    const { code, name, phoneNo, email, type, salary, date } = req.body;

    const employee = {
        code, name, phoneNo, email, type, salary, date
    }
    const update = await employee_Schema.findOneAndUpdate({ code: code }, employee).then(() => {
        res.status(200).send({ status: "Employee Updated" });
    }).catch((err) => {
        console.log(err);
        res.status(500).send({ status: "Error with Updating Data", error: err.message });
    });
});

router.route("/deleteemployee/:code").delete(async (req, res) => {
    let code = req.params.code;
    employee_Schema.findOneAndDelete({ code: code })
        .then(() => {
            res.status(200).send({ status: "Employee Deleted" });

        }).catch((err) => {
            console.log(err);
            res.status(500).send({ status: "Error with Deleting Data", error: err.message });
        });
});

router.route("/allemployee").get(async (req, res) => {
    employee_Schema.find()
        .then(employee => res.json(employee))
        .catch(err => res.status(400).json('No Data'))
});


module.exports = router;