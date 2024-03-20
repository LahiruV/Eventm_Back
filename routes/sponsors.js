const express = require('express');

const Sponsors = require('../models/sponsor');

const router = express.Router();


router.post('/sponsor/save', (req,res) =>{

    let newSponsor = new Sponsors(req.body);

    newSponsor.save((err) =>{
        if(err){
            return res.status(400).json({
                error:err
            });
        }
        return res.status(200).json({
            success:"Sponsor saved successfully"
        });
    });
});

//getpost
router.get('/sponsor',(req,res) =>{
    Sponsors.find().exec((err,sponsor) =>{
        if(err){
            return res.status(400).json({
                error:err
            });
        }
        return res.status(200).json({
            success:true,
            existingPosts:sponsor
        });
    });
});

//get a spesific post
router.get('/sponsor/:id',(req,res) =>{
    let sponsorid =req.params.id;

    Sponsors.findById(sponsorid,(err,sponsor) =>{
        if(err){
            return res.status(400).json({success:false, err});
        }

        return res.status(200).json({
            success:true,
            sponsor
        });

    });
});

//update posts
router.put('/sponsor/updatesponsor/:id',(req,res)=>{
    Sponsors.findByIdAndUpdate(
        req.params.id,
        {
            $set:req.body
        },
        (err,sponsor)=>{
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

router.delete('/sponsor/deletesponsor/:id',(req,res) =>{
    Sponsors.findByIdAndRemove(req.params.id).exec((err,deletesponsor) =>{
        
        if(err) return res.status(400).json({
            message:"Delete unsuccesfull",err
        });

        return res.json({
            message:"Delete Succesfull",deletesponsor
        });

    });
});

module.exports = router;