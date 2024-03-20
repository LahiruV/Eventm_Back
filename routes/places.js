const express = require('express');

const Places = require('../models/place');

const router = express.Router();



router.post('/place/save', (req,res) =>{

    let newPlace = new Places(req.body);

    newPlace.save((err) =>{
        if(err){
            return res.status(400).json({
                error:err
            });
        }
        return res.status(200).json({
            success:"Place saved successfully"
        });
    });
});

//getpost
router.get('/place',(req,res) =>{
    Places.find().exec((err,place) =>{
        if(err){
            return res.status(400).json({
                error:err
            });
        }
        return res.status(200).json({
            success:true,
            existingPosts:place
        });
    });
});

//get a spesific post
router.get('/place/:id',(req,res) =>{
    let placeid =req.params.id;

    Places.findById(placeid,(err,place) =>{
        if(err){
            return res.status(400).json({success:false, err});
        }

        return res.status(200).json({
            success:true,
            place
        });

    });
});

//update posts
router.put('/place/updateplace/:id',(req,res)=>{
    Places.findByIdAndUpdate(
        req.params.id,
        {
            $set:req.body
        },
        (err,place)=>{
            if(err){
                return res.status(400).json({error:err});
            }
            
            return res.status(200).json({
                success:"Update Succesfully"
            });
        }
    )
});

//delete post

router.delete('/place/deleteplace/:id',(req,res) =>{
    Places.findByIdAndRemove(req.params.id).exec((err,deleteplace) =>{
        
        if(err) return res.status(400).json({
            message:"Delete unsuccesfull",err
        });

        return res.json({
            message:"Delete Succesfull",deleteplace
        });

    });
});

module.exports = router;