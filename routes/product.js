const router = require('express').Router();
let product_Schema = require('../models/product');

router.route('/addproduct').post((req, res) => {
    const { code, price, category, name, quantity, picture } = req.body;
    const product = new product_Schema({ code, price, category, name, quantity, picture });
    product.save()
        .then(() => res.json('Product Add!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route("/updateproduct/").put(async (req, res) => {
    const { code, price, category, name, quantity, picture } = req.body;
    const product = {
        code, price, category, name, quantity, picture
    }
    const update = await product_Schema.findOneAndUpdate({ code: code }, product).then(() => {
        res.status(200).send({ status: "Product Updated" });
    }).catch((err) => {
        console.log(err);
        res.status(500).send({ status: "Error with Updating Data", error: err.message });
    });
});

router.route("/deleteproduct/:code").delete(async (req, res) => {
    let code = req.params.code;
    product_Schema.findOneAndDelete({ code: code })
        .then(() => {
            res.status(200).send({ status: "Product Deleted" });

        }).catch((err) => {
            console.log(err);
            res.status(500).send({ status: "Error with Deleting Data", error: err.message });
        });
});

router.route("/allproduct").get(async (req, res) => {
    product_Schema.find()
        .then(product => res.json(product))
        .catch(err => res.status(400).json('No Data'))
});



module.exports = router;