const express = require('express');

const Crews = require('../models/crew');

const router = express.Router();

//save material

router.post('/crew/save', (req,res) =>{

    let newCrew = new Crews(req.body);

    newCrew.save((err) =>{
        if(err){
            return res.status(400).json({
                error:err
            });
        }
        return res.status(200).json({
            success:"Crew saved successfully"
        });
    });
});

//getpost
router.get('/crew',(req,res) =>{
    Crews.find().exec((err,crew) =>{
        if(err){
            return res.status(400).json({
                error:err
            });
        }
        return res.status(200).json({
            success:true,
            existingPosts:crew
        });
    });
});

//get a spesific post
router.get('/crew/:id',(req,res) =>{
    let crewid =req.params.id;

    Crews.findById(crewid,(err,crew) =>{
        if(err){
            return res.status(400).json({success:false, err});
        }

        return res.status(200).json({
            success:true,
            crew
        });

    });
});

//update posts
router.put('/crew/updatecrew/:id',(req,res)=>{
    Crews.findByIdAndUpdate(
        req.params.id,
        {
            $set:req.body
        },
        (err,crew)=>{
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

router.delete('/crew/deletecrew/:id',(req,res) =>{
    Crews.findByIdAndRemove(req.params.id).exec((err,deletecrew) =>{
        
        if(err) return res.status(400).json({
            message:"Delete unsuccesfull",err
        });

        return res.json({
            message:"Delete Succesfull",deletecrew
        });

    });
});

module.exports = router;